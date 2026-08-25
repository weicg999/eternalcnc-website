// Cloudflare Worker: RFQ / 图纸接收
// 接收 multipart/form-data（字段 + 图纸文件）
//   - ≤ MAX_ATTACH_MB 的文件：作为邮件附件发给 SALES_EMAIL
//   - 超限文件：上传 R2 桶，邮件仅发下载链接（7 天有效签名 URL）
// 邮件发送：通过 Resend API（fetch）。凭据经 wrangler secret 注入，不硬编码。
//
// 部署：
//   cd workers/quote-worker && wrangler deploy
// 本地开发（配合 Astro dev server）：
//   wrangler dev --local --port 8787
//   前端 fetch 指向 http://localhost:8787/api/quote（见 QuoteForm.astro 的 API_BASE）

const MAX_ATTACH_MB = 25; // 单封邮件附件安全上限（多数 SMTP 限 25~50MB，取保守值）
const LINK_TTL_SECONDS = 60 * 60 * 24 * 7; // R2 签名链接 7 天有效

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS：允许官网跨域（Astro 静态站与 Worker 同域时可省略，但留着更稳）
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsHeaders);
    }
    if (!url.pathname.endsWith('/api/quote')) {
      return json({ error: 'Not found' }, 404, corsHeaders);
    }

    let form;
    try {
      form = await request.formData();
    } catch (e) {
      return json({ error: 'Invalid form data' }, 400, corsHeaders);
    }

    // --- 收集字段 ---
    const fields = {
      name: str(form.get('name')),
      company: str(form.get('company')),
      email: str(form.get('email')),
      phone: (str(form.get('country_code')) + ' ' + str(form.get('phone'))).trim(),
      partName: str(form.get('partName')),
      material: str(form.get('material')),
      material_detail: str(form.get('material_detail')),
      quantity: str(form.get('quantity')),
      tolerance: str(form.get('tolerance')),
      notes: str(form.get('notes')),
    };
    if (!fields.name || !fields.email) {
      return json({ error: 'Name and email are required' }, 422, corsHeaders);
    }

    // --- 收集文件 ---
    const files = [];
    for (const [key, val] of form.entries()) {
      if (val && typeof val === 'object' && typeof val.arrayBuffer === 'function') {
        const buf = await val.arrayBuffer();
        files.push({
          filename: sanitize(val.name || 'drawing.bin'),
          type: val.type || 'application/octet-stream',
          size: buf.byteLength,
          buffer: buf,
        });
      }
    }

    // --- 拆分：小文件走附件，大文件走 R2 ---
    const attachments = [];
    const links = [];
    for (const f of files) {
      if (f.size <= MAX_ATTACH_MB * 1024 * 1024) {
        attachments.push(f);
      } else {
        if (!env.RFQ_BUCKET) {
          links.push(`⚠️ ${f.filename}（${mb(f.size)} MB）超过 ${MAX_ATTACH_MB}MB 附件上限，但存储未配置，未能上传。`);
          continue;
        }
        const key = `${Date.now()}-${f.filename}`;
        await env.RFQ_BUCKET.put(key, f.buffer, { httpMetadata: { contentType: f.type } });
        const link = await signedUrl(env, key);
        links.push(`${f.filename}（${mb(f.size)} MB）：${link}`);
      }
    }

    // --- 拼邮件正文 ---
    const lines = [
      `RFQ / 报价请求来自：${fields.name}`,
      `公司：${fields.company || '-'}`,
      `邮箱：${fields.email}`,
      `电话：${fields.phone || '-'}`,
      `零件名称 / 图号：${fields.partName || '-'}`,
      `材料：${fields.material === 'other' ? (fields.material_detail || '客户指定') : (fields.material || '按图纸')}`,
      `数量：${fields.quantity || '-'}`,
      `公差：${fields.tolerance || '-'}`,
      `备注：${fields.notes || '-'}`,
      '',
      `图纸附件（${attachments.length} 个）：`,
      ...attachments.map(a => `  - ${a.filename}（${mb(a.size)} MB）`),
      '',
      `大文件下载链接（${links.length} 个，7 天内有效）：`,
      ...links.map(l => `  - ${l}`),
      '',
      `本邮件由 eternalcnc.com 询盘系统自动发送。`,
    ];
    const subject = `RFQ from ${fields.name} (${fields.email})`;

    // --- 发送邮件（Resend）---
    try {
      await sendViaResend(env, subject, lines.join('\n'), attachments);
    } catch (e) {
      return json({ error: '邮件发送失败：' + msg(e) }, 502, corsHeaders);
    }

    return json({ ok: true, attachments: attachments.length, links: links.length }, 200, corsHeaders);
  },
};

// ----------  helpers ----------
function str(v) { return (v == null ? '' : String(v)).trim(); }
function mb(n) { return (n / 1024 / 1024).toFixed(2); }
function sanitize(name) {
  return name.replace(/[^\w.\-\u4e00-\u9fa5]+/g, '_').slice(0, 120);
}
function msg(e) { return e && e.message ? e.message : String(e); }
function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

async function signedUrl(env, key) {
  // R2 绑定提供 createSignedUrl 时直接用；否则回退到公网 URL（需桶公开）
  try {
    if (env.RFQ_BUCKET.createSignedUrl) {
      return await env.RFQ_BUCKET.createSignedUrl(key, LINK_TTL_SECONDS);
    }
  } catch (_) {}
  const base = (env.R2_PUBLIC_BASE || '').replace(/\/$/, '');
  return `${base}/${encodeURIComponent(key)}`;
}

async function sendViaResend(env, subject, text, attachments) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.MAIL_FROM || 'RFQ <rfq@eternalcnc.com>';
  const to = (env.SALES_EMAIL || 'sales@eternalcnc.com').split(',').map(s => s.trim());

  const payload = {
    from,
    to,
    subject,
    text,
    attachment: attachments.map(a => ({
      filename: a.filename,
      content: base64(a.buffer),
    })),
  };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Resend ${res.status}: ${t}`);
  }
  return res.json();
}

function base64(buf) {
  // ArrayBuffer -> base64（Worker 环境无 Buffer，用 btoa）
  const bytes = new Uint8Array(buf);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}
