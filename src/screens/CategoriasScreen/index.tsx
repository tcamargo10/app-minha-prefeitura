import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CategoriesGrid } from '@/components/CategoriesGrid';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomTabParamList } from '@/navigation/BottomTabNavigator';

type CategoriasScreenNavigationProp = StackNavigationProp<
  BottomTabParamList,
  'Categorias'
>;

export const CategoriasScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<CategoriasScreenNavigationProp>();

  const handleCategoriaPress = (categoria: any) => {
    navigation.navigate('Servicos' as any, {
      categoriaId: categoria.id,
      categoriaTitulo: categoria.title,
    });
  };

  const zeladoriaCategories = [
    {
      id: 1,
      icon: 'trash',
      title: 'Limpeza',
      color: '#FF9500',
      onPress: () => handleCategoriaPress({ id: 1, title: 'Limpeza' }),
    },
    {
      id: 2,
      icon: 'leaf',
      title: 'Manutenção de Praças',
      color: '#FF9500',
      onPress: () =>
        handleCategoriaPress({ id: 2, title: 'Manutenção de Praças' }),
    },
    {
      id: 3,
      icon: 'tree',
      title: 'Manutenção de Parques',
      color: '#FF9500',
      onPress: () =>
        handleCategoriaPress({ id: 3, title: 'Manutenção de Parques' }),
    },
  ];

  const mobilidadeUrbanaCategories = [
    {
      id: 4,
      icon: 'traffic-light',
      title: 'SEMOB',
      color: '#00CED1',
      onPress: () => handleCategoriaPress({ id: 4, title: 'SEMOB' }),
    },
    {
      id: 5,
      icon: 'card',
      title: 'Credencial de Estacionamento',
      color: '#00CED1',
      onPress: () =>
        handleCategoriaPress({ id: 5, title: 'Credencial de Estacionamento' }),
    },
    {
      id: 6,
      icon: 'car',
      title: 'Táxi/Escolar/Turismo',
      color: '#00CED1',
      onPress: () =>
        handleCategoriaPress({ id: 6, title: 'Táxi/Escolar/Turismo' }),
    },
    {
      id: 7,
      icon: 'warning',
      title: 'Infrações de Trânsito',
      color: '#00CED1',
      onPress: () =>
        handleCategoriaPress({ id: 7, title: 'Infrações de Trânsito' }),
    },
  ];

  const infraestruturaCategories = [
    {
      id: 8,
      icon: 'bulb',
      title: 'Iluminação',
      color: '#FF3B30',
      onPress: () => handleCategoriaPress({ id: 8, title: 'Iluminação' }),
    },
    {
      id: 9,
      icon: 'road',
      title: 'Manutenção de vias',
      color: '#FF3B30',
      onPress: () =>
        handleCategoriaPress({ id: 9, title: 'Manutenção de vias' }),
    },
    {
      id: 10,
      icon: 'location',
      title: 'Consulte sua Rua',
      color: '#FF3B30',
      onPress: () =>
        handleCategoriaPress({ id: 10, title: 'Consulte sua Rua' }),
    },
  ];

  const desenvolvimentoUrbanoCategories = [
    {
      id: 11,
      icon: 'storefront',
      title: 'Feira Móvel',
      color: '#FF9500',
      onPress: () => handleCategoriaPress({ id: 11, title: 'Feira Móvel' }),
    },
    {
      id: 12,
      icon: 'megaphone',
      title: 'Publicidade',
      color: '#FF9500',
      onPress: () => handleCategoriaPress({ id: 12, title: 'Publicidade' }),
    },
    {
      id: 13,
      icon: 'location',
      title: 'Uso do Solo',
      color: '#FF9500',
      onPress: () => handleCategoriaPress({ id: 13, title: 'Uso do Solo' }),
    },
    {
      id: 14,
      icon: 'business',
      title: 'Cemitérios',
      color: '#FF9500',
      onPress: () => handleCategoriaPress({ id: 14, title: 'Cemitérios' }),
    },
    {
      id: 15,
      icon: 'leaf',
      title: 'Poda de Árvore',
      color: '#FF9500',
      onPress: () => handleCategoriaPress({ id: 15, title: 'Poda de Árvore' }),
    },
    {
      id: 16,
      icon: 'people',
      title: 'Agricultura Familiar',
      color: '#FF9500',
      onPress: () =>
        handleCategoriaPress({ id: 16, title: 'Agricultura Familiar' }),
    },
  ];

  const animaisCategories = [
    {
      id: 17,
      icon: 'paw',
      title: 'Apreensão de Animais',
      color: '#FF2D92',
      onPress: () =>
        handleCategoriaPress({ id: 17, title: 'Apreensão de Animais' }),
    },
    {
      id: 18,
      icon: 'heart',
      title: 'Bem-Estar Animal',
      color: '#FF2D92',
      onPress: () =>
        handleCategoriaPress({ id: 18, title: 'Bem-Estar Animal' }),
    },
    {
      id: 19,
      icon: 'medical',
      title: 'Vacinação',
      color: '#FF2D92',
      onPress: () => handleCategoriaPress({ id: 19, title: 'Vacinação' }),
    },
  ];

  return (
    <ScreenWrapper showCitySelector>
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Zeladoria Section */}
          <CategoriesGrid title="Zeladoria" categories={zeladoriaCategories} />

          {/* Mobilidade Urbana Section */}
          <CategoriesGrid
            title="Mobilidade Urbana"
            categories={mobilidadeUrbanaCategories}
          />

          {/* Infraestrutura Section */}
          <CategoriesGrid
            title="Infraestrutura"
            categories={infraestruturaCategories}
          />

          {/* Desenvolvimento Urbano Section */}
          <CategoriesGrid
            title="Desenvolvimento Urbano"
            categories={desenvolvimentoUrbanoCategories}
          />

          {/* Animais Section */}
          <CategoriesGrid title="Animais" categories={animaisCategories} />
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
});
