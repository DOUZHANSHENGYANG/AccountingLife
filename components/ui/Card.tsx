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
    { backgroundColor: isDarkMode ? '#0A101F' : '#FFFFFF' },
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
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#0A101F',
    borderWidth: 1,
    borderColor: 'rgba(108, 142, 182, 0.1)',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});

export default Card;
