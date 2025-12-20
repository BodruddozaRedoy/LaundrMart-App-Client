import { ToastProvider } from "@/components/ui/toast/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const client = new QueryClient()

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ToastProvider>
          <QueryClientProvider client={client}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(customer)" />
                <Stack.Screen name="(mart)" />
              </Stack>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </ToastProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
