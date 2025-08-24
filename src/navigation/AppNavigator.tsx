import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { BottomTabNavigator } from '@/navigation/BottomTabNavigator';
import { ServicosScreen } from '@/screens/CategoriasScreen/ServicosScreen';
import { ServicoDetalhesScreen } from '@/screens/CategoriasScreen/ServicoDetalhesScreen';
import { ComunicacaoDetalhesScreen } from '@/screens/ComunicacaoScreen/DetalhesScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { PerfilScreen } from '@/screens/PerfilScreen';
import { AjudaSuporteScreen } from '@/screens/PerfilScreen/AjudaSuporteScreen';
import { EditarPerfilScreen } from '@/screens/PerfilScreen/EditarPerfilScreen';
import { EnderecosScreen } from '@/screens/PerfilScreen/EnderecosScreen';
import { NotificacoesScreen } from '@/screens/PerfilScreen/NotificacoesScreen';
import { PrivacidadeScreen } from '@/screens/PerfilScreen/PrivacidadeScreen';
import { SobreAppScreen } from '@/screens/PerfilScreen/SobreAppScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { SolicitacoesDetalhesScreen } from '@/screens/SolicitacoesScreen/DetalhesScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Perfil: undefined;
  EditarPerfil: undefined;
  Enderecos: undefined;
  Notificacoes: undefined;
  Privacidade: undefined;
  AjudaSuporte: undefined;
  SobreApp: undefined;
  ComunicacaoDetalhes: { comunicado: any };
  SolicitacoesDetalhes: { solicitacaoId: string };
  Servicos: { categoriaId: number; categoriaTitulo: string };
  ServicoDetalhes: { servicoId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  user: any;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ user }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Login'}
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
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="Enderecos" component={EnderecosScreen} />
        <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
        <Stack.Screen name="Privacidade" component={PrivacidadeScreen} />
        <Stack.Screen name="AjudaSuporte" component={AjudaSuporteScreen} />
        <Stack.Screen name="SobreApp" component={SobreAppScreen} />
        <Stack.Screen
          name="ComunicacaoDetalhes"
          component={ComunicacaoDetalhesScreen}
        />
        <Stack.Screen
          name="SolicitacoesDetalhes"
          component={SolicitacoesDetalhesScreen}
        />
        <Stack.Screen name="Servicos" component={ServicosScreen} />
        <Stack.Screen
          name="ServicoDetalhes"
          component={ServicoDetalhesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
