/**
 * 企业微信回调 · 根路径别名（2026-11-20）
 *
 * 为什么要有这个文件：
 *   企微自建应用「接收消息 → 设置API接收」里 URL 一旦填了
 *   https://eternalcnc.com/wecom/callback（少了 /api），线上就是 404，
 *   保存时 URL 验证必然失败 —— 而企微后台不会告诉你「路径写错了」，
 *   只会说验证失败，很容易误判成 Token/AESKey 不对。
 *
 *   这里把 /wecom/callback 原样转发到 /api/wecom/callback 的实现，
 *   两个地址都能用，后台填哪个都不会踩坑。
 *
 * 实现说明：Cloudflare Pages Functions 的路由由文件路径决定，
 *   本文件只做 re-export，不复制任何业务逻辑，避免两份代码走偏。
 */

export { onRequestGet, onRequestPost } from '../api/wecom/callback.js';
