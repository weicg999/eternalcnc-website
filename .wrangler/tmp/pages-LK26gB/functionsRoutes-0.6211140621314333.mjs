import { onRequestPost as __api_coze_chat_js_onRequestPost } from "F:\\V7\\functions\\api\\coze\\chat.js"
import { onRequestPost as __api_coze_conversation_js_onRequestPost } from "F:\\V7\\functions\\api\\coze\\conversation.js"
import { onRequestOptions as __api_chat_js_onRequestOptions } from "F:\\V7\\functions\\api\\chat.js"
import { onRequestPost as __api_chat_js_onRequestPost } from "F:\\V7\\functions\\api\\chat.js"
import { onRequestOptions as __api_chat_lead_js_onRequestOptions } from "F:\\V7\\functions\\api\\chat-lead.js"
import { onRequestPost as __api_chat_lead_js_onRequestPost } from "F:\\V7\\functions\\api\\chat-lead.js"
import { onRequestPost as __api_quote_js_onRequestPost } from "F:\\V7\\functions\\api\\quote.js"
import { onRequest as __chat_token_js_onRequest } from "F:\\V7\\functions\\chat-token.js"

export const routes = [
    {
      routePath: "/api/coze/chat",
      mountPath: "/api/coze",
      method: "POST",
      middlewares: [],
      modules: [__api_coze_chat_js_onRequestPost],
    },
  {
      routePath: "/api/coze/conversation",
      mountPath: "/api/coze",
      method: "POST",
      middlewares: [],
      modules: [__api_coze_conversation_js_onRequestPost],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_chat_js_onRequestOptions],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_js_onRequestPost],
    },
  {
      routePath: "/api/chat-lead",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_chat_lead_js_onRequestOptions],
    },
  {
      routePath: "/api/chat-lead",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_lead_js_onRequestPost],
    },
  {
      routePath: "/api/quote",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_quote_js_onRequestPost],
    },
  {
      routePath: "/chat-token",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__chat_token_js_onRequest],
    },
  ]