import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const isAuthenticated = false; // Replace with your auth logic

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <Slot />;
}
