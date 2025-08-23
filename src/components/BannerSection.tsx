import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { BannerCard } from './BannerCard';

interface Banner {
  id: number;
  imageUrl: string;
  externalLink?: string;
  internalLink?: () => void;
}

interface BannerSectionProps {
  banners: Banner[];
}

export const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {
  return (
    <View style={styles.bannersSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannersContainer}
        snapToInterval={332} // 320 (width) + 12 (marginRight)
        decelerationRate="fast"
        pagingEnabled={false}
      >
        {banners.map(banner => (
          <BannerCard
            key={banner.id}
            imageUrl={banner.imageUrl}
            externalLink={banner.externalLink}
            internalLink={banner.internalLink}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannersSection: {
    marginBottom: 32,
  },
  bannersContainer: {
    paddingRight: 20,
  },
});
