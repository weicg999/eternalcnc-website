/**
 * Cloudflare Pages Function - 智能客服 API 网关（第二层优化）
 *
 * 功能：
 * - 接收前端聊天请求，转发给扣子 Open API
 * - 支持流式响应（SSE），逐字返回给前端
 * - 频率限制（同一 IP 每分钟 30 条）
 * - 域名白名单校验
 * - 会话隔离（基于 conversation_id）
 * - 【新增】访客信息预收集：语言/来源/当前页面/页面分类
 * - 【新增】首条消息附带上下文，让 Bot 知道用户在浏览什么
 *
 * 环境变量：
 * - COZE_PAT: 扣子 Personal Access Token
 * - COZE_BOT_ID: 扣子 Bot ID
 *
 * 部署到 Cloudflare Pages Functions: /functions/api/chat.js
 * 访问路径: POST /api/chat
 */

// ========== 配置 ==========
const COZE_API_ENDPOINT = 'https://api.coze.cn/open_api/v2/chat';
const RATE_LIMIT_MAX = 30; // 每分钟最多请求数
const RATE_LIMIT_WINDOW = 60 * 1000; // 时间窗口（毫秒）

// 扣子配置（写死，绕过Cloudflare环境变量读取问题）
const COZE_PAT = 'pat_rqNvQTy7enkEsB5jFOi8VGYnY4xVe5QT8HbhDDWg1RuUqkEHa7y1egk012SZWfox';
const COZE_BOT_ID = '7677859860893040694';

// 允许的来源域名
const ALLOWED_ORIGINS = [
  'https://eternalcnc.com',
  'https://www.eternalcnc.com',
  'https://eternalcnc-website.pages.dev',
];

// 本地开发环境也允许
const ALLOWED_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):\d+$/;

// ========== 频率限制（内存级，单 Worker 实例有效） ==========
// 注意：Cloudflare Workers 是分布式的，多实例间不共享内存
// 对于低流量站点，内存级限流足够；如需精确全局限流，可用 KV/ Durable Object
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  let timestamps = rateLimitMap.get(ip);
  if (!timestamps) {
    timestamps = [];
    rateLimitMap.set(ip, timestamps);
  }

  // 清理过期时间戳
  timestamps = timestamps.filter(t => t > windowStart);
  rateLimitMap.set(ip, timestamps);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }

  timestamps.push(now);
  return true;
}

// ========== 工具函数 ==========
function getClientIp(request) {
  // Cloudflare 提供 CF-Connecting-IP 头
  return request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || 'unknown';
}

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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin),
    },
  });
}

// ========== 上下文构建 ==========
/**
 * 构建首条消息的上下文前缀
 * 将访客信息和页面上下文以自然语言形式附加在用户消息之前
 * 让 Bot 在回复时能够感知到用户的浏览场景
 */
function buildContextPrefix(visitorInfo) {
  if (!visitorInfo || typeof visitorInfo !== 'object') return '';

  const {
    language = '',
    referrer = '',
    current_page = '',
    page_category = '',
    page_category_en = '',
    screen_size = '',
  } = visitorInfo;

  const parts = [];

  // 系统级提示：告知 Bot 这是上下文信息，不要回复这些内容
  parts.push('【系统上下文 - 以下是访客浏览信息，请根据这些信息用恰当的语言回复用户，不要提及你看到了这些系统信息】');

  if (language) {
    parts.push(`- 访客浏览器语言: ${language}（请使用该语言回复）`);
  }
  if (current_page) {
    parts.push(`- 访客当前浏览页面: ${current_page}`);
  }
  if (page_category || page_category_en) {
    const cat = page_category && page_category_en
      ? `${page_category} / ${page_category_en}`
      : (page_category || page_category_en);
    parts.push(`- 页面内容分类: ${cat}`);
  }
  if (referrer) {
    // 只保留域名，保护隐私
    try {
      const refUrl = new URL(referrer);
      parts.push(`- 访客来源网站: ${refUrl.hostname}`);
    } catch (e) {
      if (referrer.length < 100) {
        parts.push(`- 访客来源: ${referrer}`);
      }
    }
  }
  if (screen_size) {
    parts.push(`- 访客屏幕尺寸: ${screen_size}`);
  }

  parts.push('【上下文结束 - 用户真实消息如下】');

  return parts.join('\n') + '\n\n';
}

// ========== 流式响应处理 ==========
async function streamChatCoze({ message, userId, conversationId, pat, botId, signal, customVariables }) {
  const requestBody = {
    bot_id: botId,
    user: userId,
    query: message,
    stream: true,
    conversation_id: conversationId,
  };

  // 自定义变量（扣子 v2 API 支持 custom_variables）
  // 用于将访客信息传给 Bot 的工作流/插件变量
  if (customVariables && Object.keys(customVariables).length > 0) {
    requestBody.custom_variables = customVariables;
  }

  const response = await fetch(COZE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(requestBody),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Coze API error (${response.status}): ${errorText}`);
  }

  return response;
}

// 将 Coze 的 SSE 流转换为我们自己的 SSE 格式返回给前端
function transformStream(cozeResponse) {
  const reader = cozeResponse.body.getReader();
  const decoder = new TextDecoder('utf-8');
  const encoder = new TextEncoder();
  let buffer = '';
  let hasStarted = false;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // 发送结束标记
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          // 按行解析 SSE
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // 保留不完整行

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            // 只处理 data: 行
            if (trimmed.startsWith('data:')) {
              const dataStr = trimmed.slice(5).trim();
              if (!dataStr) continue;

              try {
                const data = JSON.parse(dataStr);

                // 处理 v2 格式: { event: 'message', message: { content, type, role } }
                if (data.event === 'message' && data.message) {
                  if (data.message.type === 'answer' && data.message.content) {
                    // 提取内容增量
                    const content = data.message.content;
                    if (content) {
                      // 首包标记
                      if (!hasStarted) {
                        hasStarted = true;
                      }
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'message', message: { content } })}\n\n`));
                    }
                  } else if (data.message.type === 'verbose') {
                    // 多 answer 完成标记，忽略
                    continue;
                  }
                }
                // v3 格式兼容: { event_type: 'conversation.message.delta', data: { content } }
                else if (data.event_type === 'conversation.message.delta' && data.data) {
                  const content = data.data.content;
                  if (content) {
                    if (!hasStarted) hasStarted = true;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'message', message: { content } })}\n\n`));
                  }
                }
                // v3 完成事件
                else if (data.event_type === 'conversation.chat.completed' || data.event_type === 'conversation.message.completed') {
                  continue;
                }
                // done 事件
                else if (data.event === 'done') {
                  // 稍后在循环结束时统一发 [DONE]
                  continue;
                }
                // error 事件
                else if (data.event === 'error' || data.event_type?.includes('error')) {
                  const errorInfo = data.error_information || data.data || {};
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'error', error: errorInfo })}\n\n`));
                }

              } catch (e) {
                // JSON 解析失败，可能是不完整的包，跳过
                continue;
              }
            }
          }
        }
      } catch (err) {
        console.error('Stream transform error:', err);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'error', error: { msg: err.message } })}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },

    cancel() {
      reader.cancel().catch(() => {});
    }
  });

  return stream;
}

// ========== 主处理函数 ==========
export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';
  // 1. 来源校验
  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: 'Origin not allowed' }, origin);
  }

  // 2. 频率限制
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return jsonResponse(429, { code: 429, msg: 'Rate limit exceeded. Please try again later.' }, origin);
  }

  // 3. 环境变量检查（优先读环境变量，fallback到内置常量）
  const pat = env.COZE_PAT || COZE_PAT;
  const botId = env.COZE_BOT_ID || COZE_BOT_ID;
  if (!pat || !botId) {
    return jsonResponse(500, { code: 500, msg: 'Server configuration error: missing environment variables' }, origin);
  }

  // 4. 解析请求体
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse(400, { code: 400, msg: 'Invalid JSON body' }, origin);
  }

  const {
    message,
    user_id: userId,
    conversation_id: conversationId,
    visitor_info: visitorInfo,
    is_first_message: isFirstMessage,
  } = body;

  if (!message || typeof message !== 'string') {
    return jsonResponse(400, { code: 400, msg: 'Invalid message parameter' }, origin);
  }
  if (!userId || typeof userId !== 'string') {
    return jsonResponse(400, { code: 400, msg: 'Invalid user_id parameter' }, origin);
  }
  if (message.length > 4000) {
    return jsonResponse(400, { code: 400, msg: 'Message too long (max 4000 characters)' }, origin);
  }

  // 5. 构建最终发送给 Bot 的消息
  // 如果是首条消息且有访客信息，将上下文附加到消息前面
  let finalMessage = message;
  let customVariables = null;

  try {
    if (isFirstMessage && visitorInfo) {
      const contextPrefix = buildContextPrefix(visitorInfo);
      if (contextPrefix) {
        finalMessage = contextPrefix + message;
      }

      // 同时也通过 custom_variables 传递，方便 Bot 工作流使用
      customVariables = {
        visitor_language: visitorInfo.language || '',
        visitor_page: visitorInfo.current_page || '',
        visitor_page_category: visitorInfo.page_category || visitorInfo.page_category_en || '',
        visitor_referrer: visitorInfo.referrer || '',
      };
    }
  } catch (e) {
    // 上下文构建失败不影响主流程，直接用原始消息
    console.warn('Build context prefix failed:', e);
    finalMessage = message;
  }

  // 6. 调用扣子 API 并流式转发
  const abortController = new AbortController();

  // 监听客户端断开
  request.signal.addEventListener('abort', () => {
    abortController.abort();
  });

  try {
    const cozeResponse = await streamChatCoze({
      message: finalMessage,
      userId,
      conversationId: conversationId || undefined,
      pat,
      botId,
      signal: abortController.signal,
      customVariables,
    });

    const outputStream = transformStream(cozeResponse);

    return new Response(outputStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
        ...corsHeaders(origin),
      },
    });

  } catch (err) {
    if (err.name === 'AbortError') {
      return jsonResponse(499, { code: 499, msg: 'Client closed request' }, origin);
    }
    console.error('Chat API error:', err);
    return jsonResponse(502, { code: 502, msg: 'Upstream service error', detail: err.message }, origin);
  }
}

// OPTIONS 请求（CORS 预检）
export async function onRequestOptions(context) {
  const { request } = context;
  const origin = request.headers.get('origin') || '';
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
