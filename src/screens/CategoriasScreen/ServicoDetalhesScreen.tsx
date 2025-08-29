import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { Button } from '@/components/Button';
import { useTheme } from '@/contexts/ThemeContext';

interface ServicoDetalhes {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
  categoria: string;
  tipo: 'INFO' | 'FORM' | 'AGENDAMENTO';
  tempoEstimado: string;
  documentosNecessarios: string[];
  informacoes: string[];
  links: Array<{
    titulo: string;
    url: string;
    tipo: 'externo' | 'documento' | 'video';
  }>;
  imagens: Array<{
    titulo: string;
    url: string;
  }>;
  videos: Array<{
    titulo: string;
    youtubeId: string;
  }>;
  formulario?: {
    campos: Array<{
      id: string;
      label: string;
      tipo: 'text' | 'email' | 'phone' | 'textarea' | 'select';
      obrigatorio: boolean;
      opcoes?: string[];
    }>;
    permiteArquivos: boolean;
    tiposArquivoPermitidos: string[];
  };
  agendamento?: {
    diasDisponiveis: string[];
    horariosDisponiveis: string[];
    duracaoConsulta: number; // em minutos
  };
}

const { width } = Dimensions.get('window');

export const ServicoDetalhesScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Pegar parâmetros da rota
  const { servicoId } = route.params as { servicoId: string };

  // Dados mockados dos serviços detalhados
  const getServicoDetalhes = (servicoId: string): ServicoDetalhes => {
    const servicosDetalhes: Record<string, ServicoDetalhes> = {
      '1-1': {
        id: '1-1',
        titulo: 'Limpeza de Via Pública',
        descricao:
          'Solicitação de limpeza de ruas, avenidas e praças públicas da cidade.',
        icon: 'trash',
        categoria: 'Limpeza',
        tipo: 'INFO',
        tempoEstimado: '3-5 dias úteis',
        documentosNecessarios: ['Descrição do local', 'Foto do problema'],
        informacoes: [
          'Este serviço é gratuito para todos os cidadãos',
          'A limpeza será realizada em até 5 dias úteis após a solicitação',
          'Em casos de urgência, o prazo pode ser reduzido',
          'É necessário fornecer fotos do local para melhor atendimento',
        ],
        links: [
          {
            titulo: 'Manual de Limpeza Urbana',
            url: 'https://exemplo.com/manual-limpeza',
            tipo: 'documento',
          },
          {
            titulo: 'Normas de Limpeza Pública',
            url: 'https://exemplo.com/normas',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Exemplo de Limpeza',
            url: 'https://via.placeholder.com/400x200/4A90E2/FFFFFF?text=Limpeza+Urbana',
          },
        ],
        videos: [
          {
            titulo: 'Como Solicitar Limpeza',
            youtubeId: 'dQw4w9WgXcQ',
          },
        ],
      },
      '1-4': {
        id: '1-4',
        titulo: 'Coleta de Poda',
        descricao:
          'Solicitação de coleta de galhos e resíduos provenientes de poda de árvores em vias públicas e particulares.',
        icon: 'leaf',
        categoria: 'Limpeza',
        tipo: 'INFO',
        tempoEstimado: '3-5 dias úteis',
        documentosNecessarios: [
          'Endereço completo',
          'Foto dos resíduos',
          'Quantidade aproximada',
        ],
        informacoes: [
          'Este serviço é gratuito para todos os cidadãos',
          'Os resíduos devem estar organizados e acessíveis',
          'Não inclui poda de árvores, apenas coleta dos resíduos',
          'Em caso de grandes quantidades, o prazo pode ser estendido',
        ],
        links: [
          {
            titulo: 'Normas para Coleta de Poda',
            url: 'https://exemplo.com/normas-poda',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Exemplo de Resíduos de Poda',
            url: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Coleta+Poda',
          },
        ],
        videos: [],
      },
      '1-5': {
        id: '1-5',
        titulo: 'Cata-Treco',
        descricao:
          'Coleta de móveis velhos, eletrodomésticos e objetos grandes que não podem ser descartados no lixo comum.',
        icon: 'home',
        categoria: 'Limpeza',
        tipo: 'INFO',
        tempoEstimado: '7-10 dias úteis',
        documentosNecessarios: [
          'Comprovante de residência',
          'Lista dos objetos',
          'Foto dos itens',
        ],
        informacoes: [
          'Serviço gratuito para moradores da cidade',
          'Os objetos devem estar em local acessível',
          'Não aceitamos objetos com vazamentos ou muito danificados',
          'Agende com antecedência para melhor planejamento',
        ],
        links: [
          {
            titulo: 'Guia do Cata-Treco',
            url: 'https://exemplo.com/guia-cata-treco',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Exemplo de Objetos Aceitos',
            url: 'https://via.placeholder.com/400x200/FF9500/FFFFFF?text=Cata+Treco',
          },
        ],
        videos: [],
      },
      '1-6': {
        id: '1-6',
        titulo: 'Denúncia de Descarte Irregular de Resíduos',
        descricao:
          'Denúncia de descarte inadequado de lixo, entulho ou outros resíduos em vias públicas ou locais inapropriados.',
        icon: 'alert-circle',
        categoria: 'Limpeza',
        tipo: 'INFO',
        tempoEstimado: '24-48 horas',
        documentosNecessarios: [
          'Localização exata',
          'Foto da irregularidade',
          'Descrição da situação',
        ],
        informacoes: [
          'Denúncias são tratadas com prioridade',
          'Suas informações são mantidas em sigilo',
          'A fiscalização será realizada em até 48 horas',
          'Em casos graves, a ação pode ser imediata',
        ],
        links: [
          {
            titulo: 'Lei de Crimes Ambientais',
            url: 'https://exemplo.com/lei-ambiental',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Exemplo de Descarte Irregular',
            url: 'https://via.placeholder.com/400x200/E74C3C/FFFFFF?text=Descarte+Irregular',
          },
        ],
        videos: [],
      },
      '1-7': {
        id: '1-7',
        titulo: 'Coleta de Animais Mortos',
        descricao:
          'Remoção de animais mortos encontrados em vias públicas, praças e outros locais públicos.',
        icon: 'paw',
        categoria: 'Limpeza',
        tipo: 'INFO',
        tempoEstimado: '2-4 horas',
        documentosNecessarios: [
          'Localização exata',
          'Foto do animal (se possível)',
          'Descrição da situação',
        ],
        informacoes: [
          'Serviço de urgência com atendimento prioritário',
          'Não inclui animais de estimação particulares',
          'A remoção é feita por equipe especializada',
          'Em caso de risco à saúde pública, a ação é imediata',
        ],
        links: [
          {
            titulo: 'Protocolo de Remoção de Animais',
            url: 'https://exemplo.com/protocolo-animais',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Equipe de Remoção',
            url: 'https://via.placeholder.com/400x200/8E44AD/FFFFFF?text=Coleta+Animais',
          },
        ],
        videos: [],
      },
      '5-1': {
        id: '5-1',
        titulo: 'Solicitação de Cartão SUS',
        descricao:
          'Emissão de cartão SUS para novos usuários do sistema de saúde.',
        icon: 'medical',
        categoria: 'Cartão SUS',
        tipo: 'FORM',
        tempoEstimado: '15-30 dias úteis',
        documentosNecessarios: ['RG', 'CPF', 'Comprovante de residência'],
        informacoes: [
          'O cartão SUS é gratuito e obrigatório para atendimento na rede pública',
          'Apresente todos os documentos originais no dia do atendimento',
          'O cartão será enviado pelo correio em até 30 dias',
          'Em caso de perda, solicite segunda via',
        ],
        links: [
          {
            titulo: 'Guia do Cartão SUS',
            url: 'https://exemplo.com/guia-sus',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Modelo do Cartão SUS',
            url: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Cartao+SUS',
          },
        ],
        videos: [],
        formulario: {
          campos: [
            {
              id: 'nome',
              label: 'Nome Completo',
              tipo: 'text',
              obrigatorio: true,
            },
            {
              id: 'cpf',
              label: 'CPF',
              tipo: 'text',
              obrigatorio: true,
            },
            {
              id: 'email',
              label: 'E-mail',
              tipo: 'email',
              obrigatorio: true,
            },
            {
              id: 'telefone',
              label: 'Telefone',
              tipo: 'phone',
              obrigatorio: true,
            },
            {
              id: 'endereco',
              label: 'Endereço Completo',
              tipo: 'textarea',
              obrigatorio: true,
            },
            {
              id: 'motivo',
              label: 'Motivo da Solicitação',
              tipo: 'select',
              obrigatorio: true,
              opcoes: ['Primeira via', 'Segunda via', 'Atualização de dados'],
            },
          ],
          permiteArquivos: true,
          tiposArquivoPermitidos: ['jpg', 'png', 'pdf'],
        },
      },
      '9-1': {
        id: '9-1',
        titulo: 'Agendamento de Consulta',
        descricao: 'Agendamento de consultas médicas na rede pública de saúde.',
        icon: 'search',
        categoria: 'Consultas',
        tipo: 'AGENDAMENTO',
        tempoEstimado: 'Imediato',
        documentosNecessarios: ['Cartão SUS'],
        informacoes: [
          'Apresente o cartão SUS no dia da consulta',
          'Chegue com 15 minutos de antecedência',
          'Em caso de desistência, cancele com 24h de antecedência',
          'Traga exames anteriores se houver',
        ],
        links: [
          {
            titulo: 'Política de Agendamento',
            url: 'https://exemplo.com/politica-agendamento',
            tipo: 'documento',
          },
        ],
        imagens: [
          {
            titulo: 'Unidade de Saúde',
            url: 'https://via.placeholder.com/400x200/E74C3C/FFFFFF?text=Unidade+Saude',
          },
        ],
        videos: [],
        formulario: {
          campos: [
            {
              id: 'nome',
              label: 'Nome Completo',
              tipo: 'text',
              obrigatorio: true,
            },
            {
              id: 'cartaoSus',
              label: 'Número do Cartão SUS',
              tipo: 'text',
              obrigatorio: true,
            },
            {
              id: 'telefone',
              label: 'Telefone',
              tipo: 'phone',
              obrigatorio: true,
            },
            {
              id: 'especialidade',
              label: 'Especialidade Desejada',
              tipo: 'select',
              obrigatorio: true,
              opcoes: [
                'Clínico Geral',
                'Cardiologia',
                'Dermatologia',
                'Ginecologia',
                'Pediatria',
              ],
            },
            {
              id: 'observacoes',
              label: 'Observações',
              tipo: 'textarea',
              obrigatorio: false,
            },
          ],
          permiteArquivos: true,
          tiposArquivoPermitidos: ['jpg', 'png', 'pdf'],
        },
        agendamento: {
          diasDisponiveis: [
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
          ],
          horariosDisponiveis: [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '14:00',
            '15:00',
            '16:00',
          ],
          duracaoConsulta: 30,
        },
      },
    };

    return servicosDetalhes[servicoId] || servicosDetalhes['1-1'];
  };

  const servico = getServicoDetalhes(servicoId);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o link');
    });
  };

  const handleVideoPress = (youtubeId: string) => {
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o vídeo');
    });
  };

  const handleFormSubmit = () => {
    Alert.alert('Sucesso', 'Formulário enviado com sucesso!');
  };

  const handleAgendamentoSubmit = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Erro', 'Selecione uma data e horário');
      return;
    }
    Alert.alert(
      'Sucesso',
      `Consulta agendada para ${selectedDate} às ${selectedTime}`
    );
  };

  const renderFormField = (campo: any) => {
    const value = formData[campo.id] || '';

    switch (campo.tipo) {
      case 'textarea':
        return (
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              },
            ]}
            placeholder={campo.label}
            placeholderTextColor={theme.colors.textSecondary}
            value={value}
            onChangeText={text =>
              setFormData({ ...formData, [campo.id]: text })
            }
            multiline
            numberOfLines={4}
          />
        );
      case 'select':
        return (
          <View style={styles.selectContainer}>
            <Text style={[styles.selectLabel, { color: theme.colors.text }]}>
              {campo.label}
            </Text>
            {campo.opcoes?.map((opcao: string) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.selectOption,
                  {
                    backgroundColor:
                      value === opcao
                        ? theme.colors.primary
                        : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setFormData({ ...formData, [campo.id]: opcao })}
              >
                <Text
                  style={[
                    styles.selectOptionText,
                    { color: value === opcao ? 'white' : theme.colors.text },
                  ]}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              },
            ]}
            placeholder={campo.label}
            placeholderTextColor={theme.colors.textSecondary}
            value={value}
            onChangeText={text =>
              setFormData({ ...formData, [campo.id]: text })
            }
            keyboardType={
              campo.tipo === 'email'
                ? 'email-address'
                : campo.tipo === 'phone'
                  ? 'phone-pad'
                  : 'default'
            }
          />
        );
    }
  };

  const renderAgendamentoSection = () => {
    if (servico.tipo !== 'AGENDAMENTO' || !servico.agendamento) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Agendamento
        </Text>

        <Text
          style={[
            styles.sectionSubtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          Selecione a data e horário desejados:
        </Text>

        <View style={styles.agendamentoContainer}>
          <Text style={[styles.agendamentoLabel, { color: theme.colors.text }]}>
            Data:
          </Text>
          <View style={styles.dateContainer}>
            {servico.agendamento.diasDisponiveis.map(dia => (
              <TouchableOpacity
                key={dia}
                style={[
                  styles.dateOption,
                  {
                    backgroundColor:
                      selectedDate === dia
                        ? theme.colors.primary
                        : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedDate(dia)}
              >
                <Text
                  style={[
                    styles.dateOptionText,
                    {
                      color: selectedDate === dia ? 'white' : theme.colors.text,
                    },
                  ]}
                >
                  {dia}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.agendamentoLabel, { color: theme.colors.text }]}>
            Horário:
          </Text>
          <View style={styles.timeContainer}>
            {servico.agendamento.horariosDisponiveis.map(horario => (
              <TouchableOpacity
                key={horario}
                style={[
                  styles.timeOption,
                  {
                    backgroundColor:
                      selectedTime === horario
                        ? theme.colors.primary
                        : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedTime(horario)}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    {
                      color:
                        selectedTime === horario ? 'white' : theme.colors.text,
                    },
                  ]}
                >
                  {horario}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      edges={['top']}
    >
      <AppBar
        title={servico.titulo}
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
            <View style={styles.headerIcon}>
              <Ionicons
                name={servico.icon as any}
                size={32}
                color={theme.colors.primary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {servico.titulo}
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              {servico.categoria}
            </Text>
            <View style={styles.headerInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="time" size={16} color={theme.colors.primary} />
                <Text
                  style={[
                    styles.infoText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {servico.tempoEstimado}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons
                  name="document-text"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text
                  style={[
                    styles.infoText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {servico.documentosNecessarios.length} documento(s)
                </Text>
              </View>
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Descrição
            </Text>
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {servico.descricao}
            </Text>
          </View>

          {/* Informações */}
          {servico.informacoes.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Informações Importantes
              </Text>
              {servico.informacoes.map((info, index) => (
                <View key={index} style={styles.infoRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[
                      styles.infoText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {info}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Documentos Necessários */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Documentos Necessários
            </Text>
            {servico.documentosNecessarios.map((doc, index) => (
              <View key={index} style={styles.docRow}>
                <Ionicons
                  name="document"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text
                  style={[
                    styles.docText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {doc}
                </Text>
              </View>
            ))}
          </View>

          {/* Links */}
          {servico.links.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Links Úteis
              </Text>
              {servico.links.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.linkRow}
                  onPress={() => handleLinkPress(link.url)}
                >
                  <Ionicons
                    name={link.tipo === 'video' ? 'play-circle' : 'link'}
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[styles.linkText, { color: theme.colors.primary }]}
                  >
                    {link.titulo}
                  </Text>
                  <Ionicons
                    name="open-outline"
                    size={16}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Imagens */}
          {servico.imagens.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Imagens
              </Text>
              {servico.imagens.map((imagem, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: imagem.url }} style={styles.image} />
                  <Text
                    style={[
                      styles.imageTitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {imagem.titulo}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Vídeos */}
          {servico.videos.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Vídeos
              </Text>
              {servico.videos.map((video, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.videoContainer}
                  onPress={() => handleVideoPress(video.youtubeId)}
                >
                  <View style={styles.videoThumbnail}>
                    <Ionicons name="play-circle" size={48} color="white" />
                  </View>
                  <Text
                    style={[
                      styles.videoTitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {video.titulo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Formulário */}
          {servico.tipo === 'FORM' && servico.formulario && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Formulário de Solicitação
              </Text>
              {servico.formulario.campos.map(campo => (
                <View key={campo.id} style={styles.formField}>
                  {renderFormField(campo)}
                  {campo.obrigatorio && (
                    <Text
                      style={[
                        styles.requiredText,
                        { color: theme.colors.error },
                      ]}
                    >
                      *
                    </Text>
                  )}
                </View>
              ))}
              {servico.formulario.permiteArquivos && (
                <View style={styles.fileUpload}>
                  <Ionicons
                    name="cloud-upload"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[
                      styles.fileUploadText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Enviar arquivos (
                    {servico.formulario.tiposArquivoPermitidos.join(', ')})
                  </Text>
                </View>
              )}
              <Button
                title="Enviar Solicitação"
                onPress={handleFormSubmit}
                style={styles.submitButton}
              />
            </View>
          )}

          {/* Agendamento */}
          {renderAgendamentoSection()}

          {/* Botão de Agendamento */}
          {servico.tipo === 'AGENDAMENTO' && (
            <View style={styles.section}>
              <Button
                title="Confirmar Agendamento"
                onPress={handleAgendamentoSubmit}
                style={styles.submitButton}
              />
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
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  docText: {
    fontSize: 14,
    flex: 1,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  linkText: {
    fontSize: 14,
    flex: 1,
    textDecorationLine: 'underline',
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  videoContainer: {
    marginBottom: 16,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
  },
  selectContainer: {
    marginBottom: 8,
  },
  selectLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectOptionText: {
    fontSize: 16,
  },
  requiredText: {
    fontSize: 16,
    marginTop: 4,
  },
  fileUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginBottom: 16,
    gap: 12,
  },
  fileUploadText: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 16,
  },
  agendamentoContainer: {
    marginTop: 16,
  },
  agendamentoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  dateOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  dateOptionText: {
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  timeOptionText: {
    fontSize: 14,
  },
});
