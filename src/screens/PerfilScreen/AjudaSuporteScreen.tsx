import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

interface ContactOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  action: () => void;
}

export const AjudaSuporteScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'Como solicitar um serviço?',
      answer:
        'Para solicitar um serviço, acesse a seção "Categorias" no menu inferior, escolha a categoria desejada e selecione o serviço específico. Preencha as informações necessárias e envie sua solicitação.',
      expanded: false,
    },
    {
      id: '2',
      question: 'Como acompanhar o status da minha solicitação?',
      answer:
        'Você pode acompanhar o status das suas solicitações através das notificações push ou na seção "Minhas Solicitações" no seu perfil. O status será atualizado automaticamente.',
      expanded: false,
    },
    {
      id: '3',
      question: 'Como alterar minhas informações pessoais?',
      answer:
        'Acesse "Perfil" no menu inferior, depois "Editar Perfil" para modificar suas informações pessoais como nome, email, telefone e CPF.',
      expanded: false,
    },
    {
      id: '4',
      question: 'Como configurar notificações?',
      answer:
        'Vá em "Perfil" > "Notificações" para configurar quais tipos de alertas você deseja receber, incluindo push, email e SMS.',
      expanded: false,
    },
    {
      id: '5',
      question: 'O que fazer se esqueci minha senha?',
      answer:
        'Na tela de login, toque em "Esqueci minha senha" e siga as instruções para redefinir sua senha através do email cadastrado.',
      expanded: false,
    },
    {
      id: '6',
      question: 'Como denunciar um problema?',
      answer:
        'Para denunciar problemas, use a seção "Categorias" e selecione a categoria apropriada (como "Zeladoria" para problemas urbanos). Descreva o problema detalhadamente e envie sua denúncia.',
      expanded: false,
    },
  ]);

  const toggleFAQ = (id: string) => {
    setFaqItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const contactOptions: ContactOption[] = [
    {
      id: 'phone',
      title: 'Telefone',
      subtitle: '(11) 1234-5678',
      icon: 'call',
      action: () => {
        Alert.alert('Ligar para Suporte', 'Deseja ligar para o suporte?', [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Ligar',
            onPress: () => Linking.openURL('tel:1112345678'),
          },
        ]);
      },
    },
    {
      id: 'email',
      title: 'Email',
      subtitle: 'suporte@minhaprefeitura.com',
      icon: 'mail',
      action: () => {
        Alert.alert('Enviar Email', 'Deseja enviar um email para o suporte?', [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Enviar',
            onPress: () =>
              Linking.openURL('mailto:suporte@minhaprefeitura.com'),
          },
        ]);
      },
    },
    {
      id: 'chat',
      title: 'Chat Online',
      subtitle: 'Atendimento em tempo real',
      icon: 'chatbubbles',
      action: () => {
        Alert.alert('Chat Online', 'Funcionalidade em desenvolvimento');
      },
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: '(11) 98765-4321',
      icon: 'logo-whatsapp',
      action: () => {
        Alert.alert('WhatsApp', 'Deseja abrir o WhatsApp?', [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Abrir',
            onPress: () =>
              Linking.openURL('whatsapp://send?phone=5511987654321'),
          },
        ]);
      },
    },
  ];

  const renderFAQItem = (item: FAQItem) => (
    <View
      key={item.id}
      style={[
        styles.faqItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.faqHeader}
        onPress={() => toggleFAQ(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>
          {item.question}
        </Text>
        <Ionicons
          name={item.expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>
      {item.expanded && (
        <Text style={[styles.faqAnswer, { color: theme.colors.textSecondary }]}>
          {item.answer}
        </Text>
      )}
    </View>
  );

  const renderContactOption = (option: ContactOption) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.contactItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={option.action}
    >
      <View style={styles.contactLeft}>
        <View
          style={[
            styles.contactIcon,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Ionicons
            name={option.icon as any}
            size={20}
            color={theme.colors.onPrimary}
          />
        </View>
        <View style={styles.contactContent}>
          <Text style={[styles.contactTitle, { color: theme.colors.text }]}>
            {option.title}
          </Text>
          <Text
            style={[
              styles.contactSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {option.subtitle}
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
      <AppBar
        title="Ajuda e Suporte"
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
              name="help-circle-outline"
              size={40}
              color={theme.colors.primary}
            />
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Central de Ajuda
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Encontre respostas para suas dúvidas e entre em contato conosco
            </Text>
          </View>

          {/* Contact Options */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Entre em Contato
            </Text>
            {contactOptions.map(renderContactOption)}
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Perguntas Frequentes
            </Text>
            {faqItems.map(renderFAQItem)}
          </View>

          {/* Additional Resources */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recursos Adicionais
            </Text>

            <TouchableOpacity
              style={[
                styles.resourceItem,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.resourceLeft}>
                <View
                  style={[
                    styles.resourceIcon,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Ionicons
                    name="document-text"
                    size={20}
                    color={theme.colors.onPrimary}
                  />
                </View>
                <View style={styles.resourceContent}>
                  <Text
                    style={[styles.resourceTitle, { color: theme.colors.text }]}
                  >
                    Manual do Usuário
                  </Text>
                  <Text
                    style={[
                      styles.resourceSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Guia completo de uso do aplicativo
                  </Text>
                </View>
              </View>
              <Ionicons
                name="open-outline"
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.resourceItem,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.resourceLeft}>
                <View
                  style={[
                    styles.resourceIcon,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Ionicons
                    name="videocam"
                    size={20}
                    color={theme.colors.onPrimary}
                  />
                </View>
                <View style={styles.resourceContent}>
                  <Text
                    style={[styles.resourceTitle, { color: theme.colors.text }]}
                  >
                    Tutoriais em Vídeo
                  </Text>
                  <Text
                    style={[
                      styles.resourceSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Aprenda a usar o app com vídeos explicativos
                  </Text>
                </View>
              </View>
              <Ionicons
                name="play-circle"
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
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
              Horário de atendimento: Segunda a Sexta, das 8h às 18h. Para
              emergências, utilize o número de telefone disponível.
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  faqItem: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  resourceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  resourceSubtitle: {
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
