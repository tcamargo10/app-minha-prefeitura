import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryCardProps {
  icon: string;
  title: string;
  color: string;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={20} color="white" />
      <Text
        style={[styles.categoryTitle, { color: 'white' }]}
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: '24%', // 4 cards por linha (25% - 1% para margem)
    aspectRatio: 1.2, // Altura menor (era 1, agora 1.2 = mais largo que alto)
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12, // Aumentado de 8 para 12
    marginRight: '1%', // Pequena margem entre os cards
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
});
