import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

import { CustomStatusBar } from '@/components/CustomStatusBar';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    const textAnimation = Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
    });

    // Animação dos pontos de loading
    const dotAnimation = Animated.stagger(200, [
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim1, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim2, {
            toValue: 1,
            duration: 400,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim2, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim3, {
            toValue: 1,
            duration: 400,
            delay: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim3, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ),
    ]);

    animation.start();
    textAnimation.start();
    dotAnimation.start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [
    fadeAnim,
    scaleAnim,
    textFadeAnim,
    dotAnim1,
    dotAnim2,
    dotAnim3,
    onFinish,
  ]);

  return (
    <>
      <CustomStatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          <View
            style={[styles.circle1, { backgroundColor: colors.onPrimary }]}
          />
          <View
            style={[styles.circle2, { backgroundColor: colors.onPrimary }]}
          />
          <View
            style={[styles.circle3, { backgroundColor: colors.onPrimary }]}
          />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View
              style={[styles.logoCircle, { backgroundColor: colors.onPrimary }]}
            >
              <Ionicons name="business" size={60} color={colors.primary} />
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: textFadeAnim,
              },
            ]}
          >
            <Text style={[styles.title, { color: colors.onPrimary }]}>
              Minha Cidade
            </Text>
            <Text style={[styles.subtitle, { color: colors.onPrimary }]}>
              Conectando você à sua cidade
            </Text>
          </Animated.View>

          {/* Loading Animation */}
          <View style={styles.loadingContainer}>
            <Animated.View
              style={[
                styles.loadingDot,
                {
                  backgroundColor: colors.onPrimary,
                  opacity: dotAnim1,
                  transform: [
                    {
                      scale: dotAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.loadingDot,
                {
                  backgroundColor: colors.onPrimary,
                  opacity: dotAnim2,
                  transform: [
                    {
                      scale: dotAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.loadingDot,
                {
                  backgroundColor: colors.onPrimary,
                  opacity: dotAnim3,
                  transform: [
                    {
                      scale: dotAnim3.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.onPrimary }]}>
              Carregando...
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -50,
    right: -50,
    opacity: 0.1,
  },
  circle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    bottom: height * 0.3,
    left: -30,
    opacity: 0.08,
  },
  circle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: height * 0.2,
    right: 50,
    opacity: 0.06,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: height * 0.1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
