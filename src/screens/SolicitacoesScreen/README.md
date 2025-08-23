# Solicitações Screen

Esta pasta contém todas as telas relacionadas ao módulo de solicitações do aplicativo.

## Estrutura de Arquivos

- **`index.tsx`** - Tela principal de listagem das solicitações
- **`DetalhesScreen.tsx`** - Tela de detalhes de uma solicitação específica

## Funcionalidades

### Tela Principal (`index.tsx`)

- Lista todas as solicitações do usuário
- Resumo de status (pendentes, em análise, concluídas)
- Pull-to-refresh para atualizar dados
- Navegação para detalhes ao tocar em um card

### Tela de Detalhes (`DetalhesScreen.tsx`)

- Informações completas da solicitação
- Timeline com histórico de atualizações
- Status atual e prioridade
- Anexos (quando disponíveis)
- Ações disponíveis (enviar mensagem, compartilhar)

## Tipos de Solicitação

- **Documento** - Solicitações de documentos municipais
- **Serviço** - Solicitações de serviços públicos
- **Denúncia** - Denúncias de problemas urbanos
- **Sugestão** - Sugestões para melhorias

## Status Possíveis

- **Pendente** - Aguardando análise inicial
- **Em Análise** - Sendo analisada pela equipe técnica
- **Aprovada** - Solicitação aprovada para execução
- **Rejeitada** - Solicitação rejeitada com justificativa
- **Concluída** - Solicitação finalizada com sucesso

## Navegação

A navegação entre as telas é gerenciada pelo `AppNavigator.tsx` principal:

```typescript
// Navegar para detalhes
navigation.navigate('SolicitacoesDetalhes', { solicitacaoId: '123' });
```
