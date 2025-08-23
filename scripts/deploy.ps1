# Script de Deploy Automatizado - Minha Prefeitura (PowerShell)
# Uso: .\scripts\deploy.ps1 [android|ios|all] [version]

param(
    [Parameter(Position=0)]
    [ValidateSet("android", "ios", "all")]
    [string]$Platform = "all",
    
    [Parameter(Position=1)]
    [ValidateSet("patch", "minor", "major")]
    [string]$Version = "patch"
)

Write-Host "🚀 Iniciando deploy do Minha Prefeitura..." -ForegroundColor Green
Write-Host "📱 Plataforma: $Platform" -ForegroundColor Cyan
Write-Host "📦 Versão: $Version" -ForegroundColor Cyan

# Verificar se EAS CLI está instalado
try {
    $null = Get-Command eas -ErrorAction Stop
    Write-Host "✅ EAS CLI encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ EAS CLI não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g @expo/eas-cli
}

# Verificar se está logado no Expo
try {
    $null = eas whoami 2>$null
    Write-Host "✅ Logado no Expo" -ForegroundColor Green
} catch {
    Write-Host "❌ Não está logado no Expo. Faça login primeiro:" -ForegroundColor Red
    Write-Host "   eas login" -ForegroundColor Yellow
    exit 1
}

# Atualizar versão
Write-Host "📝 Atualizando versão..." -ForegroundColor Yellow
npm version $Version --no-git-tag-version

# Obter nova versão
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$newVersion = $packageJson.version
Write-Host "✨ Nova versão: $newVersion" -ForegroundColor Green

# Criar tag
Write-Host "🏷️ Criando tag v$newVersion..." -ForegroundColor Yellow
git add package.json package-lock.json
git commit -m "chore: bump version to $newVersion"
git tag "v$newVersion"

# Push para o repositório
Write-Host "📤 Fazendo push para o repositório..." -ForegroundColor Yellow
git push origin main
git push origin "v$newVersion"

# Build e deploy baseado na plataforma
switch ($Platform) {
    "android" {
        Write-Host "🤖 Build e deploy para Android..." -ForegroundColor Cyan
        eas build --platform android --profile production
        eas submit --platform android
    }
    "ios" {
        Write-Host "🍎 Build e deploy para iOS..." -ForegroundColor Cyan
        eas build --platform ios --profile production
        eas submit --platform ios
    }
    "all" {
        Write-Host "🌍 Build e deploy para todas as plataformas..." -ForegroundColor Cyan
        eas build --platform all --profile production
        eas submit --platform all
    }
}

Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "📊 Acompanhe o progresso em: https://expo.dev" -ForegroundColor Cyan
Write-Host "🔄 O app estará disponível nas lojas em algumas horas." -ForegroundColor Yellow
