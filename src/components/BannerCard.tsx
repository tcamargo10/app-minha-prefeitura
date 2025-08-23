import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

  const isClickable = externalLink || internalLink;

  const BannerContent = () => (
    <Image
      source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
      style={styles.bannerImage}
      resizeMode="cover"
    />
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
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
