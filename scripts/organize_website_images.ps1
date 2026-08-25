# Website Image Organizer
# Source: E:\鑫永恒网站资料\图片
# Target: E:\鑫永恒网站资料\图片\已整理网站素材

$SRC = "E:\鑫永恒网站资料\图片"
$DST = "E:\鑫永恒网站资料\图片\已整理网站素材"

# Remove existing target to avoid duplicates (keep 产品素材 organized folder untouched)
if (Test-Path $DST) {
    Remove-Item -Path "$DST\*" -Recurse -Force
} else {
    New-Item -ItemType Directory -Path $DST -Force | Out-Null
}

# Create folder structure
$folders = @(
    "01_可直接使用\company",
    "01_可直接使用\equipment\machines",
    "01_可直接使用\equipment\nameplates",
    "01_可直接使用\products\aluminum",
    "01_可直接使用\products\plastic",
    "01_可直接使用\products\general",
    "01_可直接使用\quality",
    "01_可直接使用\process",
    "01_可直接使用\videos",
    "02_需修改后使用",
    "03_不推荐使用"
)
foreach ($f in $folders) {
    New-Item -ItemType Directory -Path (Join-Path $DST $f) -Force | Out-Null
}

$report = @()
$counters = @{
    company = 0
    equipment_machines = 0
    equipment_nameplates = 0
    products_aluminum = 0
    products_plastic = 0
    products_general = 0
    quality = 0
    process = 0
    videos = 0
    edit = 0
    discard = 0
}

function Next-Name($base, $ext, [ref]$counter) {
    $counter.Value++
    $n = $counter.Value
    return "{0}-{1:D2}{2}" -f $base, $n, $ext
}

function Copy-WithReport($srcPath, $dstPath, $category) {
    Copy-Item -Path $srcPath -Destination $dstPath -Force
    $size = (Get-Item $srcPath).Length
    $report += [PSCustomObject]@{
        Category = $category
        Source = $srcPath
        Destination = $dstPath
        SizeBytes = $size
    }
    return $report
}

# ===================================================================
# 1. 设备图片配对 -> equipment (ready-to-use)
# ===================================================================
$eqDir = Join-Path $SRC "设备图片配对"
if (Test-Path $eqDir) {
    Get-ChildItem -Path $eqDir -File | Sort-Object Name | ForEach-Object {
        $name = $_.Name
        # Extract brand-model and sequence
        if ($name -match "^(?<base>[A-Za-z0-9\-]+?)\-(?<seq>\d+)\.jpg$") {
            $base = $matches['base'].ToLower() -replace "^cato", "cato-gang"
            $seq = $matches['seq']
            $newName = "{0}-{1}.jpg" -f $base, $seq
            $sub = "machines"
        } elseif ($name -match "铭牌") {
            $newName = ($name -replace "铭牌", "nameplate" -replace "\.jpg$", ".jpg").ToLower()
            $sub = "nameplates"
        } else {
            $newName = $name.ToLower()
            $sub = "machines"
        }
        # Clean up new name
        $newName = $newName -replace "铭牌", "nameplate"
        $dstPath = Join-Path $DST "01_可直接使用\equipment\$sub" $newName
        $report = Copy-WithReport $_.FullName $dstPath "equipment"
    }
}

# ===================================================================
# 2. 公司真实图片 -> company (ready-to-use, rename sequential)
# ===================================================================
$coDir = Join-Path $SRC "公司真实图片"
if (Test-Path $coDir) {
    Get-ChildItem -Path $coDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "company-facility" $ext ([ref]$counters.company)
        $dstPath = Join-Path $DST "01_可直接使用\company" $newName
        $report = Copy-WithReport $_.FullName $dstPath "company"
    }
}

# ===================================================================
# 3. 图片/公司外观 -> company
# ===================================================================
$extDir = Join-Path $SRC "图片\公司外观"
if (Test-Path $extDir) {
    Get-ChildItem -Path $extDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "company-exterior" $ext ([ref]$counters.company)
        $dstPath = Join-Path $DST "01_可直接使用\company" $newName
        $report = Copy-WithReport $_.FullName $dstPath "company"
    }
}

# ===================================================================
# 4. 图片/工厂机器排列 -> company/facility
# ===================================================================
$arrDir = Join-Path $SRC "图片\工厂机器排列"
if (Test-Path $arrDir) {
    Get-ChildItem -Path $arrDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "factory-machine-lineup" $ext ([ref]$counters.company)
        $dstPath = Join-Path $DST "01_可直接使用\company" $newName
        $report = Copy-WithReport $_.FullName $dstPath "company"
    }
}

# ===================================================================
# 5. 图片/单机特写 -> equipment
# ===================================================================
$singleDir = Join-Path $SRC "图片\单机特写"
if (Test-Path $singleDir) {
    Get-ChildItem -Path $singleDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "cnc-machine-closeup" $ext ([ref]$counters.equipment_machines)
        $dstPath = Join-Path $DST "01_可直接使用\equipment\machines" $newName
        $report = Copy-WithReport $_.FullName $dstPath "equipment"
    }
}

# ===================================================================
# 6. 图片/新五轴 -> equipment
# ===================================================================
$axisDir = Join-Path $SRC "图片\新五轴"
if (Test-Path $axisDir) {
    Get-ChildItem -Path $axisDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "cnc-5axis-machine" $ext ([ref]$counters.equipment_machines)
        $dstPath = Join-Path $DST "01_可直接使用\equipment\machines" $newName
        $report = Copy-WithReport $_.FullName $dstPath "equipment"
    }
}

# ===================================================================
# 7. 图片/质检机 -> quality
# ===================================================================
$qaDir = Join-Path $SRC "图片\质检机"
if (Test-Path $qaDir) {
    Get-ChildItem -Path $qaDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "quality-inspection-machine" $ext ([ref]$counters.quality)
        $dstPath = Join-Path $DST "01_可直接使用\quality" $newName
        $report = Copy-WithReport $_.FullName $dstPath "quality"
    }
}

# ===================================================================
# 8. 铝件产品 -> products/aluminum
# ===================================================================
$alDir = Join-Path $SRC "铝件产品"
if (Test-Path $alDir) {
    Get-ChildItem -Path $alDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "cnc-aluminum-part" $ext ([ref]$counters.products_aluminum)
        $dstPath = Join-Path $DST "01_可直接使用\products\aluminum" $newName
        $report = Copy-WithReport $_.FullName $dstPath "products_aluminum"
    }
}

# ===================================================================
# 9. 塑料产品 -> products/plastic
# ===================================================================
$plDir = Join-Path $SRC "塑料产品"
if (Test-Path $plDir) {
    Get-ChildItem -Path $plDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "cnc-plastic-part" $ext ([ref]$counters.products_plastic)
        $dstPath = Join-Path $DST "01_可直接使用\products\plastic" $newName
        $report = Copy-WithReport $_.FullName $dstPath "products_plastic"
    }
}

# ===================================================================
# 10. 图片/产品 -> products/general
# ===================================================================
$prodDir = Join-Path $SRC "图片\产品"
if (Test-Path $prodDir) {
    Get-ChildItem -Path $prodDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "precision-machined-part" $ext ([ref]$counters.products_general)
        $dstPath = Join-Path $DST "01_可直接使用\products\general" $newName
        $report = Copy-WithReport $_.FullName $dstPath "products_general"
    }
}

# ===================================================================
# 11. 零部件图片 -> products/general (need editing due WeChat names)
# ===================================================================
$partDir = Join-Path $SRC "零部件图片"
if (Test-Path $partDir) {
    Get-ChildItem -Path $partDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = Next-Name "cnc-machined-component" $ext ([ref]$counters.edit)
        $dstPath = Join-Path $DST "02_需修改后使用" $newName
        $report = Copy-WithReport $_.FullName $dstPath "edit"
    }
}

# ===================================================================
# 12. 三坐标 -> 03 not recommended (web downloaded images)
# ===================================================================
$cmmDir = Join-Path $SRC "三坐标"
if (Test-Path $cmmDir) {
    Get-ChildItem -Path $cmmDir -File | Sort-Object Name | ForEach-Object {
        $newName = $_.Name
        $dstPath = Join-Path $DST "03_不推荐使用" $newName
        $report = Copy-WithReport $_.FullName $dstPath "discard"
    }
}

# ===================================================================
# 13. 五轴视频 -> videos (ready but needs compression)
# ===================================================================
$vidDir = Join-Path $SRC "五轴视频"
if (Test-Path $vidDir) {
    Get-ChildItem -Path $vidDir -File | Sort-Object Name | ForEach-Object {
        $ext = $_.Extension.ToLower()
        $newName = "cnc-5axis-machining-demo{0}" -f $ext
        $dstPath = Join-Path $DST "01_可直接使用\videos" $newName
        $report = Copy-WithReport $_.FullName $dstPath "videos"
    }
}

# ===================================================================
# 14. 真实没修改过的图片 -> split by content
# ===================================================================
$realDir = Join-Path $SRC "真实没修改过的图片"
if (Test-Path $realDir) {
    Get-ChildItem -Path $realDir -File | Sort-Object Name | ForEach-Object {
        $name = $_.Name.ToLower()
        $ext = $_.Extension.ToLower()
        if ($name -match "\.(mp4|mov|avi)$") {
            $newName = "factory-tour-video{0}" -f $ext
            $dstPath = Join-Path $DST "01_可直接使用\videos" $newName
            $report = Copy-WithReport $_.FullName $dstPath "videos"
        } elseif ($name -match "dmu400|sunrise|wh-540|lu400") {
            # equipment related
            $base = ($name -replace "\.jpg$|\.png$", "") -replace "^.*(dmu400|sunrise|wh-540|lu400).*$", '$1'
            $newName = "equipment-{0}{1}" -f $base, $ext
            $dstPath = Join-Path $DST "01_可直接使用\equipment\machines" $newName
            $report = Copy-WithReport $_.FullName $dstPath "equipment"
        } else {
            # company/facility default
            $newName = Next-Name "company-real" $ext ([ref]$counters.company)
            $dstPath = Join-Path $DST "01_可直接使用\company" $newName
            $report = Copy-WithReport $_.FullName $dstPath "company"
        }
    }
}

# ===================================================================
# Summary output
# ===================================================================
Write-Output "=== Organization Complete ==="
Write-Output "Total files processed: $($report.Count)"
Write-Output ""
Write-Output "By category:"
$report | Group-Object Category | Sort-Object Name | ForEach-Object {
    $size = ($_.Group | Measure-Object -Property SizeBytes -Sum).Sum
    Write-Output "  $($_.Name): $($_.Count) files ($([math]::Round($size/1MB,2)) MB)"
}

# Save report
$reportPath = Join-Path $DST "_organization_report.csv"
$report | Export-Csv -Path $reportPath -NoTypeInformation -Encoding UTF8
Write-Output ""
Write-Output "Report saved to: $reportPath"
