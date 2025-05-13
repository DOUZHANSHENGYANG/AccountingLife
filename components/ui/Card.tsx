import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  const { isDarkMode } = useTheme();

  const cardStyle = [
    styles.card,
    isDarkMode ? styles.cardDark : styles.cardLight,
    style,
  ];

  if (onPress) {
    return (
      <Pressable 
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  cardLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    shadowColor: 'rgba(108, 142, 182, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderColor: '#334155',
    borderWidth: 1,
    shadowColor: 'rgba(108, 142, 182, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});

export default Card;
