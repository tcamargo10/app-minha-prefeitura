import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

interface UserInfoCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onEdit?: () => void;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  icon,
  label,
  value,
  onEdit,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.userInfoCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {onEdit ? (
        <View style={styles.userInfoCardTwoColumns}>
          <View style={styles.userInfoCardLeftColumn}>
            <View style={styles.userInfoCardHeaderLeft}>
              <Ionicons name={icon} size={20} color={theme.colors.primary} />
              <Text
                style={[
                  styles.userInfoCardLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {label}
              </Text>
            </View>
            <Text
              style={[styles.userInfoCardValue, { color: theme.colors.text }]}
            >
              {value}
            </Text>
          </View>
          <View style={styles.userInfoCardRightColumn}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Ionicons name="pencil" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.userInfoCardHeaderLeft}>
            <Ionicons name={icon} size={20} color={theme.colors.primary} />
            <Text
              style={[
                styles.userInfoCardLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              {label}
            </Text>
          </View>
          <Text
            style={[styles.userInfoCardValue, { color: theme.colors.text }]}
          >
            {value}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  userInfoCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  userInfoCardLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  userInfoCardValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  userInfoCardTwoColumns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userInfoCardLeftColumn: {
    flex: 1,
  },
  userInfoCardRightColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
  },
});
