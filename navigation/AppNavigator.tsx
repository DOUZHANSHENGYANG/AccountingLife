import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';

// 导入屏幕组件
import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import BudgetScreen from '../screens/BudgetScreen';
// import CategoryScreen from '../screens/CategoryScreen';
// import FamilyScreen from '../screens/FamilyScreen';
// import ExportScreen from '../screens/ExportScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          },
          headerTintColor: isDarkMode ? '#FFFFFF' : '#0F172A',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '智能记账',
            headerShown: false,
          }}
        />
        {/* 其他屏幕将在稍后添加 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
