import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/contexts/ThemeContext';
import { CategoriasScreen } from '@/screens/CategoriasScreen/index';
import { ComunicacaoScreen } from '@/screens/ComunicacaoScreen/index';
import { HomeScreen } from '@/screens/HomeScreen';
import { PrefeituraScreen } from '@/screens/PrefeituraScreen';
import { SolicitacoesScreen } from '@/screens/SolicitacoesScreen/index';

export type BottomTabParamList = {
  Inicio: undefined;
  Categorias: undefined;
  Prefeitura: undefined;
  Comunicacao: undefined;
  Solicitacoes: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabBarIcon: React.FC<{
  focused: boolean;
  color: string;
  size: number;
  iconName: keyof typeof Ionicons.glyphMap;
}> = ({ focused, color, size, iconName }) => {
  return <Ionicons name={iconName} size={size} color={color} />;
};

const PrefeituraButton: React.FC<{
  focused: boolean;
}> = ({ focused }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    navigation.navigate('Prefeitura' as never);
  };

  return (
    <TouchableOpacity
      style={[
        styles.prefeituraButton,
        {
          backgroundColor: theme.colors.primary,
          shadowColor: theme.colors.shadow,
          bottom: Platform.OS === 'ios' ? -20 : -8 + insets.bottom,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.prefeituraButtonContent}>
        <Ionicons name="business" size={28} color={theme.colors.onPrimary} />
        <Text
          style={[
            styles.prefeituraButtonText,
            { color: theme.colors.onPrimary },
          ]}
        >
          Prefeitura
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prefeituraButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -20 : -8,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  prefeituraButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefeituraButtonText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
});

export const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categorias') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Prefeitura') {
            return <PrefeituraButton focused={focused} />;
          } else if (route.name === 'Comunicacao') {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Solicitacoes') {
            iconName = focused ? 'list' : 'list-outline';
          } else {
            iconName = 'help-outline';
          }

          return (
            <CustomTabBarIcon
              focused={focused}
              color={color}
              size={size}
              iconName={iconName}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.onPrimary,
        tabBarInactiveTintColor: theme.colors.onPrimary,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: theme.colors.shadow,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : insets.bottom + 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 84 : 68 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          title: 'Início',
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoriasScreen}
        options={{
          title: 'Categorias',
        }}
      />
      <Tab.Screen
        name="Prefeitura"
        component={PrefeituraScreen}
        options={{
          title: '',
        }}
      />
      <Tab.Screen
        name="Comunicacao"
        component={ComunicacaoScreen}
        options={{
          title: 'Comunicação',
        }}
      />
      <Tab.Screen
        name="Solicitacoes"
        component={SolicitacoesScreen}
        options={{
          title: 'Solicitações',
        }}
      />
    </Tab.Navigator>
  );
};
