import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

interface NotificationSetting {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  enabled: boolean;
}

export const NotificacoesScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSetting[]
  >([
    {
      id: 'push',
      title: 'Notificações Push',
      subtitle: 'Receber alertas no dispositivo',
      icon: 'notifications',
      enabled: true,
    },
    {
      id: 'email',
      title: 'Notificações por Email',
      subtitle: 'Receber alertas por email',
      icon: 'mail',
      enabled: false,
    },
    {
      id: 'sms',
      title: 'Notificações por SMS',
      subtitle: 'Receber alertas por SMS',
      icon: 'chatbubble',
      enabled: false,
    },
    {
      id: 'updates',
      title: 'Atualizações de Serviços',
      subtitle: 'Status de solicitações e serviços',
      icon: 'refresh-circle',
      enabled: true,
    },
    {
      id: 'news',
      title: 'Notícias da Cidade',
      subtitle: 'Informações e comunicados oficiais',
      icon: 'newspaper',
      enabled: true,
    },
    {
      id: 'events',
      title: 'Eventos e Atividades',
      subtitle: 'Eventos culturais e esportivos',
      icon: 'calendar',
      enabled: false,
    },
    {
      id: 'emergency',
      title: 'Alertas de Emergência',
      subtitle: 'Alertas importantes e emergências',
      icon: 'warning',
      enabled: true,
    },
    {
      id: 'maintenance',
      title: 'Manutenções Programadas',
      subtitle: 'Interrupções e manutenções',
      icon: 'construct',
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const renderNotificationSetting = (setting: NotificationSetting) => (
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
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Ionicons
            name={setting.icon as any}
            size={20}
            color={theme.colors.onPrimary}
          />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
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
      <Switch
        value={setting.enabled}
        onValueChange={() => toggleNotification(setting.id)}
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primary,
        }}
        thumbColor={
          setting.enabled ? theme.colors.onPrimary : theme.colors.textSecondary
        }
      />
    </View>
  );

  const getSettingsByCategory = () => {
    const general = notificationSettings.filter(s =>
      ['push', 'email', 'sms'].includes(s.id)
    );
    const services = notificationSettings.filter(s =>
      ['updates', 'maintenance'].includes(s.id)
    );
    const content = notificationSettings.filter(s =>
      ['news', 'events', 'emergency'].includes(s.id)
    );

    return { general, services, content };
  };

  const { general, services, content } = getSettingsByCategory();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title="Notificações"
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
              name="notifications-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Configurar Notificações
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Escolha como deseja receber as notificações
            </Text>
          </View>

          {/* General Notifications */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Canais de Notificação
            </Text>
            {general.map(renderNotificationSetting)}
          </View>

          {/* Service Notifications */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Serviços e Atualizações
            </Text>
            {services.map(renderNotificationSetting)}
          </View>

          {/* Content Notifications */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Conteúdo e Informações
            </Text>
            {content.map(renderNotificationSetting)}
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
              As configurações são salvas automaticamente. Você pode alterá-las
              a qualquer momento.
            </Text>
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
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
});
