import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
import { AppContextProvider } from './context/AppContext';
import AppNavigator from './navigation/AppNavigator';

function Main() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <Main />
      </AppContextProvider>
    </ThemeProvider>
  );
}
