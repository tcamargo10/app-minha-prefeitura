import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

import { CategoryCard } from './CategoryCard';

interface Category {
  id: number;
  icon: string;
  title: string;
  color: string;
  onPress?: () => void;
}

interface CategoriesGridProps {
  title: string;
  categories: Category[];
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  title,
  categories,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      <View style={styles.categoriesGrid}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            color={category.color}
            onPress={category.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
