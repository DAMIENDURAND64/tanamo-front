import { Link, Redirect } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';

export default function SignupScreen() {
  const { session, loading, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSignup = async () => {
    setSubmitting(true);
    setError(null);
    setInfo(null);
    const res = await signUp(email.trim(), password);
    if (res && 'error' in res && res.error) setError(res.error.message);
    else setInfo('Compte créé. Vérifie tes emails si confirmation requise.');
    setSubmitting(false);
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Créer un compte</Text>

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
      {info ? <Text style={{ color: 'green' }}>{info}</Text> : null}
      <Pressable
        onPress={handleSignup}
        disabled={submitting}
        style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
          {submitting ? 'Création…' : 'Créer mon compte'}
        </Text>
      </Pressable>

      <Text style={{ textAlign: 'center' }}>
        Déjà un compte ? <Link href="/(auth)/login">Se connecter</Link>
      </Text>
    </View>
  );
}
