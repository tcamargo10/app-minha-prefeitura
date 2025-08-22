import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export const PerfilScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Perfil" />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.userInfoSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
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
                Nome:
              </Text>
              <Text
                style={[styles.userInfoValue, { color: theme.colors.text }]}
              >
                {user?.user_metadata?.name || 'Não informado'}
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
                Email:
              </Text>
              <Text
                style={[styles.userInfoValue, { color: theme.colors.text }]}
              >
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
              <Text
                style={[styles.userInfoValue, { color: theme.colors.text }]}
              >
                {user?.id}
              </Text>
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Configurações
            </Text>

            <View
              style={[
                styles.settingCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <ThemeToggle />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
          >
            <Text
              style={[styles.buttonText, { color: theme.colors.onPrimary }]}
            >
              Editar Perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.error }]}
          >
            <Text
              style={[styles.logoutButtonText, { color: theme.colors.onError }]}
            >
              Sair
            </Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userInfoSection: {
    width: '100%',
    marginBottom: 30,
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
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsSection: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  settingCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
