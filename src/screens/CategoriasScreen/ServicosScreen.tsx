import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { useTheme } from '@/contexts/ThemeContext';

interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
  tempoEstimado: string;
  documentosNecessarios: string[];
  categoria: string;
  disponivel: boolean;
}

const { width } = Dimensions.get('window');

export const ServicosScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  // Pegar parâmetros da rota
  const { categoriaId, categoriaTitulo } = route.params as {
    categoriaId: number;
    categoriaTitulo: string;
  };

  // Dados mockados dos serviços por categoria
  const getServicosPorCategoria = (categoriaId: number): Servico[] => {
    const servicosData: Record<number, Servico[]> = {
      // Limpeza
      1: [
        {
          id: '1-1',
          titulo: 'Limpeza de Via Pública',
          descricao: 'Solicitação de limpeza de ruas, avenidas e praças',
          icon: 'trash',
          tempoEstimado: '3-5 dias úteis',
          documentosNecessarios: ['Descrição do local', 'Foto do problema'],
          categoria: 'Limpeza',
          disponivel: true,
        },
        {
          id: '1-2',
          titulo: 'Limpeza de Bueiros',
          descricao: 'Desentupimento e limpeza de bueiros e bocas de lobo',
          icon: 'water',
          tempoEstimado: '2-3 dias úteis',
          documentosNecessarios: ['Localização exata', 'Foto do bueiro'],
          categoria: 'Limpeza',
          disponivel: true,
        },
        {
          id: '1-3',
          titulo: 'Coleta de Entulho',
          descricao: 'Remoção de entulhos e materiais de construção',
          icon: 'cube',
          tempoEstimado: '5-7 dias úteis',
          documentosNecessarios: [
            'Comprovante de residência',
            'Lista dos materiais',
          ],
          categoria: 'Limpeza',
          disponivel: true,
        },
      ],
      // Defesa Civil
      2: [
        {
          id: '2-1',
          titulo: 'Emergência Climática',
          descricao:
            'Solicitação de apoio em situações de emergência climática',
          icon: 'warning',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Descrição da situação', 'Localização'],
          categoria: 'Defesa Civil',
          disponivel: true,
        },
        {
          id: '2-2',
          titulo: 'Vistoria de Risco',
          descricao: 'Vistoria técnica para avaliação de riscos estruturais',
          icon: 'search',
          tempoEstimado: '24-48 horas',
          documentosNecessarios: ['Endereço completo', 'Descrição do problema'],
          categoria: 'Defesa Civil',
          disponivel: true,
        },
        {
          id: '2-3',
          titulo: 'Abandono de Animais',
          descricao: 'Denúncia de abandono ou maus tratos a animais',
          icon: 'paw',
          tempoEstimado: '2-4 horas',
          documentosNecessarios: ['Localização', 'Descrição da situação'],
          categoria: 'Defesa Civil',
          disponivel: true,
        },
      ],
      // Manutenção de Praças
      3: [
        {
          id: '3-1',
          titulo: 'Manutenção de Equipamentos',
          descricao: 'Reparo de playground, bancos e equipamentos de exercício',
          icon: 'fitness',
          tempoEstimado: '7-10 dias úteis',
          documentosNecessarios: [
            'Descrição do problema',
            'Foto do equipamento',
          ],
          categoria: 'Praças',
          disponivel: true,
        },
        {
          id: '3-2',
          titulo: 'Poda e Jardinagem',
          descricao: 'Manutenção de jardins e poda de árvores em praças',
          icon: 'leaf',
          tempoEstimado: '5-7 dias úteis',
          documentosNecessarios: ['Localização da praça', 'Tipo de serviço'],
          categoria: 'Praças',
          disponivel: true,
        },
        {
          id: '3-3',
          titulo: 'Iluminação de Praças',
          descricao: 'Reparo e manutenção da iluminação pública em praças',
          icon: 'bulb',
          tempoEstimado: '3-5 dias úteis',
          documentosNecessarios: ['Descrição do problema', 'Horário observado'],
          categoria: 'Praças',
          disponivel: false,
        },
      ],
      // SEMOB
      4: [
        {
          id: '4-1',
          titulo: 'Sinalização de Trânsito',
          descricao: 'Instalação e manutenção de placas de trânsito',
          icon: 'warning',
          tempoEstimado: '10-15 dias úteis',
          documentosNecessarios: ['Justificativa técnica', 'Croqui do local'],
          categoria: 'SEMOB',
          disponivel: true,
        },
        {
          id: '4-2',
          titulo: 'Semáforo',
          descricao: 'Instalação, manutenção e reparo de semáforos',
          icon: 'radio-button-on',
          tempoEstimado: '15-20 dias úteis',
          documentosNecessarios: ['Estudo de tráfego', 'Aprovação técnica'],
          categoria: 'SEMOB',
          disponivel: true,
        },
        {
          id: '4-3',
          titulo: 'Faixa de Pedestres',
          descricao: 'Pintura e manutenção de faixas de pedestres',
          icon: 'walk',
          tempoEstimado: '5-7 dias úteis',
          documentosNecessarios: ['Localização exata', 'Justificativa'],
          categoria: 'SEMOB',
          disponivel: true,
        },
      ],
      // Iluminação
      8: [
        {
          id: '8-1',
          titulo: 'Reparo de Poste',
          descricao: 'Conserto de postes de iluminação pública danificados',
          icon: 'bulb',
          tempoEstimado: '3-5 dias úteis',
          documentosNecessarios: ['Endereço completo', 'Descrição do problema'],
          categoria: 'Iluminação',
          disponivel: true,
        },
        {
          id: '8-2',
          titulo: 'Nova Iluminação',
          descricao: 'Instalação de novos pontos de iluminação pública',
          icon: 'add-circle',
          tempoEstimado: '20-30 dias úteis',
          documentosNecessarios: ['Projeto técnico', 'Aprovação da comunidade'],
          categoria: 'Iluminação',
          disponivel: true,
        },
        {
          id: '8-3',
          titulo: 'Manutenção Preventiva',
          descricao: 'Limpeza e manutenção preventiva de luminárias',
          icon: 'checkmark-circle',
          tempoEstimado: '7-10 dias úteis',
          documentosNecessarios: ['Localização dos postes'],
          categoria: 'Iluminação',
          disponivel: true,
        },
      ],
      // Cartão SUS
      5: [
        {
          id: '5-1',
          titulo: 'Solicitação de Cartão SUS',
          descricao: 'Emissão de cartão SUS para novos usuários',
          icon: 'medical',
          tempoEstimado: '15-30 dias úteis',
          documentosNecessarios: ['RG', 'CPF', 'Comprovante de residência'],
          categoria: 'Cartão SUS',
          disponivel: true,
        },
        {
          id: '5-2',
          titulo: 'Segunda Via do Cartão SUS',
          descricao: 'Emissão de segunda via do cartão SUS',
          icon: 'card',
          tempoEstimado: '7-15 dias úteis',
          documentosNecessarios: ['RG', 'CPF'],
          categoria: 'Cartão SUS',
          disponivel: true,
        },
        {
          id: '5-3',
          titulo: 'Atualização de Dados',
          descricao: 'Atualização de informações no cartão SUS',
          icon: 'person',
          tempoEstimado: '5-10 dias úteis',
          documentosNecessarios: [
            'Cartão SUS atual',
            'Documentos de alteração',
          ],
          categoria: 'Cartão SUS',
          disponivel: true,
        },
      ],
      // IPTU
      6: [
        {
          id: '6-1',
          titulo: 'Consulta de IPTU',
          descricao: 'Consulta de débitos e valores do IPTU',
          icon: 'home',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Inscrição imobiliária'],
          categoria: 'IPTU',
          disponivel: true,
        },
        {
          id: '6-2',
          titulo: 'Parcelamento de IPTU',
          descricao: 'Solicitação de parcelamento de débitos do IPTU',
          icon: 'card',
          tempoEstimado: '5-10 dias úteis',
          documentosNecessarios: [
            'Comprovante de renda',
            'Documentos do imóvel',
          ],
          categoria: 'IPTU',
          disponivel: true,
        },
        {
          id: '6-3',
          titulo: 'Isenção de IPTU',
          descricao: 'Solicitação de isenção do IPTU',
          icon: 'shield-checkmark',
          tempoEstimado: '15-30 dias úteis',
          documentosNecessarios: [
            'Documentos comprobatórios',
            'Declaração de renda',
          ],
          categoria: 'IPTU',
          disponivel: true,
        },
      ],
      // Exames
      7: [
        {
          id: '7-1',
          titulo: 'Agendamento de Exames',
          descricao: 'Agendamento de exames laboratoriais',
          icon: 'fitness',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Cartão SUS', 'Solicitação médica'],
          categoria: 'Exames',
          disponivel: true,
        },
        {
          id: '7-2',
          titulo: 'Resultados de Exames',
          descricao: 'Consulta de resultados de exames',
          icon: 'document-text',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Cartão SUS', 'Protocolo do exame'],
          categoria: 'Exames',
          disponivel: true,
        },
        {
          id: '7-3',
          titulo: 'Exames Especializados',
          descricao: 'Solicitação de exames especializados',
          icon: 'medical',
          tempoEstimado: '7-15 dias úteis',
          documentosNecessarios: ['Solicitação médica', 'Laudos anteriores'],
          categoria: 'Exames',
          disponivel: true,
        },
      ],
      // Consultas
      9: [
        {
          id: '9-1',
          titulo: 'Agendamento de Consulta',
          descricao: 'Agendamento de consultas médicas',
          icon: 'search',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Cartão SUS'],
          categoria: 'Consultas',
          disponivel: true,
        },
        {
          id: '9-2',
          titulo: 'Reagendamento',
          descricao: 'Reagendamento de consultas médicas',
          icon: 'calendar',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Protocolo da consulta'],
          categoria: 'Consultas',
          disponivel: true,
        },
        {
          id: '9-3',
          titulo: 'Cancelamento',
          descricao: 'Cancelamento de consultas médicas',
          icon: 'close-circle',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['Protocolo da consulta'],
          categoria: 'Consultas',
          disponivel: true,
        },
      ],
      // Diabetes JP - Glicosímetro
      10: [
        {
          id: '10-1',
          titulo: 'Solicitação de Glicosímetro',
          descricao: 'Solicitação de glicosímetro para pacientes diabéticos',
          icon: 'water',
          tempoEstimado: '15-30 dias úteis',
          documentosNecessarios: [
            'Receita médica',
            'Comprovante de residência',
          ],
          categoria: 'Diabetes JP',
          disponivel: true,
        },
        {
          id: '10-2',
          titulo: 'Manutenção de Glicosímetro',
          descricao: 'Manutenção e calibração de glicosímetros',
          icon: 'settings',
          tempoEstimado: '5-10 dias úteis',
          documentosNecessarios: ['Cartão SUS', 'Glicosímetro'],
          categoria: 'Diabetes JP',
          disponivel: true,
        },
        {
          id: '10-3',
          titulo: 'Fornecimento de Tiras',
          descricao: 'Solicitação de tiras para glicosímetro',
          icon: 'medical',
          tempoEstimado: '7-15 dias úteis',
          documentosNecessarios: ['Receita médica', 'Cartão SUS'],
          categoria: 'Diabetes JP',
          disponivel: true,
        },
      ],
      // Cursos - Inclusão Pro
      11: [
        {
          id: '11-1',
          titulo: 'Inscrição em Cursos',
          descricao: 'Inscrição em cursos profissionalizantes',
          icon: 'wifi',
          tempoEstimado: 'Imediato',
          documentosNecessarios: ['RG', 'CPF', 'Comprovante de escolaridade'],
          categoria: 'Cursos',
          disponivel: true,
        },
        {
          id: '11-2',
          titulo: 'Certificados',
          descricao: 'Emissão de certificados de cursos',
          icon: 'document',
          tempoEstimado: '5-10 dias úteis',
          documentosNecessarios: ['RG', 'CPF'],
          categoria: 'Cursos',
          disponivel: true,
        },
        {
          id: '11-3',
          titulo: 'Informações sobre Cursos',
          descricao: 'Consulta sobre cursos disponíveis',
          icon: 'information-circle',
          tempoEstimado: 'Imediato',
          documentosNecessarios: [],
          categoria: 'Cursos',
          disponivel: true,
        },
      ],
      // Cartão do Idoso
      12: [
        {
          id: '12-1',
          titulo: 'Solicitação de Cartão do Idoso',
          descricao: 'Emissão de cartão do idoso para transporte',
          icon: 'person',
          tempoEstimado: '15-30 dias úteis',
          documentosNecessarios: ['RG', 'CPF', 'Comprovante de idade'],
          categoria: 'Cartão do Idoso',
          disponivel: true,
        },
        {
          id: '12-2',
          titulo: 'Segunda Via do Cartão',
          descricao: 'Emissão de segunda via do cartão do idoso',
          icon: 'card',
          tempoEstimado: '7-15 dias úteis',
          documentosNecessarios: ['RG', 'CPF'],
          categoria: 'Cartão do Idoso',
          disponivel: true,
        },
        {
          id: '12-3',
          titulo: 'Renovação do Cartão',
          descricao: 'Renovação anual do cartão do idoso',
          icon: 'refresh',
          tempoEstimado: '10-20 dias úteis',
          documentosNecessarios: ['Cartão atual', 'Comprovante de residência'],
          categoria: 'Cartão do Idoso',
          disponivel: true,
        },
      ],
    };

    return servicosData[categoriaId] || [];
  };

  const servicos = getServicosPorCategoria(categoriaId);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleServicoPress = (servico: Servico) => {
    // Em um app real, navegaria para formulário de solicitação
    console.log('Serviço selecionado:', servico.titulo);
  };

  const renderServicoCard = (servico: Servico) => (
    <TouchableOpacity
      style={[
        styles.servicoCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          opacity: servico.disponivel ? 1 : 0.6,
        },
      ]}
      onPress={() => handleServicoPress(servico)}
      activeOpacity={0.7}
      disabled={!servico.disponivel}
    >
      <View style={styles.cardContent}>
        <View style={styles.servicoHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.primary + '20' },
            ]}
          >
            <Ionicons
              name={servico.icon as any}
              size={24}
              color={theme.colors.primary}
            />
          </View>
          {!servico.disponivel && (
            <View
              style={[styles.indisponivelBadge, { backgroundColor: '#FF3B30' }]}
            >
              <Text style={styles.indisponivelText}>Indisponível</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.servicoTitulo, { color: theme.colors.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {servico.titulo}
        </Text>

        <Text
          style={[
            styles.servicoDescricao,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {servico.descricao}
        </Text>

        <View style={styles.servicoInfo}>
          <View style={styles.infoItem}>
            <Ionicons
              name="time"
              size={12}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              {servico.tempoEstimado}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="document-text"
              size={12}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              {servico.documentosNecessarios.length} documento(s)
            </Text>
          </View>
        </View>
      </View>

      {servico.disponivel ? (
        <View style={styles.actionArea}>
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>
            Solicitar Serviço
          </Text>
          <Ionicons
            name="arrow-forward"
            size={14}
            color={theme.colors.primary}
          />
        </View>
      ) : (
        <View style={styles.actionAreaDisabled}>
          <Text
            style={[
              styles.actionTextDisabled,
              { color: theme.colors.textSecondary },
            ]}
          >
            Serviço Indisponível
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title={categoriaTitulo}
        showBackButton
        onBackPress={handleBackPress}
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Serviços Disponíveis
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Selecione o serviço que deseja solicitar
            </Text>
            <Text
              style={[styles.servicosCount, { color: theme.colors.primary }]}
            >
              {servicos.filter(s => s.disponivel).length} de {servicos.length}{' '}
              serviços disponíveis
            </Text>
          </View>

          {/* Serviços List */}
          {servicos.length > 0 ? (
            <View style={styles.servicosList}>
              {servicos.map((servico, index) => (
                <View key={servico.id} style={styles.cardWrapper}>
                  {renderServicoCard(servico)}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="construct"
                size={48}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Nenhum serviço disponível
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Os serviços desta categoria ainda não foram cadastrados
              </Text>
            </View>
          )}
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
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  servicosCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  servicosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  cardWrapper: {
    width: (width - 60) / 2, // 2 cards por linha com padding de 20 e gap de 16
    height: 280, // Altura fixa aumentada para todos os cards
  },
  servicoCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  servicoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indisponivelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  indisponivelText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  servicoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 20,
    minHeight: 40, // Altura fixa para 2 linhas (20 * 2)
  },
  servicoDescricao: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
    minHeight: 48, // Altura fixa para 3 linhas (16 * 3)
  },
  servicoInfo: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 10,
    marginLeft: 4,
    flex: 1,
  },
  actionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    minHeight: 20,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  actionAreaDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 50, // Mesma altura fixa da área de ação
    minHeight: 50,
  },
  actionTextDisabled: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
