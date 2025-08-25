# 📱 Perfis de Build - Minha Prefeitura

Este documento explica os diferentes perfis de build disponíveis e quando usar cada um.

## 🔧 Perfis Disponíveis

### 1. **development**

- **Propósito**: Build para desenvolvimento que vai para Google Play Internal Testing + EAS
- **Distribuição**: Google Play Console (track "internal") + EAS
- **Build Type**: App Bundle
- **Uso**: Testes com usuários internos no Google Play + desenvolvimento

```bash
# Build e submit para Google Play Internal Testing
eas build --platform android --profile development
eas submit --platform android --profile development

# Com script
.\scripts\deploy.ps1 android development
```

### 2. **development-internal**

- **Propósito**: Build interno apenas para EAS (não vai para lojas)
- **Distribuição**: Apenas EAS
- **Build Type**: APK
- **Uso**: Testes internos rápidos, desenvolvimento local

```bash
# Build para desenvolvimento interno
eas build --platform android --profile development-internal

# Com script
.\scripts\deploy.ps1 android development-internal
```

### 3. **preview**

- **Propósito**: Build para demonstração e testes
- **Distribuição**: Apenas EAS (não vai para lojas)
- **Build Type**: APK
- **Uso**: Demonstrações, testes de funcionalidades

```bash
# Build para preview
eas build --platform android --profile preview

# Com script
.\scripts\deploy.ps1 android preview
```

### 4. **production**

- **Propósito**: Build para Google Play Production
- **Distribuição**: Google Play Console (track "production")
- **Build Type**: App Bundle
- **Uso**: Lançamento oficial na loja

```bash
# Build e submit para produção
eas build --platform android --profile production
eas submit --platform android --profile production

# Com script
.\scripts\deploy.ps1 android production
```

## 🚀 Comandos Rápidos

### Para Desenvolvimento (Google Play Internal Testing + EAS)

```bash
eas build --platform android --profile development
eas submit --platform android --profile development
```

### Para Desenvolvimento Interno (apenas EAS)

```bash
eas build --platform android --profile development-internal
```

### Para Google Play Production

```bash
eas build --platform android --profile production
eas submit --platform android --profile production
```

## 📋 Fluxo Recomendado

1. **Desenvolvimento Rápido**: Use `development-internal` para testes internos
2. **Testes Externos**: Use `development` para Google Play Internal Testing
3. **Lançamento**: Use `production` para Google Play Production

## ⚠️ Problemas Comuns

### Build não vai para Google Play

- **Causa**: Usando perfil `development-internal` ou `preview`
- **Solução**: Use `development` ou `production`

### Erro no Submit

- **Verificar**: Arquivo `config/google-service-account.json` existe
- **Verificar**: Configuração do Google Play Console
- **Verificar**: Permissões da service account

### Build Falha

- **Verificar**: Variáveis de ambiente no `eas.json`
- **Verificar**: Configuração do `app.json`
- **Verificar**: Dependências no `package.json`

## 🔍 Monitoramento

- **Builds**: https://expo.dev
- **Google Play Console**: https://play.google.com/console
- **Logs**: Use `eas build:list` para ver histórico

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs em https://expo.dev
2. Consulte a documentação do EAS
3. Verifique a configuração do Google Play Console
