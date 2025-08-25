import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CategoriesGrid } from '@/components/CategoriesGrid';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';
import { useCity } from '@/contexts/CityContext';
import { BottomTabParamList } from '@/navigation/BottomTabNavigator';
import { categoryService, Category } from '@/services/categoryService';

type CategoriasScreenNavigationProp = StackNavigationProp<
  BottomTabParamList,
  'Categorias'
>;

export const CategoriasScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentCity } = useCity();
  const navigation = useNavigation<CategoriasScreenNavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, [currentCity]);

  const loadCategories = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const data = await categoryService.getCategories(currentCity.id);
      setCategories(data);

      // Se não há dados, não é erro, apenas estado vazio
      if (data.length === 0) {
        setError(null);
      }
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error('Erro ao carregar categorias:', err);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const onRefresh = () => {
    loadCategories(true);
  };

  const handleCategoriaPress = (categoria: Category) => {
    navigation.navigate('Servicos' as any, {
      categoriaId: categoria.id,
      categoriaTitulo: categoria.name,
    });
  };

  // Agrupar categorias por type_categories
  const groupCategoriesByType = (categories: Category[]) => {
    const grouped = categories.reduce(
      (acc, category) => {
        const type = category.type_categories;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push({
          id: category.id,
          icon: category.icon || 'help-circle',
          title: category.name,
          color: category.color || '#007AFF',
          onPress: () => handleCategoriaPress(category),
        });
        return acc;
      },
      {} as Record<string, any[]>
    );

    return grouped;
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Carregando categorias...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </Text>
            </View>
          ) : categories.length > 0 ? (
            <>
              {Object.entries(groupCategoriesByType(categories)).map(
                ([type, typeCategories]) => (
                  <CategoriesGrid
                    key={type}
                    title={type}
                    categories={typeCategories}
                  />
                )
              )}
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhuma categoria encontrada
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
