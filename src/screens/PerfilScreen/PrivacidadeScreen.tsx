import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

interface PrivacySetting {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  enabled: boolean;
  type: 'switch' | 'button';
  action?: () => void;
}

export const PrivacidadeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'biometric',
      title: 'Autenticação Biométrica',
      subtitle: 'Usar impressão digital ou Face ID',
      icon: 'finger-print',
      enabled: true,
      type: 'switch',
    },
    {
      id: 'location',
      title: 'Compartilhar Localização',
      subtitle: 'Permitir acesso à localização',
      icon: 'location',
      enabled: false,
      type: 'switch',
    },
    {
      id: 'analytics',
      title: 'Analytics e Métricas',
      subtitle: 'Compartilhar dados de uso anônimos',
      icon: 'analytics',
      enabled: true,
      type: 'switch',
    },
    {
      id: 'marketing',
      title: 'Marketing e Promoções',
      subtitle: 'Receber ofertas e novidades',
      icon: 'megaphone',
      enabled: false,
      type: 'switch',
    },
    {
      id: 'data',
      title: 'Dados Pessoais',
      subtitle: 'Gerenciar informações pessoais',
      icon: 'person-circle',
      enabled: false,
      type: 'button',
      action: () =>
        Alert.alert('Dados Pessoais', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'export',
      title: 'Exportar Dados',
      subtitle: 'Baixar todos os seus dados',
      icon: 'download',
      enabled: false,
      type: 'button',
      action: () =>
        Alert.alert('Exportar Dados', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'delete',
      title: 'Excluir Conta',
      subtitle: 'Deletar permanentemente sua conta',
      icon: 'trash',
      enabled: false,
      type: 'button',
      action: () => {
        Alert.alert(
          'Excluir Conta',
          'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Excluir',
              style: 'destructive',
              onPress: () =>
                Alert.alert(
                  'Conta Excluída',
                  'Sua conta foi excluída com sucesso.'
                ),
            },
          ]
        );
      },
    },
  ]);

  const toggleSetting = (id: string) => {
    setPrivacySettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const renderPrivacySetting = (setting: PrivacySetting) => (
    <View
      key={setting.id}
      style={[
        styles.settingItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.settingLeft}>
        <View
          style={[
            styles.settingIcon,
            {
              backgroundColor:
                setting.id === 'delete'
                  ? theme.colors.error
                  : theme.colors.primary,
            },
          ]}
        >
          <Ionicons
            name={setting.icon as any}
            size={20}
            color={theme.colors.onPrimary}
          />
        </View>
        <View style={styles.settingContent}>
          <Text
            style={[
              styles.settingTitle,
              {
                color:
                  setting.id === 'delete'
                    ? theme.colors.error
                    : theme.colors.text,
              },
            ]}
          >
            {setting.title}
          </Text>
          <Text
            style={[
              styles.settingSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {setting.subtitle}
          </Text>
        </View>
      </View>
      {setting.type === 'switch' ? (
        <Switch
          value={setting.enabled}
          onValueChange={() => toggleSetting(setting.id)}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={
            setting.enabled
              ? theme.colors.onPrimary
              : theme.colors.textSecondary
          }
        />
      ) : (
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor:
                setting.id === 'delete'
                  ? theme.colors.error
                  : theme.colors.primary,
            },
          ]}
          onPress={setting.action}
        >
          <Ionicons
            name="chevron-forward"
            size={16}
            color={theme.colors.onPrimary}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const getSettingsByCategory = () => {
    const security = privacySettings.filter(s =>
      ['biometric', 'location'].includes(s.id)
    );
    const data = privacySettings.filter(s =>
      ['analytics', 'marketing', 'data', 'export'].includes(s.id)
    );
    const account = privacySettings.filter(s => ['delete'].includes(s.id));

    return { security, data, account };
  };

  const { security, data, account } = getSettingsByCategory();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Privacidade"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Ionicons
              name="shield-checkmark-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Privacidade e Segurança
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Gerencie suas configurações de privacidade e segurança
            </Text>
          </View>

          {/* Security Settings */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Segurança
            </Text>
            {security.map(renderPrivacySetting)}
          </View>

          {/* Data Settings */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Dados e Compartilhamento
            </Text>
            {data.map(renderPrivacySetting)}
          </View>

          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Conta
            </Text>
            {account.map(renderPrivacySetting)}
          </View>

          {/* Info Section */}
          <View
            style={[
              styles.infoSection,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Ionicons
              name="information-circle"
              size={20}
              color={theme.colors.primary}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Suas configurações de privacidade são salvas automaticamente. Para
              mais informações, consulte nossa Política de Privacidade.
            </Text>
          </View>

          {/* Privacy Policy Link */}
          <TouchableOpacity
            style={[
              styles.policyLink,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Ionicons
              name="document-text"
              size={20}
              color={theme.colors.primary}
            />
            <Text style={[styles.policyText, { color: theme.colors.primary }]}>
              Política de Privacidade
            </Text>
            <Ionicons
              name="open-outline"
              size={16}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
  policyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  policyText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
});
