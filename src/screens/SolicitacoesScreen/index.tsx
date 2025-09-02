import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';
import { useCity } from '@/contexts/CityContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { BottomTabParamList } from '@/navigation/BottomTabNavigator';

type SolicitacoesScreenNavigationProp = StackNavigationProp<
  BottomTabParamList,
  'Solicitacoes'
>;

interface Solicitacao {
  id: string;
  request_type: 'documento' | 'servico' | 'denuncia' | 'sugestao';
  service_name: string;
  notes: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
  protocol: string;
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  address?: string;
}

export const SolicitacoesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentCity } = useCity();
  const { user } = useAuth();
  const navigation = useNavigation<SolicitacoesScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  // Função para buscar solicitações do usuário
  const fetchSolicitacoes = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Buscar o citizen_id baseado no user_id
      const { data: citizenData, error: citizenError } = await supabase
        .from('citizens')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (citizenError) {
        console.error(
          'ERRO CRÍTICO - Usuário logado sem registro de citizen:',
          {
            user_id: user.id,
            error: citizenError,
          }
        );
        Alert.alert(
          'Erro no Sistema',
          'Há um problema com seu perfil. Entre em contato com o suporte.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // Buscar solicitações diretamente da tabela service_requests com JOIN
      const { data: solicitacoesData, error: solicitacoesError } =
        await supabase
          .from('service_requests')
          .select(
            `
          id,
          protocol,
          request_type,
          notes,
          status,
          priority,
          address,
          created_at,
          updated_at,
          services!inner(name)
        `
          )
          .eq('citizen_id', citizenData.id)
          .order('created_at', { ascending: false });

      if (solicitacoesError) {
        console.error('Erro ao buscar solicitações:', solicitacoesError);
        Alert.alert('Erro', 'Não foi possível carregar suas solicitações');
        setLoading(false);
        return;
      }

      // Mapear os dados para o formato esperado
      const solicitacoesMapeadas: Solicitacao[] = (solicitacoesData || []).map(
        item => ({
          id: item.id,
          request_type: item.request_type || 'servico',
          service_name: item.services?.name || 'Serviço',
          notes: item.notes || '',
          status: item.status || 'pending',
          created_at: item.created_at,
          updated_at: item.updated_at,
          protocol: item.protocol || '',
          priority: item.priority || 'media',
          address: item.address,
        })
      );

      setSolicitacoes(solicitacoesMapeadas);
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Carregar dados na inicialização
  useEffect(() => {
    fetchSolicitacoes();
  }, [fetchSolicitacoes]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSolicitacoes();
    setRefreshing(false);
  }, [fetchSolicitacoes]);

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
      case 'pending':
        return '#FF9500';
      case 'in_progress':
        return '#007AFF';
      case 'completed':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Análise';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
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
              name={getTipoIcon(solicitacao.request_type) as any}
              size={20}
              color={theme.colors.primary}
            />
            <Text style={[styles.tipoText, { color: theme.colors.primary }]}>
              {getTipoLabel(solicitacao.request_type)}
            </Text>
          </View>
          <Text
            style={[
              styles.protocoloText,
              { color: theme.colors.textSecondary },
            ]}
          >
            Protocolo: {solicitacao.protocol}
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
        {solicitacao.service_name}
      </Text>
      <Text
        style={[styles.descricaoText, { color: theme.colors.textSecondary }]}
        numberOfLines={2}
      >
        {solicitacao.notes}
      </Text>

      <View style={styles.solicitacaoFooter}>
        <Text style={[styles.dataText, { color: theme.colors.textSecondary }]}>
          Criada em: {formatDate(solicitacao.created_at)}
        </Text>
        {solicitacao.updated_at && (
          <Text
            style={[styles.dataText, { color: theme.colors.textSecondary }]}
          >
            Atualizada em: {formatDate(solicitacao.updated_at)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const getStatusCount = (status: string) => {
    return solicitacoes.filter(s => s.status === status).length;
  };

  return (
    <ScreenWrapper showCitySelector showProfileIcon>
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
                {getStatusCount('pending')}
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
                {getStatusCount('in_progress')}
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
                {getStatusCount('completed')}
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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Carregando suas solicitações...
              </Text>
            </View>
          ) : solicitacoes.length > 0 ? (
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
    </ScreenWrapper>
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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
