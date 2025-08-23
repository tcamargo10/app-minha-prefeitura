import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';

export const PerfilScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const handleSignOut = () => {
    Alert.alert('Sair da Aplicação', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  };

  const menuItems = [
    {
      id: 1,
      icon: 'person',
      title: 'Editar Perfil',
      subtitle: 'Alterar informações pessoais',
      onPress: () => navigation.navigate('EditarPerfil' as never),
    },
    {
      id: 2,
      icon: 'location',
      title: 'Endereços',
      subtitle: 'Gerenciar endereços cadastrados',
      onPress: () => navigation.navigate('Enderecos' as never),
    },
    {
      id: 3,
      icon: 'notifications',
      title: 'Notificações',
      subtitle: 'Configurar alertas e notificações',
      onPress: () => navigation.navigate('Notificacoes' as never),
    },
    {
      id: 4,
      icon: 'shield-checkmark',
      title: 'Privacidade',
      subtitle: 'Configurações de segurança',
      onPress: () => navigation.navigate('Privacidade' as never),
    },
    {
      id: 5,
      icon: 'help-circle',
      title: 'Ajuda e Suporte',
      subtitle: 'Central de ajuda e contato',
      onPress: () => navigation.navigate('AjudaSuporte' as never),
    },
    {
      id: 6,
      icon: 'information-circle',
      title: 'Sobre o App',
      subtitle: 'Versão e informações',
      onPress: () => navigation.navigate('SobreApp' as never),
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.menuItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.menuItemIcon,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={20}
            color={theme.colors.onPrimary}
          />
        </View>
        <View style={styles.menuItemContent}>
          <Text style={[styles.menuItemTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.menuItemSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar title="Perfil" />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* User Profile Section */}
          <View
            style={[
              styles.profileSection,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.profileHeader}>
              <View
                style={[
                  styles.profileAvatar,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Ionicons
                  name="person"
                  size={40}
                  color={theme.colors.onPrimary}
                />
              </View>
              <View style={styles.profileInfo}>
                <Text
                  style={[styles.profileName, { color: theme.colors.text }]}
                >
                  {user?.user_metadata?.name || 'Usuário'}
                </Text>
                <Text
                  style={[
                    styles.profileEmail,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {user?.email}
                </Text>
                <Text
                  style={[
                    styles.profileStatus,
                    { color: theme.colors.primary },
                  ]}
                >
                  Conta Ativa
                </Text>
              </View>
            </View>
          </View>

          {/* Theme Toggle Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Aparência
            </Text>
            <View
              style={[
                styles.themeCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.themeCardContent}>
                <View style={styles.themeCardLeft}>
                  <Ionicons
                    name="moon"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.themeCardTitle,
                      { color: theme.colors.text },
                    ]}
                  >
                    Modo Escuro
                  </Text>
                </View>
                <ThemeToggle />
              </View>
            </View>
          </View>

          {/* Menu Items Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Configurações
            </Text>
            {menuItems.map(renderMenuItem)}
          </View>

          {/* Sign Out Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.signOutButton,
                { backgroundColor: theme.colors.error },
              ]}
              onPress={handleSignOut}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color={theme.colors.onError}
              />
              <Text
                style={[
                  styles.signOutButtonText,
                  { color: theme.colors.onError },
                ]}
              >
                Sair da Aplicação
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  themeCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  themeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
