import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      <Text style={[styles.categoryTitle, { color: 'white' }]} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
});
