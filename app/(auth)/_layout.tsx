import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Connexion', headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Créer un compte", headerShown: false }} />
    </Stack>
  );
}

