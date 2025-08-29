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

export const EducacaoScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const escolas = [
    {
      id: 1,
      nome: 'EMEF "Prof. José Antônio de Toledo"',
      tipo: 'Ensino Fundamental',
      endereco: 'Rua XV de Novembro, 123 - Centro',
      telefone: '(13) 3841-1234',
      email: 'emef.toledo@prefeitura.iguape.sp.gov.br',
      horario: '7h às 17h',
      alunos: 320,
      professores: 18,
      icon: 'school',
      color: '#007AFF',
      coordenadas: { latitude: -24.7081, longitude: -47.5553 },
    },
    {
      id: 2,
      nome: 'EMEI "Maria das Dores"',
      tipo: 'Educação Infantil',
      endereco: 'Rua da Liberdade, 456 - Vila Nova',
      telefone: '(13) 3841-2345',
      email: 'emei.maria.dores@prefeitura.iguape.sp.gov.br',
      horario: '7h às 18h',
      alunos: 150,
      professores: 10,
      icon: 'school',
      color: '#34C759',
      coordenadas: { latitude: -24.7123, longitude: -47.5589 },
    },
    {
      id: 3,
      nome: 'EMEF "Dr. João Baptista de Oliveira"',
      tipo: 'Ensino Fundamental',
      endereco: 'Rua São João, 789 - Bairro São João',
      telefone: '(13) 3841-3456',
      email: 'emef.joao.baptista@prefeitura.iguape.sp.gov.br',
      horario: '7h às 17h',
      alunos: 280,
      professores: 16,
      icon: 'school',
      color: '#FF9500',
      coordenadas: { latitude: -24.7156, longitude: -47.5521 },
    },
    {
      id: 4,
      nome: 'EMEI "Nossa Senhora das Neves"',
      tipo: 'Educação Infantil',
      endereco: 'Rua das Palmeiras, 321 - Jardim das Palmeiras',
      telefone: '(13) 3841-4567',
      email: 'emei.nossa.senhora@prefeitura.iguape.sp.gov.br',
      horario: '7h às 18h',
      alunos: 120,
      professores: 8,
      icon: 'school',
      color: '#AF52DE',
      coordenadas: { latitude: -24.7098, longitude: -47.5602 },
    },
    {
      id: 5,
      nome: 'EMEF "Prof.ª Maria Aparecida Silva"',
      tipo: 'Ensino Fundamental',
      endereco: 'Rua do Comércio, 654 - Centro Histórico',
      telefone: '(13) 3841-5678',
      email: 'emef.maria.aparecida@prefeitura.iguape.sp.gov.br',
      horario: '7h às 17h',
      alunos: 250,
      professores: 14,
      icon: 'school',
      color: '#FF2D92',
      coordenadas: { latitude: -24.7067, longitude: -47.5534 },
    },
    {
      id: 6,
      nome: 'EMEI "São Miguel"',
      tipo: 'Educação Infantil',
      endereco: 'Rua São Miguel, 987 - Bairro São Miguel',
      telefone: '(13) 3841-6789',
      email: 'emei.sao.miguel@prefeitura.iguape.sp.gov.br',
      horario: '7h às 18h',
      alunos: 90,
      professores: 6,
      icon: 'school',
      color: '#FF3B30',
      coordenadas: { latitude: -24.7189, longitude: -47.5567 },
    },
    {
      id: 7,
      nome: 'EMEF "José Bonifácio"',
      tipo: 'Ensino Fundamental',
      endereco: 'Rua José Bonifácio, 147 - Vila Operária',
      telefone: '(13) 3841-7890',
      email: 'emef.jose.bonifacio@prefeitura.iguape.sp.gov.br',
      horario: '7h às 17h',
      alunos: 200,
      professores: 12,
      icon: 'school',
      color: '#00CED1',
      coordenadas: { latitude: -24.7201, longitude: -47.5498 },
    },
    {
      id: 8,
      nome: 'EMEI "Santa Rita"',
      tipo: 'Educação Infantil',
      endereco: 'Rua Santa Rita, 258 - Bairro Santa Rita',
      telefone: '(13) 3841-8901',
      email: 'emei.santa.rita@prefeitura.iguape.sp.gov.br',
      horario: '7h às 18h',
      alunos: 110,
      professores: 7,
      icon: 'school',
      color: '#FF8C00',
      coordenadas: { latitude: -24.7045, longitude: -47.5612 },
    },
  ];

  const handleEscolaPress = (escola: any) => {
    console.log('Escola selecionada:', escola.nome);
  };

  const handleMapView = () => {
    setViewMode('map');
    console.log('Abrindo mapa das escolas');
  };

  const handleListView = () => {
    setViewMode('list');
  };

  const renderEscolaCard = ({ item: escola }: { item: any }) => (
    <TouchableOpacity
      style={[styles.escolaCard, { backgroundColor: theme.colors.background }]}
      onPress={() => handleEscolaPress(escola)}
      activeOpacity={0.7}
    >
      <View style={styles.escolaHeader}>
        <View style={[styles.escolaIcon, { backgroundColor: escola.color }]}>
          <Ionicons name={escola.icon as any} size={24} color="white" />
        </View>
        <View style={styles.escolaInfo}>
          <Text style={[styles.escolaNome, { color: theme.colors.text }]}>
            {escola.nome}
          </Text>
          <Text
            style={[styles.escolaTipo, { color: theme.colors.textSecondary }]}
          >
            {escola.tipo}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textSecondary}
        />
      </View>

      <View style={styles.escolaDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            {escola.endereco}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="call" size={16} color={theme.colors.primary} />
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            {escola.telefone}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={theme.colors.primary} />
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            {escola.horario}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              {escola.alunos}
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Alunos
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              {escola.professores}
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Professores
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      title="Educação"
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
            <Ionicons name="school" size={48} color={theme.colors.onPrimary} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Educação
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            Escolas municipais de Iguape - SP
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
            data={escolas}
            renderItem={renderEscolaCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <CustomMapView
            locations={escolas.map(escola => ({
              id: escola.id,
              nome: escola.nome,
              coordenadas: escola.coordenadas,
              color: escola.color,
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
  escolaCard: {
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
  escolaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  escolaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  escolaInfo: {
    flex: 1,
  },
  escolaNome: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  escolaTipo: {
    fontSize: 14,
    fontWeight: '500',
  },
  escolaDetails: {
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
