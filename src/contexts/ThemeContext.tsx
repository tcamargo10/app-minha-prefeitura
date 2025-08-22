import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { lightColors, darkColors } from '@/theme/colors';
import { Theme, ThemeMode, ThemeContextType } from '@/types/theme';

const THEME_STORAGE_KEY = '@app_minha_prefeitura:theme';

const createTheme = (mode: ThemeMode): Theme => ({
  colors: mode === 'light' ? lightColors : darkColors,
});

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [theme, setThemeState] = useState<Theme>(() => createTheme('light'));

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        const themeMode = savedTheme as ThemeMode;
        setThemeState(createTheme(themeMode));
      }
    } catch (error) {
      console.error('Erro ao carregar tema do storage:', error);
    }
  };

  const saveThemeToStorage = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Erro ao salvar tema no storage:', error);
    }
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(createTheme(mode));
    saveThemeToStorage(mode);
  };

  const toggleTheme = () => {
    const currentColors = theme.colors;
    const newMode = currentColors === lightColors ? 'dark' : 'light';
    setTheme(newMode);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
