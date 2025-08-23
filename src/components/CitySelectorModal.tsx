import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '@/contexts/ThemeContext';
import { useCity, City } from '@/contexts/CityContext';
import { RootStackParamList } from '@/navigation/AppNavigator';

interface CitySelectorModalProps {
  visible: boolean;
  onClose: () => void;
}

type CitySelectorModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Enderecos'
>;

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const { currentCity, setCurrentCity, availableCities } = useCity();
  const navigation = useNavigation<CitySelectorModalNavigationProp>();

  const handleCitySelect = (city: City) => {
    setCurrentCity(city);
    onClose();
  };

  const handleAddNewAddress = () => {
    onClose();
    navigation.navigate('Enderecos');
  };

  const renderCityItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      style={[
        styles.cityItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        currentCity.id === item.id && {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
      ]}
      onPress={() => handleCitySelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cityInfo}>
        <Text
          style={[
            styles.cityName,
            {
              color:
                currentCity.id === item.id
                  ? theme.colors.onPrimary
                  : theme.colors.text,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.cityState,
            {
              color:
                currentCity.id === item.id
                  ? theme.colors.onPrimary
                  : theme.colors.textSecondary,
            },
          ]}
        >
          {item.state}
        </Text>
      </View>
      {currentCity.id === item.id && (
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={theme.colors.onPrimary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.modalHeader}>
            <View>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Selecionar Cidade
              </Text>
              <Text
                style={[
                  styles.modalSubtitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Cidades onde você possui endereços
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={availableCities}
            renderItem={renderCityItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.citiesList}
            showsVerticalScrollIndicator={false}
          />

          {/* Add New Address Section */}
          <View style={styles.addAddressSection}>
            <View style={styles.addAddressInfo}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.addAddressText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Tem endereço em outra cidade?
              </Text>
            </View>
            <Text
              style={[
                styles.addAddressSubtext,
                { color: theme.colors.textSecondary },
              ]}
            >
              Cadastre um novo endereço para acessar os serviços de outras
              cidades
            </Text>
            <TouchableOpacity
              style={[
                styles.addAddressButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleAddNewAddress}
              activeOpacity={0.7}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={theme.colors.onPrimary}
              />
              <Text
                style={[
                  styles.addAddressButtonText,
                  { color: theme.colors.onPrimary },
                ]}
              >
                Cadastrar Novo Endereço
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
  citiesList: {
    padding: 20,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cityState: {
    fontSize: 14,
  },
  addAddressSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  addAddressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addAddressSubtext: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addAddressButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
