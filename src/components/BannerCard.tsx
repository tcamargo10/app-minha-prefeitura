import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Linking } from 'react-native';

interface BannerCardProps {
  imageUrl: string | any; // string para URLs, any para require()
  externalLink?: string;
  internalLink?: () => void;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  imageUrl,
  externalLink,
  internalLink,
}) => {
  const isRemoteImage = typeof imageUrl === 'string';
  const [isLoading, setIsLoading] = useState(isRemoteImage);
  const [hasError, setHasError] = useState(false);

  const handlePress = async () => {
    if (externalLink) {
      try {
        await Linking.openURL(externalLink);
      } catch (error) {
        console.error('Erro ao abrir link externo:', error);
      }
    } else if (internalLink) {
      internalLink();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const isClickable = externalLink || internalLink;

  const BannerContent = () => (
    <View style={styles.imageContainer}>
      <Image
        source={isRemoteImage ? { uri: imageUrl } : imageUrl}
        style={styles.bannerImage}
        resizeMode="cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
        // Otimizações para carregamento
        fadeDuration={300}
        progressiveRenderingEnabled={true}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {hasError && (
        <View style={styles.errorContainer}>
          <View style={styles.errorPlaceholder} />
        </View>
      )}
    </View>
  );

  if (isClickable) {
    return (
      <TouchableOpacity style={styles.bannerCard} onPress={handlePress}>
        <BannerContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.bannerCard}>
      <BannerContent />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerCard: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
