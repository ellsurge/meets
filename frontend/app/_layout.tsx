import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { config } from '../tamagui.config';
import { httpBatchLink } from '@trpc/client';
import { getBaseUrl, trpc } from '@/utils/trpc';

 export const queryClient = new QueryClient();
  const trpcClient = 
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    })
    ;
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
<TamaguiProvider config={config}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
        </ThemeProvider>
    </TamaguiProvider>
      </QueryClientProvider>
</trpc.Provider>
  );
}
