import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, AppState } from 'react-native';

import { CustomStatusBar } from '@/components/CustomStatusBar';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { CityProvider } from '@/contexts/CityContext';
import { useAuth } from '@/hooks/useAuth';
import { AppNavigator } from '@/navigation/AppNavigator';
import { SplashScreen } from '@/screens/SplashScreen';
import { supabase } from '@/utils/supabase';

const AppContent: React.FC = () => {
  const { loading, user } = useAuth();
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  // Configuração do Supabase para refresh automático de token e listener de auth
  useEffect(() => {
    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Listener silencioso para detectar mudanças de autenticação
    });

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription?.unsubscribe();
      appStateSubscription?.remove();
    };
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <>
        <CustomStatusBar />
        <SplashScreen onFinish={handleSplashFinish} />
      </>
    );
  }

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <CustomStatusBar />
      <AppNavigator user={user} />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CityProvider>
        <AppContent />
      </CityProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
