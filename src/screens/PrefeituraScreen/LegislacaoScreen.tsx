import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/contexts/ThemeContext';

export const LegislacaoScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const legislacoes = [
    {
      id: 1,
      titulo: 'Lei Orgânica do Município',
      numero: 'Lei nº 14.485/2007',
      data: '19/07/2007',
      descricao:
        'Lei fundamental que organiza a estrutura administrativa do município',
      categoria: 'Lei Orgânica',
      icon: 'library',
      color: '#007AFF',
      url: 'https://legislacao.prefeitura.sp.gov.br/lei-organica',
    },
    {
      id: 2,
      titulo: 'Código de Posturas',
      numero: 'Lei nº 13.478/2002',
      data: '15/01/2002',
      descricao: 'Regulamenta o uso e ocupação do solo urbano',
      categoria: 'Código',
      icon: 'business',
      color: '#34C759',
      url: 'https://legislacao.prefeitura.sp.gov.br/codigo-posturas',
    },
    {
      id: 3,
      titulo: 'Código Tributário Municipal',
      numero: 'Lei nº 13.478/2002',
      data: '15/01/2002',
      descricao: 'Estabelece normas gerais de direito tributário municipal',
      categoria: 'Código',
      icon: 'calculator',
      color: '#FF9500',
      url: 'https://legislacao.prefeitura.sp.gov.br/codigo-tributario',
    },
    {
      id: 4,
      titulo: 'Plano Diretor Estratégico',
      numero: 'Lei nº 16.050/2014',
      data: '31/07/2014',
      descricao: 'Instrumento básico da política de desenvolvimento urbano',
      categoria: 'Plano',
      icon: 'map',
      color: '#AF52DE',
      url: 'https://legislacao.prefeitura.sp.gov.br/plano-diretor',
    },
    {
      id: 5,
      titulo: 'Estatuto da Cidade',
      numero: 'Lei nº 10.257/2001',
      data: '10/07/2001',
      descricao: 'Regulamenta os artigos 182 e 183 da Constituição Federal',
      categoria: 'Estatuto',
      icon: 'home',
      color: '#FF3B30',
      url: 'https://legislacao.prefeitura.sp.gov.br/estatuto-cidade',
    },
    {
      id: 6,
      titulo: 'Lei de Zoneamento',
      numero: 'Lei nº 16.402/2016',
      data: '22/03/2016',
      descricao: 'Define as regras de uso e ocupação do solo por zona',
      categoria: 'Lei',
      icon: 'grid',
      color: '#FF2D92',
      url: 'https://legislacao.prefeitura.sp.gov.br/lei-zoneamento',
    },
  ];

  const categorias = [
    {
      nome: 'Leis',
      quantidade: 45,
      icon: 'document-text',
      color: '#007AFF',
    },
    {
      nome: 'Decretos',
      quantidade: 128,
      icon: 'document',
      color: '#34C759',
    },
    {
      nome: 'Portarias',
      quantidade: 89,
      icon: 'clipboard',
      color: '#FF9500',
    },
    {
      nome: 'Resoluções',
      quantidade: 67,
      icon: 'checkmark-circle',
      color: '#AF52DE',
    },
  ];

  const handleLegislacaoPress = (legislacao: any) => {
    // Aqui você pode abrir o link externo ou navegar para uma página interna
    console.log('Abrindo:', legislacao.url);
  };

  return (
    <ScreenWrapper
      title="Legislação"
      showBackButton
      showCitySelector
      showProfileIcon
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.surface }]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Ionicons
                name="document-text"
                size={48}
                color={theme.colors.onPrimary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Legislação Municipal
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Leis, decretos e normas municipais
            </Text>
          </View>

          {/* Categorias */}
          <View style={styles.categoriasSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Por Categoria
            </Text>
            <View style={styles.categoriasGrid}>
              {categorias.map((categoria, index) => (
                <View
                  key={index}
                  style={[
                    styles.categoriaCard,
                    { backgroundColor: theme.colors.background },
                  ]}
                >
                  <View
                    style={[
                      styles.categoriaIcon,
                      { backgroundColor: categoria.color },
                    ]}
                  >
                    <Ionicons
                      name={categoria.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <Text
                    style={[styles.categoriaNome, { color: theme.colors.text }]}
                  >
                    {categoria.nome}
                  </Text>
                  <Text
                    style={[
                      styles.categoriaQuantidade,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {categoria.quantidade} documentos
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Legislações Principais */}
          <View style={styles.legislacoesSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Legislações Principais
            </Text>

            {legislacoes.map(legislacao => (
              <TouchableOpacity
                key={legislacao.id}
                style={[
                  styles.legislacaoCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => handleLegislacaoPress(legislacao)}
                activeOpacity={0.7}
              >
                <View style={styles.legislacaoHeader}>
                  <View
                    style={[
                      styles.legislacaoIcon,
                      { backgroundColor: legislacao.color },
                    ]}
                  >
                    <Ionicons
                      name={legislacao.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                  <View style={styles.legislacaoInfo}>
                    <Text
                      style={[
                        styles.legislacaoTitulo,
                        { color: theme.colors.text },
                      ]}
                    >
                      {legislacao.titulo}
                    </Text>
                    <Text
                      style={[
                        styles.legislacaoNumero,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {legislacao.numero}
                    </Text>
                    <Text
                      style={[
                        styles.legislacaoData,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {legislacao.data}
                    </Text>
                  </View>
                  <Ionicons
                    name="open-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                </View>

                <Text
                  style={[
                    styles.legislacaoDescricao,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {legislacao.descricao}
                </Text>

                <View style={styles.legislacaoCategoria}>
                  <Text
                    style={[
                      styles.categoriaTag,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {legislacao.categoria}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Informações Adicionais */}
          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Informações Gerais
            </Text>
            <View
              style={[
                styles.infoCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <Text
                style={[styles.infoText, { color: theme.colors.textSecondary }]}
              >
                A legislação municipal é composta por leis, decretos, portarias
                e outras normas que regulamentam a vida da cidade. Todas as
                legislações estão disponíveis para consulta pública e podem ser
                acessadas através do portal oficial da prefeitura.
              </Text>
            </View>
          </View>

          {/* Contato */}
          <View style={styles.contactSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Contato
            </Text>
            <View
              style={[
                styles.contactCard,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  (11) 3113-8000
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  legislacao@prefeitura.sp.gov.br
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="globe" size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.contactText, { color: theme.colors.text }]}
                >
                  legislacao.prefeitura.sp.gov.br
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  categoriasSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoriaCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriaNome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoriaQuantidade: {
    fontSize: 14,
    textAlign: 'center',
  },
  legislacoesSection: {
    marginBottom: 32,
  },
  legislacaoCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  legislacaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legislacaoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  legislacaoInfo: {
    flex: 1,
  },
  legislacaoTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  legislacaoNumero: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  legislacaoData: {
    fontSize: 12,
  },
  legislacaoDescricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  legislacaoCategoria: {
    alignSelf: 'flex-start',
  },
  categoriaTag: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactSection: {
    marginBottom: 20,
  },
  contactCard: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});
