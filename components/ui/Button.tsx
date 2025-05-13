import React from 'react';
import { 
  Pressable, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  StyleProp,
  View,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  icon,
  iconPosition = 'left',
}) => {
  const { isDarkMode } = useTheme();

  const getButtonStyle = () => {
    let buttonStyle: StyleProp<ViewStyle> = [
      styles.button,
      styles[`${size}Button`],
    ];

    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(
          isDarkMode ? styles.outlineButtonDark : styles.outlineButtonLight
        );
        break;
      case 'ghost':
        buttonStyle.push(
          isDarkMode ? styles.ghostButtonDark : styles.ghostButtonLight
        );
        break;
    }

    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray: StyleProp<TextStyle> = [
      styles.text,
      styles[`${size}Text`],
    ];

    switch (variant) {
      case 'primary':
      case 'secondary':
        textStyleArray.push(styles.primaryText);
        break;
      case 'outline':
      case 'ghost':
        textStyleArray.push(
          isDarkMode ? styles.outlineTextDark : styles.outlineTextLight
        );
        break;
    }

    if (disabled) {
      textStyleArray.push(styles.disabledText);
    }

    return textStyleArray;
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
    </>
  );

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>{content}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#6C8EB6',
    shadowColor: 'rgba(108, 142, 182, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#4ECDC4',
    shadowColor: 'rgba(78, 205, 196, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  outlineButtonLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6C8EB6',
  },
  outlineButtonDark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6C8EB6',
  },
  ghostButtonLight: {
    backgroundColor: 'transparent',
  },
  ghostButtonDark: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  outlineTextLight: {
    color: '#6C8EB6',
  },
  outlineTextDark: {
    color: '#6C8EB6',
  },
  disabledText: {
    color: '#E2E8F0',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
