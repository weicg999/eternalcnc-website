// 本地 mock 后端：镜像 functions/api/chat.js 的上下文注入逻辑，
// 返回 SSE 流（前端 EternalChat.astro 按 data:{event:message,...} 解析）。
// 目的：在无法直连 Coze 的环境下，验证"前端→后端"集成层是否正确传递 visitor_language、
// 是否正确注入多语言/粵語指令。真实机器人措辞需在你 Coze 后台验证。

// 镜像 chat.js 的 buildContextPrefix 逻辑
export function buildContext(language) {
  const lang = (language || 'en').toLowerCase();
  let label;
  let prefix;
  if (lang === 'yue' || lang === 'zh-hk' || lang === 'zh-mo') {
    label = '粵語（广东话）';
    prefix = '请使用粵語（广东话）口语化回复，繁简皆可，避免书面普通话';
  } else if (lang.indexOf('zh') === 0) {
    label = '简体中文';
    prefix = '请使用简体中文回复';
  } else {
    label = language || 'en';
    prefix = '请使用该语言（' + label + '）回复';
  }
  const guard =
    '不要向访客询问想用哪种语言、也不要声称仅支持某几种固定语言、直接以访客语言偏好（含粵語）回复、支持多语言是默认能力';
  return { label, prefix, guard };
}

export function handleChat(body) {
  const lang =
    (body && body.visitor_info && body.visitor_info.language) ||
    (body && body.language) ||
    'en';
  const ctx = buildContext(lang);

  const lines = [
    '[SIM-bot · visitor_language=' + lang + ']',
    '→ 后端注入指令：「' + ctx.prefix + '」',
    '→ 护栏：「' + ctx.guard + '」',
    '（此为本地模拟回复，仅验证集成层；真实机器人措辞需在 Coze 后台验证）',
  ];

  const chunks = [];
  for (const ln of lines) {
    chunks.push(
      'data: ' +
        JSON.stringify({ event: 'message', message: { content: ln + '\n' } }) +
        '\n\n'
    );
  }
  chunks.push('data: [DONE]\n\n');

  const logEntry = {
    receivedLanguage: lang,
    contextPrefix: ctx.prefix,
    contextLabel: ctx.label,
    isFirstMessage: !!(body && body.is_first_message),
    hasVisitorInfo: !!(body && body.visitor_info),
    message: (body && body.message) || '',
  };

  return { chunks, logEntry };
}
