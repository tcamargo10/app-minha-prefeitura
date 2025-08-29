import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

interface FileUploadProps {
  label?: string;
  placeholder?: string;
  onChange?: (file: FileData | null) => void;
  disabled?: boolean;
  required?: boolean;
}

interface FileData {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  placeholder = 'Selecione o arquivo ou imagem',
  onChange,
  disabled = false,
  required = false,
}) => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const handleFileSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Aceita todos os tipos de arquivo
      });

      if (!result.canceled && result.assets[0]) {
        const file: FileData = {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          type: result.assets[0].mimeType || 'application/octet-stream',
          size: result.assets[0].size,
        };
        setSelectedFile(file);
        onChange?.(file);
      }
    } catch (error) {
      console.error('Erro ao selecionar arquivo:', error);
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo');
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
          {required && (
            <Text style={{ color: theme.colors.error || '#ff0000' }}> *</Text>
          )}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.fileUpload,
          {
            borderColor: theme.colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={handleFileSelection}
        disabled={disabled}
      >
        <Ionicons
          name={selectedFile ? 'document' : 'cloud-upload'}
          size={24}
          color={
            selectedFile
              ? theme.colors.success || theme.colors.primary
              : theme.colors.primary
          }
        />
        <Text
          style={[
            styles.fileUploadText,
            {
              color: selectedFile
                ? theme.colors.text
                : theme.colors.textSecondary,
              fontWeight: selectedFile ? '500' : 'normal',
              flex: 1,
            },
          ]}
        >
          {selectedFile ? selectedFile.name : placeholder}
        </Text>
        {selectedFile && (
          <TouchableOpacity
            onPress={() => {
              setSelectedFile(null);
              onChange?.(null);
            }}
            style={styles.removeButton}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.colors.error || theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  fileUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    gap: 12,
  },
  fileUploadText: {
    fontSize: 16,
  },
  removeButton: {
    padding: 4,
  },
});
