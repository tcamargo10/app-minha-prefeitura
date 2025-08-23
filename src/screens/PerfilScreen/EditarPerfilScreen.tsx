import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export const EditarPerfilScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    cpf: user?.user_metadata?.cpf || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Erro', 'O email é obrigatório');
      return;
    }

    setIsLoading(true);

    try {
      // Aqui você implementaria a lógica para salvar no backend
      // Por exemplo: await updateUserProfile(formData);

      // Simulando uma requisição
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Aqui você poderia navegar de volta ou atualizar o contexto
            console.log('Perfil atualizado:', formData);
          },
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar o perfil. Tente novamente.'
      );
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
    icon?: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
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
          style={[styles.textInput, { color: theme.colors.text }]}
          value={formData[field]}
          onChangeText={value => handleInputChange(field, value)}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
        />
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Avatar Section */}
          <View style={styles.avatarSection}>
            <View
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações Pessoais
            </Text>

            {renderInputField(
              'Nome Completo',
              'name',
              'Digite seu nome completo',
              'default',
              'person'
            )}

            {renderInputField(
              'Email',
              'email',
              'Digite seu email',
              'email-address',
              'mail'
            )}

            {renderInputField(
              'Telefone',
              'phone',
              'Digite seu telefone',
              'phone-pad',
              'call'
            )}

                         {renderInputField(
               'CPF',
               'cpf',
               'Digite seu CPF',
               'numeric',
               'card'
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
});
