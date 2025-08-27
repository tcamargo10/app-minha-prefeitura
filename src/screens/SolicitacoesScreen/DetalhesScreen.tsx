import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

interface TimelineItem {
  id: string;
  data: string;
  hora: string;
  status: string;
  descricao: string;
  responsavel?: string;
  observacoes?: string;
}

interface SolicitacaoDetalhes {
  id: string;
  tipo: 'documento' | 'servico' | 'denuncia' | 'sugestao';
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em_analise' | 'aprovada' | 'rejeitada' | 'concluida';
  dataCriacao: string;
  dataAtualizacao?: string;
  protocolo: string;
  categoria: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  endereco?: string;
  observacoes?: string;
  timeline: TimelineItem[];
  anexos?: { nome: string; tipo: string; tamanho: string }[];
}

const { width } = Dimensions.get('window');

export const SolicitacoesDetalhesScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  // Pegar o ID da solicitação dos parâmetros da rota
  const { solicitacaoId } = route.params as { solicitacaoId: string };

  // Dados mockados - em um app real, viriam de uma API baseada no solicitacaoId
  const getSolicitacaoById = (id: string): SolicitacaoDetalhes => {
    const solicitacoesData: Record<string, SolicitacaoDetalhes> = {
      '1': {
        id: '1',
        tipo: 'documento',
        titulo: 'Segunda Via de RG',
        descricao:
          'Solicitação de segunda via do documento de identidade. Documento perdido durante viagem.',
        status: 'em_analise',
        dataCriacao: '2024-01-15',
        dataAtualizacao: '2024-01-18',
        protocolo: '2024001',
        categoria: 'Documentação',
        prioridade: 'media',
        endereco: 'Rua das Palmeiras, 456 - Centro',
        observacoes: 'Documento perdido em 10/01/2024',
        timeline: [
          {
            id: '1',
            data: '2024-01-15',
            hora: '09:30',
            status: 'Solicitação Criada',
            descricao: 'Solicitação registrada no sistema',
            responsavel: 'Sistema',
          },
          {
            id: '2',
            data: '2024-01-15',
            hora: '14:20',
            status: 'Em Análise',
            descricao: 'Solicitação encaminhada para análise',
            responsavel: 'Maria Silva - Depto. Documentação',
          },
          {
            id: '3',
            data: '2024-01-18',
            hora: '10:15',
            status: 'Documentação Verificada',
            descricao: 'Documentação do solicitante verificada',
            responsavel: 'Carlos Santos - Analista',
            observacoes: 'Documentação em ordem. Aguardando confirmação.',
          },
        ],
        anexos: [
          { nome: 'boletim_ocorrencia.pdf', tipo: 'PDF', tamanho: '1.2 MB' },
          { nome: 'foto_3x4.jpg', tipo: 'Imagem', tamanho: '0.8 MB' },
        ],
      },
      '2': {
        id: '2',
        tipo: 'servico',
        titulo: 'Limpeza de Bueiro',
        descricao:
          'Solicitação de limpeza de bueiro entupido na Rua das Flores, próximo ao número 123. O bueiro está causando alagamento na via durante chuvas.',
        status: 'concluida',
        dataCriacao: '2024-01-10',
        dataAtualizacao: '2024-01-16',
        protocolo: '2024002',
        categoria: 'Limpeza Urbana',
        prioridade: 'media',
        endereco: 'Rua das Flores, 123 - Centro',
        observacoes: 'Bueiro localizado próximo à padaria do Sr. João',
        timeline: [
          {
            id: '1',
            data: '2024-01-10',
            hora: '08:30',
            status: 'Solicitação Criada',
            descricao: 'Solicitação registrada no sistema',
            responsavel: 'Sistema',
          },
          {
            id: '2',
            data: '2024-01-10',
            hora: '14:20',
            status: 'Em Análise',
            descricao: 'Solicitação encaminhada para análise técnica',
            responsavel: 'João Silva - Depto. Limpeza',
          },
          {
            id: '3',
            data: '2024-01-12',
            hora: '08:15',
            status: 'Vistoria Agendada',
            descricao: 'Vistoria agendada para verificação local',
            responsavel: 'Equipe Técnica',
            observacoes: 'Vistoria agendada para 14/01/2024 às 10:00',
          },
          {
            id: '4',
            data: '2024-01-14',
            hora: '10:30',
            status: 'Vistoria Realizada',
            descricao: 'Vistoria realizada no local',
            responsavel: 'Carlos Santos - Técnico',
            observacoes:
              'Confirmado entupimento. Serviço aprovado para execução.',
          },
          {
            id: '5',
            data: '2024-01-16',
            hora: '07:00',
            status: 'Serviço Executado',
            descricao: 'Limpeza do bueiro realizada com sucesso',
            responsavel: 'Equipe de Limpeza',
            observacoes: 'Bueiro desentupido e limpo. Via liberada.',
          },
        ],
        anexos: [
          { nome: 'foto_bueiro.jpg', tipo: 'Imagem', tamanho: '2.3 MB' },
          { nome: 'localizacao.pdf', tipo: 'PDF', tamanho: '1.1 MB' },
        ],
      },
      '3': {
        id: '3',
        tipo: 'denuncia',
        titulo: 'Lixo Irregular',
        descricao:
          'Denúncia de descarte irregular de lixo em via pública. Material descartado em local inadequado.',
        status: 'pendente',
        dataCriacao: '2024-01-20',
        protocolo: '2024003',
        categoria: 'Fiscalização',
        prioridade: 'alta',
        endereco: 'Rua dos Ipês, 789 - Jardim das Flores',
        observacoes: 'Lixo descartado próximo ao ponto de ônibus',
        timeline: [
          {
            id: '1',
            data: '2024-01-20',
            hora: '16:45',
            status: 'Denúncia Registrada',
            descricao: 'Denúncia registrada no sistema',
            responsavel: 'Sistema',
          },
          {
            id: '2',
            data: '2024-01-20',
            hora: '17:30',
            status: 'Encaminhada para Fiscalização',
            descricao: 'Denúncia encaminhada para equipe de fiscalização',
            responsavel: 'Ana Costa - Coordenadora',
          },
        ],
        anexos: [
          { nome: 'foto_lixo.jpg', tipo: 'Imagem', tamanho: '3.1 MB' },
          { nome: 'video_denuncia.mp4', tipo: 'Vídeo', tamanho: '15.2 MB' },
        ],
      },
    };

    return solicitacoesData[id] || solicitacoesData['1']; // Fallback para primeira solicitação
  };

  const solicitacao = getSolicitacaoById(solicitacaoId);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'documento':
        return 'document-text';
      case 'servico':
        return 'construct';
      case 'denuncia':
        return 'warning';
      case 'sugestao':
        return 'bulb';
      default:
        return 'help-circle';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'documento':
        return 'Documento';
      case 'servico':
        return 'Serviço';
      case 'denuncia':
        return 'Denúncia';
      case 'sugestao':
        return 'Sugestão';
      default:
        return tipo;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return '#FF9500';
      case 'em_analise':
        return '#007AFF';
      case 'aprovada':
        return '#34C759';
      case 'rejeitada':
        return '#FF3B30';
      case 'concluida':
        return '#34C759';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'em_analise':
        return 'Em Análise';
      case 'aprovada':
        return 'Aprovada';
      case 'rejeitada':
        return 'Rejeitada';
      case 'concluida':
        return 'Concluída';
      default:
        return status;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'baixa':
        return '#34C759';
      case 'media':
        return '#FF9500';
      case 'alta':
        return '#FF3B30';
      case 'urgente':
        return '#8E2C2C';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getPrioridadeLabel = (prioridade: string) => {
    switch (prioridade) {
      case 'baixa':
        return 'Baixa';
      case 'media':
        return 'Média';
      case 'alta':
        return 'Alta';
      case 'urgente':
        return 'Urgente';
      default:
        return prioridade;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('pt-BR')} às ${timeString}`;
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    const isLast = index === solicitacao.timeline.length - 1;

    return (
      <View key={item.id} style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
          <View
            style={[
              styles.timelineDot,
              { backgroundColor: theme.colors.primary },
            ]}
          />
          {!isLast && (
            <View
              style={[
                styles.timelineLine,
                { backgroundColor: theme.colors.border },
              ]}
            />
          )}
        </View>
        <View
          style={[
            styles.timelineContent,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            style={[styles.timelineDate, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
          >
            {formatDateTime(item.data, item.hora)}
          </Text>
          <Text
            style={[styles.timelineStatus, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {item.status}
          </Text>
          <Text
            style={[
              styles.timelineDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            {item.descricao}
          </Text>
          {item.responsavel && (
            <Text
              style={[
                styles.timelineResponsavel,
                { color: theme.colors.primary },
              ]}
            >
              {item.responsavel}
            </Text>
          )}
          {item.observacoes && (
            <Text
              style={[
                styles.timelineObservacoes,
                { color: theme.colors.textSecondary },
              ]}
            >
              {item.observacoes}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Detalhes da Solicitação"
        showBackButton
        onBackPress={handleBackPress}
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Info */}
          <View
            style={[
              styles.headerCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.headerTop}>
              <View style={styles.tipoContainer}>
                <Ionicons
                  name={getTipoIcon(solicitacao.tipo) as any}
                  size={24}
                  color={theme.colors.primary}
                />
                <Text
                  style={[styles.tipoText, { color: theme.colors.primary }]}
                >
                  {getTipoLabel(solicitacao.tipo)}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(solicitacao.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusLabel(solicitacao.status)}
                </Text>
              </View>
            </View>

            <Text style={[styles.titulo, { color: theme.colors.text }]}>
              {solicitacao.titulo}
            </Text>

            <Text
              style={[styles.protocolo, { color: theme.colors.textSecondary }]}
            >
              Protocolo: {solicitacao.protocolo}
            </Text>
          </View>

          {/* Informações Gerais */}
          <View
            style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações Gerais
            </Text>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Categoria:
              </Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {solicitacao.categoria}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Prioridade:
              </Text>
              <View style={styles.prioridadeContainer}>
                <View
                  style={[
                    styles.prioridadeDot,
                    {
                      backgroundColor: getPrioridadeColor(
                        solicitacao.prioridade
                      ),
                    },
                  ]}
                />
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {getPrioridadeLabel(solicitacao.prioridade)}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Data de Criação:
              </Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {formatDate(solicitacao.dataCriacao)}
              </Text>
            </View>

            {solicitacao.dataAtualizacao && (
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Última Atualização:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {formatDate(solicitacao.dataAtualizacao)}
                </Text>
              </View>
            )}

            {solicitacao.endereco && (
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Endereço:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {solicitacao.endereco}
                </Text>
              </View>
            )}
          </View>

          {/* Descrição */}
          <View
            style={[
              styles.descricaoCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Descrição
            </Text>
            <Text
              style={[
                styles.descricaoText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {solicitacao.descricao}
            </Text>
            {solicitacao.observacoes && (
              <>
                <Text
                  style={[
                    styles.observacoesTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  Observações:
                </Text>
                <Text
                  style={[
                    styles.observacoesText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {solicitacao.observacoes}
                </Text>
              </>
            )}
          </View>

          {/* Anexos */}
          {solicitacao.anexos && solicitacao.anexos.length > 0 && (
            <View
              style={[
                styles.anexosCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Anexos ({solicitacao.anexos.length})
              </Text>
              {solicitacao.anexos.map((anexo, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.anexoItem,
                    { borderColor: theme.colors.border },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="document-attach"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <View style={styles.anexoInfo}>
                    <Text
                      style={[styles.anexoNome, { color: theme.colors.text }]}
                    >
                      {anexo.nome}
                    </Text>
                    <Text
                      style={[
                        styles.anexoDetalhes,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {anexo.tipo} • {anexo.tamanho}
                    </Text>
                  </View>
                  <Ionicons
                    name="download"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Timeline */}
          <View
            style={[
              styles.timelineCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Histórico da Solicitação
            </Text>
            <View style={styles.timeline}>
              {solicitacao.timeline.map((item, index) =>
                renderTimelineItem(item, index)
              )}
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.primary },
              ]}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chatbubble"
                size={20}
                color={theme.colors.onPrimary}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  { color: theme.colors.onPrimary },
                ]}
              >
                Enviar Mensagem
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 40,
  },
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipoText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  protocolo: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  prioridadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  prioridadeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  descricaoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  descricaoText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  observacoesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  observacoesText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  anexosCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  anexoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  anexoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  anexoNome: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  anexoDetalhes: {
    fontSize: 12,
  },
  timelineCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    paddingTop: 0,
  },

  timelineStatus: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  timelineDate: {
    fontSize: 12,
    marginBottom: 4,
    marginTop: 0,
  },
  timelineDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  timelineResponsavel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineObservacoes: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
