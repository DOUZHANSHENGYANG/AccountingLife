import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface ProgressProps {
  value: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  indicatorColor?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  style,
  indicatorStyle,
  backgroundColor,
  indicatorColor,
}) => {
  const { isDarkMode } = useTheme();
  const percentage = Math.min(Math.max(0, value), max) / max * 100;

  return (
    <View 
      style={[
        styles.container, 
        isDarkMode ? styles.containerDark : styles.containerLight,
        backgroundColor ? { backgroundColor } : undefined,
        style
      ]}
    >
      <View 
        style={[
          styles.indicator,
          { width: `${percentage}%` },
          indicatorColor ? { backgroundColor: indicatorColor } : styles.defaultIndicator,
          indicatorStyle
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  containerLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  containerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  indicator: {
    height: '100%',
    borderRadius: 4,
  },
  defaultIndicator: {
    backgroundColor: '#6C8EB6',
  },
});

export default Progress;
