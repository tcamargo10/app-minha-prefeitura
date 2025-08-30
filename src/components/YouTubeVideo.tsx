import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

interface YouTubeVideoProps {
  videoUrl?: string;
  youtubeId?: string;
  title?: string;
  showTitle?: boolean;
  height?: number;
  borderRadius?: number;
  onPress?: () => void;
}

export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoUrl,
  youtubeId,
  title,
  showTitle = true,
  height = 200,
  borderRadius = 12,
  onPress,
}) => {
  const { theme } = useTheme();

  // Função para extrair o ID do vídeo do YouTube da URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Função para gerar a URL da thumbnail do YouTube
  const getYouTubeThumbnail = (id: string): string => {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  // Determinar o ID do vídeo
  const videoId = youtubeId || (videoUrl ? getYouTubeVideoId(videoUrl) : null);

  if (!videoId) {
    return null;
  }

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o vídeo');
      });
    }
  };

  return (
    <View style={styles.container}>
      {showTitle && title && (
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.videoContainer,
          {
            height,
            borderRadius,
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: getYouTubeThumbnail(videoId) }}
          style={[
            styles.thumbnail,
            {
              borderRadius,
            },
          ]}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.playButton}>
            <Ionicons
              name="play"
              size={28}
              color="white"
              style={styles.playIcon}
            />
          </View>
        </View>
        {/* YouTube Logo */}
        <View style={styles.youtubeLogo}>
          <Text style={styles.youtubeText}>YouTube</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'left',
  },
  videoContainer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playIcon: {
    marginLeft: 2, // Pequeno deslocamento para melhor centralização visual
  },
  youtubeLogo: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  youtubeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
