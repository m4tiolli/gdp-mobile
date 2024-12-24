import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons/';
import './global.css';
import { ToastProvider } from '@/components/Toast';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    'Manrope': require('../assets/fonts/Manrope.ttf'),
    ...MaterialIcons.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ToastProvider position='top'>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style='dark' />
    </ToastProvider>
  );
}
