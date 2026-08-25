# Deploy EternalCNC Astro site to Cloudflare Pages (direct upload)
# Run from PowerShell in the repo root: .\deploy-pages.ps1

$ErrorActionPreference = "Stop"

Write-Host "==> Building Astro site..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting." -ForegroundColor Red
    exit 1
}

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "npx not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "==> Checking wrangler login status..." -ForegroundColor Cyan
$whoami = npx wrangler whoami 2>&1
if ($LASTEXITCODE -ne 0 -or $whoami -notmatch "email") {
    Write-Host "Not logged in. Launching Cloudflare login..." -ForegroundColor Yellow
    npx wrangler login
}

$projectName = "eternalcnc"
$branch = "main"

Write-Host "==> Deploying dist/ to Cloudflare Pages project '$projectName' (branch: $branch)..." -ForegroundColor Cyan
npx wrangler pages deploy dist --project-name=$projectName --branch=$branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "==> Deployed. Check the dashboard at https://dash.cloudflare.com" -ForegroundColor Green
} else {
    Write-Host "Deploy failed." -ForegroundColor Red
    exit 1
}
