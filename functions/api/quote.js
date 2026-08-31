// /api/quote — 接收报价表单 + 图纸，存 R2，发邮件通知销售
// 前端已在 QuoteForm.astro 中 POST multipart/form-data 到此接口
export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();

    const fields = {
      name: (formData.get('name') || '').toString().trim(),
      company: (formData.get('company') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      country_code: (formData.get('country_code') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      partName: (formData.get('partName') || '').toString().trim(),
      material: (formData.get('material') || '').toString().trim(),
      material_detail: (formData.get('material_detail') || '').toString().trim(),
      quantity: (formData.get('quantity') || '').toString().trim(),
      tolerance: (formData.get('tolerance') || '').toString().trim(),
      notes: (formData.get('notes') || '').toString().trim(),
    };

    if (!fields.name || !fields.email) {
      return Response.json({ ok: false, error: 'Missing name or email' }, { status: 400 });
    }

    const drawings = formData.getAll('drawings').filter((f) => f && f.size > 0);

    const MAX_FILE = 25 * 1024 * 1024; // 单文件 25MB
    const MAX_TOTAL = 40 * 1024 * 1024; // 附件总大小 40MB（Resend 限制）
    const MAX_FILES = 10;
    if (drawings.length > MAX_FILES) {
      return Response.json({ ok: false, error: 'Too many files (max 10)' }, { status: 400 });
    }

    const ALLOWED = ['step', 'stp', 'iges', 'igs', 'stl', 'pdf', 'dxf', 'dwg'];
    const attachments = [];
    const stored = [];
    let total = 0;

    for (const file of drawings) {
      if (file.size > MAX_FILE) {
        return Response.json({ ok: false, error: `File "${file.name}" exceeds 25MB` }, { status: 400 });
      }
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      if (!ALLOWED.includes(ext)) {
        return Response.json({ ok: false, error: `Unsupported file type: .${ext}` }, { status: 400 });
      }
      total += file.size;
      if (total > MAX_TOTAL) {
        return Response.json({ ok: false, error: 'Total attachment size exceeds 40MB' }, { status: 400 });
      }

      // 存 R2（绑定名 QUOTE_DRAWINGS，缺失时降级跳过，邮件附件仍照发）
      const key = `quotes/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      try {
        if (env.QUOTE_DRAWINGS) {
          await env.QUOTE_DRAWINGS.put(key, file, {
            httpMetadata: { contentType: file.type || 'application/octet-stream' },
          });
          stored.push(key);
        }
      } catch (e) {
        // storage 失败不影响邮件通知
      }

      // 邮件附件（base64）
      try {
        const buf = await file.arrayBuffer();
        attachments.push({ filename: file.name, content: arrayBufferToBase64(buf) });
      } catch (e) {
        // 跳过无法读取的文件
      }
    }

    const fromEmail = env.FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = env.NOTIFY_EMAIL || 'sales@eternalcnc.com';
    const subject = `[Quote Request] ${fields.partName || fields.name} — EternalCNC`;
    const text = [
      'New quote request from EternalCNC website',
      '',
      `Name: ${fields.name}`,
      `Company: ${fields.company || 'N/A'}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.country_code ? fields.country_code + ' ' : ''}${fields.phone || 'N/A'}`,
      '',
      `Part / Drawing No.: ${fields.partName || 'N/A'}`,
      `Material: ${fields.material === 'per-drawing' ? 'As per drawing' : (fields.material_detail || fields.material || 'N/A')}`,
      `Quantity: ${fields.quantity || 'N/A'}`,
      `Tolerance: ${fields.tolerance || 'N/A'}`,
      '',
      'Notes:',
      fields.notes || 'None',
      '',
      `Drawings stored in R2: ${stored.length} file(s); attached to this email: ${attachments.length} file(s)`,
    ].join('\n');

    const resendBody = {
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
    };
    if (attachments.length) resendBody.attachments = attachments;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendBody),
    });

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ ok: false, error: 'Email send failed: ' + errText }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: String((err && err.message) || err) },
      { status: 500 }
    );
  }
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
