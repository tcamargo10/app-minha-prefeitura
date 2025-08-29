import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { CustomMapView } from '@/components/MapView';
import { useTheme } from '@/contexts/ThemeContext';

export const TransitoScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const unidadesTransito = [
    {
      id: 1,
      nome: 'Departamento de Trânsito de Iguape',
      tipo: 'Órgão de Trânsito',
      endereco: 'Rua XV de Novembro, 147 - Centro',
      telefone: '(13) 3841-1111',
      email: 'detran.iguape@prefeitura.iguape.sp.gov.br',
      horario: '8h às 17h',
      especialidades: ['Sinalização', 'Fiscalização', 'Engenharia de Tráfego'],
      atendimentos: 850,
      funcionarios: 25,
      icon: 'car',
      color: '#007AFF',
      coordenadas: { latitude: -24.7081, longitude: -47.5553 },
    },
    {
      id: 2,
      nome: 'Posto de Fiscalização de Trânsito',
      tipo: 'Fiscalização',
      endereco: 'Rua da Liberdade, 258 - Vila Nova',
      telefone: '(13) 3841-2222',
      email: 'fiscalizacao.iguape@prefeitura.iguape.sp.gov.br',
      horario: '6h às 22h',
      especialidades: ['Multas', 'Apreensões', 'Educação'],
      atendimentos: 450,
      funcionarios: 15,
      icon: 'traffic-light',
      color: '#FF3B30',
      coordenadas: { latitude: -24.7123, longitude: -47.5589 },
    },
    {
      id: 3,
      nome: 'Centro de Controle de Tráfego',
      tipo: 'Controle de Tráfego',
      endereco: 'Rua São João, 369 - Bairro São João',
      telefone: '(13) 3841-3333',
      email: 'cct.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Semáforos', 'Câmeras', 'Monitoramento'],
      atendimentos: 0,
      funcionarios: 8,
      icon: 'videocam',
      color: '#34C759',
      coordenadas: { latitude: -24.7156, longitude: -47.5521 },
    },
    {
      id: 4,
      nome: 'Escola Pública de Trânsito',
      tipo: 'Educação',
      endereco: 'Rua das Palmeiras, 741 - Jardim das Palmeiras',
      telefone: '(13) 3841-4444',
      email: 'escola.transito.iguape@prefeitura.iguape.sp.gov.br',
      horario: '8h às 18h',
      especialidades: ['Cursos', 'Palestras', 'Conscientização'],
      atendimentos: 280,
      funcionarios: 8,
      icon: 'school',
      color: '#AF52DE',
      coordenadas: { latitude: -24.7098, longitude: -47.5602 },
    },
    {
      id: 5,
      nome: 'Pátio de Apreensão de Veículos',
      tipo: 'Apreensão',
      endereco: 'Rua do Comércio, 963 - Centro Histórico',
      telefone: '(13) 3841-5555',
      email: 'patio.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Veículos Apreendidos', 'Liberação', 'Documentação'],
      atendimentos: 180,
      funcionarios: 6,
      icon: 'car-sport',
      color: '#FF9500',
      coordenadas: { latitude: -24.7067, longitude: -47.5534 },
    },
    {
      id: 6,
      nome: 'Centro de Atendimento ao Cidadão - Trânsito',
      tipo: 'Atendimento',
      endereco: 'Rua São Miguel, 852 - Bairro São Miguel',
      telefone: '(13) 3841-6666',
      email: 'cac.transito.iguape@prefeitura.iguape.sp.gov.br',
      horario: '8h às 18h',
      especialidades: ['Licenciamento', 'Documentação', 'Consultas'],
      atendimentos: 650,
      funcionarios: 12,
      icon: 'people',
      color: '#FF2D92',
      coordenadas: { latitude: -24.7189, longitude: -47.5567 },
    },
    {
      id: 7,
      nome: 'Posto de Vistoria Veicular',
      tipo: 'Vistoria',
      endereco: 'Rua José Bonifácio, 456 - Vila Operária',
      telefone: '(13) 3841-7777',
      email: 'vistoria.iguape@prefeitura.iguape.sp.gov.br',
      horario: '8h às 17h',
      especialidades: ['Vistoria', 'Inspeção', 'Laudos'],
      atendimentos: 320,
      funcionarios: 5,
      icon: 'car-outline',
      color: '#00CED1',
      coordenadas: { latitude: -24.7201, longitude: -47.5498 },
    },
    {
      id: 8,
      nome: 'Escritório Regional do DETRAN',
      tipo: 'DETRAN',
      endereco: 'Rua Santa Rita, 159 - Bairro Santa Rita',
      telefone: '(13) 3841-8888',
      email: 'detran.regional.iguape@prefeitura.iguape.sp.gov.br',
      horario: '8h às 17h',
      especialidades: ['Licenciamento', 'Documentação', 'Transferências'],
      atendimentos: 420,
      funcionarios: 10,
      icon: 'document',
      color: '#FF8C00',
      coordenadas: { latitude: -24.7045, longitude: -47.5612 },
    },
  ];

  const handleUnidadePress = (unidade: any) => {
    console.log('Unidade selecionada:', unidade.nome);
  };

  const handleMapView = () => {
    setViewMode('map');
    console.log('Abrindo mapa das unidades de trânsito');
  };

  const handleListView = () => {
    setViewMode('list');
  };

  const renderUnidadeCard = ({ item: unidade }: { item: any }) => (
    <TouchableOpacity
      style={[styles.unidadeCard, { backgroundColor: theme.colors.background }]}
      onPress={() => handleUnidadePress(unidade)}
      activeOpacity={0.7}
    >
      <View style={styles.unidadeHeader}>
        <View style={[styles.unidadeIcon, { backgroundColor: unidade.color }]}>
          <Ionicons name={unidade.icon as any} size={24} color="white" />
        </View>
        <View style={styles.unidadeInfo}>
          <Text style={[styles.unidadeNome, { color: theme.colors.text }]}>
            {unidade.nome}
          </Text>
          <Text
            style={[styles.unidadeTipo, { color: theme.colors.textSecondary }]}
          >
            {unidade.tipo}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textSecondary}
        />
      </View>

      <View style={styles.unidadeDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            {unidade.endereco}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="call" size={16} color={theme.colors.primary} />
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            {unidade.telefone}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={theme.colors.primary} />
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            {unidade.horario}
          </Text>
        </View>

        <View style={styles.especialidadesContainer}>
          <Text
            style={[styles.especialidadesTitle, { color: theme.colors.text }]}
          >
            Serviços:
          </Text>
          <View style={styles.especialidadesList}>
            {unidade.especialidades.map(
              (especialidade: string, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.especialidadeTag,
                    { backgroundColor: theme.colors.primary + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.especialidadeText,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {especialidade}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              {unidade.atendimentos}
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Atendimentos/mês
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              {unidade.funcionarios}
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Funcionários
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      title="Trânsito"
      showBackButton
      showCitySelector
      showProfileIcon
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.surface }]}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View
            style={[
              styles.headerIcon,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Ionicons name="car" size={48} color={theme.colors.onPrimary} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Trânsito
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            Unidades de trânsito de Iguape - SP
          </Text>
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === 'list' && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={handleListView}
          >
            <Ionicons
              name="list"
              size={20}
              color={
                viewMode === 'list'
                  ? theme.colors.onPrimary
                  : theme.colors.textSecondary
              }
            />
            <Text
              style={[
                styles.viewToggleText,
                {
                  color:
                    viewMode === 'list'
                      ? theme.colors.onPrimary
                      : theme.colors.textSecondary,
                },
              ]}
            >
              Lista
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === 'map' && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={handleMapView}
          >
            <Ionicons
              name="map"
              size={20}
              color={
                viewMode === 'map'
                  ? theme.colors.onPrimary
                  : theme.colors.textSecondary
              }
            />
            <Text
              style={[
                styles.viewToggleText,
                {
                  color:
                    viewMode === 'map'
                      ? theme.colors.onPrimary
                      : theme.colors.textSecondary,
                },
              ]}
            >
              Mapa
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {viewMode === 'list' ? (
          <FlatList
            data={unidadesTransito}
            renderItem={renderUnidadeCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <CustomMapView
            locations={unidadesTransito.map(unidade => ({
              id: unidade.id,
              nome: unidade.nome,
              coordenadas: unidade.coordenadas,
              color: unidade.color,
            }))}
            initialRegion={{
              latitude: -24.7081,
              longitude: -47.5553,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
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
  viewToggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  viewToggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewToggleText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  unidadeCard: {
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
  unidadeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unidadeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  unidadeInfo: {
    flex: 1,
  },
  unidadeNome: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  unidadeTipo: {
    fontSize: 14,
    fontWeight: '500',
  },
  unidadeDetails: {
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
  especialidadesContainer: {
    marginTop: 8,
  },
  especialidadesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  especialidadesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  especialidadeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  especialidadeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  mapText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
