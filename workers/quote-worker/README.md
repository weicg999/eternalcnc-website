# EternalCNC RFQ / 图纸接收后端

Cloudflare Worker：接收官网询盘表单（含图纸文件），把表单字段 + 图纸打包发到 `sales@eternalcnc.com`。

## 架构

```
官网(静态 Astro)  --fetch POST /api/quote-->  Cloudflare Worker  --Resend API-->  sales@eternalcnc.com
                                          └-- 大文件(>25MB) --> R2 桶 --> 邮件发签名下载链接
```

- 官网保持 `output: 'static'`，不需要改造成 SSR。
- Worker 独立部署，挂在 `eternalcnc.com/api/quote`（同域 CORS 免配）。

## 文件

- `src/index.js` — Worker 主逻辑：解析 multipart、拆附件/R2、拼邮件、调 Resend。
- `wrangler.toml` — 部署配置（R2 桶绑定 + 变量）。

## 部署步骤

### 1. 安装 wrangler
```bash
npm install -g wrangler
# 或 npx wrangler
```

### 2. 登录 Cloudflare
```bash
wrangler login
```

### 3. 创建 R2 桶（存大文件用）
```bash
wrangler r2 bucket create eternalcnc-rfq
```
如果希望大文件走公开下载链接（而非签名 URL），在 R2 控制台把该桶设为公开访问，
并把公开 Host 配成 secret：`wrangler secret put R2_PUBLIC_BASE --local`（生产去掉 --local）。

### 4. 配置邮件发送（Resend）
1. 注册 https://resend.com，添加并验证域名 `eternalcnc.com`。
2. 创建 API Key。
3. 注入 secret：
   ```bash
   wrangler secret put RESEND_API_KEY
   ```
4. （可选）改发件人/收件人：`wrangler secret put MAIL_FROM` / `SALES_EMAIL`（默认见 wrangler.toml 的 [vars]）。

### 5. 部署
```bash
cd workers/quote-worker
wrangler deploy
```

### 6. 路由配置
在 Cloudflare 控制台 → Workers & Pages → 该 Worker → Triggers → 添加 Custom Domain / Route：
`https://www.eternalcnc.com/api/quote`

（若官网也托管在 Cloudflare Pages，可用 Service Binding 或 Route 共存，不冲突。）

## 本地联调

```bash
# 终端1：Worker 本地
wrangler dev --local --port 8787

# 终端2：Astro 官网
npm run dev   # 默认 4321

# 浏览器开 http://localhost:4321/contact/get-a-quote/
# QuoteForm.astro 检测到 localhost 会自动指向 http://localhost:8787/api/quote
```

本地 Worker 需要同样的 secret：`wrangler secret put RESEND_API_KEY --local`

## 字段约定（前端 ↔ 后端）

| 字段 | 说明 |
|---|---|
| name * | 姓名 |
| email * | 邮箱 |
| company | 公司 |
| country_code / phone | 电话（含区号） |
| partName | 零件名/图号 |
| material | 材料（per-drawing / 6061-T6 / other…） |
| material_detail | 材料补充说明（material=other 时） |
| quantity | 数量区间 |
| tolerance | 公差 |
| notes | 备注 |
| drawings | 图纸文件（可多个，accept .step/.stp/.iges/.igs/.stl/.pdf/.dxf/.dwg） |

## 安全说明

- 纯静态站无服务端文件接收，本 Worker 是唯一的接收端点。
- R2 大文件链接默认 7 天有效签名 URL；不公开桶内容。
- 邮件发送凭据通过 wrangler secret 注入，不进代码仓库。
- 该端点不依赖 Astro 的 `/_image` 优化，与 CVE-2025-55303（静态站不触发）无关。
