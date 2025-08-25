# Script de Deploy Automatizado - Minha Prefeitura (PowerShell)
# Uso: .\scripts\deploy.ps1 [android|ios|all] [development|development-internal|preview|production] [version]

param(
    [Parameter(Position=0)]
    [ValidateSet("android", "ios", "all")]
    [string]$Platform = "all",
    
    [Parameter(Position=1)]
    [ValidateSet("development", "development-internal", "preview", "production")]
    [string]$Profile = "production",
    
    [Parameter(Position=2)]
    [ValidateSet("patch", "minor", "major")]
    [string]$Version = "patch"
)

Write-Host "🚀 Iniciando deploy do Minha Prefeitura..." -ForegroundColor Green
Write-Host "📱 Plataforma: $Platform" -ForegroundColor Cyan
Write-Host "📦 Perfil: $Profile" -ForegroundColor Cyan
Write-Host "📋 Versão: $Version" -ForegroundColor Cyan

# Explicar o perfil escolhido
switch ($Profile) {
    "development" {
        Write-Host "ℹ️  Perfil Development: Build para Google Play Internal Testing + EAS" -ForegroundColor Yellow
    }
    "development-internal" {
        Write-Host "ℹ️  Perfil Development Internal: Build interno apenas para EAS" -ForegroundColor Yellow
    }
    "preview" {
        Write-Host "ℹ️  Perfil Preview: Build interno para demonstração" -ForegroundColor Yellow
    }
    "production" {
        Write-Host "ℹ️  Perfil Production: Build para Google Play Production" -ForegroundColor Green
    }
}

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

# Atualizar versão apenas para produção
if ($Profile -eq "production") {
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
}

# Build baseado na plataforma e perfil
Write-Host "🔨 Iniciando build..." -ForegroundColor Cyan
switch ($Platform) {
    "android" {
        Write-Host "🤖 Build para Android com perfil $Profile..." -ForegroundColor Cyan
        eas build --platform android --profile $Profile
    }
    "ios" {
        Write-Host "🍎 Build para iOS com perfil $Profile..." -ForegroundColor Cyan
        eas build --platform ios --profile $Profile
    }
    "all" {
        Write-Host "🌍 Build para todas as plataformas com perfil $Profile..." -ForegroundColor Cyan
        eas build --platform all --profile $Profile
    }
}

# Submit apenas para perfis que vão para lojas
if ($Profile -in @("development", "production")) {
    Write-Host "📤 Iniciando submit para lojas..." -ForegroundColor Cyan
    switch ($Platform) {
        "android" {
            Write-Host "🤖 Submit para Google Play..." -ForegroundColor Cyan
            eas submit --platform android --profile $Profile
        }
        "ios" {
            Write-Host "🍎 Submit para App Store..." -ForegroundColor Cyan
            eas submit --platform ios --profile $Profile
        }
        "all" {
            Write-Host "🌍 Submit para todas as lojas..." -ForegroundColor Cyan
            eas submit --platform all --profile $Profile
        }
    }
} else {
    Write-Host "ℹ️  Build concluído. Submit não necessário para perfil $Profile" -ForegroundColor Yellow
}

Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "📊 Acompanhe o progresso em: https://expo.dev" -ForegroundColor Cyan

if ($Profile -in @("development", "production")) {
    if ($Profile -eq "development") {
        Write-Host "🔄 O app estará disponível no Google Play Internal Testing em algumas horas." -ForegroundColor Yellow
    } else {
        Write-Host "🔄 O app estará disponível no Google Play Production em algumas horas." -ForegroundColor Yellow
    }
} else {
    Write-Host "📱 Build disponível para download interno." -ForegroundColor Yellow
}
