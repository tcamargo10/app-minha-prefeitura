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

export const SecretariasScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const orgaos = [
    {
      id: 1,
      nome: 'Secretaria de Educação',
      sigla: 'SME',
      responsavel: 'Fernando Padula',
      telefone: '(11) 3396-0600',
      email: 'sme@prefeitura.sp.gov.br',
      endereco: 'Rua Borges Lagoa, 1230 - Vila Clementino',
      horario: 'Segunda a Sexta: 8h às 18h',
      icon: 'school',
      color: '#007AFF',
      descricao: 'Responsável pela gestão da educação pública municipal',
    },
    {
      id: 2,
      nome: 'Secretaria de Saúde',
      sigla: 'SMS',
      responsavel: 'Luiz Carlos Zamarco',
      telefone: '(11) 3397-8000',
      email: 'sms@prefeitura.sp.gov.br',
      endereco: 'Av. Paulista, 1000 - Bela Vista',
      horario: 'Segunda a Sexta: 8h às 18h',
      icon: 'medical',
      color: '#34C759',
      descricao: 'Responsável pela gestão da saúde pública municipal',
    },
    {
      id: 3,
      nome: 'Secretaria de Transportes',
      sigla: 'SMT',
      responsavel: 'Ricardo Teixeira',
      telefone: '(11) 3397-7000',
      email: 'smt@prefeitura.sp.gov.br',
      endereco: 'Rua Boa Vista, 200 - Centro',
      horario: 'Segunda a Sexta: 8h às 18h',
      icon: 'car',
      color: '#FF9500',
      descricao: 'Responsável pela gestão do transporte público',
    },
    {
      id: 4,
      nome: 'Secretaria de Segurança',
      sigla: 'SMS',
      responsavel: 'Guilherme Derrite',
      telefone: '(11) 3397-6000',
      email: 'sms@prefeitura.sp.gov.br',
      endereco: 'Av. São João, 500 - Centro',
      horario: '24 horas',
      icon: 'shield-checkmark',
      color: '#FF3B30',
      descricao: 'Responsável pela segurança pública municipal',
    },
    {
      id: 5,
      nome: 'Secretaria de Cultura',
      sigla: 'SMC',
      responsavel: 'Aline Torres',
      telefone: '(11) 3397-5000',
      email: 'smc@prefeitura.sp.gov.br',
      endereco: 'Rua Vergueiro, 1000 - Liberdade',
      horario: 'Segunda a Sexta: 9h às 17h',
      icon: 'color-palette',
      color: '#AF52DE',
      descricao: 'Responsável pela gestão cultural da cidade',
    },
    {
      id: 6,
      nome: 'Secretaria de Esportes',
      sigla: 'SME',
      responsavel: 'Alexandre Schneider',
      telefone: '(11) 3397-4000',
      email: 'sme@prefeitura.sp.gov.br',
      endereco: 'Av. Ibirapuera, 1500 - Moema',
      horario: 'Segunda a Sexta: 8h às 18h',
      icon: 'football',
      color: '#FF2D92',
      descricao: 'Responsável pela gestão esportiva municipal',
    },
  ];

  const handleOrgaoPress = (orgao: any) => {
    // Aqui você pode navegar para uma página de detalhes do órgão
    console.log('Órgão selecionado:', orgao.nome);
  };

  return (
    <ScreenWrapper
      title="Secretarias"
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
              Secretarias
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Conheça as secretarias da administração municipal
            </Text>
          </View>

          {/* Órgãos List */}
          <View style={styles.orgaosSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Secretarias Municipais
            </Text>

            {orgaos.map(orgao => (
              <TouchableOpacity
                key={orgao.id}
                style={[
                  styles.orgaoCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => handleOrgaoPress(orgao)}
                activeOpacity={0.7}
              >
                <View style={styles.orgaoHeader}>
                  <View
                    style={[styles.orgaoIcon, { backgroundColor: orgao.color }]}
                  >
                    <Ionicons
                      name={orgao.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <View style={styles.orgaoInfo}>
                    <Text
                      style={[styles.orgaoNome, { color: theme.colors.text }]}
                    >
                      {orgao.nome}
                    </Text>
                    <Text
                      style={[
                        styles.orgaoSigla,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {orgao.sigla}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </View>

                <Text
                  style={[
                    styles.orgaoDescricao,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {orgao.descricao}
                </Text>

                <View style={styles.orgaoDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons
                      name="person"
                      size={16}
                      color={theme.colors.primary}
                    />
                    <Text
                      style={[
                        styles.detailText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {orgao.responsavel}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons
                      name="call"
                      size={16}
                      color={theme.colors.primary}
                    />
                    <Text
                      style={[
                        styles.detailText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {orgao.telefone}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons
                      name="location"
                      size={16}
                      color={theme.colors.primary}
                    />
                    <Text
                      style={[
                        styles.detailText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {orgao.endereco}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons
                      name="time"
                      size={16}
                      color={theme.colors.primary}
                    />
                    <Text
                      style={[
                        styles.detailText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {orgao.horario}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
                secretaria possui atribuições específicas e trabalha em conjunto
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
  orgaoCard: {
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
  orgaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orgaoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orgaoInfo: {
    flex: 1,
  },
  orgaoNome: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  orgaoSigla: {
    fontSize: 14,
    fontWeight: '500',
  },
  orgaoDescricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  orgaoDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
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
