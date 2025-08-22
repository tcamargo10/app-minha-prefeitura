import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { useAlert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, signOut, loading } = useAuth();
  const { theme } = useTheme();
  const { showWarning, showError } = useAlert();

  const handleSignOut = async () => {
    showWarning({
      title: 'Sair',
      message: 'Tem certeza que deseja sair da aplicação?',
      onConfirm: async () => {
        const result = await signOut();
        if (result.error) {
          showError({
            message: result.error,
          });
        } else {
          navigation.replace('Login');
        }
      },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Minha Prefeitura
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Bem-vindo à sua área logada
          </Text>
          <ThemeToggle />
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.userInfoTitle, { color: theme.colors.text }]}>
            Informações do Usuário
          </Text>
          <View
            style={[
              styles.userInfoCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.userInfoLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Email:
            </Text>
            <Text style={[styles.userInfoValue, { color: theme.colors.text }]}>
              {user?.email}
            </Text>
          </View>
          <View
            style={[
              styles.userInfoCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.userInfoLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              ID:
            </Text>
            <Text style={[styles.userInfoValue, { color: theme.colors.text }]}>
              {user?.id}
            </Text>
          </View>
          <View
            style={[
              styles.userInfoCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.userInfoLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Nome:
            </Text>
            <Text style={[styles.userInfoValue, { color: theme.colors.text }]}>
              {user?.user_metadata?.name || 'Não informado'}
            </Text>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={[styles.featuresTitle, { color: theme.colors.text }]}>
            Funcionalidades
          </Text>

          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              📋 Solicitações
            </Text>
            <Text
              style={[
                styles.featureDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              Acompanhe suas solicitações e abra novos chamados
            </Text>
          </View>

          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              📢 Notificações
            </Text>
            <Text
              style={[
                styles.featureDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              Receba atualizações sobre suas solicitações
            </Text>
          </View>

          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              📊 Relatórios
            </Text>
            <Text
              style={[
                styles.featureDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              Visualize relatórios e estatísticas da cidade
            </Text>
          </View>

          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              📍 Mapa
            </Text>
            <Text
              style={[
                styles.featureDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              Visualize problemas e solicitações no mapa da cidade
            </Text>
          </View>
        </View>

        <Button
          title="Sair da Aplicação"
          onPress={handleSignOut}
          variant="outline"
          loading={loading}
          style={styles.signOutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  userInfo: {
    marginBottom: 30,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  userInfoCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  userInfoLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  userInfoValue: {
    fontSize: 16,
  },
  features: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featureCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  signOutButton: {
    marginTop: 20,
  },
});
