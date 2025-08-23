import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomTabParamList } from '@/navigation/BottomTabNavigator';

type SolicitacoesScreenNavigationProp = StackNavigationProp<
  BottomTabParamList,
  'Solicitacoes'
>;

interface Solicitacao {
  id: string;
  tipo: 'documento' | 'servico' | 'denuncia' | 'sugestao';
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em_analise' | 'aprovada' | 'rejeitada' | 'concluida';
  dataCriacao: string;
  dataAtualizacao?: string;
  protocolo: string;
}

export const SolicitacoesScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<SolicitacoesScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([
    {
      id: '1',
      tipo: 'documento',
      titulo: 'Segunda Via de RG',
      descricao: 'Solicitação de segunda via do documento de identidade',
      status: 'em_analise',
      dataCriacao: '2024-01-15',
      dataAtualizacao: '2024-01-18',
      protocolo: '2024001',
    },
    {
      id: '2',
      tipo: 'servico',
      titulo: 'Limpeza de Bueiro',
      descricao: 'Solicitação de limpeza de bueiro na Rua das Flores',
      status: 'concluida',
      dataCriacao: '2024-01-10',
      dataAtualizacao: '2024-01-16',
      protocolo: '2024002',
    },
    {
      id: '3',
      tipo: 'denuncia',
      titulo: 'Lixo Irregular',
      descricao: 'Denúncia de descarte irregular de lixo',
      status: 'pendente',
      dataCriacao: '2024-01-20',
      protocolo: '2024003',
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSolicitacaoPress = (solicitacao: Solicitacao) => {
    navigation.navigate('SolicitacoesDetalhes' as any, {
      solicitacaoId: solicitacao.id,
    });
  };

  const renderSolicitacao = (solicitacao: Solicitacao) => (
    <TouchableOpacity
      key={solicitacao.id}
      style={[
        styles.solicitacaoCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={() => handleSolicitacaoPress(solicitacao)}
      activeOpacity={0.7}
    >
      <View style={styles.solicitacaoHeader}>
        <View style={styles.solicitacaoInfo}>
          <View style={styles.solicitacaoTipo}>
            <Ionicons
              name={getTipoIcon(solicitacao.tipo) as any}
              size={20}
              color={theme.colors.primary}
            />
            <Text style={[styles.tipoText, { color: theme.colors.primary }]}>
              {getTipoLabel(solicitacao.tipo)}
            </Text>
          </View>
          <Text
            style={[
              styles.protocoloText,
              { color: theme.colors.textSecondary },
            ]}
          >
            Protocolo: {solicitacao.protocolo}
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

      <Text style={[styles.tituloText, { color: theme.colors.text }]}>
        {solicitacao.titulo}
      </Text>
      <Text
        style={[styles.descricaoText, { color: theme.colors.textSecondary }]}
        numberOfLines={2}
      >
        {solicitacao.descricao}
      </Text>

      <View style={styles.solicitacaoFooter}>
        <Text style={[styles.dataText, { color: theme.colors.textSecondary }]}>
          Criada em: {formatDate(solicitacao.dataCriacao)}
        </Text>
        {solicitacao.dataAtualizacao && (
          <Text
            style={[styles.dataText, { color: theme.colors.textSecondary }]}
          >
            Atualizada em: {formatDate(solicitacao.dataAtualizacao)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const getStatusCount = (status: string) => {
    return solicitacoes.filter(s => s.status === status).length;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Minhas Solicitações" />
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
              name="list-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Minhas Solicitações
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Acompanhe o status de suas solicitações
            </Text>
          </View>

          {/* Status Summary */}
          <View style={styles.statusSummary}>
            <View style={styles.statusItem}>
              <Text
                style={[styles.statusCount, { color: theme.colors.primary }]}
              >
                {getStatusCount('pendente')}
              </Text>
              <Text
                style={[
                  styles.statusLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Pendentes
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={[styles.statusCount, { color: '#007AFF' }]}>
                {getStatusCount('em_analise')}
              </Text>
              <Text
                style={[
                  styles.statusLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Em Análise
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={[styles.statusCount, { color: '#34C759' }]}>
                {getStatusCount('concluida')}
              </Text>
              <Text
                style={[
                  styles.statusLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Concluídas
              </Text>
            </View>
          </View>

          {/* Solicitações List */}
          {solicitacoes.length > 0 ? (
            <View style={styles.solicitacoesList}>
              {solicitacoes.map(renderSolicitacao)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="list-outline"
                size={48}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhuma solicitação encontrada
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Suas solicitações aparecerão aqui
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
  statusSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  solicitacoesList: {
    marginBottom: 24,
  },
  solicitacaoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  solicitacaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  solicitacaoInfo: {
    flex: 1,
  },
  solicitacaoTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tipoText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  protocoloText: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  tituloText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  descricaoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  solicitacaoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataText: {
    fontSize: 12,
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
