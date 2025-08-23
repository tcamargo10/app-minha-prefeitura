import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { CategoriasScreen } from '@/screens/CategoriasScreen/index';
import { ComunicacaoScreen } from '@/screens/ComunicacaoScreen/index';
import { HomeScreen } from '@/screens/HomeScreen';
import { PerfilScreen } from '@/screens/PerfilScreen';
import { SolicitacoesScreen } from '@/screens/SolicitacoesScreen/index';

export type BottomTabParamList = {
  Inicio: undefined;
  Categorias: undefined;
  Comunicacao: undefined;
  Solicitacoes: undefined;
  Perfil: undefined;
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

export const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categorias') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Comunicacao') {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Solicitacoes') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
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
          paddingBottom: Platform.OS === 'ios' ? 16 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 76 : 60,
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
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};
