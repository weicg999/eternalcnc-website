# Coze 智能客服 · OAuth（JWT Service App）切换步骤

> 目的：把前端聊天令牌从「账号级 PAT」换成「OAuth 短命令牌」，解决两件事：
> 1. **安全**：令牌短命（默认 1h）、按 Bot 隔离、泄露影响极小；私钥只存 Cloudflare 服务端，绝不进前端源码。
> 2. **顺带修复聊天框闪退**：原 PAT 缺「会话管理」权限导致 SDK 拉历史会话 403、输入框不渲染。OAuth 令牌带 `Connector.botChat` 权限（含会话列表），输入框正常出现。
>
> 代码已改好（`functions/chat-token.js` + `src/components/CozeChat.astro`），本文件只讲「你这边要做的配置」。

---

## 一、在扣子创建 OAuth 应用（JWT / Service 类型）

1. 打开 **https://www.coze.cn/open/oauth/apps**（个人版；企业版对应 coze.cn 控制台）。
2. 新建应用，类型选 **JWT 应用 / Service application**（不是「授权码应用」，后者需要登录跳转，不适合匿名访客聊天）。
3. 创建完成后记录三个值：
   - **应用 ID（client_id / APP_ID）**
   - **私钥（private_key）** —— 一段 PEM，形如：
     ```
     -----BEGIN PRIVATE KEY-----
     MIIE...
     -----END PRIVATE KEY-----
     ```
   - **公钥 ID（public_key_id / KID）** —— 用于 JWT 头 `kid` 字段。
4. 在应用里 **授权本 Bot**：把 `7677859860893040694`（EternalCNC 客服 Bot）加入该 OAuth 应用的「可访问智能体」，并勾选 **对话（chat / botChat）** 权限。

> ⚠️ Bot ID 是 `7677859860893040694`（以 089 结尾），别和别处的 304 结尾混淆。

---

## 二、把三个值填进 Cloudflare Pages 环境变量

进入 **Cloudflare Dashboard → 你的站点 → Pages → eternalcnc-website → Settings → Environment variables**，对 **Production**（和 Preview，如需）新增：

| 变量名 | 值 | 说明 |
|---|---|---|
| `COZE_OAUTH_CLIENT_ID` | 应用 ID | 步骤一拿到的 client_id |
| `COZE_OAUTH_PRIVATE_KEY` | 完整私钥 PEM | **含 `-----BEGIN/END PRIVATE KEY-----` 整段**，换行用 `\n` 或直接在多行框粘贴 |
| `COZE_OAUTH_KID` | 公钥 ID | public_key_id |
| `COZE_BOT_ID` | `7677859860893040694` | 可选；代码已有硬编码回落值 |

保留旧的 `COZE_PAT` 环境变量不要删 —— 它是「OAuth 未配好时的自动回退」，删了也不影响，但留着更稳。

> 私钥格式要求：**PKCS#8**（`-----BEGIN PRIVATE KEY-----`）。Coze 默认给的就是这种。
> 若你拿到的却是 PKCS#1（`-----BEGIN RSA PRIVATE KEY-----`），用一行命令转：
> `openssl rsa -in old.pem -out new.pem` 即可得到 PKCS#8。

保存后会触发一次重新部署（或手动 Deploy）。

---

## 三、验证是否生效

1. 打开线上站 `https://www.eternalcnc.com`，点右下角客服球，确认 **输入框正常出现、不闪退**。
2. 开发者工具 Console 里应能看到 `[CozeGuardrail]` 之类日志，且**没有** `4101 / listConversation` 报错。
3. 直接看令牌接口返回的模式：
   ```
   curl -s "https://www.eternalcnc.com/chat-token?user_id=visitor-test12345678" | head -c 200
   ```
   配好 OAuth 后应返回 `{"token":"...","mode":"oauth"}`；若返回 `"mode":"pat"` 说明 OAuth 变量没配对（回落到旧 PAT，闪退问题仍在）。

---

## 四、故障排查

| 现象 | 可能原因 | 处理 |
|---|---|---|
| `mode` 一直是 `pat` | 三个 OAuth 变量没全填 / 拼写错 | 检查变量名与值，重新部署 |
| 返回 500 `Token not configured` | OAuth 配了但私钥/ID 错，且 PAT 也被删 | 先恢复 `COZE_PAT` 兜底，再核对 OAuth 值 |
| `Coze OAuth token exchange failed (4xx)` | 私钥格式错 / KID 不对 / 应用未授权该 Bot | 确认私钥 PKCS#8、KID 一致、Bot 已授权 |
| 仍闪退（PAT 模式） | 还没切到 OAuth | 完成步骤二、三，确认 `mode:oauth` |
| scope 报错 | Coze 不接受 scope 结构 | 代码已内置「带 scope 失败则降级不带 scope」重试，无需手动处理；如仍失败看 CF 函数日志 |
