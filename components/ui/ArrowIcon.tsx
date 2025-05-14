import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ArrowIconProps {
  direction: 'up' | 'down' | 'left' | 'right';
  color?: string;
  size?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  direction,
  color = '#FFFFFF',
  size = 12
}) => {
  // 箭头路径 - 水平和垂直箭头
  const upPath = "M6 2L6 10";     // 向上箭头
  const downPath = "M6 10L6 2";   // 向下箭头
  const leftPath = "M2 6L10 6";   // 向左箭头
  const rightPath = "M10 6L2 6";  // 向右箭头

  // 确定使用哪个路径
  let arrowPath;
  switch(direction) {
    case 'up':
      arrowPath = upPath;
      break;
    case 'down':
      arrowPath = downPath;
      break;
    case 'left':
      arrowPath = leftPath;
      break;
    case 'right':
      arrowPath = rightPath;
      break;
    default:
      arrowPath = rightPath;
  }

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 12 12">
        <Path
          d={arrowPath}
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
