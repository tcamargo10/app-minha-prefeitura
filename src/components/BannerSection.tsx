import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import { BannerCard } from './BannerCard';

interface Banner {
  id: number;
  imageUrl: string | any; // string para URLs, any para require()
  externalLink?: string;
  internalLink?: () => void;
}

interface BannerSectionProps {
  banners: Banner[];
}

export const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width - 40; // 40 = padding horizontal (20 + 20)

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  // Função para ir para o próximo banner
  const goToNextBanner = () => {
    const nextIndex = (currentIndex + 1) % banners.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current?.scrollTo({
      x: nextIndex * screenWidth,
      animated: true,
    });
  };

  // Função para ir para um banner específico
  const goToBanner = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  // Auto-rotacionar a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextBanner();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  return (
    <View style={styles.bannersSection}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannersContainer}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        pagingEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map(banner => (
          <View key={banner.id} style={[styles.bannerWrapper, { width: screenWidth }]}>
            <BannerCard
              imageUrl={banner.imageUrl}
              externalLink={banner.externalLink}
              internalLink={banner.internalLink}
            />
          </View>
        ))}
      </ScrollView>
      
      {/* Indicadores de página (dots) */}
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
            onPress={() => goToBanner(index)}
            activeOpacity={0.7}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannersSection: {
    marginBottom: 32,
  },
  bannersContainer: {
    // Removido paddingRight pois agora cada banner ocupa largura total
  },
  bannerWrapper: {
    // Cada banner wrapper terá width definido dinamicamente
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
});
