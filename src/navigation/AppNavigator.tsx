import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { BottomTabNavigator } from '@/navigation/BottomTabNavigator';
import { ComunicacaoDetalhesScreen } from '@/screens/ComunicacaoScreen/DetalhesScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { PerfilScreen } from '@/screens/PerfilScreen';
import { AjudaSuporteScreen } from '@/screens/PerfilScreen/AjudaSuporteScreen';
import { EditarPerfilScreen } from '@/screens/PerfilScreen/EditarPerfilScreen';
import { EnderecosScreen } from '@/screens/PerfilScreen/EnderecosScreen';
import { NotificacoesScreen } from '@/screens/PerfilScreen/NotificacoesScreen';
import { PrivacidadeScreen } from '@/screens/PerfilScreen/PrivacidadeScreen';
import { SobreAppScreen } from '@/screens/PerfilScreen/SobreAppScreen';
import { AgendaPrefeitoScreen } from '@/screens/PrefeituraScreen/AgendaPrefeitoScreen';
import { InformacoesMunicipaisScreen } from '@/screens/PrefeituraScreen/InformacoesMunicipaisScreen';
import { LegislacaoScreen } from '@/screens/PrefeituraScreen/LegislacaoScreen';
import {
  OrgaosPublicosScreen,
  SecretariasScreen,
  EducacaoScreen,
  SaudeScreen,
  SegurancaScreen,
  TransitoScreen,
  CulturaLazerScreen,
} from '@/screens/PrefeituraScreen/orgaospublicos/exports';
import { OuvidoriaScreen } from '@/screens/PrefeituraScreen/OuvidoriaScreen';
import { TransparenciaScreen } from '@/screens/PrefeituraScreen/TransparenciaScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { ServicosScreen } from '@/screens/ServicosScreen';
import { ServicoDetalhesScreen } from '@/screens/ServicosScreen/ServicoDetalhesScreen';
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
  InformacoesMunicipais: undefined;
  OrgaosPublicos: undefined;
  Secretarias: undefined;
  Educacao: undefined;
  Saude: undefined;
  Seguranca: undefined;
  Transito: undefined;
  CulturaLazer: undefined;
  Transparencia: undefined;
  Legislacao: undefined;
  AgendaPrefeito: undefined;
  Ouvidoria: undefined;
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
        <Stack.Screen
          name="InformacoesMunicipais"
          component={InformacoesMunicipaisScreen}
        />
        <Stack.Screen name="OrgaosPublicos" component={OrgaosPublicosScreen} />
        <Stack.Screen name="Secretarias" component={SecretariasScreen} />
        <Stack.Screen name="Educacao" component={EducacaoScreen} />
        <Stack.Screen name="Saude" component={SaudeScreen} />
        <Stack.Screen name="Seguranca" component={SegurancaScreen} />
        <Stack.Screen name="Transito" component={TransitoScreen} />
        <Stack.Screen name="CulturaLazer" component={CulturaLazerScreen} />
        <Stack.Screen name="Transparencia" component={TransparenciaScreen} />
        <Stack.Screen name="Legislacao" component={LegislacaoScreen} />
        <Stack.Screen name="AgendaPrefeito" component={AgendaPrefeitoScreen} />
        <Stack.Screen name="Ouvidoria" component={OuvidoriaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
