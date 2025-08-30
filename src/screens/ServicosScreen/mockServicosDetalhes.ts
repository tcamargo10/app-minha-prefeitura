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
        | 'subtitle'
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
    title: 'IPTU - Imposto Predial e Territorial Urbano',
    description: '',
    icon: 'home',
    type: 'INFO',
    information: [
      'O IPTU é um imposto municipal obrigatório para todos os proprietários de imóveis',
      'Vencimento da cota única: 31 de janeiro com 10% de desconto',
      'Parcelamento em até 10 vezes sem juros (vencimento dia 10 de cada mês)',
      'Desconto de 5% para pagamento até 28 de fevereiro',
      'Isenção disponível para aposentados e pensionistas (renda até 3 salários mínimos)',
      'Segunda via disponível no site da prefeitura ou presencialmente',
      'Multa de 2% ao mês para pagamento em atraso',
      'Após 60 dias de atraso, o nome vai para o SERASA',
    ],
    links: [
      {
        title: 'Emitir Segunda Via do IPTU',
        url: 'https://prefeitura.gov.br/iptu/segunda-via',
        type: 'externo',
      },
      {
        title: 'Solicitar Isenção de IPTU',
        url: 'https://prefeitura.gov.br/iptu/isencao',
        type: 'externo',
      },
      {
        title: 'Tabela de Valores 2024',
        url: 'https://prefeitura.gov.br/iptu/tabela-valores-2024.pdf',
        type: 'documento',
      },
      {
        title: 'Manual de Isenções',
        url: 'https://prefeitura.gov.br/iptu/manual-isencoes.pdf',
        type: 'documento',
      },
    ],
    form: {
      fields: [
        {
          id: 'orientacoes_gerais',
          label:
            'O Imposto Predial e Territorial Urbano (IPTU) é a principal fonte de receita municipal, sendo utilizado para investimentos em saúde, educação, infraestrutura e serviços públicos. É fundamental que todos os proprietários de imóveis estejam em dia com suas obrigações.',
          type: 'description',
          required: false,
        },
        {
          id: 'video_explicativo',
          label: 'Como Calcular e Pagar seu IPTU',
          type: 'video',
          required: false,
          youtubeId: 'dQw4w9WgXcQ',
        },
        {
          id: 'calendario_pagamento',
          label: 'Calendário de Pagamento IPTU 2024',
          type: 'imagem',
          required: false,
          url: 'https://saomigueldaboavista.sc.gov.br/uploads/sites/15/2024/03/iptu-2022.png',
        },
        {
          id: 'titulo_descontos',
          label: 'Descontos Disponíveis',
          type: 'subtitle',
          required: false,
        },
        {
          id: 'info_descontos',
          label:
            'Aproveite os descontos oferecidos pela prefeitura: 10% para pagamento à vista até 31/01, 5% até 28/02, e parcelamento sem juros em até 10 vezes. Aposentados e pensionistas podem solicitar isenção total.',
          type: 'description',
          required: false,
        },
        {
          id: 'exemplo_calculo',
          label: 'Exemplo de Cálculo do IPTU',
          type: 'imagem',
          required: false,
          url: 'https://horacampinas.com.br/wp-content/uploads/2025/01/iptu-campinas-467x284.png',
        },
      ],
    },
  },
};

export const getServicoDetalhes = (servicoId: string): ServicoDetalhes => {
  return servicosDetalhes[servicoId] || servicosDetalhes['3'];
};
