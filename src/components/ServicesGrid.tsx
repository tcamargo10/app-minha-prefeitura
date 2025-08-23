import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

import { CategoryCard } from './CategoryCard';

interface Service {
  id: number;
  icon: string;
  title: string;
  color: string;
  onPress?: () => void;
}

interface ServicesGridProps {
  title: string;
  services: Service[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  title,
  services,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      <View style={styles.servicesGrid}>
        {services.map(service => (
          <CategoryCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            color={service.color}
            onPress={service.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
