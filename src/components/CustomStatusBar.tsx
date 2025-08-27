import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

interface CustomStatusBarProps {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  barStyle = 'light-content',
  backgroundColor,
  translucent = true,
}) => {
  const { theme } = useTheme();

  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor || theme.colors.primary}
      translucent={Platform.OS === 'android' ? true : translucent}
    />
  );
};
