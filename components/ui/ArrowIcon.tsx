import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ArrowIconProps {
  direction: 'up' | 'down';
  color?: string;
  size?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  direction,
  color = '#FFFFFF',
  size = 12
}) => {
  // 箭头路径 - 斜向箭头
  const upPath = "M2 10L10 2";  // 右上斜向箭头
  const downPath = "M2 2L10 10"; // 右下斜向箭头

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 12 12">
        <Path
          d={direction === 'up' ? upPath : downPath}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArrowIcon;
