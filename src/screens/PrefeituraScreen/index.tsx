import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';

export const PrefeituraScreen: React.FC = () => {
  const { theme } = useTheme();

  const services = [
    {
      id: 1,
      title: 'Informações Municipais',
      description: 'Acesse informações sobre o município',
      icon: 'information-circle',
      color: '#007AFF',
    },
    {
      id: 2,
      title: 'Órgãos Públicos',
      description: 'Conheça os órgãos da administração',
      icon: 'business',
      color: '#34C759',
    },
    {
      id: 3,
      title: 'Transparência',
      description: 'Portal da transparência municipal',
      icon: 'eye',
      color: '#FF9500',
    },
    {
      id: 4,
      title: 'Legislação',
      description: 'Leis e decretos municipais',
      icon: 'document-text',
      color: '#AF52DE',
    },
    {
      id: 5,
      title: 'Agenda do Prefeito',
      description: 'Compromissos e eventos oficiais',
      icon: 'calendar',
      color: '#FF3B30',
    },
    {
      id: 6,
      title: 'Ouvidoria',
      description: 'Canal de comunicação com a população',
      icon: 'megaphone',
      color: '#FF2D92',
    },
  ];

  return (
    <ScreenWrapper
      title="Prefeitura"
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
              Prefeitura Municipal
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Serviços e informações da administração pública
            </Text>
          </View>

          {/* Services Grid */}
          <View style={styles.servicesSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Serviços Disponíveis
            </Text>

            <View style={styles.servicesGrid}>
              {services.map(service => (
                <View
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    {
                      backgroundColor: theme.colors.background,
                      shadowColor: theme.colors.shadow,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.serviceIcon,
                      { backgroundColor: service.color },
                    ]}
                  >
                    <Ionicons
                      name={service.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <Text
                    style={[styles.serviceTitle, { color: theme.colors.text }]}
                  >
                    {service.title}
                  </Text>
                  <Text
                    style={[
                      styles.serviceDescription,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {service.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações de Contato
            </Text>

            <View
              style={[
                styles.contactCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <View style={styles.contactItem}>
                <Ionicons
                  name="location"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  Endereço da Prefeitura
                </Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  (13) 3000-0000
                </Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  contato@prefeitura.gov.br
                </Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="time" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  Segunda a Sexta: 8h às 17h
                </Text>
              </View>
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
  servicesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactSection: {
    marginBottom: 20,
  },
  contactCard: {
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});
