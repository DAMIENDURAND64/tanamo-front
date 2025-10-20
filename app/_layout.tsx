import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

// TODO: Quand tu installeras expo-notifications, tu pourras ajouter :
// import * as Notifications from "expo-notifications";
// Notifications.setNotificationHandler({ ... });

export default function Layout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Chargement des fonts (déjà fait)
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

  // Fonction exemple pour l'authentification
  // const checkAuthStatus = async () => {
  //   const token = await AsyncStorage.getItem('authToken');
  //   if (token) {
  //     // Valider le token
  //     // Rediriger vers les tabs ou login
  //   }
  // };

  if (!loaded) return null;

  return (
    // Ici tu peux wrapper avec tes Providers globaux :
    // <AuthProvider>
    //   <NotificationProvider>
    //     <QueryClientProvider client={queryClient}>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* 
              Autres screens que tu peux ajouter :
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="profile-edit" options={{ title: "Modifier le profil" }} />
            */}
    </Stack>
    //     </QueryClientProvider>
    //   </NotificationProvider>
    // </AuthProvider>
  );
}
