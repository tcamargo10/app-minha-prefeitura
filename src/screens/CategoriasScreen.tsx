import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { CategoriesGrid } from '@/components/CategoriesGrid';
import { useTheme } from '@/contexts/ThemeContext';

export const CategoriasScreen: React.FC = () => {
  const { theme } = useTheme();

  const zeladoriaCategories = [
    {
      id: 1,
      icon: 'trash',
      title: 'Limpeza',
      color: '#FF9500',
    },
    {
      id: 2,
      icon: 'leaf',
      title: 'Manutenção de Praças',
      color: '#FF9500',
    },
    {
      id: 3,
      icon: 'tree',
      title: 'Manutenção de Parques',
      color: '#FF9500',
    },
  ];

  const mobilidadeUrbanaCategories = [
    {
      id: 4,
      icon: 'traffic-light',
      title: 'SEMOB',
      color: '#00CED1',
    },
    {
      id: 5,
      icon: 'card',
      title: 'Credencial de Estacionamento',
      color: '#00CED1',
    },
    {
      id: 6,
      icon: 'car',
      title: 'Táxi/Escolar/Turismo',
      color: '#00CED1',
    },
    {
      id: 7,
      icon: 'warning',
      title: 'Infrações de Trânsito',
      color: '#00CED1',
    },
  ];

  const infraestruturaCategories = [
    {
      id: 8,
      icon: 'bulb',
      title: 'Iluminação',
      color: '#FF3B30',
    },
    {
      id: 9,
      icon: 'road',
      title: 'Manutenção de vias',
      color: '#FF3B30',
    },
    {
      id: 10,
      icon: 'location',
      title: 'Consulte sua Rua',
      color: '#FF3B30',
    },
  ];

  const desenvolvimentoUrbanoCategories = [
    {
      id: 11,
      icon: 'storefront',
      title: 'Feira Móvel',
      color: '#FF9500',
    },
    {
      id: 12,
      icon: 'megaphone',
      title: 'Publicidade',
      color: '#FF9500',
    },
    {
      id: 13,
      icon: 'location',
      title: 'Uso do Solo',
      color: '#FF9500',
    },
    {
      id: 14,
      icon: 'business',
      title: 'Cemitérios',
      color: '#FF9500',
    },
    {
      id: 15,
      icon: 'leaf',
      title: 'Poda de Árvore',
      color: '#FF9500',
    },
    {
      id: 16,
      icon: 'people',
      title: 'Agricultura Familiar',
      color: '#FF9500',
    },
  ];

  const animaisCategories = [
    {
      id: 17,
      icon: 'paw',
      title: 'Apreensão de Animais',
      color: '#FF2D92',
    },
    {
      id: 18,
      icon: 'heart',
      title: 'Bem-Estar Animal',
      color: '#FF2D92',
    },
    {
      id: 19,
      icon: 'medical',
      title: 'Vacinação',
      color: '#FF2D92',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Categorias" />
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
});
