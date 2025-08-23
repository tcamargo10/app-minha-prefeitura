import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { BottomTabNavigator } from '@/navigation/BottomTabNavigator';
import { EditarPerfilScreen } from '@/screens/PerfilScreen/EditarPerfilScreen';
import { EnderecosScreen } from '@/screens/PerfilScreen/EnderecosScreen';
import { NotificacoesScreen } from '@/screens/PerfilScreen/NotificacoesScreen';
import { PrivacidadeScreen } from '@/screens/PerfilScreen/PrivacidadeScreen';
import { AjudaSuporteScreen } from '@/screens/PerfilScreen/AjudaSuporteScreen';
import { SobreAppScreen } from '@/screens/PerfilScreen/SobreAppScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  EditarPerfil: undefined;
  Enderecos: undefined;
  Notificacoes: undefined;
  Privacidade: undefined;
  AjudaSuporte: undefined;
  SobreApp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="Enderecos" component={EnderecosScreen} />
        <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
        <Stack.Screen name="Privacidade" component={PrivacidadeScreen} />
        <Stack.Screen name="AjudaSuporte" component={AjudaSuporteScreen} />
        <Stack.Screen name="SobreApp" component={SobreAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
