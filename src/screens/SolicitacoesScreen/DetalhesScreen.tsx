import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  Clipboard,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';

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
  taskId?: string;
}

const { width } = Dimensions.get('window');

export const SolicitacoesDetalhesScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { user } = useAuth();

  // Pegar o ID da solicitação dos parâmetros da rota
  const { solicitacaoId } = route.params as { solicitacaoId: string };

  // Estados
  const [loading, setLoading] = useState(true);
  const [solicitacao, setSolicitacao] = useState<SolicitacaoDetalhes | null>(
    null
  );
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  // Função para buscar dados do Supabase
  const fetchSolicitacaoDetalhes = async () => {
    try {
      setLoading(true);

      // Buscar dados da solicitação com JOIN para obter dados relacionados
      const { data: solicitacaoData, error: solicitacaoError } = await supabase
        .from('service_request_details')
        .select('*')
        .eq('id', solicitacaoId)
        .single();

      // Buscar o task_id separadamente da tabela service_requests
      let taskId = null;
      if (solicitacaoData) {
        const { data: taskData, error: taskError } = await supabase
          .from('service_requests')
          .select('task_id')
          .eq('id', solicitacaoId)
          .single();

        if (!taskError && taskData) {
          taskId = taskData.task_id;
        }
      }

      if (solicitacaoError) {
        console.error('Erro ao buscar solicitação:', solicitacaoError);
        Alert.alert(
          'Erro',
          'Não foi possível carregar os detalhes da solicitação'
        );
        navigation.goBack();
        return;
      }

      // Buscar timeline da solicitação
      const { data: timelineData, error: timelineError } = await supabase
        .from('service_request_timeline_formatted')
        .select('*')
        .eq('request_id', solicitacaoId)
        .order('data', { ascending: false })
        .order('hora', { ascending: false });

      if (timelineError) {
        console.error('Erro ao buscar timeline:', timelineError);
      }

      // Buscar arquivos anexados
      const { data: anexosData, error: anexosError } = await supabase
        .from('service_request_files')
        .select('*')
        .eq('request_id', solicitacaoId);

      if (anexosError) {
        console.error('Erro ao buscar anexos:', anexosError);
      }

      // Mapear dados para o formato da interface
      const solicitacaoMapeada: SolicitacaoDetalhes = {
        id: solicitacaoData.id,
        tipo: mapRequestType(
          solicitacaoData.tipo || solicitacaoData.request_type || 'servico'
        ),
        titulo:
          solicitacaoData.titulo ||
          solicitacaoData.servico_nome ||
          'Solicitação',
        descricao:
          solicitacaoData.descricao || solicitacaoData.observacoes || '',
        status: mapStatus(solicitacaoData.status || 'pending'),
        dataCriacao:
          solicitacaoData.data_criacao ||
          solicitacaoData.created_at ||
          new Date().toISOString(),
        dataAtualizacao:
          solicitacaoData.data_atualizacao || solicitacaoData.updated_at,
        protocolo: solicitacaoData.protocol || 'N/A',
        categoria: solicitacaoData.categoria || 'Geral',
        prioridade:
          solicitacaoData.prioridade || solicitacaoData.priority || 'media',
        endereco: solicitacaoData.endereco || solicitacaoData.address,
        observacoes: solicitacaoData.observacoes || solicitacaoData.notes,
        timeline: mapTimeline(timelineData || []),
        anexos: mapAnexos(anexosData || []),
        taskId: taskId,
      };

      setSolicitacao(solicitacaoMapeada);
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Funções de mapeamento
  const mapRequestType = (
    type: string
  ): 'documento' | 'servico' | 'denuncia' | 'sugestao' => {
    switch (type) {
      case 'documento':
        return 'documento';
      case 'denuncia':
        return 'denuncia';
      case 'sugestao':
        return 'sugestao';
      default:
        return 'servico';
    }
  };

  const mapStatus = (
    status: string
  ): 'pendente' | 'em_analise' | 'aprovada' | 'rejeitada' | 'concluida' => {
    switch (status) {
      case 'pending':
        return 'pendente';
      case 'in_progress':
        return 'em_analise';
      case 'completed':
        return 'concluida';
      case 'cancelled':
        return 'rejeitada';
      default:
        return 'pendente';
    }
  };

  const mapTimeline = (timelineData: any[]): TimelineItem[] => {
    return timelineData.map((item, index) => ({
      id: item.id || index.toString(),
      data:
        item.data || item.action_date || new Date().toISOString().split('T')[0],
      hora: item.hora || item.action_time || '00:00',
      status: item.status || 'Atualização',
      descricao: item.descricao || item.description || 'Sem descrição',
      responsavel: item.responsavel || item.responsible_name,
      observacoes: item.observacoes || item.notes,
    }));
  };

  const mapAnexos = (
    anexosData: any[]
  ): { nome: string; tipo: string; tamanho: string }[] => {
    return anexosData.map(item => ({
      nome: item.file_name || 'Arquivo',
      tipo: item.file_type || 'Arquivo',
      tamanho: formatFileSize(item.file_size || 0),
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Carregar dados na inicialização
  useEffect(() => {
    fetchSolicitacaoDetalhes();
  }, [solicitacaoId]);

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

  const handleCopyProtocol = async () => {
    if (solicitacao?.protocolo) {
      try {
        await Clipboard.setString(solicitacao.protocolo);
        Alert.alert(
          'Sucesso',
          'Protocolo copiado para a área de transferência!'
        );
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível copiar o protocolo');
      }
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      Alert.alert('Atenção', 'Por favor, digite uma mensagem');
      return;
    }

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    if (!solicitacao) {
      Alert.alert('Erro', 'Dados da solicitação não encontrados');
      return;
    }

    try {
      setSendingMessage(true);

      // Se existe task_id, inserir comentário na tabela task_comments
      if (solicitacao.taskId) {
        const { error: commentError } = await supabase
          .from('task_comments')
          .insert({
            task_id: solicitacao.taskId,
            comment: messageText.trim(),
            created_at: new Date().toISOString(),
          });

        if (commentError) {
          console.error('Erro ao inserir comentário:', commentError);
          // Continuar mesmo se houver erro no comentário, pois ainda podemos adicionar na timeline
        }
      }

      // Adicionar entrada na timeline da solicitação (sempre fazer isso)
      const { error: timelineError } = await supabase
        .from('service_request_timeline')
        .insert({
          request_id: solicitacao.id,
          status: 'Mensagem do Cidadão',
          description: messageText.trim(),
          responsible_name:
            user.user_metadata?.full_name || user.email || 'Cidadão',
          action_date: new Date().toISOString().split('T')[0],
          action_time: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          created_by: user.id,
        });

      if (timelineError) {
        console.error('Erro ao adicionar timeline:', timelineError);
        throw timelineError; // Falhar se não conseguir adicionar na timeline
      }

      Alert.alert('Sucesso', 'Mensagem enviada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setMessageText('');
            setShowMessageModal(false);
            // Recarregar os detalhes para mostrar a nova timeline
            fetchSolicitacaoDetalhes();
          },
        },
      ]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert(
        'Erro',
        'Não foi possível enviar a mensagem. Tente novamente.'
      );
    } finally {
      setSendingMessage(false);
    }
  };

  const handleOpenMessageModal = () => {
    if (!user) {
      Alert.alert('Atenção', 'Você precisa estar logado para enviar mensagens');
      return;
    }
    setShowMessageModal(true);
  };

  const handleCloseMessageModal = () => {
    setMessageText('');
    setShowMessageModal(false);
  };

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    const isLast = index === solicitacao!.timeline.length - 1;

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

  // Loading state
  if (loading) {
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
            styles.loadingContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Error state - se não encontrou a solicitação
  if (!solicitacao) {
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
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle"
              size={48}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.errorText, { color: theme.colors.textSecondary }]}
            >
              Solicitação não encontrada
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

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

            <View style={styles.protocoloContainer}>
              <Text
                style={[
                  styles.protocolo,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Protocolo: {solicitacao.protocolo}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyProtocol}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="copy-outline"
                  size={18}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
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
              onPress={handleOpenMessageModal}
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

      {/* Modal para Enviar Mensagem */}
      <Modal
        visible={showMessageModal}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseMessageModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCloseMessageModal}
          />
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Enviar Mensagem
              </Text>
              <TouchableOpacity
                onPress={handleCloseMessageModal}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text
                style={[
                  styles.modalSubtitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Protocolo: {solicitacao?.protocolo}
              </Text>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                  Sua mensagem:
                </Text>
                <TextInput
                  style={[
                    styles.messageInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="Digite sua mensagem aqui..."
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={messageText}
                  onChangeText={setMessageText}
                  maxLength={1000}
                />
                <Text
                  style={[
                    styles.characterCount,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {messageText.length}/1000 caracteres
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    { borderColor: theme.colors.border },
                  ]}
                  onPress={handleCloseMessageModal}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.cancelButtonText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.sendButton,
                    { backgroundColor: theme.colors.primary },
                    sendingMessage && styles.disabledButton,
                  ]}
                  onPress={handleSendMessage}
                  activeOpacity={0.8}
                  disabled={sendingMessage}
                >
                  {sendingMessage ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.onPrimary}
                    />
                  ) : (
                    <>
                      <Ionicons
                        name="send"
                        size={18}
                        color={theme.colors.onPrimary}
                      />
                      <Text
                        style={[
                          styles.sendButtonText,
                          { color: theme.colors.onPrimary },
                        ]}
                      >
                        Enviar
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  protocoloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  protocolo: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 6,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  modalBody: {
    padding: 20,
    paddingTop: 0,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    maxHeight: 150,
  },
  characterCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  sendButton: {
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
