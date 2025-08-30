export interface ServicoDetalhes {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'INFO' | 'FORM' | 'AGENDAMENTO';
  information: string[];
  links: Array<{
    title: string;
    url: string;
    type: 'externo' | 'documento' | 'video';
  }>;
  form: {
    fields: Array<{
      id: string;
      label: string;
      type:
        | 'text'
        | 'textarea'
        | 'select'
        | 'address'
        | 'upload'
        | 'video'
        | 'imagem'
        | 'title'
        | 'description';
      required: boolean;
      options?: string[];
      youtubeId?: string;
      url?: string;
    }>;
  };
  scheduling?: {
    availableLocations: Array<{
      location: string;
      address: string;
      months: Array<{
        month: string;
        days: Array<{
          dayOfWeek: string;
          availableHours: string[];
        }>;
      }>;
    }>;
    consultationDuration?: number; // em minutos
  };
}

export const servicosDetalhes: Record<string, ServicoDetalhes> = {
  '1': {
    id: '1-1',
    title: 'Limpeza de Via Pública',
    description:
      'Solicitação de limpeza de ruas, avenidas e praças públicas da cidade.',
    icon: 'trash',
    type: 'FORM',
    information: [
      'Este serviço é gratuito para todos os cidadãos',
      'A limpeza será realizada em até 5 dias úteis após a solicitação',
      'Em casos de urgência, o prazo pode ser reduzido',
      'É necessário fornecer fotos do local para melhor atendimento',
    ],
    links: [
      {
        title: 'Manual de Limpeza Urbana',
        url: 'https://exemplo.com/manual-limpeza',
        type: 'documento',
      },
    ],
    form: {
      fields: [
        {
          id: 'endereco',
          label: 'Endereço Completo',
          type: 'address',
          required: true,
        },
        {
          id: 'descricao',
          label: 'Descrição do Problema',
          type: 'textarea',
          required: true,
        },
        {
          id: 'tipoLimpeza',
          label: 'Tipo de Limpeza Necessária',
          type: 'select',
          required: true,
          options: [
            'Limpeza de rua',
            'Limpeza de praça',
            'Remoção de lixo',
            'Limpeza de calçada',
            'Outros',
          ],
        },
        {
          id: 'arquivos',
          label: 'Anexar Fotos',
          type: 'upload',
          required: false,
        },
      ],
    },
  },
  '2': {
    id: '2-1',
    title: 'Consulta com Nutricionista',
    description:
      'Agendamento de consulta individual com nutricionista para orientação nutricional e dietas especializadas.',
    icon: 'medical',
    type: 'AGENDAMENTO',
    information: [
      'Consulta gratuita para todos os cidadãos',
      'Duração da consulta: 30 minutos',
      'Traga seus exames médicos recentes',
      'Caso não possa comparecer, cancele com antecedência',
    ],
    links: [
      {
        title: 'Preparação para Consulta',
        url: 'https://exemplo.com/preparo-consulta',
        type: 'documento',
      },
    ],
    form: {
      fields: [
        {
          id: 'observacoes',
          label: 'Observações Médicas',
          type: 'textarea',
          required: false,
        },
      ],
    },
    scheduling: {
      availableLocations: [
        {
          location: 'Centro de Saúde Central',
          address: 'Rua Principal, 123 - Centro',
          months: [
            {
              month: 'Janeiro',
              days: [
                {
                  dayOfWeek: 'Segunda',
                  availableHours: ['08:00', '09:00', '10:00', '14:00'],
                },
                {
                  dayOfWeek: 'Terça',
                  availableHours: ['08:00', '09:00', '15:00', '16:00'],
                },
                {
                  dayOfWeek: 'Quinta',
                  availableHours: ['09:00', '10:00', '14:00', '15:00'],
                },
              ],
            },
            {
              month: 'Fevereiro',
              days: [
                {
                  dayOfWeek: 'Segunda',
                  availableHours: ['08:00', '10:00', '14:00', '16:00'],
                },
                {
                  dayOfWeek: 'Quarta',
                  availableHours: ['09:00', '10:00', '15:00'],
                },
              ],
            },
          ],
        },
        {
          location: 'Unidade Norte',
          address: 'Av. Norte, 456 - Bairro Norte',
          months: [
            {
              month: 'Janeiro',
              days: [
                {
                  dayOfWeek: 'Quarta',
                  availableHours: ['08:00', '09:00', '14:00'],
                },
                {
                  dayOfWeek: 'Sexta',
                  availableHours: ['10:00', '15:00', '16:00'],
                },
              ],
            },
            {
              month: 'Março',
              days: [
                {
                  dayOfWeek: 'Terça',
                  availableHours: ['08:00', '09:00', '10:00'],
                },
                {
                  dayOfWeek: 'Quinta',
                  availableHours: ['14:00', '15:00', '16:00'],
                },
                {
                  dayOfWeek: 'Sexta',
                  availableHours: ['08:00', '09:00', '14:00', '15:00'],
                },
              ],
            },
          ],
        },
        {
          location: 'Posto Sul',
          address: 'Rua do Sul, 789 - Zona Sul',
          months: [
            {
              month: 'Fevereiro',
              days: [
                {
                  dayOfWeek: 'Segunda',
                  availableHours: ['09:00', '10:00', '11:00'],
                },
                {
                  dayOfWeek: 'Sexta',
                  availableHours: ['08:00', '09:00', '14:00', '15:00', '16:00'],
                },
              ],
            },
            {
              month: 'Março',
              days: [
                {
                  dayOfWeek: 'Quarta',
                  availableHours: ['08:00', '14:00', '15:00'],
                },
                {
                  dayOfWeek: 'Sexta',
                  availableHours: ['09:00', '10:00', '16:00'],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  '3': {
    id: '3-1',
    title: 'Coleta de Poda',
    description:
      'Informações sobre coleta de galhos e resíduos provenientes de poda de árvores em vias públicas e particulares.',
    icon: 'leaf',
    type: 'INFO',
    information: [
      'Este serviço é gratuito para todos os cidadãos',
      'Os resíduos devem estar organizados e acessíveis',
      'Não inclui poda de árvores, apenas coleta dos resíduos',
      'Em caso de grandes quantidades, o prazo pode ser estendido',
      'Coleta realizada semanalmente nas segundas-feiras',
    ],
    links: [
      {
        title: 'Normas para Coleta de Poda',
        url: 'https://exemplo.com/normas-poda',
        type: 'documento',
      },
      {
        title: 'Cronograma de Coleta',
        url: 'https://exemplo.com/cronograma-poda',
        type: 'documento',
      },
    ],
    form: {
      fields: [
        {
          id: 'titulo_info',
          label: 'Título da Informação',
          type: 'title',
          required: false,
        },
        {
          id: 'descricao_info',
          label: 'Descrição Detalhada',
          type: 'description',
          required: false,
        },
        {
          id: 'video_educativo',
          label: 'Como Preparar Resíduos para Coleta',
          type: 'video',
          required: false,
          youtubeId: 'dQw4w9WgXcQ',
        },
        {
          id: 'imagem_exemplo',
          label: 'Exemplo de Resíduos de Poda',
          type: 'imagem',
          required: false,
          url: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Coleta+Poda',
        },
      ],
    },
  },
};

export const getServicoDetalhes = (servicoId: string): ServicoDetalhes => {
  return servicosDetalhes[servicoId] || servicosDetalhes['2'];
};
