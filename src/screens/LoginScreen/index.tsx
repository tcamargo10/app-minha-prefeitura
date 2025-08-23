import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
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
} from 'react-native';

import { useAlert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { CustomStatusBar } from '@/components/CustomStatusBar';
import { Input } from '@/components/Input';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/navigation/AppNavigator';

import { loginSchema, LoginFormData } from './schema';
import { TermsOfUse } from './TermsOfUse';
import { PrivacyPolicy } from './PrivacyPolicy';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const { width, height } = Dimensions.get('window');

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn, loading } = useAuth();
  const { theme } = useTheme();
  const { showError } = useAlert();
  const [termsVisible, setTermsVisible] = React.useState(false);
  const [privacyVisible, setPrivacyVisible] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn(data);

    if (result.error) {
      showError({
        message: result.error,
      });
    } else {
      navigation.replace('Main');
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleOpenTerms = () => {
    setTermsVisible(true);
  };

  const handleOpenPrivacy = () => {
    setPrivacyVisible(true);
  };

  const handleCloseTerms = () => {
    setTermsVisible(false);
  };

  const handleClosePrivacy = () => {
    setPrivacyVisible(false);
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
                        name="business"
                        size={40}
                        color={theme.colors.primary}
                      />
                    </View>
                  </View>

                  <Text
                    style={[styles.title, { color: theme.colors.onPrimary }]}
                  >
                    Minha Prefeitura
                  </Text>
                  <Text
                    style={[styles.subtitle, { color: theme.colors.onPrimary }]}
                  >
                    Conectando você à sua cidade
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
                      Bem-vindo de volta!
                    </Text>
                    <Text
                      style={[
                        styles.formSubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Faça login para acessar os serviços
                    </Text>
                  </View>

                  <View style={styles.form}>
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

                    <Button
                      title="Entrar"
                      onPress={handleSubmit(onSubmit)}
                      loading={loading}
                      style={styles.loginButton}
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
                        styles.registerButton,
                        { borderColor: theme.colors.border },
                      ]}
                      onPress={handleRegisterPress}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.registerButtonText,
                          { color: theme.colors.text },
                        ]}
                      >
                        Criar nova conta
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color={theme.colors.text}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Footer */}
                  <View style={styles.footer}>
                    <Text
                      style={[
                        styles.footerText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Ao continuar, você concorda com nossos
                    </Text>
                    <View style={styles.footerLinks}>
                      <TouchableOpacity onPress={handleOpenTerms}>
                        <Text
                          style={[
                            styles.footerLink,
                            { color: theme.colors.primary },
                          ]}
                        >
                          Termos de Uso
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.footerText,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {' '}
                        e{' '}
                      </Text>
                      <TouchableOpacity onPress={handleOpenPrivacy}>
                        <Text
                          style={[
                            styles.footerLink,
                            { color: theme.colors.primary },
                          ]}
                        >
                          Política de Privacidade
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </View>

      <TermsOfUse
        visible={termsVisible}
        onClose={handleCloseTerms}
      />
      
      <PrivacyPolicy
        visible={privacyVisible}
        onClose={handleClosePrivacy}
      />
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
  loginButton: {
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
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 50,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  footerLink: {
    fontSize: 12,
    fontWeight: '600',
  },
});
