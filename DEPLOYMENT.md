# Guia de Deployment Automatizado - Minha Prefeitura

Este guia explica como fazer o deployment automatizado do app "Minha Prefeitura" para Google Play Store e Apple App Store usando EAS (Expo Application Services).

git add .
git commit -m "Bump version to 1.0.1"
git push origin master

# 3. Tag para produção

git tag v1.0.1
git push origin v1.0.1

## 📋 Pré-requisitos

### 1. Contas Necessárias

- **Expo Account**: [expo.dev](https://expo.dev)
- **Google Play Console**: [play.google.com/console](https://play.google.com/console) ($25 taxa única)
- **Apple Developer Program**: [developer.apple.com](https://developer.apple.com) ($99/ano)

### 2. Ferramentas

- Node.js 16+
- EAS CLI
- Git

## 🚀 Configuração Inicial

### 1. Instalar EAS CLI

```bash
npm install -g eas-cli
```

### 2. Fazer Login no Expo

```bash
eas login
```

### 3. Configurar EAS no Projeto

```bash
eas build:configure
```

### 4. Configurar Variáveis de Ambiente

Criar arquivo `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=sua_url_do_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 📱 Google Play Store

### 1. Configurar EAS para Android

Criar arquivo `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### 2. Configurar Google Play Console

1. **Criar App no Google Play Console**
   - Nome: "Minha Prefeitura"
   - Package: `com.minhaprefeitura.app`
   - Categoria: "Produtividade" ou "Utilitários"

2. **Configurar Service Account**
   - Ir em "Configurações" > "API access"
   - Criar novo service account
   - Baixar arquivo JSON
   - Salvar como `google-service-account.json` na raiz do projeto

3. **Configurar Track de Release**
   - Criar track "production"
   - Configurar política de lançamento gradual

### 3. Build e Deploy Automatizado

#### Build de Produção

```bash
eas build --platform android --profile production
```

#### Submit Automático

```bash
eas submit --platform android
```

### 4. GitHub Actions (Automatização)

Criar arquivo `.github/workflows/deploy-android.yml`:

```yaml
name: Deploy to Google Play

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Install EAS CLI
        run: npm install -g eas-cli

      - name: Setup Expo
        run: |
          echo ${{ secrets.EXPO_TOKEN }} | eas login --non-interactive

      - name: Build Android
        run: eas build --platform android --profile production --non-interactive

      - name: Submit to Google Play
        run: eas submit --platform android --non-interactive
        env:
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
```

## 🍎 Apple App Store

### 1. Configurar EAS para iOS

Atualizar `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "seu-apple-id@email.com",
        "ascAppId": "seu-app-store-connect-app-id",
        "appleTeamId": "seu-team-id"
      }
    }
  }
}
```

### 2. Configurar Apple Developer Program

1. **Criar App no App Store Connect**
   - Nome: "Minha Prefeitura"
   - Bundle ID: `com.minhaprefeitura.app`
   - Categoria: "Utilities" ou "Productivity"

2. **Configurar Certificados**
   - EAS gerencia automaticamente os certificados
   - Não é necessário configurar manualmente

### 3. Build e Deploy Automatizado

#### Build de Produção

```bash
eas build --platform ios --profile production
```

#### Submit Automático

```bash
eas submit --platform ios
```

### 4. GitHub Actions (Automatização)

Criar arquivo `.github/workflows/deploy-ios.yml`:

```yaml
name: Deploy to App Store

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Install EAS CLI
        run: npm install -g eas-cli

      - name: Setup Expo
        run: |
          echo ${{ secrets.EXPO_TOKEN }} | eas login --non-interactive

      - name: Build iOS
        run: eas build --platform ios --profile production --non-interactive

      - name: Submit to App Store
        run: eas submit --platform ios --non-interactive
        env:
          APPLE_ID: ${{ secrets.APPLE_ID }}
          APPLE_APP_SPECIFIC_PASSWORD: ${{ secrets.APPLE_APP_SPECIFIC_PASSWORD }}
```

## 🔄 Workflow de Release

### 1. Versionamento

```bash
# Atualizar versão
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Criar tag
git tag v1.0.0
git push origin v1.0.0
```

### 2. Deploy Manual

```bash
# Build e deploy para ambas as plataformas
eas build --platform all --profile production
eas submit --platform all
```

### 3. Deploy Automatizado

```bash
# Push para main com tag
git tag v1.0.0
git push origin v1.0.0
```

## 🔐 Configuração de Secrets

### GitHub Secrets Necessários

- `EXPO_TOKEN`: Token do Expo (gerado em expo.dev/accounts/[username]/settings/access-tokens)
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Conteúdo do arquivo google-service-account.json
- `APPLE_ID`: Apple ID para App Store Connect
- `APPLE_APP_SPECIFIC_PASSWORD`: Senha específica do app

### Como Configurar

1. Ir em Settings > Secrets and variables > Actions
2. Adicionar cada secret com o valor correspondente

## 📊 Monitoramento

### 1. EAS Dashboard

- [expo.dev](https://expo.dev) > Seu projeto > Builds
- Monitorar builds e deployments

### 2. Google Play Console

- Analytics de downloads
- Crash reports
- User feedback

### 3. App Store Connect

- Analytics de downloads
- Crash reports
- User reviews

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build Falha**

   ```bash
   # Limpar cache
   eas build:clean

   # Rebuild
   eas build --platform android --profile production
   ```

2. **Submit Falha**

   ```bash
   # Verificar logs
   eas submit --platform android --latest
   ```

3. **Certificados Expirados**
   ```bash
   # EAS gerencia automaticamente
   # Se necessário, limpar e rebuild
   eas build:clean
   ```

### Logs e Debug

```bash
# Ver logs do build
eas build:list

# Ver logs específicos
eas build:view [BUILD_ID]
```

## 📝 Checklist de Release

### Antes do Deploy

- [ ] Testar em dispositivo físico
- [ ] Verificar todas as funcionalidades
- [ ] Atualizar changelog
- [ ] Verificar assets (ícones, splash)
- [ ] Testar login/logout
- [ ] Verificar integração com Supabase

### Durante o Deploy

- [ ] Build bem-sucedido
- [ ] Submit bem-sucedido
- [ ] Verificar na loja (pode levar algumas horas)

### Após o Deploy

- [ ] Monitorar crash reports
- [ ] Responder reviews
- [ ] Analisar métricas
- [ ] Planejar próximas atualizações

## 🔄 CI/CD Completo

Para um workflow completo, criar `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: npm test
      - run: npm run lint

  build-preview:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: npm install -g eas-cli
      - run: echo ${{ secrets.EXPO_TOKEN }} | eas login --non-interactive
      - run: eas build --platform all --profile preview --non-interactive

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: npm install -g eas-cli
      - run: echo ${{ secrets.EXPO_TOKEN }} | eas login --non-interactive
      - run: eas build --platform all --profile production --non-interactive
      - run: eas submit --platform all --non-interactive
```

## 📞 Suporte

- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)
- **EAS Docs**: [docs.expo.dev/eas](https://docs.expo.dev/eas)
- **Google Play Console**: [support.google.com/googleplay](https://support.google.com/googleplay)
- **App Store Connect**: [developer.apple.com/app-store-connect](https://developer.apple.com/app-store-connect)

---

**Nota**: Este guia assume que você já tem as contas necessárias configuradas. Para configuração inicial das contas, consulte a documentação oficial de cada plataforma.
