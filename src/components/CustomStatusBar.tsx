import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export const CustomStatusBar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={theme.colors.primary}
      translucent={true}
    />
  );
};
