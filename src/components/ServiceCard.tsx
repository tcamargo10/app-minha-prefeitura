import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';

interface ServiceCardProps {
  icon: string;
  title: string;
  color?: string;
  onPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  color,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        { backgroundColor: color || theme.colors.primary },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon as any}
        size={24}
        color={theme.colors.onPrimary}
      />
      <Text
        style={[
          styles.serviceTitle,
          { color: theme.colors.onPrimary },
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
});
