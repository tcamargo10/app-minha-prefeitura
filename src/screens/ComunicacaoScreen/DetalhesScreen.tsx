import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { YouTubeVideo } from '@/components/YouTubeVideo';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import {
  communicationService,
  CommunicationWithLinks,
} from '@/services/communicationService';

interface ComunicadoDetalhes {
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
  autor?: string;
  local?: string;
  horario?: string;
}

type ComunicacaoDetalhesRouteProp = RouteProp<
  {
    ComunicacaoDetalhes: { comunicado: ComunicadoDetalhes };
  },
  'ComunicacaoDetalhes'
>;

export const ComunicacaoDetalhesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, citizen } = useAuth();
  const navigation = useNavigation();
  const route = useRoute<ComunicacaoDetalhesRouteProp>();
  const { comunicado: initialComunicado } = route.params;

  const [comunicado, setComunicado] =
    useState<ComunicadoDetalhes>(initialComunicado);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const getLinkIcon = (tipo: string) => {
    switch (tipo) {
      case 'documento':
        return 'document-text';
      case 'site':
        return 'globe';
      case 'formulario':
        return 'clipboard';
      default:
        return 'link';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => {
      console.error('Erro ao abrir link:', err);
      Alert.alert('Erro', 'Não foi possível abrir o link.');
    });
  };

  const isExpired = (dataExpiracao?: string) => {
    if (!dataExpiracao) return false;
    const expiracao = new Date(dataExpiracao);
    const hoje = new Date();
    return hoje > expiracao;
  };

  // Função para converter dados do Supabase para o formato da interface
  const convertCommunicationToComunicado = (
    communication: CommunicationWithLinks
  ): ComunicadoDetalhes => {
    // Converter tipo do inglês para português
    const mapTipo = (
      type: string
    ): 'noticia' | 'informacao' | 'alerta' | 'evento' => {
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
      autor: communication.author,
      local: communication.location,
      horario: communication.schedule,
    };
  };

  // Buscar dados atualizados do Supabase
  const fetchCommunicationDetails = async () => {
    try {
      setLoading(true);
      const communication = await communicationService.getCommunicationById(
        comunicado.id
      );

      if (communication) {
        const updatedComunicado =
          convertCommunicationToComunicado(communication);
        setComunicado(updatedComunicado);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da comunicação:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os detalhes da comunicação.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o pull-to-refresh
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchCommunicationDetails();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Marcar como lida quando a tela for aberta
  useEffect(() => {
    if (citizen?.id) {
      communicationService
        .markAsRead(comunicado.id, citizen.id)
        .catch(error => {
          console.error('Erro ao marcar como lida:', error);
        });
    }
  }, [comunicado.id, citizen?.id]);

  // Buscar dados atualizados quando a tela for montada
  useEffect(() => {
    fetchCommunicationDetails();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Detalhes"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <>
              {/* Header Section */}
              <View style={styles.headerSection}>
                <View style={styles.tipoContainer}>
                  <Ionicons
                    name={
                      getTipoIcon(
                        comunicado.tipo
                      ) as keyof typeof Ionicons.glyphMap
                    }
                    size={24}
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

                <Text style={[styles.titulo, { color: theme.colors.text }]}>
                  {comunicado.titulo}
                </Text>

                <Text
                  style={[styles.resumo, { color: theme.colors.textSecondary }]}
                >
                  {comunicado.resumo}
                </Text>

                <View style={styles.metaInfo}>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={theme.colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.metaText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Publicado em {formatDate(comunicado.dataPublicacao)}
                    </Text>
                  </View>
                  {comunicado.autor && (
                    <View style={styles.metaItem}>
                      <Ionicons
                        name="person-outline"
                        size={16}
                        color={theme.colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.metaText,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        Por {comunicado.autor}
                      </Text>
                    </View>
                  )}
                  {comunicado.dataExpiracao && (
                    <View style={styles.metaItem}>
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color={theme.colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.metaText,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        Expira em {formatDate(comunicado.dataExpiracao)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Banner/Imagem */}
              {comunicado.imagem && (
                <View style={styles.bannerContainer}>
                  <Image
                    source={{ uri: comunicado.imagem }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* Informações do Evento */}
              {comunicado.tipo === 'evento' &&
                (comunicado.local || comunicado.horario) && (
                  <View
                    style={[
                      styles.eventoInfo,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.eventoTitle, { color: theme.colors.text }]}
                    >
                      Informações do Evento
                    </Text>
                    {comunicado.local && (
                      <View style={styles.eventoItem}>
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color={getTipoColor(comunicado.tipo)}
                        />
                        <Text
                          style={[
                            styles.eventoText,
                            { color: theme.colors.text },
                          ]}
                        >
                          {comunicado.local}
                        </Text>
                      </View>
                    )}
                    {comunicado.horario && (
                      <View style={styles.eventoItem}>
                        <Ionicons
                          name="time-outline"
                          size={20}
                          color={getTipoColor(comunicado.tipo)}
                        />
                        <Text
                          style={[
                            styles.eventoText,
                            { color: theme.colors.text },
                          ]}
                        >
                          {comunicado.horario}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

              {/* Conteúdo Principal */}
              <View style={styles.conteudoSection}>
                <Text
                  style={[styles.conteudoTitle, { color: theme.colors.text }]}
                >
                  Conteúdo
                </Text>
                <Text style={[styles.conteudo, { color: theme.colors.text }]}>
                  {comunicado.conteudo}
                </Text>
              </View>

              {/* Vídeo */}
              {comunicado.video && (
                <View style={styles.videoSection}>
                  <YouTubeVideo
                    videoUrl={comunicado.video}
                    title="Vídeo Relacionado"
                    height={200}
                  />
                </View>
              )}

              {/* Links Relacionados */}
              {comunicado.links && comunicado.links.length > 0 && (
                <View style={styles.linksSection}>
                  <Text
                    style={[styles.sectionTitle, { color: theme.colors.text }]}
                  >
                    Links Relacionados
                  </Text>
                  {comunicado.links.map((link, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.linkCard,
                        {
                          backgroundColor: theme.colors.surface,
                          borderColor: theme.colors.border,
                        },
                      ]}
                      onPress={() => handleLinkPress(link.url)}
                    >
                      <Ionicons
                        name={
                          getLinkIcon(
                            link.tipo
                          ) as keyof typeof Ionicons.glyphMap
                        }
                        size={24}
                        color={theme.colors.primary}
                      />
                      <View style={styles.linkContent}>
                        <Text
                          style={[
                            styles.linkTitle,
                            { color: theme.colors.text },
                          ]}
                        >
                          {link.titulo}
                        </Text>
                        <Text
                          style={[
                            styles.linkUrl,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          {link.url}
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={theme.colors.textSecondary}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

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
    marginBottom: 24,
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipoText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  destaqueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  destaqueText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  expiradoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  expiradoText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  resumo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  metaInfo: {
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 6,
  },
  bannerContainer: {
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  eventoInfo: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  eventoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  eventoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventoText: {
    fontSize: 16,
    marginLeft: 8,
  },
  conteudoSection: {
    marginBottom: 24,
  },
  conteudoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  conteudo: {
    fontSize: 16,
    lineHeight: 24,
  },
  videoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  linksSection: {
    marginBottom: 24,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  linkContent: {
    flex: 1,
    marginLeft: 12,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  linkUrl: {
    fontSize: 12,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
