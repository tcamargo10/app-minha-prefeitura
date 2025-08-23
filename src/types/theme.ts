export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  surfaceVariant: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;

  // Primary colors
  primary: string;
  primaryVariant: string;
  onPrimary: string;

  // Secondary colors
  secondary: string;
  secondaryVariant: string;
  onSecondary: string;

  // Error colors
  error: string;
  onError: string;

  // Border colors
  border: string;
  borderVariant: string;

  // Status colors
  success: string;
  warning: string;
  info: string;

  // Shadow colors
  shadow: string;

  // Base colors
  white: string;
  black: string;
}

export interface Theme {
  colors: ThemeColors;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}
