import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

interface Comunicado {
  id: string;
  tipo: 'noticia' | 'informacao' | 'alerta' | 'evento';
  titulo: string;
  resumo: string;
  conteudo: string;
  dataPublicacao: string;
  dataExpiracao?: string;
  imagem?: string;
  video?: string;
  links?: Array<{
    titulo: string;
    url: string;
    tipo: 'documento' | 'site' | 'formulario';
  }>;
  destaque: boolean;
  lido: boolean;
  autor?: string;
  tags?: string[];
  local?: string;
  horario?: string;
}

export const ComunicacaoScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [comunicados, setComunicados] = useState<Comunicado[]>([
    {
      id: '1',
      tipo: 'noticia',
      titulo: 'Nova Praça Central Inaugurada',
      resumo:
        'A prefeitura inaugura a nova praça central com área de lazer e paisagismo',
      conteudo:
        'A prefeitura municipal inaugurou oficialmente a nova Praça Central, localizada no coração da cidade. O espaço conta com área de lazer, playground infantil, quadra poliesportiva e paisagismo completo. A obra foi realizada com recursos próprios do município e representa um importante marco para a qualidade de vida dos cidadãos.',
      dataPublicacao: '2024-01-20',
      imagem: 'https://example.com/praca-central.jpg',
      destaque: true,
      lido: false,
    },
    {
      id: '2',
      tipo: 'alerta',
      titulo: 'Manutenção no Abastecimento de Água',
      resumo:
        'Interrupção programada no fornecimento de água em alguns bairros',
      conteudo:
        'A Companhia de Água informa que haverá interrupção programada no fornecimento de água nos bairros Centro, Jardim das Flores e Vila Nova, entre os dias 22 e 24 de janeiro, das 8h às 18h. A manutenção é necessária para melhorias no sistema de distribuição. Recomenda-se armazenar água para consumo durante o período.',
      dataPublicacao: '2024-01-19',
      dataExpiracao: '2024-01-24',
      links: [
        {
          titulo: 'Mapa das Áreas Afetadas',
          url: 'https://www.prefeitura.gov.br/mapa-manutencao',
          tipo: 'site',
        },
        {
          titulo: 'Formulário de Solicitação de Caminhão Pipa',
          url: 'https://www.prefeitura.gov.br/caminhao-pipa',
          tipo: 'formulario',
        },
      ],
      destaque: true,
      lido: true,
    },
    {
      id: '3',
      tipo: 'evento',
      titulo: 'Festival de Cultura Popular',
      resumo:
        'Evento cultural com apresentações de música, dança e artesanato local',
      conteudo:
        'A prefeitura promove o Festival de Cultura Popular, que acontecerá nos dias 25, 26 e 27 de janeiro, na Praça da Matriz. O evento contará com apresentações de música regional, danças folclóricas, exposição de artesanato local e gastronomia típica. Entrada gratuita para toda a família.',
      dataPublicacao: '2024-01-18',
      dataExpiracao: '2024-01-27',
      local: 'Praça da Matriz',
      horario: '25 a 27 de janeiro, das 18h às 22h',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      links: [
        {
          titulo: 'Programação Completa',
          url: 'https://www.prefeitura.gov.br/festival-programacao',
          tipo: 'documento',
        },
        {
          titulo: 'Inscrição para Expositores',
          url: 'https://www.prefeitura.gov.br/festival-inscricao',
          tipo: 'formulario',
        },
      ],
      tags: ['cultura', 'evento', 'gratuito', 'música'],
      destaque: false,
      lido: false,
    },
    {
      id: '4',
      tipo: 'informacao',
      titulo: 'Novo Horário de Funcionamento da Prefeitura',
      resumo: 'Alteração no horário de atendimento ao público',
      conteudo:
        'A partir do próximo mês, a prefeitura municipal alterará seu horário de funcionamento. O atendimento ao público será realizado de segunda a sexta-feira, das 8h às 17h, sem fechamento para almoço. A medida visa melhorar o atendimento e facilitar o acesso dos cidadãos aos serviços municipais.',
      dataPublicacao: '2024-01-17',
      autor: 'Secretaria de Administração',
      destaque: false,
      lido: true,
    },
    {
      id: '5',
      tipo: 'noticia',
      titulo: 'Programa de Reciclagem Ampliado',
      resumo: 'Nova coleta seletiva será implementada em toda a cidade',
      conteudo:
        'A prefeitura anuncia a ampliação do programa de reciclagem para toda a cidade. A partir de março, a coleta seletiva será realizada em todos os bairros, com caminhões específicos para materiais recicláveis. A iniciativa faz parte do programa "Cidade Sustentável" e visa reduzir o impacto ambiental dos resíduos.',
      dataPublicacao: '2024-01-16',
      video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      links: [
        {
          titulo: 'Guia de Reciclagem',
          url: 'https://www.prefeitura.gov.br/guia-reciclagem.pdf',
          tipo: 'documento',
        },
        {
          titulo: 'Agenda de Coleta por Bairro',
          url: 'https://www.prefeitura.gov.br/agenda-coleta',
          tipo: 'site',
        },
      ],
      tags: ['sustentabilidade', 'reciclagem', 'meio ambiente'],
      destaque: false,
      lido: false,
    },
    {
      id: '6',
      tipo: 'noticia',
      titulo: 'Inauguração do Novo Hospital Municipal',
      resumo: 'Hospital com 200 leitos e equipamentos de última geração',
      conteudo:
        'A prefeitura inaugurou o novo Hospital Municipal Dr. João Silva, com 200 leitos, 10 salas cirúrgicas e equipamentos de última geração. O hospital atenderá toda a região e representa um investimento de R$ 50 milhões em saúde pública. A inauguração contou com a presença do prefeito, secretários e autoridades locais.',
      dataPublicacao: '2024-01-15',
      imagem: 'https://example.com/hospital-municipal.jpg',
      video: 'https://www.youtube.com/watch?v=J9gKyRmi20o',
      autor: 'Secretaria de Saúde',
      tags: ['saúde', 'hospital', 'inauguração'],
      destaque: true,
      lido: false,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular atualização
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'noticia':
        return 'newspaper';
      case 'informacao':
        return 'information-circle';
      case 'alerta':
        return 'warning';
      case 'evento':
        return 'calendar';
      default:
        return 'help-circle';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'noticia':
        return 'Notícia';
      case 'informacao':
        return 'Informação';
      case 'alerta':
        return 'Alerta';
      case 'evento':
        return 'Evento';
      default:
        return tipo;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'noticia':
        return '#007AFF';
      case 'informacao':
        return '#34C759';
      case 'alerta':
        return '#FF9500';
      case 'evento':
        return '#AF52DE';
      default:
        return theme.colors.primary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const isExpired = (dataExpiracao?: string) => {
    if (!dataExpiracao) return false;
    const expiracao = new Date(dataExpiracao);
    const hoje = new Date();
    return hoje > expiracao;
  };

  const renderComunicado = (comunicado: Comunicado) => (
    <TouchableOpacity
      key={comunicado.id}
      style={[
        styles.comunicadoCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderLeftWidth: comunicado.destaque ? 4 : 1,
          borderLeftColor: comunicado.destaque
            ? getTipoColor(comunicado.tipo)
            : theme.colors.border,
        },
      ]}
      onPress={() =>
        navigation.navigate(
          'ComunicacaoDetalhes' as never,
          { comunicado } as never
        )
      }
    >
      <View style={styles.comunicadoHeader}>
        <View style={styles.comunicadoInfo}>
          <View style={styles.comunicadoTipo}>
            <Ionicons
              name={getTipoIcon(comunicado.tipo) as any}
              size={16}
              color={getTipoColor(comunicado.tipo)}
            />
            <Text
              style={[
                styles.tipoText,
                { color: getTipoColor(comunicado.tipo) },
              ]}
            >
              {getTipoLabel(comunicado.tipo)}
            </Text>
            {comunicado.destaque && (
              <View
                style={[
                  styles.destaqueBadge,
                  { backgroundColor: getTipoColor(comunicado.tipo) },
                ]}
              >
                <Text style={styles.destaqueText}>Destaque</Text>
              </View>
            )}
            {isExpired(comunicado.dataExpiracao) && (
              <View
                style={[
                  styles.expiradoBadge,
                  { backgroundColor: theme.colors.error },
                ]}
              >
                <Text style={styles.expiradoText}>Expirado</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <Text style={[styles.tituloText, { color: theme.colors.text }]}>
        {comunicado.titulo}
      </Text>
      <Text
        style={[styles.resumoText, { color: theme.colors.textSecondary }]}
        numberOfLines={2}
      >
        {comunicado.resumo}
      </Text>

      <View style={styles.comunicadoFooter}>
        <Text style={[styles.dataText, { color: theme.colors.textSecondary }]}>
          Publicado em: {formatDate(comunicado.dataPublicacao)}
        </Text>
        {comunicado.dataExpiracao && (
          <Text
            style={[styles.dataText, { color: theme.colors.textSecondary }]}
          >
            Expira em: {formatDate(comunicado.dataExpiracao)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Comunicação" />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Comunicação
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Notícias, informações e comunicados da prefeitura
            </Text>
          </View>

          {/* Comunicados List */}
          {comunicados.length > 0 ? (
            <View style={styles.comunicadosList}>
              {comunicados.map(renderComunicado)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={48}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhum comunicado encontrado
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Os comunicados da prefeitura aparecerão aqui
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },

  comunicadosList: {
    marginBottom: 24,
  },
  comunicadoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  comunicadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  comunicadoInfo: {
    flex: 1,
  },
  comunicadoTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tipoText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  destaqueBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  destaqueText: {
    fontSize: 8,
    fontWeight: '600',
    color: 'white',
  },
  expiradoBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  expiradoText: {
    fontSize: 8,
    fontWeight: '600',
    color: 'white',
  },

  tituloText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resumoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  comunicadoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataText: {
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
