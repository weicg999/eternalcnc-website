// 离线验证：用真实抓到的 Coze SSE 样本，分别跑「旧解析器」和「新解析器」，
// 证明旧代码为何显示「暂无回复」，新代码能否还原完整回答。
//
// 真实样本（curl 抓自 /api/coze/chat，节选 + 关键结尾事件）：
const SAMPLE = [
  'event:message',
  'data:{"message":{"role":"assistant","type":"answer","content":"您","content_type":"text","reasoning_content":""},"is_finish":false,"index":0,"conversation_id":"x","seq_id":0}',
  '',
  'event:message',
  'data:{"message":{"role":"assistant","type":"answer","content":"好","content_type":"text","reasoning_content":""},"is_finish":false,"index":0,"conversation_id":"x","seq_id":1}',
  '',
  'event:message',
  'data:{"message":{"role":"assistant","type":"answer","content":"！我是鑫永恒CNC","content_type":"text","reasoning_content":""},"is_finish":false,"index":0,"conversation_id":"x","seq_id":2}',
  '',
  'event:message',
  'data:{"message":{"role":"assistant","type":"verbose","content":"{\\"msg_type\\":\\"generate_answer_finish\\"}","content_type":"text","reasoning_content":""},"is_finish":true,"index":1,"conversation_id":"x","seq_id":3}',
  '',
  'event:message',
  'data:{"message":{"role":"assistant","type":"answer","content":"","content_type":"text","reasoning_content":""},"is_finish":true,"index":0,"conversation_id":"x","seq_id":4}',
  '',
  'event:done',
  'data:',
  ''
].join('\n');

function parse(sample, mode) {
  let full = '';
  const events = sample.split('\n\n');
  for (const raw of events) {
    if (!raw.trim()) continue;
    let dataStr = '';
    raw.split('\n').forEach((ln) => { if (ln.indexOf('data:') === 0) dataStr += ln.slice(5).replace(/^\s/, ''); });
    const ev = (raw.match(/event:\s*(\S+)/) || [])[1] || '';
    if (mode === 'old') {
      if (!dataStr) continue;
      let data; try { data = JSON.parse(dataStr); } catch (e) { continue; }
      if (data && data.code && data.code !== 0) return '【错误】' + data.msg;
      if (data && data.content && typeof data.content === 'string') full += data.content;
    } else { // new
      if (ev === 'done') break;
      if (!dataStr) continue;
      let data; try { data = JSON.parse(dataStr); } catch (e) { continue; }
      if (data && data.code && data.code !== 0) return '【错误】' + data.msg;
      const msg = data && data.message;
      if (msg && msg.is_finish) break;
      const content = (msg && typeof msg.content === 'string') ? msg.content
        : (data && typeof data.content === 'string') ? data.content : '';
      const msgType = msg && msg.type;
      if (!content || (msgType && msgType !== 'answer')) continue;
      full += content;
    }
  }
  return full || '（暂无回复，请稍后再试）';
}

const oldOut = parse(SAMPLE, 'old');
const newOut = parse(SAMPLE, 'new');

console.log('旧解析器输出: ', JSON.stringify(oldOut));
console.log('新解析器输出: ', JSON.stringify(newOut));
console.log('---');
console.log('旧=空? ', oldOut.indexOf('暂无回复') !== -1 ? 'YES ❌（正是用户看到的）' : 'NO');
console.log('新=完整? ', newOut.indexOf('鑫永恒') !== -1 ? 'YES ✅（修复生效）' : 'NO ❌');
process.exit(oldOut.indexOf('暂无回复') !== -1 && newOut.indexOf('鑫永恒') !== -1 ? 0 : 1);
