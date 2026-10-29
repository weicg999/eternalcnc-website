/**
 * Cloudflare Pages Function - 语音识别（ASR）网关
 *
 * 混合策略（2026-10-28）：
 * - 海外访客：浏览器原生 webkitSpeechRecognition（免费走 Google），前端优先用。
 * - 国内访客：原生识别因网络不通（Google 被墙）失败后，前端降级到本接口，
 *   由本接口把音频转发到腾讯云「一句话识别」（SentenceRecognition）并返回文字。
 *
 * 环境变量（Cloudflare Dashboard 配置）：
 * - TENCENT_SECRET_ID:  腾讯云 API 密钥 SecretId
 * - TENCENT_SECRET_KEY: 腾讯云 API 密钥 SecretKey
 *
 * 请求体（前端 POST /api/speech）：
 * - pcm:  base64 编码的 PCM 音频（16kHz、16bit、单声道）
 * - lang: 'zh' | 'en' | 其他（决定识别引擎）
 *
 * 返回：
 * - { ok: true,  text: "识别文字" }
 * - { ok: false, error: "..." }
 */

const ALLOWED_ORIGINS = [
  'https://eternalcnc.com',
  'https://www.eternalcnc.com',
  'https://eternalcnc-website.pages.dev',
];
const ALLOWED_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):\d+$/;

const TENCENT_HOST = 'asr.tencentcloudapi.com';
const TENCENT_SERVICE = 'asr';
const TENCENT_ACTION = 'SentenceRecognition';
const TENCENT_VERSION = '2019-06-14';

function isOriginAllowed(origin) {
  if (!origin) return false;
  if (ALLOWED_LOCAL.test(origin)) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

function corsHeaders(origin) {
  const allowed = isOriginAllowed(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(status, data, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function toHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(msg) {
  const enc = new TextEncoder();
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(msg));
  return toHex(new Uint8Array(digest));
}

// key：字符串（首次）或 Uint8Array（派生）；msg：字符串
async function hmacSha256(key, msg) {
  const enc = new TextEncoder();
  const keyData = typeof key === 'string' ? enc.encode(key) : key;
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(msg));
  return new Uint8Array(sig);
}

// 腾讯云 TC3-HMAC-SHA256 签名（API v3）
async function tc3Sign(secretId, secretKey, payload, timestamp) {
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);

  // 1. CanonicalRequest
  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${TENCENT_HOST}\n`;
  const signedHeaders = 'content-type;host';
  const hashedPayload = await sha256Hex(payload);
  const canonicalRequest = [
    'POST',
    '/',
    '',
    canonicalHeaders,
    signedHeaders,
    hashedPayload,
  ].join('\n');

  // 2. StringToSign
  const credentialScope = `${date}/${TENCENT_SERVICE}/tc3_request`;
  const hashedCanonicalRequest = await sha256Hex(canonicalRequest);
  const stringToSign = [
    'TC3-HMAC-SHA256',
    String(timestamp),
    credentialScope,
    hashedCanonicalRequest,
  ].join('\n');

  // 3. 派生密钥
  const secretDate = await hmacSha256('TC3' + secretKey, date);
  const secretService = await hmacSha256(secretDate, TENCENT_SERVICE);
  const secretSigning = await hmacSha256(secretService, 'tc3_request');

  // 4. Signature
  const signature = toHex(await hmacSha256(secretSigning, stringToSign));

  // 5. Authorization
  return `TC3-HMAC-SHA256 Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}

// 引擎类型映射：客服以中英为主，其他语种走中英混引擎兜底
function engineForLang(lang) {
  if (lang === 'zh') return '16k_zh';
  if (lang === 'en') return '16k_en';
  return '16k_zh-PY';
}

async function callTencentASR(secretId, secretKey, pcmB64, lang) {
  const pcmBytes = base64ToBytes(pcmB64);
  const dataLen = pcmBytes.length;
  if (dataLen === 0) throw new Error('empty audio');

  const payload = JSON.stringify({
    EngSerViceType: engineForLang(lang),
    SourceType: 1, // 1 = 本地音频数据
    VoiceFormat: 'pcm',
    Data: pcmB64,
    DataLen: dataLen,
  });

  const timestamp = Math.floor(Date.now() / 1000);
  const authorization = await tc3Sign(secretId, secretKey, payload, timestamp);

  const resp = await fetch(`https://${TENCENT_HOST}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Host': TENCENT_HOST,
      'X-TC-Action': TENCENT_ACTION,
      'X-TC-Version': TENCENT_VERSION,
      'X-TC-Timestamp': String(timestamp),
      'Authorization': authorization,
    },
    body: payload,
  });

  const data = await resp.json();
  if (!resp.ok || (data.Response && data.Response.Error)) {
    const err = (data.Response && data.Response.Error) || {};
    throw new Error(err.Message || err.Code || `Tencent ASR HTTP ${resp.status}`);
  }
  const result = (data.Response && data.Response.Result) || '';
  return result.trim();
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin');

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse(400, { ok: false, error: 'invalid json' }, origin);
  }

  const pcm = typeof body.pcm === 'string' ? body.pcm : '';
  const lang = typeof body.lang === 'string' ? body.lang : 'zh';

  if (!pcm) {
    return jsonResponse(400, { ok: false, error: 'no audio data' }, origin);
  }

  const secretId = env.TENCENT_SECRET_ID;
  const secretKey = env.TENCENT_SECRET_KEY;
  if (!secretId || !secretKey) {
    return jsonResponse(500, { ok: false, error: 'ASR not configured (missing TENCENT_SECRET_ID/KEY)' }, origin);
  }

  try {
    const text = await callTencentASR(secretId, secretKey, pcm, lang);
    return jsonResponse(200, { ok: true, text }, origin);
  } catch (e) {
    return jsonResponse(502, { ok: false, error: e.message || 'ASR failed' }, origin);
  }
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get('Origin');
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
