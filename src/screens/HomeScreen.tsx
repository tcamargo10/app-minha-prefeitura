import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BannerSection } from '@/components/BannerSection';
import { CategoriesGrid } from '@/components/CategoriesGrid';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ServicesGrid } from '@/components/ServicesGrid';
import { useTheme } from '@/contexts/ThemeContext';
import { useCity } from '@/contexts/CityContext';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { categoryService, Category } from '@/services/categoryService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { currentCity } = useCity();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [highlightCategories, setHighlightCategories] = useState<Category[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHighlightCategories();
  }, [currentCity]);

  const loadHighlightCategories = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Buscar categorias em destaque da cidade selecionada
      const data = await categoryService.getHighlightCategories(currentCity.id);
      setHighlightCategories(data);
    } catch (err) {
      setError('Erro ao carregar categorias em destaque');
      console.error('Erro ao carregar categorias em destaque:', err);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const onRefresh = () => {
    loadHighlightCategories(true);
  };

  const handleCategoriaPress = (categoria: Category) => {
    navigation.navigate('Servicos' as any, {
      categoriaId: categoria.id,
      categoriaTitulo: categoria.name,
    });
  };

  const featuredServices = [
    {
      id: 1,
      icon: 'bulb',
      title: 'Problema na Iluminação',
      color: '#007AFF',
    },
    {
      id: 2,
      icon: 'medical',
      title: 'Solicite aqui seu Cartão...',
      color: '#34C759',
    },
    {
      id: 3,
      icon: 'home',
      title: 'IPTU/ITBI/TCR',
      color: '#FF9500',
    },
    {
      id: 4,
      icon: 'reload-circle',
      title: 'Coleta Seletiva',
      color: '#30D158',
    },
  ];

  // Converter categorias do Supabase para o formato esperado pelo CategoriesGrid
  const formatHighlightCategoriesForGrid = (categories: Category[]) => {
    return categories.map(category => ({
      id: category.id,
      icon: category.icon || 'help-circle',
      title: category.name,
      color: category.color || '#007AFF',
      onPress: () => handleCategoriaPress(category),
    }));
  };

  const banners = [
    {
      id: 1,
      imageUrl: require('../../assets/banner-1.png'),
    },
    {
      id: 2,
      imageUrl: require('../../assets/banner-2.png'),
    },
    {
      id: 3,
      imageUrl: require('../../assets/banner-3.png'),
    },
  ];

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
            />
          }
        >
          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={[styles.greetingText, { color: theme.colors.text }]}>
              Olá, {user?.user_metadata?.name?.split(' ')[0] || 'Usuário'}
            </Text>
          </View>

          {/* Banner Section */}
          <BannerSection banners={banners} />

          {/* Featured Services Section */}
          <ServicesGrid
            title="Serviços em destaque"
            services={featuredServices}
          />

          {/* Featured Categories Section */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Carregando categorias em destaque...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </Text>
            </View>
          ) : highlightCategories.length > 0 ? (
            <CategoriesGrid
              title="Categorias em destaque"
              categories={formatHighlightCategoriesForGrid(highlightCategories)}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhuma categoria em destaque encontrada
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
  greetingSection: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
