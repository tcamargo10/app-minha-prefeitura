#!/bin/bash

# Script de Deploy Automatizado - Minha Prefeitura (Bash)
# Uso: ./scripts/deploy.sh [android|ios|all] [development|development-internal|preview|production] [version]

set -e

PLATFORM=${1:-"all"}
PROFILE=${2:-"production"}
VERSION=${3:-"patch"}

echo "🚀 Iniciando deploy do Minha Prefeitura..."
echo "📱 Plataforma: $PLATFORM"
echo "📦 Perfil: $PROFILE"
echo "📋 Versão: $VERSION"

# Explicar o perfil escolhido
case $PROFILE in
    "development")
        echo "ℹ️  Perfil Development: Build para Google Play Internal Testing + EAS"
        ;;
    "development-internal")
        echo "ℹ️  Perfil Development Internal: Build interno apenas para EAS"
        ;;
    "preview")
        echo "ℹ️  Perfil Preview: Build interno para demonstração"
        ;;
    "production")
        echo "ℹ️  Perfil Production: Build para Google Play Production"
        ;;
esac

# Verificar se EAS CLI está instalado
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI não encontrado. Instalando..."
    npm install -g eas-cli
else
    echo "✅ EAS CLI encontrado"
fi

# Verificar se está logado no Expo
if ! eas whoami &> /dev/null; then
    echo "❌ Não está logado no Expo. Faça login primeiro:"
    echo "   eas login"
    exit 1
else
    echo "✅ Logado no Expo"
fi

# Sincronizar versões entre package.json e app.json
echo "🔄 Sincronizando versões..."
node scripts/sync-version.js sync

# Atualizar versão apenas para produção
if [ "$PROFILE" = "production" ]; then
    echo "📝 Atualizando versão..."
    
    # Usar o script de sincronização para atualizar versão
    node scripts/sync-version.js $VERSION
    
    # Obter nova versão
    NEW_VERSION=$(node -p "require('./package.json').version")
    echo "✨ Nova versão: $NEW_VERSION"

    # Criar tag
    echo "🏷️ Criando tag v$NEW_VERSION..."
    git add package.json package-lock.json app.json
    git commit -m "chore: bump version to $NEW_VERSION"
    git tag "v$NEW_VERSION"

    # Push para o repositório
    echo "📤 Fazendo push para o repositório..."
    git push origin main
    git push origin "v$NEW_VERSION"
fi

# Build baseado na plataforma e perfil
echo "🔨 Iniciando build..."
case $PLATFORM in
    "android")
        echo "🤖 Build para Android com perfil $PROFILE..."
        eas build --platform android --profile $PROFILE
        ;;
    "ios")
        echo "🍎 Build para iOS com perfil $PROFILE..."
        eas build --platform ios --profile $PROFILE
        ;;
    "all")
        echo "🌍 Build para todas as plataformas com perfil $PROFILE..."
        eas build --platform all --profile $PROFILE
        ;;
esac

# Submit apenas para perfis que vão para lojas
if [[ "$PROFILE" == "development" || "$PROFILE" == "production" ]]; then
    echo "📤 Iniciando submit para lojas..."
    case $PLATFORM in
        "android")
            echo "🤖 Submit para Google Play..."
            eas submit --platform android --profile $PROFILE
            ;;
        "ios")
            echo "🍎 Submit para App Store..."
            eas submit --platform ios --profile $PROFILE
            ;;
        "all")
            echo "🌍 Submit para todas as lojas..."
            eas submit --platform all --profile $PROFILE
            ;;
    esac
else
    echo "ℹ️  Build concluído. Submit não necessário para perfil $PROFILE"
fi

echo "✅ Deploy concluído com sucesso!"
echo "📊 Acompanhe o progresso em: https://expo.dev"

if [[ "$PROFILE" == "development" || "$PROFILE" == "production" ]]; then
    if [ "$PROFILE" = "development" ]; then
        echo "🔄 O app estará disponível no Google Play Internal Testing em algumas horas."
    else
        echo "🔄 O app estará disponível no Google Play Production em algumas horas."
    fi
else
    echo "📱 Build disponível para download interno."
fi
