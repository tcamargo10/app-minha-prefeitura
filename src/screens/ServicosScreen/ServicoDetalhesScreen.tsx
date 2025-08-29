import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBar } from '@/components/AppBar';
import { Button } from '@/components/Button';
import { FileUpload } from '@/components/FileUpload';
import { Input } from '@/components/Input';
import { SelectInput } from '@/components/SelectInput';
import { UserInfoCard } from '@/components/UserInfoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { formatCPF, formatCPFPrivate, formatPhone } from '@/utils/masks';

import { ServicoDetalhes, getServicoDetalhes } from './mockServicosDetalhes';

export const ServicoDetalhesScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { citizen } = useAuth();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Pegar parâmetros da rota
  const { servicoId } = route.params as { servicoId: string };

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

  const renderDefaultFields = () => {
    if (!citizen) return null;

    return (
      <View style={styles.userInfoSection}>
        <Text style={[styles.userInfoTitle, { color: theme.colors.text }]}>
          Dados do Solicitante
        </Text>

        <View style={styles.userInfoCards}>
          <UserInfoCard
            icon="person"
            label="Nome Completo"
            value={citizen.name}
          />

          <UserInfoCard
            icon="card"
            label="CPF"
            value={formatCPFPrivate(citizen.cpf)}
          />

          <UserInfoCard
            icon="call"
            label="Telefone"
            value={formatPhone(citizen.phone)}
            onEdit={() => navigation.navigate('EditarPerfil' as never)}
          />
        </View>
      </View>
    );
  };

  const renderFormField = (field: any) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Input
            label={field.label}
            placeholder={field.label}
            value={value}
            onChangeText={text =>
              setFormData({ ...formData, [field.id]: text })
            }
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        );
      case 'select':
        return (
          <SelectInput
            label={field.label}
            placeholder={`Selecione ${field.label.toLowerCase()}`}
            value={value}
            options={
              field.options?.map((option: string) => ({
                label: option,
                value: option,
              })) || []
            }
            onSelect={selectedValue =>
              setFormData({ ...formData, [field.id]: selectedValue })
            }
            required={field.required}
          />
        );
      case 'upload': {
        return (
          <FileUpload
            label={field.label}
            placeholder="Selecione o arquivo ou imagem"
            required={field.required}
            onChange={file => {
              if (file) {
                console.log('Arquivo selecionado:', file);
                setFormData({ ...formData, [field.id]: file.uri });
              }
            }}
          />
        );
      }
      case 'address': {
        return (
          <View>
            <Text
              style={[styles.addressSectionTitle, { color: theme.colors.text }]}
            >
              {field.label}
            </Text>

            <Input
              label={field.required ? 'Rua *' : 'Rua'}
              placeholder="Digite o nome da rua"
              value={formData[`${field.id}_rua`] || ''}
              onChangeText={text =>
                setFormData({ ...formData, [`${field.id}_rua`]: text })
              }
            />

            <Input
              label={field.required ? 'Bairro *' : 'Bairro'}
              placeholder="Digite o bairro"
              value={formData[`${field.id}_bairro`] || ''}
              onChangeText={text =>
                setFormData({ ...formData, [`${field.id}_bairro`]: text })
              }
            />

            <View style={styles.addressRow}>
              <View style={styles.addressRowItem}>
                <Input
                  label={field.required ? 'Número *' : 'Número'}
                  placeholder="Digite o número"
                  value={formData[`${field.id}_numero`] || ''}
                  onChangeText={text =>
                    setFormData({ ...formData, [`${field.id}_numero`]: text })
                  }
                  keyboardType="numeric"
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>

              <View style={styles.addressRowItem}>
                <Input
                  label="Complemento"
                  placeholder="Apartamento, bloco, etc. (opcional)"
                  value={formData[`${field.id}_complemento`] || ''}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      [`${field.id}_complemento`]: text,
                    })
                  }
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
            </View>
          </View>
        );
      }
      default:
        return (
          <Input
            label={field.label}
            placeholder={field.label}
            value={value}
            onChangeText={text =>
              setFormData({ ...formData, [field.id]: text })
            }
          />
        );
    }
  };

  const renderAgendamentoSection = () => {
    if (servico.type !== 'AGENDAMENTO' || !servico.scheduling) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Agendamento
        </Text>

        {/* Campos padrão */}
        {renderDefaultFields()}

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
            {servico.scheduling.availableDays.map((day: string) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dateOption,
                  {
                    backgroundColor:
                      selectedDate === day
                        ? theme.colors.primary
                        : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text
                  style={[
                    styles.dateOptionText,
                    {
                      color: selectedDate === day ? 'white' : theme.colors.text,
                    },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.agendamentoLabel, { color: theme.colors.text }]}>
            Horário:
          </Text>
          <View style={styles.timeContainer}>
            {servico.scheduling.availableHours.map((hour: string) => (
              <TouchableOpacity
                key={hour}
                style={[
                  styles.timeOption,
                  {
                    backgroundColor:
                      selectedTime === hour
                        ? theme.colors.primary
                        : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedTime(hour)}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    {
                      color:
                        selectedTime === hour ? 'white' : theme.colors.text,
                    },
                  ]}
                >
                  {hour}
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
        title={servico.title}
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
              {servico.title}
            </Text>
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
              {servico.description}
            </Text>
          </View>

          {/* Informações */}
          {servico.information.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Informações Importantes
              </Text>
              {servico.information.map((info: string, index: number) => (
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
                    name={link.type === 'video' ? 'play-circle' : 'link'}
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[styles.linkText, { color: theme.colors.primary }]}
                  >
                    {link.title}
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
          {servico.images.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Imagens
              </Text>
              {servico.images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: image.url }} style={styles.image} />
                  <Text
                    style={[
                      styles.imageTitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {image.title}
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
                    {video.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Formulário */}
          {(servico.type === 'FORM' || servico.type === 'AGENDAMENTO') &&
            servico.form && (
              <View style={styles.section}>
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  Formulário de Solicitação
                </Text>

                {/* Campos padrão */}
                {renderDefaultFields()}

                {servico.form.fields.map(field => (
                  <View key={field.id} style={styles.formField}>
                    {renderFormField(field)}
                  </View>
                ))}
              </View>
            )}

          {/* Agendamento */}
          {renderAgendamentoSection()}

          {/* Botão de Agendamento */}
          {(servico.type === 'AGENDAMENTO' || servico.type === 'FORM') && (
            <View style={styles.section}>
              <Button
                title={
                  servico.type === 'AGENDAMENTO'
                    ? 'Confirmar Agendamento'
                    : 'Enviar Solicitação'
                }
                onPress={handleFormSubmit}
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
    marginBottom: 5,
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
  userInfoSection: {
    marginBottom: 24,
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  userInfoCards: {
    gap: 12,
  },
  addressSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  addressRowItem: {
    flex: 1,
  },
});
