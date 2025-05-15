import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
  isDarkMode: true,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// 自定义主题颜色
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6C8EB6',
    secondary: '#4ECDC4',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    error: '#FF6B6B',
    text: '#0F172A',
    disabled: '#94A3B8',
    placeholder: '#64748B',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF6B6B',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6C8EB6',
    secondary: '#4ECDC4',
    background: '#0E1525', // 更深的蓝黑色，接近原型
    surface: '#131C2E', // 更深的蓝黑色，接近原型中的卡片颜色
    error: '#FF6B6B',
    text: '#FFFFFF',
    disabled: '#94A3B8',
    placeholder: '#64748B',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF6B6B',
  },
};

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // 检查保存的主题偏好或使用系统偏好
    const checkTheme = async () => {
      try {
        // 从AsyncStorage获取保存的主题设置
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setTheme(savedTheme);
        } else {
          // 默认使用暗色主题
          setTheme('dark');
        }
      } catch (error) {
        console.log('Error loading theme preference', error);
        // 出错时使用暗色主题
        setTheme('dark');
      }
    };

    checkTheme();
  }, []);

  // 当主题变化时，保存到AsyncStorage
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('theme', theme);
      } catch (error) {
        console.log('Error saving theme preference', error);
      }
    };

    saveTheme();
  }, [theme]);

  const isDarkMode = theme === 'dark';
  const paperTheme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    theme,
    setTheme,
    isDarkMode,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
