import React from 'react';
import { Text, StyleSheet, TextProps, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientTextProps extends TextProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientText: React.FC<GradientTextProps> = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  ...rest
}) => {
  if (Platform.OS === 'web') {
    // Web平台使用CSS渐变
    return (
      <Text
        style={[
          style,
          {
            backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          },
        ]}
        {...rest}
      />
    );
  }

  // iOS和Android平台使用MaskedView
  return (
    <MaskedView
      maskElement={<Text style={[styles.text, style]} {...rest} />}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={styles.gradient}
      >
        <Text style={[styles.text, style, styles.transparent]} {...rest} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  transparent: {
    opacity: 0,
  },
  gradient: {
    flex: 1,
  },
});

export default GradientText;
