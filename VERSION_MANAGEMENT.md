# 📦 Gerenciamento de Versões - Minha Prefeitura

Este documento explica como funciona o sistema de gerenciamento de versões do projeto.

## 🔄 Sincronização de Versões

O projeto mantém as versões sincronizadas entre dois arquivos principais:

- **`package.json`**: Versão do projeto Node.js
- **`app.json`**: Versão do app Expo/React Native

### **Estrutura de Versão**

```
MAJOR.MINOR.PATCH
  1  .  0  .  6
```

- **MAJOR**: Mudanças incompatíveis com versões anteriores
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs compatíveis

## 🛠️ Scripts de Versão

### **Sincronizar Versões**

```bash
# Sincronizar versões entre package.json e app.json
node scripts/sync-version.js sync
```

### **Atualizar Versão**

```bash
# Incrementar patch (1.0.6 → 1.0.7)
node scripts/sync-version.js patch

# Incrementar minor (1.0.6 → 1.1.0)
node scripts/sync-version.js minor

# Incrementar major (1.0.6 → 2.0.0)
node scripts/sync-version.js major
```

## 📱 Informações Dinâmicas no App

O app busca automaticamente as informações de versão das configurações:

### **Hook `useAppInfo`**

```typescript
import { useAppInfo } from '@/hooks/useAppInfo';

const appInfo = useAppInfo();
// {
//   name: "Minha Cidade",
//   version: "1.0.6",
//   buildNumber: "1",
//   bundleIdentifier: "com.minhaprefeitura.app"
// }
```

### **Informações Disponíveis**

- **`name`**: Nome do app (do `app.json`)
- **`version`**: Versão do app (do `app.json`)
- **`buildNumber`**: Número do build (Android: `versionCode`, iOS: `buildNumber`)
- **`bundleIdentifier`**: Identificador do pacote

## 🚀 Deploy Automático

### **Fluxo de Versão no Deploy**

1. **Sincronização**: Versões são sincronizadas automaticamente
2. **Atualização**: Para produção, versão é incrementada
3. **Build**: App é construído com nova versão
4. **Deploy**: App é enviado para as lojas

### **Comandos de Deploy**

```bash
# Deploy para Internal Testing (versão atual)
.\scripts\deploy.ps1 android development

# Deploy para Production (incrementa versão)
.\scripts\deploy.ps1 android production

# Deploy com incremento específico
.\scripts\deploy.ps1 android production minor
```

## 📋 Tela "Sobre o App"

A tela "Sobre o App" exibe automaticamente:

- ✅ **Nome do app** (dinâmico do `app.json`)
- ✅ **Versão** (dinâmica do `app.json`)
- ✅ **Número do build** (quando disponível)
- ✅ **Informações do desenvolvedor**

### **Exemplo de Exibição**

```
Minha Cidade
Versão 1.0.6 (1)
```

## ⚠️ Importante

### **Sincronização Manual**

Se as versões ficarem dessincronizadas:

```bash
# Verificar versões atuais
node scripts/sync-version.js sync

# Forçar sincronização
node scripts/sync-version.js sync
```

### **Atualização Manual**

Para atualizar versão manualmente:

```bash
# Atualizar apenas package.json
npm version patch

# Sincronizar com app.json
node scripts/sync-version.js sync
```

## 🔍 Troubleshooting

### **Versões Dessincronizadas**

1. Execute: `node scripts/sync-version.js sync`
2. Verifique se os arquivos foram atualizados
3. Faça commit das mudanças

### **Erro no Hook useAppInfo**

1. Verifique se `expo-constants` está instalado
2. Verifique se `app.json` está válido
3. Verifique se as configurações estão corretas

### **Versão Não Atualizada no App**

1. Verifique se o build foi feito com a versão correta
2. Verifique se o cache foi limpo
3. Verifique se o app foi reinstalado

## 💡 Dicas

### **Para Desenvolvimento**

- Use versões de patch para correções
- Use versões de minor para novas funcionalidades
- Use versões de major para mudanças significativas

### **Para Produção**

- Sempre teste em Internal Testing primeiro
- Use tags Git para marcar releases
- Mantenha um changelog das mudanças

### **Automação**

- O workflow GitHub Actions sincroniza automaticamente
- O script de deploy gerencia versões automaticamente
- As informações são sempre atualizadas no app
