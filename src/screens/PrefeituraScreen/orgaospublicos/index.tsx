import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';

export const OrgaosPublicosScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const orgaos = [
    {
      id: 1,
      title: 'Secretarias',
      description: 'Conheça as secretarias da administração municipal',
      icon: 'business',
      color: '#007AFF',
      route: 'Secretarias',
    },
    {
      id: 2,
      title: 'Educação',
      description: 'Escolas e unidades educacionais da cidade',
      icon: 'school',
      color: '#34C759',
      route: 'Educacao',
    },
    {
      id: 3,
      title: 'Saúde',
      description: 'Unidades de saúde e hospitais municipais',
      icon: 'medical',
      color: '#FF9500',
      route: 'Saude',
    },
    {
      id: 4,
      title: 'Segurança',
      description: 'Unidades de segurança e policiamento',
      icon: 'shield-checkmark',
      color: '#FF3B30',
      route: 'Seguranca',
    },
    {
      id: 5,
      title: 'Trânsito',
      description: 'Órgãos de trânsito e fiscalização',
      icon: 'car',
      color: '#AF52DE',
      route: 'Transito',
    },
    {
      id: 6,
      title: 'Cultura e Lazer',
      description: 'Espaços culturais e de lazer da cidade',
      icon: 'color-palette',
      color: '#FF2D92',
      route: 'CulturaLazer',
    },
  ];

  const handleOrgaoPress = (orgao: any) => {
    navigation.navigate(orgao.route as never);
  };

  return (
    <ScreenWrapper
      title="Órgãos Públicos"
      showBackButton
      showCitySelector
      showProfileIcon
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.surface }]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Ionicons
                name="business"
                size={48}
                color={theme.colors.onPrimary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Órgãos Públicos
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Acesse informações sobre os órgãos da administração municipal
            </Text>
          </View>

          {/* Órgãos Grid */}
          <View style={styles.orgaosSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Categorias Disponíveis
            </Text>

            <View style={styles.orgaosGrid}>
              {orgaos.map(orgao => (
                <TouchableOpacity
                  key={orgao.id}
                  style={[
                    styles.orgaoCard,
                    {
                      backgroundColor: theme.colors.background,
                      shadowColor: theme.colors.shadow,
                    },
                  ]}
                  onPress={() => handleOrgaoPress(orgao)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.orgaoIcon, { backgroundColor: orgao.color }]}
                  >
                    <Ionicons
                      name={orgao.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <Text
                    style={[styles.orgaoTitle, { color: theme.colors.text }]}
                  >
                    {orgao.title}
                  </Text>
                  <Text
                    style={[
                      styles.orgaoDescription,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {orgao.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Informações Adicionais */}
          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações Gerais
            </Text>
            <View
              style={[
                styles.infoCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <Text
                style={[styles.infoText, { color: theme.colors.textSecondary }]}
              >
                Os órgãos públicos municipais são responsáveis por executar as
                políticas públicas definidas pela administração municipal. Cada
                categoria possui atribuições específicas e trabalha em conjunto
                para garantir o bem-estar da população.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  orgaosSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  orgaosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  orgaoCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orgaoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  orgaoTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  orgaoDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
