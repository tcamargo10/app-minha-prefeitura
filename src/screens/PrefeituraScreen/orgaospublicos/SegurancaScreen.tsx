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

export const SegurancaScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const unidadesSeguranca = [
    {
      id: 1,
      nome: 'Delegacia de Polícia Civil de Iguape',
      tipo: 'Delegacia',
      endereco: 'Rua XV de Novembro, 789 - Centro',
      telefone: '(13) 3841-1111',
      email: 'delegacia.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Roubos', 'Furtos', 'Violência Doméstica'],
      atendimentos: 450,
      policiais: 15,
      icon: 'shield',
      color: '#007AFF',
      coordenadas: { latitude: -24.7081, longitude: -47.5553 },
    },
    {
      id: 2,
      nome: 'Base Comunitária de Segurança',
      tipo: 'Base Comunitária',
      endereco: 'Rua da Liberdade, 321 - Vila Nova',
      telefone: '(13) 3841-2222',
      email: 'bcs.iguape@prefeitura.iguape.sp.gov.br',
      horario: '6h às 22h',
      especialidades: ['Prevenção', 'Patrulhamento', 'Orientação'],
      atendimentos: 180,
      policiais: 5,
      icon: 'shield-checkmark',
      color: '#34C759',
      coordenadas: { latitude: -24.7123, longitude: -47.5589 },
    },
    {
      id: 3,
      nome: 'Guarda Civil Municipal de Iguape',
      tipo: 'Guarda Municipal',
      endereco: 'Rua São João, 654 - Bairro São João',
      telefone: '(13) 3841-3333',
      email: 'gcm.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Trânsito', 'Proteção Patrimonial', 'Fiscalização'],
      atendimentos: 650,
      policiais: 25,
      icon: 'shield-half',
      color: '#FF9500',
      coordenadas: { latitude: -24.7156, longitude: -47.5521 },
    },
    {
      id: 4,
      nome: 'Defesa Civil de Iguape',
      tipo: 'Defesa Civil',
      endereco: 'Rua das Palmeiras, 147 - Jardim das Palmeiras',
      telefone: '(13) 3841-4444',
      email: 'defesa.civil.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Emergências', 'Desastres', 'Prevenção'],
      atendimentos: 80,
      policiais: 8,
      icon: 'warning',
      color: '#FF3B30',
      coordenadas: { latitude: -24.7098, longitude: -47.5602 },
    },
    {
      id: 5,
      nome: 'Posto de Policiamento Comunitário',
      tipo: 'Posto Comunitário',
      endereco: 'Rua do Comércio, 258 - Centro Histórico',
      telefone: '(13) 3841-5555',
      email: 'ppc.iguape@prefeitura.iguape.sp.gov.br',
      horario: '8h às 18h',
      especialidades: ['Atendimento Local', 'Prevenção', 'Orientação'],
      atendimentos: 150,
      policiais: 4,
      icon: 'home',
      color: '#AF52DE',
      coordenadas: { latitude: -24.7067, longitude: -47.5534 },
    },
    {
      id: 6,
      nome: 'Centro de Monitoramento Municipal',
      tipo: 'Monitoramento',
      endereco: 'Rua São Miguel, 369 - Bairro São Miguel',
      telefone: '(13) 3841-6666',
      email: 'monitoramento.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Câmeras', 'Alarmes', 'Controle de Acesso'],
      atendimentos: 0,
      policiais: 8,
      icon: 'videocam',
      color: '#FF2D92',
      coordenadas: { latitude: -24.7189, longitude: -47.5567 },
    },
    {
      id: 7,
      nome: 'Corpo de Bombeiros de Iguape',
      tipo: 'Bombeiros',
      endereco: 'Rua José Bonifácio, 987 - Vila Operária',
      telefone: '(13) 3841-7777',
      email: 'bombeiros.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Incêndios', 'Resgate', 'Emergências'],
      atendimentos: 120,
      policiais: 12,
      icon: 'flame',
      color: '#00CED1',
      coordenadas: { latitude: -24.7201, longitude: -47.5498 },
    },
    {
      id: 8,
      nome: 'Posto de Polícia Rodoviária',
      tipo: 'Polícia Rodoviária',
      endereco: 'Rua Santa Rita, 741 - Bairro Santa Rita',
      telefone: '(13) 3841-8888',
      email: 'pr.iguape@prefeitura.iguape.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Trânsito', 'Fiscalização', 'Acidentes'],
      atendimentos: 200,
      policiais: 10,
      icon: 'car',
      color: '#FF8C00',
      coordenadas: { latitude: -24.7045, longitude: -47.5612 },
    },
  ];

  const handleUnidadePress = (unidade: any) => {
    console.log('Unidade selecionada:', unidade.nome);
  };

  const handleMapView = () => {
    setViewMode('map');
    console.log('Abrindo mapa das unidades de segurança');
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
            Atuação:
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
              {unidade.policiais}
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Policiais
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      title="Segurança"
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
            <Ionicons name="shield" size={48} color={theme.colors.onPrimary} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Segurança
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            Unidades de segurança de Iguape - SP
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
            data={unidadesSeguranca}
            renderItem={renderUnidadeCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <CustomMapView
            locations={unidadesSeguranca.map(unidade => ({
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
