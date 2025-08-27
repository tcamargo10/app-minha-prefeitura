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
import { useTheme } from '@/contexts/ThemeContext';

export const SegurancaScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const unidadesSeguranca = [
    {
      id: 1,
      nome: 'Delegacia de Polícia Civil',
      tipo: 'Delegacia',
      endereco: 'Rua das Flores, 123 - Centro',
      telefone: '(11) 3333-1111',
      email: 'delegacia.centro@prefeitura.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Roubos', 'Furtos', 'Violência Doméstica'],
      atendimentos: 850,
      policiais: 25,
      icon: 'shield',
      color: '#007AFF',
      coordenadas: { latitude: -23.5505, longitude: -46.6333 },
    },
    {
      id: 2,
      nome: 'Base Comunitária de Segurança',
      tipo: 'Base Comunitária',
      endereco: 'Av. Paulista, 500 - Bela Vista',
      telefone: '(11) 3333-2222',
      email: 'bcs.bela.vista@prefeitura.sp.gov.br',
      horario: '6h às 22h',
      especialidades: ['Prevenção', 'Patrulhamento', 'Orientação'],
      atendimentos: 320,
      policiais: 8,
      icon: 'shield-checkmark',
      color: '#34C759',
      coordenadas: { latitude: -23.5605, longitude: -46.6433 },
    },
    {
      id: 3,
      nome: 'Guarda Civil Metropolitana',
      tipo: 'Guarda Municipal',
      endereco: 'Rua Augusta, 789 - Consolação',
      telefone: '(11) 3333-3333',
      email: 'gcm.consolacao@prefeitura.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Trânsito', 'Proteção Patrimonial', 'Fiscalização'],
      atendimentos: 1200,
      policiais: 45,
      icon: 'shield-half',
      color: '#FF9500',
      coordenadas: { latitude: -23.5405, longitude: -46.6233 },
    },
    {
      id: 4,
      nome: 'Centro de Operações da Defesa Civil',
      tipo: 'Defesa Civil',
      endereco: 'Rua Oscar Freire, 456 - Jardins',
      telefone: '(11) 3333-4444',
      email: 'defesa.civil@prefeitura.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Emergências', 'Desastres', 'Prevenção'],
      atendimentos: 150,
      policiais: 12,
      icon: 'warning',
      color: '#FF3B30',
      coordenadas: { latitude: -23.5705, longitude: -46.6533 },
    },
    {
      id: 5,
      nome: 'Posto de Policiamento Comunitário',
      tipo: 'Posto Comunitário',
      endereco: 'Av. Brigadeiro Faria Lima, 1000 - Itaim Bibi',
      telefone: '(11) 3333-5555',
      email: 'ppc.itaim.bibi@prefeitura.sp.gov.br',
      horario: '8h às 18h',
      especialidades: ['Atendimento Local', 'Prevenção', 'Orientação'],
      atendimentos: 280,
      policiais: 6,
      icon: 'home',
      color: '#AF52DE',
      coordenadas: { latitude: -23.5805, longitude: -46.6633 },
    },
    {
      id: 6,
      nome: 'Centro de Monitoramento',
      tipo: 'Monitoramento',
      endereco: 'Rua Haddock Lobo, 200 - Cerqueira César',
      telefone: '(11) 3333-6666',
      email: 'monitoramento@prefeitura.sp.gov.br',
      horario: '24 horas',
      especialidades: ['Câmeras', 'Alarmes', 'Controle de Acesso'],
      atendimentos: 0,
      policiais: 15,
      icon: 'videocam',
      color: '#FF2D92',
      coordenadas: { latitude: -23.5905, longitude: -46.6733 },
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
      style={[
        styles.unidadeCard,
        { backgroundColor: theme.colors.background },
      ]}
      onPress={() => handleUnidadePress(unidade)}
      activeOpacity={0.7}
    >
      <View style={styles.unidadeHeader}>
        <View
          style={[styles.unidadeIcon, { backgroundColor: unidade.color }]}
        >
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
            {unidade.endereco}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="call" size={16} color={theme.colors.primary} />
          <Text
            style={[
              styles.detailText,
              { color: theme.colors.textSecondary },
            ]}
          >
            {unidade.telefone}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={theme.colors.primary} />
          <Text
            style={[
              styles.detailText,
              { color: theme.colors.textSecondary },
            ]}
          >
            {unidade.horario}
          </Text>
        </View>

        <View style={styles.especialidadesContainer}>
          <Text
            style={[
              styles.especialidadesTitle,
              { color: theme.colors.text },
            ]}
          >
            Atuação:
          </Text>
          <View style={styles.especialidadesList}>
            {unidade.especialidades.map((especialidade: string, index: number) => (
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
            ))}
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
            Unidades de segurança da cidade
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
          <View style={styles.mapPlaceholder}>
            <Ionicons
              name="map"
              size={64}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.mapText, { color: theme.colors.textSecondary }]}
            >
              Mapa das unidades de segurança
            </Text>
            <Text
              style={[
                styles.mapSubtext,
                { color: theme.colors.textSecondary },
              ]}
            >
              Aqui seria exibido o mapa com todas as unidades
            </Text>
          </View>
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
