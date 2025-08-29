import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  numberOfLines,
  multiline,
  ...props
}) => {
  const { theme } = useTheme();

  // Calcula altura baseada no número de linhas para textarea
  const getInputHeight = () => {
    if (multiline && numberOfLines) {
      // Altura base (padding + border) + (altura da linha * número de linhas)
      const paddingVertical = 32; // 16px top + 16px bottom
      const borderWidth = 2; // 1px top + 1px bottom
      const lineHeight = 20; // altura aproximada de cada linha
      return paddingVertical + borderWidth + lineHeight * numberOfLines;
    }
    return 50; // altura padrão para input simples
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.error : theme.colors.border,
            color: theme.colors.text,
            height: getInputHeight(),
          },
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        numberOfLines={numberOfLines}
        multiline={multiline}
        {...props}
      />
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});
