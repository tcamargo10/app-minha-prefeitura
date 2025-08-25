# 🚀 Fluxo de Deploy Automático - Minha Prefeitura

Este documento explica como funciona o deploy automático configurado no GitHub Actions.

## 🔄 Fluxo Automático

### **1. Push na Branch `master`**

- **Trigger**: Qualquer push na branch `master`
- **Verificação**: Compara versão atual com última versão deployada
- **Ação**: Deploy automático para **Google Play Internal Testing** (apenas se versão mudou)
- **Perfil**: `development`
- **Track**: "internal"

```bash
# Exemplo: Push na master
git add .
git commit -m "feat: nova funcionalidade"
git push origin master
```

**Resultado**:

- ✅ **Se versão mudou**: Build automático + Submit para Google Play Internal Testing
- 🚫 **Se versão igual**: Deploy pulado (economia de recursos)

### **2. Tag de Versão (ex: v1.0.1)**

- **Trigger**: Push de uma tag começando com `v`
- **Verificação**: Compara versão atual com última versão deployada
- **Ação**: Deploy automático para **Google Play Production** (apenas se versão mudou)
- **Perfil**: `production`
- **Track**: "production"

```bash
# Exemplo: Criar e push de tag
git tag v1.0.1
git push origin v1.0.1
```

**Resultado**:

- ✅ **Se versão mudou**: Build automático + Submit para Google Play Production
- 🚫 **Se versão igual**: Deploy pulado (economia de recursos)

## 📋 Workflow Jobs

### **Job: `check-version`**

- **Função**: Verifica se a versão do app mudou
- **Compara**: Versão atual (`package.json`) vs última versão deployada (EAS)
- **Output**: `version-changed` (true/false) e `current-version`

### **Job: `deploy-development`**

- **Condição**: Push na `master` + versão mudou
- **Perfil**: `development`
- **Destino**: Google Play Internal Testing

### **Job: `deploy-production`**

- **Condição**: Tag v\* + versão mudou
- **Perfil**: `production`
- **Destino**: Google Play Production

### **Job: `skip-deploy`**

- **Condição**: Versão não mudou
- **Função**: Informa que o deploy foi pulado

## 🛠️ Configuração Necessária

### **Secrets do GitHub**:

- `EXPO_TOKEN`: Token do Expo para autenticação
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Chave da service account do Google Play

### **Arquivos de Configuração**:

- `eas.json`: Configuração dos perfis de build
- `config/google-service-account.json`: Credenciais do Google Play
- `package.json`: Versão do app

## 📊 Monitoramento

### **GitHub Actions**:

- Acompanhe os builds em: https://github.com/[seu-usuario]/app-minha-prefeitura/actions

### **Expo**:

- Logs dos builds em: https://expo.dev

### **Google Play Console**:

- Internal Testing: https://play.google.com/console
- Production: https://play.google.com/console

## 🚀 Comandos Manuais

### **Para Deploy Manual (se necessário)**:

#### **Google Play Internal Testing**:

```bash
eas build --platform android --profile development
eas submit --platform android --profile development
```

#### **Google Play Production**:

```bash
eas build --platform android --profile production
eas submit --platform android --profile production
```

#### **Usando Scripts**:

```bash
# Internal Testing
.\scripts\deploy.ps1 android development

# Production
.\scripts\deploy.ps1 android production
```

## ⚠️ Importante

- **Push na master**: Vai para Internal Testing (apenas se versão mudou)
- **Tag v\***: Vai para Production (apenas se versão mudou)
- **Versão igual**: Deploy é pulado automaticamente
- **Builds manuais**: Use os scripts ou comandos EAS diretos
- **Monitoramento**: Sempre verifique os logs em caso de falha

## 🔍 Troubleshooting

### **Build Falha**:

1. Verifique os logs no GitHub Actions
2. Verifique as variáveis de ambiente
3. Verifique as dependências

### **Submit Falha**:

1. Verifique as credenciais do Google Play
2. Verifique as permissões da service account
3. Verifique a configuração do app no Google Play Console

### **Deploy Pulado**:

1. Verifique se a versão no `package.json` mudou
2. Verifique se o último build no EAS foi bem-sucedido
3. Para forçar deploy, atualize a versão no `package.json`

## 💡 Dicas

### **Para Forçar Deploy (mesmo com versão igual)**:

```bash
# Atualizar versão
npm version patch
git add package.json package-lock.json
git commit -m "chore: bump version"
git push origin master
```

### **Para Verificar Última Versão Deployada**:

```bash
eas build:list --platform=android --limit=1
```
