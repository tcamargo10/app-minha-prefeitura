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
  images: Array<{
    title: string;
    url: string;
  }>;
  videos: Array<{
    title: string;
    youtubeId: string;
  }>;
  form?: {
    fields: Array<{
      id: string;
      label: string;
      type: 'text' | 'textarea' | 'select' | 'address' | 'upload';
      required: boolean;
      options?: string[];
    }>;
  };
  scheduling?: {
    availableDays: string[];
    availableHours: string[];
    consultationDuration: number; // em minutos
  };
}

export const servicosDetalhes: Record<string, ServicoDetalhes> = {
  '1-1': {
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
      {
        title: 'Normas de Limpeza Pública',
        url: 'https://exemplo.com/normas',
        type: 'documento',
      },
    ],
    images: [],
    videos: [],
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
          id: 'urgencia',
          label: 'Nível de Urgência',
          type: 'select',
          required: true,
          options: ['Baixa', 'Média', 'Alta'],
        },
        {
          id: 'arquivos',
          label: 'Anexar imagem',
          type: 'upload',
          required: false,
        },
      ],
    },
  },
  '1-4': {
    id: '1-4',
    title: 'Coleta de Poda',
    description:
      'Solicitação de coleta de galhos e resíduos provenientes de poda de árvores em vias públicas e particulares.',
    icon: 'leaf',
    type: 'INFO',
    information: [
      'Este serviço é gratuito para todos os cidadãos',
      'Os resíduos devem estar organizados e acessíveis',
      'Não inclui poda de árvores, apenas coleta dos resíduos',
      'Em caso de grandes quantidades, o prazo pode ser estendido',
    ],
    links: [
      {
        title: 'Normas para Coleta de Poda',
        url: 'https://exemplo.com/normas-poda',
        type: 'documento',
      },
    ],
    images: [
      {
        title: 'Exemplo de Resíduos de Poda',
        url: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Coleta+Poda',
      },
    ],
    videos: [],
  },
  '1-5': {
    id: '1-5',
    title: 'Cata-Treco',
    description:
      'Coleta de móveis velhos, eletrodomésticos e objetos grandes que não podem ser descartados no lixo comum.',
    icon: 'home',
    type: 'INFO',
    information: [
      'Serviço gratuito para moradores da cidade',
      'Os objetos devem estar em local acessível',
      'Não aceitamos objetos com vazamentos ou muito danificados',
      'Agende com antecedência para melhor planejamento',
    ],
    links: [
      {
        title: 'Guia do Cata-Treco',
        url: 'https://exemplo.com/guia-cata-treco',
        type: 'documento',
      },
    ],
    images: [
      {
        title: 'Exemplo de Objetos Aceitos',
        url: 'https://via.placeholder.com/400x200/FF9500/FFFFFF?text=Cata+Treco',
      },
    ],
    videos: [],
  },
  '1-6': {
    id: '1-6',
    title: 'Denúncia de Descarte Irregular de Resíduos',
    description:
      'Denúncia de descarte inadequado de lixo, entulho ou outros resíduos em vias públicas ou locais inapropriados.',
    icon: 'alert-circle',
    type: 'INFO',
    information: [
      'Denúncias são tratadas com prioridade',
      'Suas informações são mantidas em sigilo',
      'A fiscalização será realizada em até 48 horas',
      'Em casos graves, a ação pode ser imediata',
    ],
    links: [
      {
        title: 'Lei de Crimes Ambientais',
        url: 'https://exemplo.com/lei-ambiental',
        type: 'documento',
      },
    ],
    images: [
      {
        title: 'Exemplo de Descarte Irregular',
        url: 'https://via.placeholder.com/400x200/E74C3C/FFFFFF?text=Descarte+Irregular',
      },
    ],
    videos: [],
  },
  '1-7': {
    id: '1-7',
    title: 'Coleta de Animais Mortos',
    description:
      'Remoção de animais mortos encontrados em vias públicas, praças e outros locais públicos.',
    icon: 'paw',
    type: 'INFO',
    information: [
      'Serviço de urgência com atendimento prioritário',
      'Não inclui animais de estimação particulares',
      'A remoção é feita por equipe especializada',
      'Em caso de risco à saúde pública, a ação é imediata',
    ],
    links: [
      {
        title: 'Protocolo de Remoção de Animais',
        url: 'https://exemplo.com/protocolo-animais',
        type: 'documento',
      },
    ],
    images: [
      {
        title: 'Equipe de Remoção',
        url: 'https://via.placeholder.com/400x200/8E44AD/FFFFFF?text=Coleta+Animais',
      },
    ],
    videos: [],
  },
};

export const getServicoDetalhes = (servicoId: string): ServicoDetalhes => {
  return servicosDetalhes[servicoId] || servicosDetalhes['1-1'];
};
