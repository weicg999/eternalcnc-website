// 轻量端到端验证：打线上 /api/chat，发一句"找注塑厂家"，看新 chat.js 是否放行牵线回复
const body = {
  message: '帮我找注塑厂家可以吗',
  user_id: 'test_verify_001',
  is_first_message: true,
  visitor_info: { language: 'zh-CN', current_page: 'https://www.eternalcnc.com/', page_category: 'home' },
};
const ctrl = new AbortController();
const timer = setTimeout(() => ctrl.abort(), 90000);
try {
  const res = await fetch('https://www.eternalcnc.com/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: ctrl.signal,
  });
  console.log('HTTP', res.status, res.headers.get('content-type'));
  if (!res.body) { console.log('no body'); process.exit(0); }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let full = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith('data:')) continue;
      const payload = t.slice(5).trim();
      if (payload === '[DONE]') continue;
      try {
        const j = JSON.parse(payload);
        if (j.event === 'message' && j.message && j.message.content) full += j.message.content;
      } catch (_) {}
    }
  }
  console.log('--- Bot 回复 ---');
  console.log(full || '(空)');
} catch (e) {
  console.log('请求失败:', e.name, e.message);
} finally {
  clearTimeout(timer);
}
