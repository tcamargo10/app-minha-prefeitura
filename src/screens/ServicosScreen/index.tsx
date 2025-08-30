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

interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
}

const { width } = Dimensions.get('window');

export const ServicosScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  // Pegar parâmetros da rota
  const { categoriaId, categoriaTitulo } = route.params as {
    categoriaId: number;
    categoriaTitulo: string;
  };

  // Dados mockados dos serviços por categoria
  const getServicosPorCategoria = (
    categoriaId: number,
    categoriaTitulo: string
  ): Servico[] => {
    const servicosData: Record<string, Servico[]> = {
      // Limpeza
      Limpeza: [
        {
          id: '1',
          titulo: 'Limpeza de Via Pública',
          descricao: 'Solicitação de limpeza de ruas, avenidas e praças',
          icon: 'trash',
        },
        {
          id: '2',
          titulo: 'Limpeza de Bueiros',
          descricao: 'Desentupimento e limpeza de bueiros e bocas de lobo',
          icon: 'water',
        },
        {
          id: '3',
          titulo: 'Coleta de Entulho',
          descricao: 'Remoção de entulhos e materiais de construção',
          icon: 'cube',
        },
      ],
    };

    return servicosData[categoriaTitulo] || [];
  };

  const servicos = getServicosPorCategoria(categoriaId, categoriaTitulo);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleServicoPress = (servico: Servico) => {
    (navigation as any).navigate('ServicoDetalhes', { servicoId: servico.id });
  };

  const renderServicoCard = (servico: Servico) => (
    <TouchableOpacity
      style={[
        styles.servicoCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={() => handleServicoPress(servico)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.servicoHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.primary + '20' },
            ]}
          >
            <Ionicons
              name={servico.icon as any}
              size={24}
              color={theme.colors.primary}
            />
          </View>
        </View>

        <Text
          style={[styles.servicoTitulo, { color: theme.colors.text }]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {servico.titulo}
        </Text>

        <Text
          style={[
            styles.servicoDescricao,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {servico.descricao}
        </Text>
      </View>

      <View style={styles.actionArea}>
        <Text style={[styles.actionText, { color: theme.colors.primary }]}>
          Solicitar Serviço
        </Text>
        <Ionicons name="arrow-forward" size={14} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title={categoriaTitulo}
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
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Serviços Disponíveis
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Selecione o serviço que deseja solicitar
            </Text>
            <Text
              style={[styles.servicosCount, { color: theme.colors.primary }]}
            >
              {servicos.length} serviços disponíveis
            </Text>
          </View>

          {/* Serviços List */}
          {servicos.length > 0 ? (
            <View style={styles.servicosList}>
              {servicos.map((servico, index) => (
                <View key={servico.id} style={styles.cardWrapper}>
                  {renderServicoCard(servico)}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="construct"
                size={48}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhum serviço disponível
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Os serviços desta categoria ainda não foram cadastrados
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
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  servicosCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  servicosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  cardWrapper: {
    width: (width - 60) / 2, // 2 cards por linha com padding de 20 e gap de 16
    height: 265,
  },
  servicoCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  servicoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indisponivelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  indisponivelText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  servicoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 20,
    minHeight: 60, // Altura fixa para 3 linhas (20 * 3)
  },
  servicoDescricao: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
    minHeight: 48, // Altura fixa para 3 linhas (16 * 3)
  },

  actionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    minHeight: 20,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  actionAreaDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 50, // Mesma altura fixa da área de ação
    minHeight: 50,
  },
  actionTextDisabled: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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
    lineHeight: 20,
  },
});
