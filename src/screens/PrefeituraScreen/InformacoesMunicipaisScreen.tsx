import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';

export const InformacoesMunicipaisScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const municipioInfo = {
    nome: 'São Paulo',
    estado: 'SP',
    regiao: 'Sudeste',
    populacao: '12.396.372 habitantes',
    area: '1.521,110 km²',
    densidade: '8.152,66 hab/km²',
    altitude: '760 metros',
    clima: 'Subtropical úmido',
    fundacao: '25 de janeiro de 1554',
    gentilico: 'paulistano',
    prefeito: 'Ricardo Nunes',
    vicePrefeito: 'Edmilson Rodrigues',
    telefone: '(11) 3113-8000',
    email: 'prefeito@prefeitura.sp.gov.br',
    site: 'www.prefeitura.sp.gov.br',
  };

  const estatisticas = [
    {
      titulo: 'População',
      valor: '12.396.372',
      unidade: 'habitantes',
      icon: 'people',
      color: '#007AFF',
    },
    {
      titulo: 'Área',
      valor: '1.521,110',
      unidade: 'km²',
      icon: 'map',
      color: '#34C759',
    },
    {
      titulo: 'Densidade',
      valor: '8.152,66',
      unidade: 'hab/km²',
      icon: 'analytics',
      color: '#FF9500',
    },
    {
      titulo: 'Altitude',
      valor: '760',
      unidade: 'metros',
      icon: 'trending-up',
      color: '#AF52DE',
    },
  ];

  return (
    <ScreenWrapper
      title="Informações Municipais"
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
                name="information-circle"
                size={48}
                color={theme.colors.onPrimary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {municipioInfo.nome}
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              {municipioInfo.estado} • {municipioInfo.regiao}
            </Text>
          </View>

          {/* Estatísticas */}
          <View style={styles.statsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Estatísticas Principais
            </Text>
            <View style={styles.statsGrid}>
              {estatisticas.map((stat, index) => (
                <View
                  key={index}
                  style={[
                    styles.statCard,
                    { backgroundColor: theme.colors.background },
                  ]}
                >
                  <View
                    style={[styles.statIcon, { backgroundColor: stat.color }]}
                  >
                    <Ionicons name={stat.icon as any} size={24} color="white" />
                  </View>
                  <Text
                    style={[styles.statValue, { color: theme.colors.text }]}
                  >
                    {stat.valor}
                  </Text>
                  <Text
                    style={[
                      styles.statUnit,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {stat.unidade}
                  </Text>
                  <Text
                    style={[styles.statTitle, { color: theme.colors.text }]}
                  >
                    {stat.titulo}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Informações Gerais */}
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
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Gentílico:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {municipioInfo.gentilico}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Fundação:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {municipioInfo.fundacao}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Clima:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {municipioInfo.clima}
                </Text>
              </View>
            </View>
          </View>

          {/* Administração */}
          <View style={styles.adminSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Administração Municipal
            </Text>
            <View
              style={[
                styles.adminCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <View style={styles.adminItem}>
                <Ionicons
                  name="person"
                  size={20}
                  color={theme.colors.primary}
                />
                <View style={styles.adminInfo}>
                  <Text
                    style={[
                      styles.adminLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Prefeito
                  </Text>
                  <Text
                    style={[styles.adminValue, { color: theme.colors.text }]}
                  >
                    {municipioInfo.prefeito}
                  </Text>
                </View>
              </View>
              <View style={styles.adminItem}>
                <Ionicons
                  name="person"
                  size={20}
                  color={theme.colors.primary}
                />
                <View style={styles.adminInfo}>
                  <Text
                    style={[
                      styles.adminLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Vice-Prefeito
                  </Text>
                  <Text
                    style={[styles.adminValue, { color: theme.colors.text }]}
                  >
                    {municipioInfo.vicePrefeito}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contato */}
          <View style={styles.contactSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Contato
            </Text>
            <View
              style={[
                styles.contactCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  {municipioInfo.telefone}
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  {municipioInfo.email}
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="globe" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  {municipioInfo.site}
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
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
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
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 14,
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 32,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  adminSection: {
    marginBottom: 32,
  },
  adminCard: {
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
  adminItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  adminInfo: {
    flex: 1,
    marginLeft: 12,
  },
  adminLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  adminValue: {
    fontSize: 16,
    fontWeight: '500',
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
