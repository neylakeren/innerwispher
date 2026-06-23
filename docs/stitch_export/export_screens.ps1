$apiKey = "AQ.Ab8RN6JVGrtvhOuESKs9KW1v4P01U85j_u5mKKvPix05Kk52Qw"
$projectId = "13128467461323083482"
$baseUrl = "https://stitch.googleapis.com/v1"
$headers = @{ "X-Goog-Api-Key" = $apiKey }
$exportDir = "D:\Coding\neyla\docs\stitch_export"

# Get screens list
Write-Host "Fetching screens list..." -ForegroundColor Cyan
$screensResponse = Invoke-RestMethod -Uri "$baseUrl/projects/$projectId/screens" -Headers $headers -Method Get

$screens = $screensResponse.screens
Write-Host "Found $($screens.Count) screens" -ForegroundColor Green

$screenSummary = @()

foreach ($screen in $screens) {
    $id = $screen.id
    $title = $screen.title
    $safeTitle = $title -replace '[\\/:*?"<>|]', '_'
    
    Write-Host "`n--- Screen: $title ---" -ForegroundColor Yellow
    Write-Host "  ID: $id"
    Write-Host "  Type: $($screen.screenType)"
    Write-Host "  Device: $($screen.deviceType)"
    Write-Host "  Size: $($screen.width) x $($screen.height)"
    
    # Download screenshot
    if ($screen.screenshot -and $screen.screenshot.downloadUrl) {
        $screenshotUrl = $screen.screenshot.downloadUrl
        $screenshotPath = "$exportDir\screenshots\${safeTitle}.png"
        Write-Host "  Downloading screenshot..." -ForegroundColor Cyan
        try {
            Invoke-WebRequest -Uri $screenshotUrl -OutFile $screenshotPath -ErrorAction Stop
            Write-Host "  Screenshot saved: $screenshotPath" -ForegroundColor Green
        } catch {
            Write-Host "  Failed to download screenshot: $_" -ForegroundColor Red
        }
    }
    
    # Download HTML code
    if ($screen.htmlCode -and $screen.htmlCode.downloadUrl) {
        $htmlUrl = $screen.htmlCode.downloadUrl
        $htmlPath = "$exportDir\html\${safeTitle}.html"
        Write-Host "  Downloading HTML..." -ForegroundColor Cyan
        try {
            Invoke-WebRequest -Uri $htmlUrl -OutFile $htmlPath -ErrorAction Stop
            Write-Host "  HTML saved: $htmlPath" -ForegroundColor Green
        } catch {
            Write-Host "  Failed to download HTML: $_" -ForegroundColor Red
        }
    }
    
    $screenSummary += [PSCustomObject]@{
        Title = $title
        ID = $id
        Type = $screen.screenType
        Device = $screen.deviceType
        Width = $screen.width
        Height = $screen.height
        HasScreenshot = [bool]($screen.screenshot -and $screen.screenshot.downloadUrl)
        HasHTML = [bool]($screen.htmlCode -and $screen.htmlCode.downloadUrl)
    }
}

Write-Host "`n`n=== EXPORT SUMMARY ===" -ForegroundColor Cyan
$screenSummary | Format-Table -AutoSize

# Save summary as JSON
$screenSummary | ConvertTo-Json -Depth 5 | Out-File "$exportDir\screens_summary.json" -Encoding utf8
Write-Host "Summary saved to $exportDir\screens_summary.json" -ForegroundColor Green
Write-Host "Export complete!" -ForegroundColor Green
