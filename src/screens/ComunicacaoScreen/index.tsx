import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
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

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';
import { useCity } from '@/contexts/CityContext';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/navigation/AppNavigator';
import {
  communicationService,
  CommunicationWithLinks,
} from '@/services/communicationService';

// Interface para compatibilidade com o código existente
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
  local?: string;
  horario?: string;
}

type ComunicacaoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ComunicacaoDetalhes'
>;

export const ComunicacaoScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentCity } = useCity();
  const { user, citizen } = useAuth();
  const navigation = useNavigation<ComunicacaoScreenNavigationProp>();


  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  // Função para converter dados do Supabase para o formato da interface
  const convertCommunicationToComunicado = (
    communication: CommunicationWithLinks
  ): Comunicado => {
    // Converter tipo do inglês para português
    const mapTipo = (type: string): 'noticia' | 'informacao' | 'alerta' | 'evento' => {
      switch (type) {
        case 'news':
          return 'noticia';
        case 'information':
          return 'informacao';
        case 'alert':
          return 'alerta';
        case 'event':
          return 'evento';
        default:
          return 'noticia';
      }
    };

    return {
      id: communication.id,
      tipo: mapTipo(communication.type),
      titulo: communication.title,
      resumo: communication.summary,
      conteudo: communication.content,
      dataPublicacao: communication.published_at,
      dataExpiracao: communication.expires_at,
      imagem: communication.image_url,
      video: communication.video_url,
      links: communication.links?.map(link => ({
        titulo: link.title,
        url: link.url,
        tipo: link.type as 'documento' | 'site' | 'formulario',
      })),
      destaque: communication.featured,
      lido: false, // Será atualizado quando implementarmos o status de leitura
      autor: communication.author,
      local: communication.location,
      horario: communication.schedule,
    };
  };

  // Função para buscar comunicações
  const fetchCommunications = async () => {
    if (!currentCity?.id) {
      setComunicados([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const communications =
        await communicationService.getCommunicationsByMunicipality(
          currentCity.id
        );

      // Converter e verificar status de leitura para cada comunicação
      const comunicadosWithReadStatus = await Promise.all(
        communications.map(async communication => {
          const comunicado = convertCommunicationToComunicado(communication);

          // Verificar se foi lida (se o cidadão estiver logado)
          if (citizen?.id) {
            try {
              const isRead = await communicationService.isRead(
                communication.id,
                citizen.id
              );
              comunicado.lido = isRead;
            } catch (error) {
              console.error('Erro ao verificar status de leitura:', error);
              comunicado.lido = false;
            }
          }

          return comunicado;
        })
      );

      setComunicados(comunicadosWithReadStatus);
    } catch (error) {
      console.error('Erro ao buscar comunicações:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar as comunicações. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Buscar comunicações quando a cidade mudar
  useEffect(() => {
    fetchCommunications();
  }, [currentCity?.id]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchCommunications();
    } catch (error) {
      console.error('Erro ao atualizar comunicações:', error);
      Alert.alert(
        'Erro',
        'Não foi possível atualizar as comunicações. Tente novamente.'
      );
    } finally {
      setRefreshing(false);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'noticia':
        return 'newspaper-outline';
      case 'informacao':
        return 'information-circle-outline';
      case 'alerta':
        return 'warning-outline';
      case 'evento':
        return 'calendar-outline';
      default:
        return 'help-circle-outline';
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
      onPress={() => navigation.navigate('ComunicacaoDetalhes', { comunicado })}
    >
      <View style={styles.comunicadoHeader}>
        <View style={styles.comunicadoInfo}>
          <View style={styles.comunicadoTipo}>
            <Ionicons
              name={getTipoIcon(comunicado.tipo) as keyof typeof Ionicons.glyphMap}
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
              title="Puxe para atualizar"
              titleColor={theme.colors.textSecondary}
            />
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
            {currentCity && (
              <Text style={[styles.cityInfo, { color: theme.colors.primary }]}>
                📍 {currentCity.name} - {currentCity.state}
              </Text>
            )}
          </View>

          {/* Loading State */}
          {loading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Carregando comunicações...
              </Text>
            </View>
          ) : (
            <>
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
                    {currentCity
                      ? 'Os comunicados da prefeitura aparecerão aqui'
                      : 'Selecione uma cidade para ver as comunicações'}
                  </Text>
                  {!currentCity && (
                    <TouchableOpacity
                      style={[
                        styles.selectCityButton,
                        { backgroundColor: theme.colors.primary },
                      ]}
                      onPress={() => {
                        Alert.alert(
                          'Selecionar Cidade',
                          'Navegue para a tela de perfil para selecionar uma cidade.'
                        );
                      }}
                    >
                      <Text
                        style={[
                          styles.selectCityButtonText,
                          { color: theme.colors.onPrimary },
                        ]}
                      >
                        Selecionar Cidade
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
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
  loadingState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  cityInfo: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  selectCityButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectCityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
