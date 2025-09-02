# Banco de Dados - Sistema Municipal

## Resumo

- 32 tabelas
- 2 views
- 47 chaves estrangeiras

## Índice

1. [Sistema Principal](#sistema-principal) - 6 tabelas
2. [Sistema de Serviços](#sistema-de-serviços) - 9 tabelas
3. [Sistema de Agendamento](#sistema-de-agendamento) - 9 tabelas
4. [Sistema de Tarefas](#sistema-de-tarefas) - 3 tabelas
5. [Sistema de Comunicação](#sistema-de-comunicação) - 4 tabelas
6. [Views](#views) - 2 views

## Sistema Principal

**municipalities** - Dados dos municípios

- id, name, profile_id → profiles(id), created_at

**citizens** - Dados dos cidadãos

- id, user_id → auth.users(id), name, email, phone, created_at

**profiles** - Perfis de usuários do sistema

- id, municipality_id → municipalities(id), name, role, created_at

**departments** - Departamentos municipais

- id, municipality_id → municipalities(id), manager_id → profiles(id), name, created_at

**categories** - Categorias de serviços

- id, municipality_id → municipalities(id), name, icon, created_at

**citizen_addresses** - Endereços dos cidadãos

- id, citizen_id → citizens(id), municipality_id → municipalities(id), street, number, neighborhood, created_at

## Sistema de Serviços

**services** - Serviços disponíveis

- id, name, description, category_id → categories(id), department_id → departments(id), is_active, created_at

**service_requests** - Solicitações de serviços

- id, citizen_id → citizens(id), service_id → services(id), status, protocol, notes, task_id → tasks(id), created_at

**service_information** - Informações dos serviços

- id, service_id → services(id), information_text, order_index, created_at

**service_links** - Links relacionados aos serviços

- id, service_id → services(id), title, url, link_type, order_index, created_at

**service_form_fields** - Campos dos formulários de serviços

- id, service_id → services(id), field_id, label, field_type, required, order_index, created_at

**service_form_field_options** - Opções dos campos de formulário

- id, field_id → service_form_fields(id), option_value, order_index, created_at

**service_request_files** - Arquivos das solicitações

- id, request_id → service_requests(id), file_name, file_url, file_size, file_type, file_description, uploaded_by → auth.users(id), is_public, created_at

**service_request_form_data** - Dados dos formulários das solicitações

- id, request_id → service_requests(id), field_id, field_value, created_at

**service_request_timeline** - Timeline das solicitações

- id, request_id → service_requests(id), status, description, responsible_name, responsible_department, notes, action_date, action_time, created_by → auth.users(id), created_at

## Sistema de Agendamento

**appointments** - Agendamentos

- id, citizen_id → citizens(id), service_id → services(id), request_id → service_requests(id), slot_id → scheduling_slots(id), location_id → scheduling_locations(id), professional_id → scheduling_professionals(id), status, scheduled_date, scheduled_time, created_at

**scheduling_locations** - Locais de atendimento

- id, service_id → services(id), name, address, capacity, is_active, created_at

**scheduling_professionals** - Profissionais

- id, name, specialty, is_active, created_at

**scheduling_slots** - Horários disponíveis

- id, calendar_id → scheduling_calendar(id), location_id → scheduling_locations(id), professional_id → scheduling_professionals(id), date, start_time, end_time, is_available, created_at

**scheduling_calendar** - Calendário

- id, location_id → scheduling_locations(id), professional_id → scheduling_professionals(id), date, is_available, created_at

**scheduling_location_hours** - Horários dos locais

- id, location_id → scheduling_locations(id), day_of_week, start_time, end_time, created_at

**scheduling_professional_locations** - Profissionais por local

- id, professional_id → scheduling_professionals(id), location_id → scheduling_locations(id), service_id → services(id), created_at

**scheduling_settings** - Configurações de agendamento

- id, service_id → services(id), advance_booking_days, max_appointments_per_day, appointment_duration, created_at

**scheduling_audit_log** - Log de auditoria

- id, table_name, record_id, action, old_data, new_data, user_id → auth.users(id), created_at

## Sistema de Tarefas

**tasks** - Tarefas

- id, citizen_id → citizens(id), citizen_address_id → citizen_addresses(id), municipality_id → municipalities(id), service_id → services(id), assigned_to → profiles(id), created_by → profiles(id), title, description, status, priority, created_at

**task_comments** - Comentários das tarefas

- id, task_id → tasks(id), comment, created_at

**task_timeline** - Timeline das tarefas

- id, task_id → tasks(id), status, description, created_at

## Sistema de Comunicação

**communications** - Comunicações municipais

- id, municipality_id → municipalities(id), title, content, type, is_active, created_at

**communication_links** - Links das comunicações

- id, communication_id → communications(id), title, url, created_at

**communication_reads** - Leituras das comunicações

- id, communication_id → communications(id), citizen_id → citizens(id), read_at

**notifications** - Notificações

- id, citizen_id → citizens(id), title, message, type, is_read, created_at

## Views

**service_request_details** - View com dados completos das solicitações

**service_request_timeline_formatted** - View da timeline formatada das solicitações

## Relacionamentos Principais

**Entidades centrais:**

- services (8 referências)
- citizens (7 referências)
- municipalities (6 referências)
- profiles (5 referências)

**Fluxos principais:**

- Serviços: services → service_requests → appointments
- Agendamento: scheduling_locations → scheduling_slots → appointments
- Cidadãos: citizens → service_requests, appointments, tasks
