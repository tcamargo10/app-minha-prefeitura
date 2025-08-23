import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { SelectInput, SelectOption } from '@/components/SelectInput';
import { useTheme } from '@/contexts/ThemeContext';
import {
  municipalityService,
  State,
  City,
} from '@/services/municipalityService';

interface Endereco {
  id: string;
  tipo: 'residencial' | 'comercial' | 'outro';
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  principal: boolean;
}

export const EnderecosScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [enderecos, setEnderecos] = useState<Endereco[]>([
    {
      id: '1',
      tipo: 'residencial',
      cep: '12345-678',
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 45',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      principal: true,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEndereco, setEditingEndereco] = useState<Endereco | null>(null);
  const [formData, setFormData] = useState({
    tipo: 'residencial',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    principal: false,
  });

  // Estados para dados do Supabase
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Converter dados para formato do SelectInput
  const stateOptions: SelectOption[] = states.map(state => ({
    label: state.state,
    value: state.state,
  }));

  const cityOptions: SelectOption[] = cities.map(city => ({
    label: city.city,
    value: city.city,
  }));

  // Carregar estados ao montar o componente
  useEffect(() => {
    loadStates();
  }, []);

  // Carregar cidades quando o estado for selecionado
  useEffect(() => {
    if (formData.estado) {
      loadCitiesByState(formData.estado);
    } else {
      setCities([]);
    }
  }, [formData.estado]);

  const loadStates = async () => {
    setLoadingStates(true);
    try {
      const statesData = await municipalityService.getStates();
      setStates(statesData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os estados');
    } finally {
      setLoadingStates(false);
    }
  };

  const loadCitiesByState = async (state: string) => {
    setLoadingCities(true);
    try {
      const citiesData = await municipalityService.getCitiesByState(state);
      setCities(citiesData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as cidades');
    } finally {
      setLoadingCities(false);
    }
  };

  const handleAddEndereco = () => {
    setEditingEndereco(null);
    setFormData({
      tipo: 'residencial',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      principal: false,
    });
    setModalVisible(true);
  };

  const handleEditEndereco = (endereco: Endereco) => {
    setEditingEndereco(endereco);
    setFormData({
      tipo: endereco.tipo,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento || '',
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      principal: endereco.principal,
    });
    setModalVisible(true);
  };

  const handleDeleteEndereco = (id: string) => {
    Alert.alert(
      'Excluir Endereço',
      'Tem certeza que deseja excluir este endereço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setEnderecos(enderecos.filter(e => e.id !== id));
          },
        },
      ]
    );
  };

  const handleSetPrincipal = (id: string) => {
    setEnderecos(
      enderecos.map(endereco => ({
        ...endereco,
        principal: endereco.id === id,
      }))
    );
  };

  const handleSaveEndereco = () => {
    if (
      !formData.cep ||
      !formData.logradouro ||
      !formData.numero ||
      !formData.bairro ||
      !formData.cidade ||
      !formData.estado
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingEndereco) {
      // Editando endereço existente
      setEnderecos(
        enderecos.map(endereco =>
          endereco.id === editingEndereco.id
            ? {
                ...endereco,
                ...formData,
                tipo: formData.tipo as 'residencial' | 'comercial' | 'outro',
              }
            : formData.principal
              ? { ...endereco, principal: false }
              : endereco
        )
      );
    } else {
      // Adicionando novo endereço
      const newEndereco: Endereco = {
        id: Date.now().toString(),
        ...formData,
        tipo: formData.tipo as 'residencial' | 'comercial' | 'outro',
      };
      setEnderecos([
        ...enderecos.map(e => ({
          ...e,
          principal: formData.principal ? false : e.principal,
        })),
        newEndereco,
      ]);
    }

    setModalVisible(false);
    setEditingEndereco(null);
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'residencial':
        return 'Residencial';
      case 'comercial':
        return 'Comercial';
      case 'outro':
        return 'Outro';
      default:
        return tipo;
    }
  };

  const renderEndereco = (endereco: Endereco) => (
    <View
      key={endereco.id}
      style={[
        styles.enderecoCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.enderecoHeader}>
        <View style={styles.enderecoInfo}>
          <View style={styles.enderecoTipo}>
            <Ionicons name="location" size={16} color={theme.colors.primary} />
            <Text style={[styles.tipoText, { color: theme.colors.primary }]}>
              {getTipoLabel(endereco.tipo)}
            </Text>
            {endereco.principal && (
              <View
                style={[
                  styles.principalBadge,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text
                  style={[
                    styles.principalText,
                    { color: theme.colors.onPrimary },
                  ]}
                >
                  Principal
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.enderecoText, { color: theme.colors.text }]}>
            {endereco.logradouro}, {endereco.numero}
            {endereco.complemento && ` - ${endereco.complemento}`}
          </Text>
          <Text
            style={[styles.enderecoText, { color: theme.colors.textSecondary }]}
          >
            {endereco.bairro}, {endereco.cidade} - {endereco.estado}
          </Text>
          <Text
            style={[styles.enderecoText, { color: theme.colors.textSecondary }]}
          >
            CEP: {endereco.cep}
          </Text>
        </View>
        <View style={styles.enderecoActions}>
          {!endereco.principal && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => handleSetPrincipal(endereco.id)}
            >
              <Ionicons name="star" size={16} color={theme.colors.onPrimary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => handleEditEndereco(endereco)}
          >
            <Ionicons name="pencil" size={16} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.error },
            ]}
            onPress={() => handleDeleteEndereco(endereco.id)}
          >
            <Ionicons name="trash" size={16} color={theme.colors.onError} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Endereços"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Ionicons
              name="location-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Seus Endereços
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Gerencie seus endereços cadastrados
            </Text>
          </View>

          {/* Endereços List */}
          {enderecos.length > 0 ? (
            <View style={styles.enderecosList}>
              {enderecos.map(renderEndereco)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="location-outline"
                size={48}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhum endereço cadastrado
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Adicione seu primeiro endereço para começar
              </Text>
            </View>
          )}

          {/* Add Button */}
          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleAddEndereco}
          >
            <Ionicons name="add" size={24} color={theme.colors.onPrimary} />
            <Text
              style={[styles.addButtonText, { color: theme.colors.onPrimary }]}
            >
              Adicionar Endereço
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Modal para adicionar/editar endereço */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingEndereco ? 'Editar Endereço' : 'Novo Endereço'}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              {/* Tipo de Endereço */}
              <View style={styles.formSection}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Tipo de Endereço *
                </Text>
                <View style={styles.tipoButtons}>
                  {['residencial', 'comercial', 'outro'].map(tipo => (
                    <TouchableOpacity
                      key={tipo}
                      style={[
                        styles.tipoButton,
                        {
                          backgroundColor:
                            formData.tipo === tipo
                              ? theme.colors.primary
                              : theme.colors.surface,
                          borderColor: theme.colors.border,
                        },
                      ]}
                      onPress={() =>
                        setFormData({ ...formData, tipo: tipo as any })
                      }
                    >
                      <Text
                        style={[
                          styles.tipoButtonText,
                          {
                            color:
                              formData.tipo === tipo
                                ? theme.colors.onPrimary
                                : theme.colors.text,
                          },
                        ]}
                      >
                        {getTipoLabel(tipo)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* CEP */}
              <View style={styles.formSection}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  CEP *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    },
                  ]}
                  value={formData.cep}
                  onChangeText={text => setFormData({ ...formData, cep: text })}
                  placeholder="12345-678"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>

              {/* Logradouro */}
              <View style={styles.formSection}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Logradouro *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    },
                  ]}
                  value={formData.logradouro}
                  onChangeText={text =>
                    setFormData({ ...formData, logradouro: text })
                  }
                  placeholder="Rua, Avenida, etc."
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>

              {/* Número e Complemento */}
              <View style={styles.row}>
                <View style={[styles.formSection, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.text }]}>
                    Número *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        color: theme.colors.text,
                      },
                    ]}
                    value={formData.numero}
                    onChangeText={text =>
                      setFormData({ ...formData, numero: text })
                    }
                    placeholder="123"
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                </View>
                <View style={[styles.formSection, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.label, { color: theme.colors.text }]}>
                    Complemento
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        color: theme.colors.text,
                      },
                    ]}
                    value={formData.complemento}
                    onChangeText={text =>
                      setFormData({ ...formData, complemento: text })
                    }
                    placeholder="Apto, Casa, etc."
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                </View>
              </View>

              {/* Bairro */}
              <View style={styles.formSection}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Bairro *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    },
                  ]}
                  value={formData.bairro}
                  onChangeText={text =>
                    setFormData({ ...formData, bairro: text })
                  }
                  placeholder="Nome do bairro"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>

                             {/* Estado e Cidade */}
               <View style={styles.row}>
                 <View style={[styles.formSection, { flex: 1, marginRight: 8 }]}>
                   <SelectInput
                     label="Estado"
                     placeholder="Selecione o estado"
                     value={formData.estado}
                     options={stateOptions}
                     onSelect={(value) => {
                       setFormData({ ...formData, estado: value, cidade: '' });
                     }}
                     loading={loadingStates}
                     required
                   />
                 </View>
                 <View style={[styles.formSection, { flex: 1, marginLeft: 8 }]}>
                   <SelectInput
                     label="Cidade"
                     placeholder="Selecione a cidade"
                     value={formData.cidade}
                     options={cityOptions}
                     onSelect={(value) => {
                       setFormData({ ...formData, cidade: value });
                     }}
                     loading={loadingCities}
                     disabled={!formData.estado}
                     required
                   />
                 </View>
               </View>

              {/* Endereço Principal */}
              <View style={styles.formSection}>
                <TouchableOpacity
                  style={styles.principalToggle}
                  onPress={() =>
                    setFormData({ ...formData, principal: !formData.principal })
                  }
                >
                  <Ionicons
                    name={formData.principal ? 'star' : 'star-outline'}
                    size={20}
                    color={
                      formData.principal
                        ? theme.colors.primary
                        : theme.colors.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.principalLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Definir como endereço principal
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={[styles.modalButtonText, { color: theme.colors.text }]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.saveButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleSaveEndereco}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    { color: theme.colors.onPrimary },
                  ]}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  enderecosList: {
    marginBottom: 24,
  },
  enderecoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  enderecoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  enderecoInfo: {
    flex: 1,
  },
  enderecoTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipoText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  principalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  principalText: {
    fontSize: 10,
    fontWeight: '600',
  },
  enderecoText: {
    fontSize: 14,
    marginBottom: 2,
  },
  enderecoActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  formSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  tipoButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  tipoButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  tipoButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  principalToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  principalLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
     modalButtonText: {
     fontSize: 16,
     fontWeight: '600',
   },
 });
