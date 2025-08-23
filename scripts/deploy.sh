#!/bin/bash

# Script de Deploy Automatizado - Minha Prefeitura
# Uso: ./scripts/deploy.sh [android|ios|all] [version]

set -e

PLATFORM=${1:-all}
VERSION=${2:-patch}

echo "🚀 Iniciando deploy do Minha Prefeitura..."
echo "📱 Plataforma: $PLATFORM"
echo "📦 Versão: $VERSION"

# Verificar se EAS CLI está instalado
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI não encontrado. Instalando..."
    npm install -g @expo/eas-cli
fi

# Verificar se está logado no Expo
if ! eas whoami &> /dev/null; then
    echo "❌ Não está logado no Expo. Faça login primeiro:"
    echo "   eas login"
    exit 1
fi

# Atualizar versão
echo "📝 Atualizando versão..."
npm version $VERSION --no-git-tag-version

# Obter nova versão
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✨ Nova versão: $NEW_VERSION"

# Criar tag
echo "🏷️ Criando tag v$NEW_VERSION..."
git add package.json package-lock.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag "v$NEW_VERSION"

# Push para o repositório
echo "📤 Fazendo push para o repositório..."
git push origin main
git push origin "v$NEW_VERSION"

# Build e deploy baseado na plataforma
case $PLATFORM in
    "android")
        echo "🤖 Build e deploy para Android..."
        eas build --platform android --profile production
        eas submit --platform android
        ;;
    "ios")
        echo "🍎 Build e deploy para iOS..."
        eas build --platform ios --profile production
        eas submit --platform ios
        ;;
    "all")
        echo "🌍 Build e deploy para todas as plataformas..."
        eas build --platform all --profile production
        eas submit --platform all
        ;;
    *)
        echo "❌ Plataforma inválida. Use: android, ios ou all"
        exit 1
        ;;
esac

echo "✅ Deploy concluído com sucesso!"
echo "📊 Acompanhe o progresso em: https://expo.dev"
echo "🔄 O app estará disponível nas lojas em algumas horas."
