import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AuthProvider from "@/providers/AuthProvider";

// TODO: Quand tu installeras expo-notifications, tu pourras ajouter :
// import * as Notifications from "expo-notifications";
// Notifications.setNotificationHandler({ ... });

export default function Layout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Inter: require("../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf"),
      Quicksand: require("../assets/fonts/Quicksand-VariableFont_wght.ttf"),
    }).then(() => setLoaded(true));

    // 2. TODO: Ici tu pourras ajouter ton système d'auth
    // checkAuthStatus();

    // 3. TODO: Configuration des notifications
    // setupNotifications();

    // 4. TODO: Initialisation d'autres services globaux
    // initializeAnalytics();
    // setupCrashReporting();
  }, []);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
