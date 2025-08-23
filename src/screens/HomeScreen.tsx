import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { BannerSection } from '@/components/BannerSection';
import { CategoriesGrid } from '@/components/CategoriesGrid';
import { ServicesGrid } from '@/components/ServicesGrid';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

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

  const featuredCategories = [
    {
      id: 1,
      icon: 'trash',
      title: 'Limpeza',
      color: '#FF9500',
    },
    {
      id: 2,
      icon: 'refresh-circle',
      title: 'Defesa Civil',
      color: '#FF9500',
    },
    {
      id: 3,
      icon: 'bulb',
      title: 'Iluminação',
      color: '#FF3B30',
    },
    {
      id: 4,
      icon: 'paw',
      title: 'Apreensão de Animais',
      color: '#FF2D92',
    },
    {
      id: 5,
      icon: 'medical',
      title: 'Cartão SUS',
      color: '#007AFF',
    },
    {
      id: 6,
      icon: 'home',
      title: 'IPTU',
      color: '#007AFF',
    },
    {
      id: 7,
      icon: 'paw',
      title: 'Bem-Estar Animal',
      color: '#FF2D92',
    },
    {
      id: 8,
      icon: 'fitness',
      title: 'Exames',
      color: '#007AFF',
    },
    {
      id: 9,
      icon: 'search',
      title: 'Consultas',
      color: '#007AFF',
    },
    {
      id: 10,
      icon: 'water',
      title: 'Diabetes JP - Glicosímetro',
      color: '#007AFF',
    },
    {
      id: 11,
      icon: 'wifi',
      title: 'Cursos - Inclusão Pro...',
      color: '#AF52DE',
    },
    {
      id: 12,
      icon: 'person',
      title: 'Cartão do Idoso',
      color: '#AF52DE',
    },
  ];

  const banners = [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/400/150?blur=1&random=1',
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/400/150?blur=2&random=2',
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/400/150?blur=3&random=3',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Minha Prefeitura" />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <CategoriesGrid
            title="Categorias em destaque"
            categories={featuredCategories}
          />
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
  greetingSection: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
