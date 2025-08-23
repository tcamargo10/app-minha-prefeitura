# Minha Prefeitura

Aplicativo React Native com Expo para gestão de solicitações municipais, desenvolvido com TypeScript, Supabase e React Hook Form.

**Versão:** 1.0.0

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação tipada
- **Supabase** - Backend-as-a-Service (BaaS)
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **React Navigation** - Navegação entre telas

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Supabase

## 🛠️ Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd minha-prefeitura
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   **Opção 1 - Script automático (recomendado):**

   ```bash
   npm run setup-env
   ```

   **Opção 2 - Manual:**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   # Supabase Configuration
   # Obtenha essas credenciais em: https://supabase.com/dashboard/project/[SEU_PROJETO]/settings/api
   EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui

   # App Configuration
   EXPO_PUBLIC_APP_NAME=Minha Prefeitura
   EXPO_PUBLIC_APP_VERSION=1.0.0
   ```

   **⚠️ IMPORTANTE:**
   - Substitua `https://seu-projeto.supabase.co` pela URL real do seu projeto Supabase
   - Substitua `sua_chave_anonima_aqui` pela chave anônima real do seu projeto
   - Nunca commite o arquivo `.env` no repositório (já está no .gitignore)
   - O arquivo `.env` deve estar na raiz do projeto, no mesmo nível do `package.json`

## 🔧 Configuração do Supabase

1. **Crie um projeto no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie uma nova conta ou faça login
   - Crie um novo projeto

2. **Configure a autenticação**
   - No dashboard do Supabase, vá para Authentication > Settings
   - Configure as URLs de redirecionamento para seu app
   - Ative a autenticação por email/senha

3. **Obtenha as credenciais**
   - Vá para Settings > API
   - Copie a URL do projeto e a chave anônima
   - Cole essas informações no arquivo `.env`

## 🚀 Executando o Projeto

1. **Inicie o servidor de desenvolvimento**

   ```bash
   npm start
   ```

2. **Execute no dispositivo/emulador**
   - Pressione `a` para Android
   - Pressione `i` para iOS
   - Pressione `w` para web

## 📱 Funcionalidades

### Telas Implementadas

- **Login** - Autenticação de usuários
- **Registro** - Criação de novas contas
- **Home** - Área logada com informações do usuário

### Recursos

- ✅ Autenticação com Supabase
- ✅ Validação de formulários com Zod
- ✅ Navegação entre telas
- ✅ Interface moderna e responsiva
- ✅ Gerenciamento de estado de autenticação
- ✅ Persistência de sessão

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx
│   └── Input.tsx
├── hooks/              # Hooks personalizados
│   └── useAuth.ts
├── navigation/         # Configuração de navegação
│   └── AppNavigator.tsx
├── screens/           # Telas da aplicação
│   ├── LoginScreen/   # Tela de login
│   │   ├── index.tsx
│   │   └── schema.ts
│   ├── RegisterScreen/ # Tela de registro
│   │   ├── index.tsx
│   │   └── schema.ts
│   └── HomeScreen.tsx
├── services/          # Serviços e APIs
│   └── authService.ts
├── types/             # Definições de tipos TypeScript
│   └── auth.ts
└── utils/             # Utilitários
    └── supabase.ts
```

## 🔒 Segurança

- Todas as credenciais do Supabase são armazenadas em variáveis de ambiente
- Autenticação segura com refresh automático de tokens
- Validação de dados no frontend e backend
- Row Level Security (RLS) habilitado no Supabase

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa na web
- `npm run setup-env` - Cria o arquivo .env com template

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

Desenvolvido com ❤️ para melhorar a gestão municipal
