# Minha Prefeitura

Aplicativo React Native com Expo para gestão de solicitações municipais, desenvolvido com TypeScript, Supabase e React Navigation.

**Versão:** 1.0.1

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação tipada
- **Supabase** - Backend-as-a-Service (BaaS)
- **React Navigation** - Navegação entre telas
- **EAS Build** - Build e deploy automatizado
- **GitHub Actions** - CI/CD pipeline

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Supabase
- Conta no EAS (Expo Application Services)

## 🛠️ Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd app-minha-prefeitura
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   As variáveis de ambiente já estão configuradas no `eas.json` para produção:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://tgtldslsqytoynhyybew.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndGxkc2xzcXl0b3luaHl5YmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNTAwMDEsImV4cCI6MjA2NDcyNjAwMX0.iYGi4Fxsw53Fa0r5JEeRpa9JTqd7dt5vpwaL3McyfI
   ```

## 🚀 Executando o Projeto

1. **Inicie o servidor de desenvolvimento**

   ```bash
   npm start
   ```

2. **Execute no dispositivo/emulador**
   - Pressione `a` para Android
   - Pressione `i` para iOS
   - Pressione `w` para web

## 📱 Deploy para App Stores

### Deploy Automatizado (GitHub Actions)

O projeto está configurado com pipeline automatizado:

- **Branch `master`**: Deploy automático para Google Play Store
- **Tags**: Deploy de produção com versionamento automático

### Deploy Manual

```bash
# Build para Android
eas build --platform android --profile production

# Submit para Google Play
eas submit --platform android --profile production
```

## 📱 Funcionalidades

### Telas Implementadas

- **Splash Screen** - Tela de carregamento inicial
- **Login** - Autenticação de usuários
- **Registro** - Criação de novas contas
- **Home** - Dashboard principal com informações da cidade
- **Categorias** - Lista de categorias de serviços
- **Comunicação** - Comunicados e notícias municipais
- **Solicitações** - Histórico de solicitações do usuário
- **Perfil** - Gerenciamento de perfil e endereços

### Recursos Implementados

- ✅ Autenticação com Supabase
- ✅ Navegação com React Navigation (Stack + Bottom Tabs)
- ✅ Interface moderna com tema claro/escuro
- ✅ Gerenciamento de estado com React Context
- ✅ Componentes reutilizáveis (SelectInput, AppBar, etc.)
- ✅ Integração com tabela `municipalities` do Supabase
- ✅ Sistema de seleção de cidades
- ✅ Gerenciamento de endereços
- ✅ Deploy automatizado para Google Play Store
- ✅ CI/CD com GitHub Actions

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Alert.tsx
│   ├── AppBar.tsx
│   ├── BannerCard.tsx
│   ├── BannerSection.tsx
│   ├── Button.tsx
│   ├── CategoriesGrid.tsx
│   ├── CategoryCard.tsx
│   ├── CustomStatusBar.tsx
│   ├── GenericModal.tsx
│   ├── Input.tsx
│   ├── ScreenWrapper.tsx
│   ├── SelectInput.tsx
│   ├── ServiceCard.tsx
│   ├── ServicesGrid.tsx
│   ├── ThemeToggle.tsx
│   └── CitySelectorModal.tsx
├── contexts/           # Contextos React
│   ├── ThemeContext.tsx
│   └── CityContext.tsx
├── hooks/              # Hooks personalizados
│   └── useAuth.ts
├── navigation/         # Configuração de navegação
│   ├── AppNavigator.tsx
│   └── BottomTabNavigator.tsx
├── screens/           # Telas da aplicação
│   ├── SplashScreen.tsx
│   ├── LoginScreen/
│   ├── RegisterScreen/
│   ├── HomeScreen.tsx
│   ├── CategoriasScreen/
│   ├── ComunicacaoScreen/
│   ├── SolicitacoesScreen/
│   └── PerfilScreen/
├── services/          # Serviços e APIs
│   ├── authService.ts
│   └── municipalityService.ts
├── theme/             # Configuração de temas
│   └── colors.ts
├── types/             # Definições de tipos TypeScript
│   ├── auth.ts
│   └── theme.ts
└── utils/             # Utilitários
    ├── errorHandler.ts
    └── supabase.ts
```

## 🎨 Componentes Principais

### SelectInput

Componente genérico para seleção de opções via modal:

```tsx
<SelectInput
  label="Estado"
  placeholder="Selecione o estado"
  value={selectedState}
  options={stateOptions}
  onSelect={setSelectedState}
  loading={loadingStates}
  required
/>
```

### AppBar

Barra de navegação superior com logo e seletor de cidade:

```tsx
<AppBar title="Título da Tela" showBackButton showCitySelector />
```

### ScreenWrapper

Wrapper para telas com AppBar consistente:

```tsx
<ScreenWrapper showCitySelector>{/* Conteúdo da tela */}</ScreenWrapper>
```

## 🔧 Configuração do Supabase

### Tabelas Utilizadas

- **`municipalities`**: Estados e cidades brasileiras
  - `state`: Nome do estado
  - `city`: Nome da cidade
  - `active`: Status ativo/inativo

### Autenticação

- Autenticação por email/senha
- Sessão persistente
- Gerenciamento de estado de autenticação

## 📱 Deploy e CI/CD

### GitHub Actions

- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Push para branch `master`
- **Plataforma**: Android (Google Play Store)
- **Automação**: Build + Submit automático

### EAS Configuration

- **Build Profiles**: `development`, `preview`, `production`
- **Submit Profiles**: Configurado para Google Play Store
- **Service Account**: Google Service Account para submissão automática

## 🔒 Segurança

- Credenciais do Supabase em variáveis de ambiente
- Google Service Account para deploy automatizado
- Row Level Security (RLS) no Supabase
- Validação de dados no frontend

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa na web
- `eas build` - Build para produção
- `eas submit` - Submit para app stores

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
