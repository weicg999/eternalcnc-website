# 客户跟进记忆功能 - 部署说明

> 为智能客服增加客户记忆功能，使用 Cloudflare KV 存储客户档案
> 相关文件：`functions/api/chat.js`

---

## 功能概述

智能客服现在可以记住每个客户的业务信息（公司名、行业、感兴趣的零件、报价状态、联系方式等），客户下次再来咨询时，Bot 会自然地利用已知信息继续对话，而不是每次都从头开始。

**特点：**
- 🧠 跨会话记忆：客户换浏览器/过几天再来，也能"接上话"
- 🔒 隐私友好：只存业务信息摘要，不存完整对话记录
- ⚡ 性能优异：KV 读取 + 异步写入，不阻塞主回复
- 🤖 自然融入：Bot 不会说"我记得您..."，信息自然融入对话

---

## 技术架构

```
┌─────────────┐     ┌────────────────────────┐     ┌──────────────┐
│  浏览器前端  │────▶│ Cloudflare Pages       │────▶│  扣子 Open   │
│ EternalChat │     │ Function (/api/chat)   │     │  API v2      │
│  (Astro)    │◀────│  + KV 记忆 + 质量校验   │◀────│  (Bot)       │
└─────────────┘     └───────────┬────────────┘     └──────────────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │ Cloudflare KV      │
                     │ CUSTOMER_MEMORY    │
                     │ (客户档案存储)     │
                     └────────────────────┘
```

**数据流向：**
1. 客户发消息 → 后端从 KV 读取客户档案 → 拼入 system prompt → 发给 Bot
2. Bot 回复 → 后端检测是否有关键信息 → 异步调用 AI 提取 → 更新 KV 档案

---

## 客户档案结构

每个客户存储一份 JSON 档案（key = `customer:<user_id>`）：

```json
{
  "user_id": "user_xxxxx",
  "company": "",              // 公司名
  "industry": "",             // 行业/产品类型
  "parts_interested": [],     // 感兴趣的零件类型
  "quote_status": "",         // 报价状态: enquired / quoted / follow_up / closed
  "concerns": [],             // 客户关注的重点 (precision, lead time, price...)
  "has_sent_drawing": false,  // 是否发过图纸
  "last_message": "",         // 最后一次对话的摘要
  "last_contact": "2026-08-30", // 最后联系时间
  "first_contact": "2026-08-30", // 首次联系时间
  "language": "en",           // 客户使用的语言
  "contact_email": "",        // 客户邮箱
  "notes": ""                 // 其他重要备注
}
```

**TTL：** 90 天无互动自动过期

---

## 部署步骤

### 第一步：创建 KV Namespace

在 Cloudflare Dashboard 中创建 KV 命名空间：

1. 进入 **Workers & Pages** → **KV**
2. 点击 **Create a namespace**
3. 名称：`customer-memory`（或任意你喜欢的名称）
4. 点击 **Add**

### 第二步：绑定到 Pages 项目

1. 进入 **Pages** → 选择你的项目（eternalcnc-website）
2. 点击 **Settings** → **Functions**
3. 找到 **KV namespaces** 部分
4. 点击 **Add binding**
5. **Variable name**：`CUSTOMER_MEMORY`（必须是这个名字，代码里用的是它）
6. **KV namespace**：选择刚才创建的 `customer-memory`
7. 点击 **Save**

> ⚠️ Variable name 必须是 `CUSTOMER_MEMORY`，这是代码中 `env.CUSTOMER_MEMORY` 引用的名称。

### 第三步：配置 Bot 提示词

参考 [客户记忆 Bot 提示词补充](./customer-memory-bot-prompt.md)，在扣子 Bot 的系统提示词中加入「客户背景信息使用规则」。

### 第四步：部署代码

将修改后的 `functions/api/chat.js` 推送到 GitHub，Cloudflare Pages 会自动部署。

或手动部署：

```bash
# 构建
npm run build

# 部署
npx wrangler pages deploy ./dist --project-name=eternalcnc-website
```

---

## 本地开发测试

### 1. 创建 wrangler.toml 或 .dev.vars

在项目根目录创建 `.dev.vars` 文件（如果还没有）：

```
COZE_PAT=pat_你的扣子个人访问令牌
COZE_BOT_ID=7677859860893040694
```

### 2. 本地测试 KV

使用 wrangler pages dev 时，可以用 `--kv` 参数绑定本地 KV：

```bash
# 先构建
npm run build

# 用 wrangler 本地预览（带 KV）
npx wrangler pages dev ./dist --kv CUSTOMER_MEMORY
```

> 注意：本地开发时 KV 数据存在本地 `.wrangler/state` 目录中，与生产环境隔离。

### 3. 测试 API

```bash
# 第一次对话（无记忆）
curl -N -X POST http://localhost:8788/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hi, I am from ABC Company, we need aluminum housings",
    "user_id": "test-user-001",
    "conversation_id": "test-conv-001",
    "is_first_message": true,
    "visitor_info": { "language": "en" }
  }'

# 第二次对话（应该能"记住"公司名和零件类型）
curl -N -X POST http://localhost:8788/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the lead time for quotation?",
    "user_id": "test-user-001",
    "conversation_id": "test-conv-002"
  }'
```

### 4. 查看 KV 中的档案

```bash
# 列出所有 key
npx wrangler kv key list --binding=CUSTOMER_MEMORY --local

# 查看某个客户档案
npx wrangler kv key get "customer:test-user-001" --binding=CUSTOMER_MEMORY --local
```

---

## 信息提取触发机制

不是每轮对话都触发信息提取（省 token），只在以下关键节点触发：

| 触发条件 | 说明 |
|---------|------|
| 提到公司名且档案中为空 | 提取公司名 |
| 提到邮箱且档案中为空 | 提取联系邮箱 |
| 提到图纸/CAD/STEP 等 | 标记已发图纸 |
| 报价相关对话 | 更新报价状态 |
| 提到行业/应用且档案中为空 | 提取行业信息 |
| 提到零件类型且档案中少于2个 | 追加感兴趣零件 |

每次成功提取后，对应字段被填充，下次就不会重复触发同一类型的提取。

---

## 隐私与合规

- **只存业务信息**：档案中只存客户主动提供的业务信息（公司名、邮箱、零件类型等），不存完整对话记录
- **不存个人身份信息**：除了客户主动留下的邮箱，不存其他 PII
- **自动过期**：90 天无互动自动删除档案
- **用户控制**：客户清浏览器缓存/换设备 = 新的 user_id = 新的档案（不会关联身份）

---

## 监控与维护

### 查看 KV 使用量

Cloudflare Dashboard → Workers & Pages → KV → 选择命名空间 → 查看使用统计。

**免费额度：**
- 1 GB 存储
- 100,000 次读取/天
- 1,000 次写入/天

对中小型 B2B 网站来说，免费额度完全够用。

### 常见问题

**Q: KV 读取失败会怎样？**
A: 代码有降级处理。如果 KV 绑定缺失或读取失败，会正常回复，只是没有记忆功能。

**Q: 提取的信息不准确怎么办？**
A: 以客户最新说法为准。Bot 会自然地使用背景信息，但如果客户纠正，以客户说的为准。同时下一轮对话会重新提取更新。

**Q: 可以手动修改客户档案吗？**
A: 可以。在 Cloudflare Dashboard → KV → 对应命名空间中，可以直接查看和编辑 JSON 档案。

---

## 文件清单

| 文件 | 说明 |
|------|------|
| `functions/api/chat.js` | 主文件，含 KV 读写 + 信息提取 + 异步更新 |
| `docs/customer-memory-deploy.md` | 本文档 |
| `docs/customer-memory-bot-prompt.md` | Bot 提示词补充说明 |
