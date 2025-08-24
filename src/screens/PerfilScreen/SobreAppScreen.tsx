import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

export const SobreAppScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const appInfo = {
    name: 'Minha Cidade',
    version: '1.0.0',
    description:
      'Aplicativo oficial da prefeitura para facilitar o acesso aos serviços municipais.',
    developer: 'Prefeitura Municipal',
    contact: 'contato@prefeitura.gov.br',
    website: 'https://www.prefeitura.gov.br',
  };

  const features = [
    {
      icon: 'home',
      title: 'Serviços Municipais',
      description: 'Acesso rápido aos principais serviços da prefeitura',
    },
    {
      icon: 'document-text',
      title: 'Documentos',
      description: 'Solicitação e acompanhamento de documentos',
    },
    {
      icon: 'notifications',
      title: 'Notificações',
      description: 'Receba atualizações sobre seus processos',
    },
    {
      icon: 'person',
      title: 'Perfil Personalizado',
      description: 'Gerencie suas informações e preferências',
    },
  ];

  const handleContact = () => {
    Linking.openURL(`mailto:${appInfo.contact}`);
  };

  const handleWebsite = () => {
    Linking.openURL(appInfo.website);
  };

  const renderFeature = (feature: any, index: number) => (
    <View
      key={index}
      style={[
        styles.featureCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.featureIcon}>
        <Ionicons
          name={feature.icon as any}
          size={24}
          color={theme.colors.primary}
        />
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
          {feature.title}
        </Text>
        <Text
          style={[
            styles.featureDescription,
            { color: theme.colors.textSecondary },
          ]}
        >
          {feature.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Sobre o App"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Ionicons
              name="information-circle-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Sobre o Aplicativo
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Conheça mais sobre o aplicativo e suas funcionalidades
            </Text>
          </View>

          {/* App Header */}
          <View
            style={[
              styles.appHeader,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.appIcon,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Ionicons
                name="business"
                size={40}
                color={theme.colors.onPrimary}
              />
            </View>
            <View style={styles.appInfo}>
              <Text style={[styles.appName, { color: theme.colors.text }]}>
                {appInfo.name}
              </Text>
              <Text
                style={[
                  styles.appVersion,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Versão {appInfo.version}
              </Text>
              <Text
                style={[
                  styles.appDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {appInfo.description}
              </Text>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Funcionalidades
            </Text>
            {features.map((feature, index) => renderFeature(feature, index))}
          </View>

          {/* Developer Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Desenvolvedor
            </Text>
            <View
              style={[
                styles.developerCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[styles.developerName, { color: theme.colors.text }]}
              >
                {appInfo.developer}
              </Text>
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handleContact}
              >
                <Ionicons name="mail" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.primary }]}
                >
                  {appInfo.contact}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handleWebsite}
              >
                <Ionicons name="globe" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.primary }]}
                >
                  {appInfo.website}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Legal Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações Legais
            </Text>
            <View
              style={[
                styles.legalCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.legalText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Este aplicativo é desenvolvido e mantido pela Prefeitura
                Municipal. Todas as informações são tratadas com sigilo e
                segurança conforme a legislação vigente.
              </Text>
            </View>
          </View>
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
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  developerCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  developerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginLeft: 8,
  },
  legalCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  legalText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
