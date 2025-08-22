import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Minha Prefeitura" />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.welcomeSection}>
            <Text
              style={[
                styles.welcomeText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Bem-vindo à sua área logada
            </Text>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.user_metadata?.name || 'Usuário'}
            </Text>
          </View>
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
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
  },
});
