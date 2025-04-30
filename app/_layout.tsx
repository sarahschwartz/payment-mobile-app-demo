/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SplashScreen } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after loading the assets
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        <Stack.Screen 
          name="send-money/[id]" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen 
          name="request-money/[id]" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen 
          name="transactions/[id]" 
          options={{ 
            animation: 'slide_from_right',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}