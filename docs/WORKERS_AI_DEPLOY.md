# 方案 B 部署说明 — 智能客服「Workers AI 模型兜底 + 博客知识库」

> 日期：2026-10-27
> **状态：✅ 已部署上线**（AI 绑定已配、模型 qwen3-30b 已跑通、production 域名 eternalcnc.com 已验证）
> 一句话：把客服从「扣子平台」迁到 Cloudflare Workers AI（免密钥、CF 网络内调用），并喂入官网 40 篇博客的观点/文化/策略作为知识库。
> 原扣子方案（`API_CHAT_DEPLOY.md`）已停用，本文档取代之。

---

## 一、这次改了什么（4 个文件 + 2 个辅助脚本）

| 文件 | 改动 | 状态 |
|------|------|------|
| `functions/api/system-prompt.js` | 新建：系统提示词（人设 + 硬事实 + 红线 + 开放边界 + 博客引用规则） | 已建 |
| `functions/api/blog-knowledge.js` | 新建：40 篇博客知识库（中英）+ 关键词检索函数 | 已建 |
| `functions/api/chat.js` | 改造：`callCoze` → `callWorkersAI`（`env.AI.run`），保留全部护栏 | 已改 |
| `src/components/FaqChat.astro` | 升级：本地 FAQ 未命中 → 调 `/api/chat` 模型兜底（带多轮历史） | 已改 |
| `scripts/extract-blog-knowledge.mjs` | 辅助：从博客 frontmatter 重新生成知识库（以后博客新增后重跑） | 已建 |
| `scripts/verify-system-prompt.mjs` | 辅助：校验系统提示词 17 项红线/事实完整性 | 已建 |

**护栏原封保留**：禁词检测（CMM/SPC/植入/越界能力）、核心事实反向校验（设备数/年份/ISO/公差/交期）、邮箱露出拦截、NDA 线上签约拦截、客户记忆 KV、高意向未留资企微告警、FAQ 秒答层——这些**一个都没动**。

---

## 二、部署前必做：给 Pages 项目加 AI 绑定（只有这一步需要你操作）

Workers AI 是「免密钥」的——它不靠 API Key，而是靠一个「AI 绑定」。**必须先在 Cloudflare 后台加这个绑定，否则 `/api/chat` 会返回 500。**

操作路径（点哪几个按钮）：

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/)（登录你的账号）
2. 左侧栏点 **Workers & Pages**
3. 找到并点进项目 **`eternalcnc-website`**
4. 顶部切到 **Settings** 标签
5. 左侧找到 **Functions**（在 Build & deployments 下方附近）
6. 在页面里找到 **AI** 这个绑定类别（和 KV / D1 等列在一起）
7. 点 **Add binding**，类型选 **AI**，变量名填 `AI`（区分大小写，就是 `AI` 两个字母）
8. 点 **Save**

> 绑完后变量名必须是 `AI`——代码里读的是 `env.AI`，写错大小写或拼错会一直 500。

**可选：顺手删掉已无用的 `COZE_PAT` 环境变量**（Settings → Environment variables → Production，把 `COZE_PAT`、`COZE_BOT_ID` 删掉）。不删也不影响运行，只是留着无用密钥不干净。

---

## 三、部署

沿用你现有的部署脚本（不用改）：

```powershell
# 在 V7 根目录，PowerShell 里运行
.\deploy-pages.ps1
```

它会：构建 → `npx wrangler pages deploy dist`。

---

## 四、部署后验证（一条命令）

```bash
curl -N -X POST https://eternalcnc.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"你们怎么看人工智能对加工厂的影响？","user_id":"test-1","visitor_info":{"language":"zh-CN"}}'
```

预期：返回 SSE 流（`data: {...}`），内容是一段结合博客观点的中文回答。

再测一条英文：

```bash
curl -N -X POST https://eternalcnc.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What materials can you machine?","user_id":"test-2","visitor_info":{"language":"en"}}'
```

预期：英文回复材料清单（这条会被 FAQ 秒答层拦截，不走模型，瞬间返回）。

---

## 五、开放边界（已固化进系统提示词，模型会遵守）

- ✅ **开放「咨询」**：通用 CNC 工程知识、公司能力内技术解释、公司的观点/文化/策略、行业趋势。
- ❌ **封闭「承诺」**：具体价格、具体交期、订单/合同/付款、图纸评审结论、军民两用 —— 一律转 `sales@eternalcnc.com` 人工。

---

## 六、模型选择（已上线：qwen3-30b）

默认 `@cf/qwen/qwen3-30b-a3b-fp8`（阿里通义千问，中英双语母语级、Free 可用、快）。

> ⚠️ 教训记录：原 `@cf/meta/llama-3.1-8b-instruct` 已于 2026-05-30 弃用；llama 系列中文指令遵循弱（中文问题会只回自我介绍）；glm-5.3-flash 需付费版。经实测 qwen3-30b 是当前 Free 版中英文兼顾的最优解。

想换模型，在 Cloudflare 环境变量加一条 `AI_MODEL`，值填（需先在 Workers AI 目录确认 Free 可用）：

| 模型 | 特点 |
|------|------|
| `@cf/qwen/qwen3-30b-a3b-fp8`（默认） | 中英双语强、Free 可用、快 |
| `@cf/zai-org/glm-5.3-flash` | 中文母语级，**需付费版** |
| `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` | 推理强，**需付费版**且会输出思考过程 |

---

## 七、回滚方案

如果模型兜底出问题，最快回滚：把 `src/components/FaqChat.astro` 里的 `askModel(text)` 改回 `pushCard(t('noMatchTitle'), t('noMatch'))`（即方案 A 纯静态），重新部署。chat.js 后端不动也不会影响（前端不调它）。

---

## 八、以后博客新增/修改后，如何更新知识库

```bash
cd F:\V7
node scripts/extract-blog-knowledge.mjs
```

会重新扫描 `src/content/zhBlog` + `src/content/blog` 的 frontmatter，重新生成 `functions/api/blog-knowledge.js`。然后重新部署。

> 注意：知识库只收 frontmatter 的 title/description/category/tags（即作者写的摘要和关键词），正文不全文收录——这样检索快、上下文小、且不会把整篇长文塞爆模型窗口。
