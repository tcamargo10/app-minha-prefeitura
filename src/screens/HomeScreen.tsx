import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

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
});
