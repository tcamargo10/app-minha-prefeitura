# 📊 Documentação Completa do Sistema de Serviços - Supabase

## 🏗️ Estrutura Atual do Banco de Dados

### **✅ Tabelas já existentes no Supabase:**

| Tabela                | Descrição                   | Colunas Principais                                                   | Status    |
| --------------------- | --------------------------- | -------------------------------------------------------------------- | --------- |
| `categories`          | Categorias de serviços      | id, name, description, municipality_id, icon, color, type_categories | ✅ Existe |
| `citizen_addresses`   | Endereços dos cidadãos      | id, citizen_id, municipality_id, street, number, neighborhood        | ✅ Existe |
| `citizens`            | Dados dos cidadãos          | id, name, email, phone, cpf, birth_date, **user_id**                 | ✅ Existe |
| `communication_links` | Links de comunicação        | id, communication_id, title, url, type                               | ✅ Existe |
| `communication_reads` | Leituras de comunicação     | id, communication_id, citizen_id, read_at                            | ✅ Existe |
| `communications`      | Sistema de comunicação      | id, type, title, content, published_at, municipality_id              | ✅ Existe |
| `departments`         | Departamentos da prefeitura | id, name, description, manager_id, municipality_id                   | ✅ Existe |
| `municipalities`      | Municípios                  | id, code, profile_id, street, city, state, cnpj                      | ✅ Existe |
| `notifications`       | Sistema de notificações     | id, title, message, sent_at, municipality_id                         | ✅ Existe |
| `profiles`            | Perfis dos usuários         | id, name, email, role, department, municipality_id                   | ✅ Existe |
| `services`            | Serviços da prefeitura      | id, name, description, department_id, category_id, service_config    | ✅ Existe |
| `task_comments`       | Comentários de tarefas      | id, task_id, user_id, content                                        | ✅ Existe |
| `task_timeline`       | Timeline de tarefas         | id, task_id, user_id, action_type, old_value, new_value              | ✅ Existe |
| `tasks`               | Sistema de tarefas          | id, title, description, status, assigned_to, citizen_id, service_id  | ✅ Existe |

---

## ✅ Tabelas CRIADAS pelo Sistema de Migração:

### **Sistema de Formulários Dinâmicos:**

- ✅ `service_information` - Informações dos serviços (bullet points)
- ✅ `service_links` - Links úteis dos serviços
- ✅ `service_form_fields` - Campos dinâmicos dos formulários
- ✅ `service_form_field_options` - Opções para campos select

### **Sistema de Agendamento Avançado:**

- ✅ `scheduling_locations` - Locais de atendimento
- ✅ `scheduling_professionals` - Profissionais responsáveis
- ✅ `scheduling_professional_locations` - Vinculação profissionais x locais
- ✅ `scheduling_location_hours` - Horários padrão por local
- ✅ `scheduling_calendar` - Calendário de disponibilidade
- ✅ `scheduling_slots` - Slots específicos de agendamento
- ✅ `scheduling_settings` - Configurações de agendamento
- ✅ `scheduling_audit_log` - Log de auditoria

### **Sistema de Solicitações:**

- ✅ `service_requests` - Solicitações dos cidadãos (**com campos extras para DetalhesScreen**)
- ✅ `service_request_form_data` - Dados dos formulários preenchidos
- ✅ `appointments` - Agendamentos confirmados
- ✅ `service_request_files` - Arquivos anexados (**melhorado com novos campos**)

### **Sistema de Timeline Específico:**

- ✅ `service_request_timeline` - Timeline detalhada das solicitações (complementa `task_timeline`)

---

## 🔄 Melhorias e Extensões Implementadas

### **🔧 Ajustes na Tabela `citizens`:**

- ✅ **Adicionada coluna `user_id`** → Referência para `auth.users(id)`
- ✅ **Índice criado** para performance (`idx_citizens_user_id`)

### **🔧 Melhorias na Tabela `service_requests`:**

Campos adicionados pelo `supabase-detalhes-screen-update.sql`:

- ✅ **`protocol`** → Protocolo automático (formato YYYY000000)
- ✅ **`priority`** → Prioridade ('baixa', 'media', 'alta', 'urgente')
- ✅ **`address`** → Endereço da solicitação
- ✅ **`notes`** → Observações adicionais
- ✅ **`request_type`** → Tipo ('documento', 'servico', 'denuncia', 'sugestao')

### **🔧 Melhorias na Tabela `service_request_files`:**

- ✅ **`file_description`** → Descrição do arquivo
- ✅ **`uploaded_by`** → Referência para quem fez o upload
- ✅ **`is_public`** → Controle de visibilidade

### **🔗 Novos Relacionamentos Criados:**

- `service_requests.citizen_id` → `citizens.id` ✅
- `service_requests.service_id` → `services.id` ✅
- `service_request_timeline.request_id` → `service_requests.id` ✅
- `appointments.citizen_id` → `citizens.id` ✅
- `appointments.slot_id` → `scheduling_slots.id` ✅
- `scheduling_locations.service_id` → `services.id` ✅

---

## 🚀 Funcionalidades Implementadas

### **🤖 Automações e Triggers:**

- ✅ **Geração automática de protocolo** → Formato YYYY000000 sequencial
- ✅ **Timeline automática** → Entrada criada automaticamente ao inserir solicitação
- ✅ **Atualização de status** → Timeline atualizada automaticamente
- ✅ **Controle de slots** → Booking count atualizado automaticamente
- ✅ **Updated_at triggers** → Campos de data atualizados automaticamente

### **🔒 Segurança (RLS - Row Level Security):**

- ✅ **Políticas por usuário** → Usuários veem apenas suas solicitações
- ✅ **Leitura pública** → Informações de serviços visíveis para todos
- ✅ **Controle de arquivos** → Usuários acessam apenas seus arquivos
- ✅ **Timeline protegida** → Acesso restrito por solicitação

### **📊 Views para Frontend:**

- ✅ **`service_request_details`** → Dados completos para tela de detalhes
- ✅ **`service_request_timeline_formatted`** → Timeline formatada para exibição

---

## 📋 Ordem de Execução dos Scripts

### **1º** → `supabase-migration-new-tables.sql`

- Cria todas as novas tabelas
- Adiciona `user_id` na tabela `citizens`
- Configura triggers e RLS
- **Tempo estimado:** 2-3 minutos

### **2º** → `supabase-detalhes-screen-update.sql`

- Adiciona campos extras para `DetalhesScreen`
- Cria tabela `service_request_timeline`
- Implementa geração automática de protocolo
- **Tempo estimado:** 1-2 minutos

### **3º** → `supabase-sample-data.sql`

- Insere dados de exemplo
- 3 serviços configurados
- 2 solicitações de exemplo
- 1 agendamento confirmado
- **Tempo estimado:** 30 segundos

---

## 🎯 Sistema Final Implementado

### **📊 Estatísticas:**

- ✅ **14 tabelas existentes** (preservadas e melhoradas)
- ✅ **17 tabelas novas** (sistema de serviços + timeline)
- ✅ **Total: 31 tabelas** funcionando em conjunto
- ✅ **15+ triggers** para automação
- ✅ **10+ políticas RLS** para segurança
- ✅ **25+ índices** para performance

### **🔧 Dados de Exemplo Inclusos:**

- **Municipality ID:** `0b6c69de-bf82-408e-8404-8ca550978ad7`
- **Citizen ID:** `79f1785f-0fd5-4515-b266-25a718971ebe`
- **Category ID:** `3be542e4-568c-4655-95fc-3d4bbc8ed8db`
- **3 Serviços:** Limpeza, Nutricionista, IPTU
- **Formulários dinâmicos** com campos variados
- **Sistema de agendamento** funcional

**O sistema está 100% funcional e pronto para produção! 🎉**
