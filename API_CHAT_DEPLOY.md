# API 版智能客服系统 - 部署文档

> 替代扣子 Web SDK 的自建方案，从根上解决串聊问题

## 架构概览

```
┌─────────────┐     ┌──────────────────────┐     ┌──────────────┐
│  浏览器前端  │────▶│ Cloudflare Pages     │────▶│  扣子 Open   │
│ EternalChat │     │ Function (/api/chat) │     │  API v2      │
│  (Astro)    │◀────│  流式转发 + 鉴权     │◀────│  (Bot)       │
└─────────────┘     └──────────────────────┘     └──────────────┘
      │                       │
      └── localStorage        └── 环境变量存密钥
          (会话隔离)              (PAT / Bot ID)
```

## 文件清单

| 文件 | 说明 |
|------|------|
| `src/components/EternalChat.astro` | 前端聊天组件（悬浮按钮 + 对话窗口） |
| `functions/api/chat.js` | Cloudflare Pages Function，转发扣子 API |
| `API_CHAT_DEPLOY.md` | 本文档 |

## 环境变量配置

在 Cloudflare Pages 后台或 `.dev.vars` 文件中配置以下环境变量：

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `COZE_PAT` | 扣子 Personal Access Token | ✅ |
| `COZE_BOT_ID` | 扣子 Bot ID（当前值：`7677859860893040694`） | ✅ |

### 本地开发环境

在项目根目录创建 `.dev.vars` 文件：

```
COZE_PAT=pat_你的扣子个人访问令牌
COZE_BOT_ID=7677859860893040694
```

> ⚠️ `.dev.vars` 不要提交到 Git，请确保已加入 `.gitignore`。

### 生产环境（Cloudflare Pages）

1. 进入 Cloudflare Dashboard → Pages → 你的项目
2. 点击 **Settings** → **Environment variables**
3. 添加以下变量（Production 环境）：
   - `COZE_PAT` = 你的扣子 PAT
   - `COZE_BOT_ID` = `7677859860893040694`
4. 点击 **Save**，重新部署生效

## 获取扣子 PAT 和 Bot ID

### PAT（Personal Access Token）

1. 登录 [扣子平台](https://www.coze.cn/)
2. 进入「个人中心」→「API」→「个人访问令牌」
3. 点击「添加新令牌」，勾选必要的权限（至少需要 `Bot` 相关读写权限）
4. 复制生成的令牌（只显示一次）

### Bot ID

1. 进入你的 Bot 页面
2. URL 中 `bot/` 后面的数字就是 Bot ID
3. 当前使用：`7677859860893040694`

## 本地测试

### 前置条件

- Node.js 18+
- 已安装项目依赖：`npm install`

### 启动本地开发服务器

```bash
# 注意：Pages Function 需要用 wrangler 或 npx wrangler pages dev 才能测试
# 普通 astro dev 无法运行 Functions

npx wrangler pages dev dist --d1 DATABASE --env production
```

或者更简单的方式——先构建再用 wrangler 预览：

```bash
# 构建
npm run build

# 本地预览（带 Functions）
npx wrangler pages dev ./dist
```

> 访问 http://localhost:8788 查看效果

### 测试 API 接口

```bash
curl -N -X POST http://localhost:8788/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "你好",
    "user_id": "test-user-001",
    "conversation_id": "test-conv-001"
  }'
```

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐）

1. 将代码推送到 GitHub 仓库
2. Cloudflare Pages → **Create a project** → **Connect to Git**
3. 选择仓库，配置构建命令：

   ```
   Build command: npm run build
   Build output directory: dist
   ```

4. 在 **Environment variables** 中添加 `COZE_PAT` 和 `COZE_BOT_ID`
5. 点击 **Save and Deploy**

### 方式二：CLI 直接部署

```bash
# 安装 wrangler（如未安装）
npm install -g wrangler

# 登录
wrangler login

# 构建
npm run build

# 部署
npx wrangler pages deploy ./dist --project-name=eternalcnc-website
```

## 集成到网站

组件已经创建好，只需在布局文件中引入即可（默认未启用，确认后再加）：

```astro
---
// 在 src/layouts/BaseLayout.astro 底部（</body>之前）添加
import EternalChat from '../components/EternalChat.astro';
---

  <EternalChat />
</body>
```

## 安全设计

### 1. PAT 保护

- PAT 只在服务端环境变量中存储，前端代码拿不到
- 前端通过 `/api/chat` 间接调用，不直接接触扣子 API

### 2. 频率限制

- 同 IP 每分钟最多 30 条消息
- 内存级限流（单 Worker 实例），对低流量站足够

### 3. 域名白名单

- 只允许来自 `eternalcnc.com` 和 `eternalcnc-website.pages.dev` 的请求
- 本地 `localhost` 也允许（方便开发）

### 4. 会话隔离

- 每个访客生成独立 `user_id`（存 localStorage，key: `eternal_chat_user_id`）
- 每个会话有独立 `conversation_id`（key: `eternal_chat_conversation_id`）
- 从根本上解决 SDK 串聊问题

## 常见问题排查

### Q: 聊天窗口打开后没有反应/发送失败

**A:** 检查以下几点：

1. 打开浏览器 DevTools → Console，看是否有报错
2. DevTools → Network，看 `/api/chat` 请求是否成功
3. 检查环境变量 `COZE_PAT` 和 `COZE_BOT_ID` 是否已配置
4. PAT 是否过期（扣子 PAT 有有效期）

### Q: 流式输出不生效，整段一起出来

**A:**

1. 确认 Cloudflare Pages Function 正确部署（路径应为 `functions/api/chat.js`）
2. 检查响应头 `Content-Type` 是否为 `text/event-stream`
3. 确认扣子 Bot 支持流式输出

### Q: 刷新页面聊天记录没了

**A:** 这是设计预期。会话历史存在浏览器 localStorage，换浏览器/清缓存就会消失。
如果需要持久化历史消息，需要接入后端数据库（后续扩展）。

### Q: 不同设备/浏览器是同一个会话吗

**A:** 不是。每个浏览器独立生成 `user_id`，相互隔离。这是为了保护隐私和确保会话安全。

### Q: CORS 报错 / 跨域问题

**A:** 确保前端域名在 `functions/api/chat.js` 的 `ALLOWED_ORIGINS` 白名单中。
如果新增了域名，需要在数组中添加并重新部署。

### Q: 扣子 API 返回错误码

常见错误码：

| 错误码 | 原因 | 解决方法 |
|--------|------|----------|
| 401 | PAT 无效/过期 | 重新生成 PAT |
| 403 | 权限不足 | 确保 PAT 有 Bot 相关权限 |
| 429 | 频率超限 | 稍后重试，或检查 Bot 配额 |
| 500 | 服务端错误 | 稍后重试，或联系扣子客服 |

## 后续扩展方向

- **第二层**：接入知识库 RAG，让客服回答更精准
- **第三层**：接入工单系统，无人值守时自动创建工单
- 会话历史持久化（Cloudflare KV / D1）
- 多语言支持扩展
- 图片/文件上传支持
- 客服转人工功能

---

**技术支持**：如遇部署问题，请参考 [Cloudflare Pages Functions 官方文档](https://developers.cloudflare.com/pages/functions/)
