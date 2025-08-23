import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import { useAlert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { CustomStatusBar } from '@/components/CustomStatusBar';
import { Input } from '@/components/Input';
import { SelectInput, SelectOption } from '@/components/SelectInput';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/navigation/AppNavigator';
import {
  municipalityService,
  State,
  City,
} from '@/services/municipalityService';
import {
  formatCPF,
  formatCEP,
  formatPhone,
  formatDate,
} from '@/utils/masks';

import { registerSchema, RegisterFormData } from './schema';

const { width, height } = Dimensions.get('window');

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { signUp, loading } = useAuth();
  const { theme } = useTheme();
  const { showError, showSuccess } = useAlert();

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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      dataNascimento: '',
      telefone: '',
      cpf: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      estado: '',
      cidade: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchedEstado = watch('estado');

  // Carregar estados ao montar o componente
  useEffect(() => {
    loadStates();
  }, []);

  // Carregar cidades quando o estado for selecionado
  useEffect(() => {
    if (watchedEstado) {
      loadCitiesByState(watchedEstado);
      // Limpar cidade quando estado mudar
      setValue('cidade', '');
    } else {
      setCities([]);
    }
  }, [watchedEstado, setValue]);

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

  const onSubmit = async (data: RegisterFormData) => {
    const result = await signUp(data);

    if (result.error) {
      showError({
        message: result.error,
      });
    } else {
      showSuccess({
        message:
          'Conta criada com sucesso! Verifique seu email para confirmar a conta.',
        onConfirm: () => navigation.navigate('Login'),
      });
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <CustomStatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
        translucent={false}
      />
      <View
        style={[styles.container, { backgroundColor: theme.colors.primary }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View
            style={[styles.gradient, { backgroundColor: theme.colors.primary }]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {/* Header Section */}
                <View style={styles.header}>
                  <View style={styles.logoContainer}>
                    <View
                      style={[
                        styles.logoCircle,
                        { backgroundColor: theme.colors.onPrimary },
                      ]}
                    >
                      <Ionicons
                        name="person-add"
                        size={40}
                        color={theme.colors.primary}
                      />
                    </View>
                  </View>

                  <Text
                    style={[styles.title, { color: theme.colors.onPrimary }]}
                  >
                    Criar Conta
                  </Text>
                  <Text
                    style={[styles.subtitle, { color: theme.colors.onPrimary }]}
                  >
                    Junte-se à sua cidade digital
                  </Text>
                </View>

                {/* Form Section */}
                <View
                  style={[
                    styles.formContainer,
                    { backgroundColor: theme.colors.background },
                  ]}
                >
                  <View style={styles.formHeader}>
                    <Text
                      style={[styles.formTitle, { color: theme.colors.text }]}
                    >
                      Criar Conta
                    </Text>
                    <Text
                      style={[
                        styles.formSubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Preencha suas informações para começar
                    </Text>
                  </View>

                  <View style={styles.form}>
                    {/* Seção: Dados Pessoais */}
                    <View style={styles.sectionContainer}>
                      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Dados Pessoais
                      </Text>

                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Nome completo"
                            placeholder="Digite seu nome completo"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize="words"
                            error={errors.name?.message}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Email"
                            placeholder="Digite seu email"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            error={errors.email?.message}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="cpf"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="CPF"
                            placeholder="000.000.000-00"
                            value={value}
                            onChangeText={(text) => onChange(formatCPF(text))}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            error={errors.cpf?.message}
                          />
                        )}
                      />

                      <View style={styles.row}>
                        <View style={[styles.formSection, { flex: 1, marginRight: 8 }]}>
                          <Controller
                            control={control}
                            name="dataNascimento"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <Input
                                label="Data de nascimento"
                                placeholder="DD/MM/AAAA"
                                value={value}
                                onChangeText={(text) => onChange(formatDate(text))}
                                onBlur={onBlur}
                                keyboardType="numeric"
                                error={errors.dataNascimento?.message}
                              />
                            )}
                          />
                        </View>
                        <View style={[styles.formSection, { flex: 1, marginLeft: 8 }]}>
                          <Controller
                            control={control}
                            name="telefone"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <Input
                                label="Telefone"
                                placeholder="(11) 99999-9999"
                                value={value}
                                onChangeText={(text) => onChange(formatPhone(text))}
                                onBlur={onBlur}
                                keyboardType="phone-pad"
                                error={errors.telefone?.message}
                              />
                            )}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Seção: Endereço */}
                    <View style={styles.sectionContainer}>
                      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Endereço
                      </Text>

                      <Controller
                        control={control}
                        name="cep"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="CEP"
                            placeholder="12345-678"
                            value={value}
                            onChangeText={(text) => onChange(formatCEP(text))}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            error={errors.cep?.message}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="logradouro"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Logradouro"
                            placeholder="Rua, Avenida, etc."
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.logradouro?.message}
                          />
                        )}
                      />

                      <View style={styles.row}>
                        <View style={[styles.formSection, { flex: 1, marginRight: 8 }]}>
                          <Controller
                            control={control}
                            name="numero"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <Input
                                label="Número"
                                placeholder="123"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="numeric"
                                error={errors.numero?.message}
                              />
                            )}
                          />
                        </View>
                        <View style={[styles.formSection, { flex: 1, marginLeft: 8 }]}>
                          <Controller
                            control={control}
                            name="complemento"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <Input
                                label="Complemento"
                                placeholder="Apto, Casa, etc."
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.complemento?.message}
                              />
                            )}
                          />
                        </View>
                      </View>

                      <Controller
                        control={control}
                        name="bairro"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Bairro"
                            placeholder="Nome do bairro"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.bairro?.message}
                          />
                        )}
                      />

                      <View style={styles.row}>
                        <View style={[styles.formSection, { flex: 1, marginRight: 8 }]}>
                          <Controller
                            control={control}
                            name="estado"
                            render={({ field: { onChange, value } }) => (
                              <SelectInput
                                label="Estado"
                                placeholder="Selecione o estado"
                                value={value}
                                options={stateOptions}
                                onSelect={onChange}
                                loading={loadingStates}
                                required
                              />
                            )}
                          />
                        </View>
                        <View style={[styles.formSection, { flex: 1, marginLeft: 8 }]}>
                          <Controller
                            control={control}
                            name="cidade"
                            render={({ field: { onChange, value } }) => (
                              <SelectInput
                                label="Cidade"
                                placeholder="Selecione a cidade"
                                value={value}
                                options={cityOptions}
                                onSelect={onChange}
                                loading={loadingCities}
                                disabled={!watchedEstado}
                                required
                              />
                            )}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Seção: Segurança */}
                    <View style={styles.sectionContainer}>
                      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Segurança
                      </Text>

                      <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Senha"
                            placeholder="Digite sua senha"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            error={errors.password?.message}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Confirmar senha"
                            placeholder="Confirme sua senha"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            error={errors.confirmPassword?.message}
                          />
                        )}
                      />
                    </View>

                    <Button
                      title="Criar conta"
                      onPress={handleSubmit(onSubmit)}
                      loading={loading}
                      style={styles.registerButton}
                    />

                    <View style={styles.dividerContainer}>
                      <View
                        style={[
                          styles.divider,
                          { backgroundColor: theme.colors.border },
                        ]}
                      />
                      <Text
                        style={[
                          styles.dividerText,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        ou
                      </Text>
                      <View
                        style={[
                          styles.divider,
                          { backgroundColor: theme.colors.border },
                        ]}
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.loginButton,
                        { borderColor: theme.colors.border },
                      ]}
                      onPress={handleLoginPress}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.loginButtonText,
                          { color: theme.colors.text },
                        ]}
                      >
                        Já tenho uma conta
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color={theme.colors.text}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
    paddingBottom: 0,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.05,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginBottom: -100,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  formSection: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  registerButton: {
    marginTop: 24,
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
