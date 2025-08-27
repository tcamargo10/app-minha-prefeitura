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

export const AgendaPrefeitoScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const compromissos = [
    {
      id: 1,
      titulo: 'Inauguração da Nova Escola Municipal',
      data: '2024-01-25',
      hora: '09:00',
      local: 'Rua das Flores, 123 - Centro',
      tipo: 'Inauguração',
      status: 'confirmado',
      descricao:
        'Inauguração da nova unidade escolar com capacidade para 500 alunos',
      icon: 'school',
      color: '#007AFF',
    },
    {
      id: 2,
      titulo: 'Reunião com Secretários Municipais',
      data: '2024-01-25',
      hora: '14:00',
      local: 'Palácio das Indústrias - Centro',
      tipo: 'Reunião',
      status: 'confirmado',
      descricao: 'Reunião semanal com os secretários para alinhamento de ações',
      icon: 'people',
      color: '#34C759',
    },
    {
      id: 3,
      titulo: 'Visita ao Canteiro de Obras',
      data: '2024-01-26',
      hora: '10:30',
      local: 'Av. Paulista, 1000 - Bela Vista',
      tipo: 'Visita',
      status: 'confirmado',
      descricao: 'Vistoria das obras de revitalização da avenida principal',
      icon: 'construct',
      color: '#FF9500',
    },
    {
      id: 4,
      titulo: 'Entrevista para TV Local',
      data: '2024-01-26',
      hora: '16:00',
      local: 'Estúdio da TV Municipal',
      tipo: 'Entrevista',
      status: 'confirmado',
      descricao: 'Entrevista sobre as principais ações da gestão municipal',
      icon: 'mic',
      color: '#AF52DE',
    },
    {
      id: 5,
      titulo: 'Cerimônia de Premiação',
      data: '2024-01-27',
      hora: '19:00',
      local: 'Teatro Municipal',
      tipo: 'Cerimônia',
      status: 'confirmado',
      descricao: 'Entrega do Prêmio Cidade Sustentável 2024',
      icon: 'trophy',
      color: '#FF3B30',
    },
    {
      id: 6,
      titulo: 'Reunião com Líderes Comunitários',
      data: '2024-01-28',
      hora: '15:00',
      local: 'Centro Comunitário do Jardim das Flores',
      tipo: 'Reunião',
      status: 'pendente',
      descricao: 'Encontro com representantes das associações de bairro',
      icon: 'people-circle',
      color: '#FF2D92',
    },
  ];

  const proximosEventos = compromissos
    .filter(c => c.status === 'confirmado')
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return '#34C759';
      case 'pendente':
        return '#FF9500';
      case 'cancelado':
        return '#FF3B30';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleCompromissoPress = (compromisso: any) => {
    // Aqui você pode navegar para uma página de detalhes do compromisso
    console.log('Compromisso selecionado:', compromisso.titulo);
  };

  return (
    <ScreenWrapper
      title="Agenda do Prefeito"
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
                name="calendar"
                size={48}
                color={theme.colors.onPrimary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Agenda do Prefeito
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Compromissos e eventos oficiais
            </Text>
          </View>

          {/* Próximos Eventos */}
          <View style={styles.proximosSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Próximos Eventos
            </Text>

            {proximosEventos.map(compromisso => (
              <TouchableOpacity
                key={compromisso.id}
                style={[
                  styles.eventoCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => handleCompromissoPress(compromisso)}
                activeOpacity={0.7}
              >
                <View style={styles.eventoHeader}>
                  <View
                    style={[
                      styles.eventoIcon,
                      { backgroundColor: compromisso.color },
                    ]}
                  >
                    <Ionicons
                      name={compromisso.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <View style={styles.eventoInfo}>
                    <Text
                      style={[
                        styles.eventoTitulo,
                        { color: theme.colors.text },
                      ]}
                    >
                      {compromisso.titulo}
                    </Text>
                    <Text
                      style={[
                        styles.eventoData,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {formatDate(compromisso.data)} • {compromisso.hora}
                    </Text>
                    <Text
                      style={[
                        styles.eventoLocal,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {compromisso.local}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(compromisso.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getStatusLabel(compromisso.status)}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.eventoDescricao,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {compromisso.descricao}
                </Text>

                <View style={styles.eventoTipo}>
                  <Text
                    style={[styles.tipoTag, { color: theme.colors.primary }]}
                  >
                    {compromisso.tipo}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Todos os Compromissos */}
          <View style={styles.todosSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Todos os Compromissos
            </Text>

            {compromissos.map(compromisso => (
              <TouchableOpacity
                key={compromisso.id}
                style={[
                  styles.compromissoCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => handleCompromissoPress(compromisso)}
                activeOpacity={0.7}
              >
                <View style={styles.compromissoHeader}>
                  <View
                    style={[
                      styles.compromissoIcon,
                      { backgroundColor: compromisso.color },
                    ]}
                  >
                    <Ionicons
                      name={compromisso.icon as any}
                      size={20}
                      color="white"
                    />
                  </View>
                  <View style={styles.compromissoInfo}>
                    <Text
                      style={[
                        styles.compromissoTitulo,
                        { color: theme.colors.text },
                      ]}
                    >
                      {compromisso.titulo}
                    </Text>
                    <Text
                      style={[
                        styles.compromissoData,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {formatDate(compromisso.data)} • {compromisso.hora}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(compromisso.status) },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Informações */}
          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações
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
                A agenda do prefeito é atualizada regularmente e inclui
                compromissos oficiais, inaugurações, reuniões e eventos
                importantes da administração municipal. Para solicitar a
                presença do prefeito em eventos, entre em contato com a
                assessoria de comunicação.
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
                  agenda@prefeitura.sp.gov.br
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="time" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  Segunda a Sexta: 8h às 18h
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
  proximosSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  eventoCard: {
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
  eventoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventoData: {
    fontSize: 14,
    marginBottom: 2,
  },
  eventoLocal: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  eventoDescricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventoTipo: {
    alignSelf: 'flex-start',
  },
  tipoTag: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
  },
  todosSection: {
    marginBottom: 32,
  },
  compromissoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compromissoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compromissoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  compromissoInfo: {
    flex: 1,
  },
  compromissoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  compromissoData: {
    fontSize: 14,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
