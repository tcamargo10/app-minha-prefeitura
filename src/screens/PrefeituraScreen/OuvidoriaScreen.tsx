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

export const OuvidoriaScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const canaisAtendimento = [
    {
      id: 1,
      titulo: 'Telefone',
      descricao: 'Atendimento por telefone',
      numero: '156',
      horario: '24 horas',
      icon: 'call',
      color: '#007AFF',
    },
    {
      id: 2,
      titulo: 'WhatsApp',
      descricao: 'Atendimento via WhatsApp',
      numero: '(11) 99999-9999',
      horario: 'Segunda a Sexta: 8h às 18h',
      icon: 'logo-whatsapp',
      color: '#34C759',
    },
    {
      id: 3,
      titulo: 'E-mail',
      descricao: 'Atendimento por e-mail',
      email: 'ouvidoria@prefeitura.sp.gov.br',
      horario: '24 horas',
      icon: 'mail',
      color: '#FF9500',
    },
    {
      id: 4,
      titulo: 'Chat Online',
      descricao: 'Atendimento em tempo real',
      status: 'Disponível',
      horario: 'Segunda a Sexta: 8h às 18h',
      icon: 'chatbubbles',
      color: '#AF52DE',
    },
  ];

  const tiposManifestacao = [
    {
      id: 1,
      titulo: 'Sugestão',
      descricao: 'Propor melhorias para a cidade',
      icon: 'bulb',
      color: '#007AFF',
    },
    {
      id: 2,
      titulo: 'Elogio',
      descricao: 'Reconhecer um bom serviço',
      icon: 'heart',
      color: '#34C759',
    },
    {
      id: 3,
      titulo: 'Denúncia',
      descricao: 'Reportar irregularidades',
      icon: 'warning',
      color: '#FF9500',
    },
    {
      id: 4,
      titulo: 'Reclamação',
      descricao: 'Apresentar insatisfação',
      icon: 'alert-circle',
      color: '#FF3B30',
    },
    {
      id: 5,
      titulo: 'Solicitação',
      descricao: 'Solicitar informações ou serviços',
      icon: 'document-text',
      color: '#AF52DE',
    },
    {
      id: 6,
      titulo: 'Informação',
      descricao: 'Buscar esclarecimentos',
      icon: 'information-circle',
      color: '#FF2D92',
    },
  ];

  const estatisticas = [
    {
      titulo: 'Manifestações',
      valor: '15.847',
      unidade: 'em 2024',
      icon: 'document-text',
      color: '#007AFF',
    },
    {
      titulo: 'Resolvidas',
      valor: '94%',
      unidade: 'no prazo',
      icon: 'checkmark-circle',
      color: '#34C759',
    },
    {
      titulo: 'Tempo Médio',
      valor: '3',
      unidade: 'dias',
      icon: 'time',
      color: '#FF9500',
    },
    {
      titulo: 'Satisfação',
      valor: '4.8',
      unidade: '/5.0',
      icon: 'star',
      color: '#AF52DE',
    },
  ];

  const handleCanalPress = (canal: any) => {
    // Aqui você pode implementar a ação específica de cada canal
    console.log('Canal selecionado:', canal.titulo);
  };

  const handleTipoPress = (tipo: any) => {
    // Aqui você pode navegar para o formulário de manifestação
    console.log('Tipo selecionado:', tipo.titulo);
  };

  return (
    <ScreenWrapper
      title="Ouvidoria"
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
                name="megaphone"
                size={48}
                color={theme.colors.onPrimary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Ouvidoria Municipal
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Canal de comunicação com a população
            </Text>
          </View>

          {/* Estatísticas */}
          <View style={styles.statsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Nossos Números
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

          {/* Canais de Atendimento */}
          <View style={styles.canaisSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Canais de Atendimento
            </Text>

            {canaisAtendimento.map(canal => (
              <TouchableOpacity
                key={canal.id}
                style={[
                  styles.canalCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => handleCanalPress(canal)}
                activeOpacity={0.7}
              >
                <View style={styles.canalHeader}>
                  <View
                    style={[styles.canalIcon, { backgroundColor: canal.color }]}
                  >
                    <Ionicons
                      name={canal.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <View style={styles.canalInfo}>
                    <Text
                      style={[styles.canalTitulo, { color: theme.colors.text }]}
                    >
                      {canal.titulo}
                    </Text>
                    <Text
                      style={[
                        styles.canalDescricao,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {canal.descricao}
                    </Text>
                    {canal.numero && (
                      <Text
                        style={[
                          styles.canalNumero,
                          { color: theme.colors.primary },
                        ]}
                      >
                        {canal.numero}
                      </Text>
                    )}
                    {canal.email && (
                      <Text
                        style={[
                          styles.canalNumero,
                          { color: theme.colors.primary },
                        ]}
                      >
                        {canal.email}
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.canalHorario,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {canal.horario}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tipos de Manifestação */}
          <View style={styles.tiposSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Tipos de Manifestação
            </Text>
            <View style={styles.tiposGrid}>
              {tiposManifestacao.map(tipo => (
                <TouchableOpacity
                  key={tipo.id}
                  style={[
                    styles.tipoCard,
                    { backgroundColor: theme.colors.background },
                  ]}
                  onPress={() => handleTipoPress(tipo)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.tipoIcon, { backgroundColor: tipo.color }]}
                  >
                    <Ionicons name={tipo.icon as any} size={24} color="white" />
                  </View>
                  <Text
                    style={[styles.tipoTitulo, { color: theme.colors.text }]}
                  >
                    {tipo.titulo}
                  </Text>
                  <Text
                    style={[
                      styles.tipoDescricao,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {tipo.descricao}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Informações */}
          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Sobre a Ouvidoria
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
                A Ouvidoria Municipal é um canal de comunicação direto entre a
                população e a administração pública. Através dela, você pode
                manifestar sugestões, elogios, denúncias, reclamações e
                solicitações. Todas as manifestações são analisadas e
                respondidas no prazo máximo de 30 dias.
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
                  ouvidoria@prefeitura.sp.gov.br
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons
                  name="location"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  Rua Boa Vista, 200 - Centro
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
  canaisSection: {
    marginBottom: 32,
  },
  canalCard: {
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
  canalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  canalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  canalInfo: {
    flex: 1,
  },
  canalTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  canalDescricao: {
    fontSize: 14,
    marginBottom: 8,
  },
  canalNumero: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  canalHorario: {
    fontSize: 12,
  },
  tiposSection: {
    marginBottom: 32,
  },
  tiposGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipoCard: {
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
  tipoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  tipoDescricao: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
  infoText: {
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
