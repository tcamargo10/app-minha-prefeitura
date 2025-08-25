import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { citizenService, Citizen } from '@/services/citizenService';
import {
  formatCPF,
  formatPhone,
  removeCPFMask,
  removePhoneMask,
} from '@/utils/masks';
import { updateProfileSchema, UpdateProfileFormData } from './schema';

export const EditarPerfilScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [citizen, setCitizen] = useState<Citizen | null>(null);

  // Carregar dados do cidadão
  const loadCitizenData = async (isRefreshing = false) => {
    if (!user?.email) {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoadingData(false);
      }
      return;
    }

    try {
      const citizenData = await citizenService.getCitizenByEmail(user.email);

      if (citizenData) {
        setCitizen(citizenData);
        setFormData({
          name: citizenData.name || '',
          email: citizenData.email || '',
          phone: formatPhone(citizenData.phone || ''),
          cpf: formatCPF(citizenData.cpf || ''),
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados do cidadão:', error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoadingData(false);
      }
    }
  };

  // Carregar dados ao montar o componente
  React.useEffect(() => {
    loadCitizenData();
  }, [user?.email]);

  // Função para atualizar dados (pull-to-refresh)
  const onRefresh = () => {
    setRefreshing(true);
    loadCitizenData(true);
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    // Aplicar máscaras conforme o campo
    if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'cpf') {
      formattedValue = formatCPF(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSave = async () => {
    if (!citizen) {
      Alert.alert('Erro', 'Dados do cidadão não encontrados');
      return;
    }

    // Preparar dados para validação (remover máscaras)
    const phoneWithoutMask = removePhoneMask(formData.phone.trim());

    const dataToValidate: UpdateProfileFormData = {
      name: formData.name.trim(),
      phone: phoneWithoutMask,
    };

    // Validar dados com Zod
    const validationResult = updateProfileSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      const errorMessage = errors.map(error => error.message).join('\n');
      Alert.alert('Erro de Validação', errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      // Atualizar dados na tabela 'citizens' do Supabase
      // Esta função atualiza apenas os campos 'name' e 'phone' do cidadão
      const updatedCitizen = await citizenService.updateCitizen(citizen.id, {
        name: validationResult.data.name,
        phone: validationResult.data.phone,
      });

      if (updatedCitizen) {
        setCitizen(updatedCitizen);

        // Atualizar o formulário com os dados retornados do banco
        setFormData(prev => ({
          ...prev,
          name: updatedCitizen.name || '',
          phone: formatPhone(updatedCitizen.phone || ''),
        }));

        Alert.alert('Sucesso', 'Dados atualizados com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('Dados atualizados:', {
                name: validationResult.data.name,
                phone: validationResult.data.phone,
              });
            },
          },
        ]);
      } else {
        throw new Error('Falha ao atualizar dados');
      }
    } catch (error: any) {
      console.error('Erro ao atualizar dados:', error);

      let errorMessage =
        'Não foi possível atualizar os dados. Tente novamente.';

      // Verificar se é um erro específico do Supabase
      if (error?.message) {
        if (error.message.includes('duplicate')) {
          errorMessage = 'Este telefone já está sendo usado por outro usuário.';
        } else if (error.message.includes('foreign key')) {
          errorMessage = 'Erro de referência no banco de dados.';
        } else if (error.message.includes('permission')) {
          errorMessage = 'Sem permissão para atualizar os dados.';
        }
      }

      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (
    label: string,
    field: keyof typeof formData,
    placeholder: string,
    keyboardType:
      | 'default'
      | 'email-address'
      | 'phone-pad'
      | 'numeric' = 'default',
    icon?: string,
    editable: boolean = true
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: editable
              ? theme.colors.surface
              : theme.colors.surface,
            borderColor: theme.colors.border,
            opacity: editable ? 1 : 0.7,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={theme.colors.textSecondary}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={[
            styles.textInput,
            {
              color: editable ? theme.colors.text : theme.colors.textSecondary,
            },
          ]}
          value={formData[field]}
          onChangeText={value => handleInputChange(field, value)}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
          editable={editable}
        />
        {!editable && (
          <Ionicons
            name="lock-closed"
            size={16}
            color={theme.colors.textSecondary}
            style={styles.lockIcon}
          />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Editar Perfil"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        >
          {/* Loading State */}
          {loadingData ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={theme.colors.primary}
                style={styles.loadingSpinner}
              />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Carregando dados do perfil...
              </Text>
            </View>
          ) : (
            <>
              {/* Profile Avatar Section */}
              <View style={styles.avatarSection}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Ionicons
                    name="person"
                    size={50}
                    color={theme.colors.onPrimary}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.changePhotoButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Ionicons
                    name="camera"
                    size={20}
                    color={theme.colors.onPrimary}
                  />
                  <Text
                    style={[
                      styles.changePhotoText,
                      { color: theme.colors.onPrimary },
                    ]}
                  >
                    Alterar Foto
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form Section */}
              <View style={styles.formSection}>
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Informações Pessoais
                </Text>

                {renderInputField(
                  'Nome Completo',
                  'name',
                  'Digite seu nome completo',
                  'default',
                  'person',
                  true // Habilitado para edição
                )}

                {renderInputField(
                  'Email',
                  'email',
                  'Digite seu email',
                  'email-address',
                  'mail',
                  false // Desabilitado
                )}

                {renderInputField(
                  'Telefone',
                  'phone',
                  '(11) 99999-9999',
                  'phone-pad',
                  'call',
                  true // Habilitado para edição
                )}

                {renderInputField(
                  'CPF',
                  'cpf',
                  '000.000.000-00',
                  'numeric',
                  'card',
                  false // Desabilitado
                )}
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: theme.colors.primary,
                    opacity: isLoading ? 0.7 : 1,
                  },
                ]}
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text
                    style={[
                      styles.saveButtonText,
                      { color: theme.colors.onPrimary },
                    ]}
                  >
                    Salvando...
                  </Text>
                ) : (
                  <>
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={theme.colors.onPrimary}
                    />
                    <Text
                      style={[
                        styles.saveButtonText,
                        { color: theme.colors.onPrimary },
                      ]}
                    >
                      Salvar Alterações
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  lockIcon: {
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingSpinner: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
