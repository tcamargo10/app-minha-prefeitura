import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useCity } from '@/contexts/CityContext';
import { useTheme } from '@/contexts/ThemeContext';

import { CitySelectorModal } from './CitySelectorModal';

interface AppBarProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  showLogo?: boolean;
  showCitySelector?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  showLogo = true,
  showCitySelector = false,
}) => {
  const { theme } = useTheme();
  const { currentCity } = useCity();
  const [cityModalVisible, setCityModalVisible] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary,
          borderBottomColor: theme.colors.primary,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={theme.colors.onPrimary}
              />
            </TouchableOpacity>
          ) : showLogo ? (
            <Image
              source={require('../../assets/icon-white.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : null}
        </View>

        <View style={styles.centerSection}>
          {showCitySelector ? (
            <TouchableOpacity
              style={styles.citySelector}
              onPress={() => setCityModalVisible(true)}
              activeOpacity={0.7}
            >
              <View style={styles.cityInfo}>
                <Text
                  style={[styles.cityName, { color: theme.colors.onPrimary }]}
                  numberOfLines={1}
                >
                  {currentCity.name} - {currentCity.state}
                </Text>
              </View>
              <Ionicons
                name="chevron-down"
                size={16}
                color={theme.colors.onPrimary}
                style={styles.cityIcon}
              />
            </TouchableOpacity>
          ) : (
            <Text
              style={[styles.title, { color: theme.colors.onPrimary }]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
        </View>

        <View style={styles.rightSection}>{rightComponent}</View>
      </View>

      <CitySelectorModal
        visible={cityModalVisible}
        onClose={() => setCityModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 2,
    height: 60,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 2,
  },
  logo: {
    width: 110,
    marginLeft: -4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  cityState: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 14,
    marginTop: 2,
  },
  cityIcon: {
    marginLeft: 4,
  },
});
