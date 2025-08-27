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

export const TransparenciaScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const transparenciaItems = [
    {
      id: 1,
      titulo: 'Receitas e Despesas',
      descricao: 'Acompanhe a execução orçamentária municipal',
      icon: 'calculator',
      color: '#007AFF',
      url: 'https://transparencia.prefeitura.sp.gov.br/orcamento',
    },
    {
      id: 2,
      titulo: 'Contratos e Licitações',
      descricao: 'Consulte contratos e processos licitatórios',
      icon: 'document-text',
      color: '#34C759',
      url: 'https://transparencia.prefeitura.sp.gov.br/contratos',
    },
    {
      id: 3,
      titulo: 'Folha de Pagamento',
      descricao: 'Remuneração dos servidores públicos',
      icon: 'people-circle',
      color: '#FF9500',
      url: 'https://transparencia.prefeitura.sp.gov.br/folha',
    },
    {
      id: 4,
      titulo: 'Convênios',
      descricao: 'Convênios celebrados pela prefeitura',
      icon: 'handshake',
      color: '#AF52DE',
      url: 'https://transparencia.prefeitura.sp.gov.br/convenios',
    },
    {
      id: 5,
      titulo: 'Obras e Serviços',
      descricao: 'Acompanhe obras e serviços em execução',
      icon: 'construct',
      color: '#FF3B30',
      url: 'https://transparencia.prefeitura.sp.gov.br/obras',
    },
    {
      id: 6,
      titulo: 'Relatórios',
      descricao: 'Relatórios de gestão e prestação de contas',
      icon: 'bar-chart',
      color: '#FF2D92',
      url: 'https://transparencia.prefeitura.sp.gov.br/relatorios',
    },
  ];

  const estatisticas = [
    {
      titulo: 'Orçamento Anual',
      valor: 'R$ 74,5',
      unidade: 'bilhões',
      icon: 'wallet',
      color: '#007AFF',
    },
    {
      titulo: 'Servidores',
      valor: '145.000',
      unidade: 'ativos',
      icon: 'people',
      color: '#34C759',
    },
    {
      titulo: 'Obras',
      valor: '2.847',
      unidade: 'em execução',
      icon: 'construct',
      color: '#FF9500',
    },
    {
      titulo: 'Contratos',
      valor: '15.234',
      unidade: 'vigentes',
      icon: 'document-text',
      color: '#AF52DE',
    },
  ];

  const handleItemPress = (item: any) => {
    // Aqui você pode abrir o link externo ou navegar para uma página interna
    console.log('Abrindo:', item.url);
  };

  return (
    <ScreenWrapper
      title="Transparência"
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
              <Ionicons name="eye" size={48} color={theme.colors.onPrimary} />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Portal da Transparência
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Acesso às informações públicas municipais
            </Text>
          </View>

          {/* Estatísticas */}
          <View style={styles.statsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Dados em Tempo Real
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

          {/* Itens de Transparência */}
          <View style={styles.itemsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações Disponíveis
            </Text>

            {transparenciaItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.itemHeader}>
                  <View
                    style={[styles.itemIcon, { backgroundColor: item.color }]}
                  >
                    <Ionicons name={item.icon as any} size={24} color="white" />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text
                      style={[styles.itemTitle, { color: theme.colors.text }]}
                    >
                      {item.titulo}
                    </Text>
                    <Text
                      style={[
                        styles.itemDescription,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {item.descricao}
                    </Text>
                  </View>
                  <Ionicons
                    name="open-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Informações Legais */}
          <View style={styles.legalSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Base Legal
            </Text>
            <View
              style={[
                styles.legalCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <Text
                style={[
                  styles.legalText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                O Portal da Transparência está em conformidade com a Lei de
                Acesso à Informação (Lei nº 12.527/2011) e com a Lei de
                Responsabilidade Fiscal (Lei Complementar nº 101/2000),
                garantindo o acesso público às informações sobre a gestão dos
                recursos públicos municipais.
              </Text>
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
                  (11) 3113-8000
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  transparencia@prefeitura.sp.gov.br
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="globe" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  transparencia.prefeitura.sp.gov.br
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
  itemsSection: {
    marginBottom: 32,
  },
  itemCard: {
    padding: 20,
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
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  legalSection: {
    marginBottom: 32,
  },
  legalCard: {
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
  legalText: {
    fontSize: 16,
    lineHeight: 24,
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
