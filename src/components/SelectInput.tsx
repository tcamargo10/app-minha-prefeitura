/**
 * Componente SelectInput - Select genérico reutilizável
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
  loading = false,
  disabled = false,
  required = false,
  error,
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option: SelectOption) => {
    onSelect(option.value);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label} {required && '*'}
        </Text>
        <TouchableOpacity
          style={[
            styles.selectInput,
            {
              backgroundColor: theme.colors.surface,
              borderColor: error ? theme.colors.error : theme.colors.border,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
          onPress={() => !disabled && setModalVisible(true)}
          disabled={disabled}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Text
              style={[
                styles.selectText,
                {
                  color: selectedOption
                    ? theme.colors.text
                    : theme.colors.textSecondary,
                },
              ]}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
          )}
          <Ionicons
            name="chevron-down"
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        {error && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        )}
      </View>

      {/* Modal de Seleção */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {label}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.selectorContainer}
              contentContainerStyle={styles.selectorContentContainer}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[
                      styles.loadingText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Carregando...
                  </Text>
                </View>
              ) : options.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text
                    style={[
                      styles.emptyText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Nenhuma opção disponível
                  </Text>
                </View>
              ) : (
                options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.selectorItem,
                      {
                        backgroundColor: theme.colors.surface,
                        borderBottomColor: theme.colors.border,
                      },
                    ]}
                    onPress={() => handleSelect(option)}
                  >
                    <Text
                      style={[
                        styles.selectorItemText,
                        { color: theme.colors.text },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  selectInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
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
  closeButton: {
    padding: 4,
  },
  selectorContainer: {
    maxHeight: 400,
  },
  selectorContentContainer: {
    paddingBottom: 20,
  },
  selectorItem: {
    padding: 16,
    borderBottomWidth: 1,
  },
  selectorItemText: {
    fontSize: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
