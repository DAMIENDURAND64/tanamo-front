import { Link, Redirect } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginScreen() {
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    setSubmitting(true);
    setError(null);
    const res = await signIn(email.trim(), password);
    if (res && 'error' in res && res.error) setError(res.error.message);
    setSubmitting(false);
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Connexion</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Pressable
        onPress={handleLogin}
        disabled={submitting}
        style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
          {submitting ? 'Connexion…' : 'Se connecter'}
        </Text>
      </Pressable>

      <Text style={{ textAlign: 'center' }}>
        Pas de compte ? <Link href="/(auth)/signup">Créer un compte</Link>
      </Text>
    </View>
  );
}
