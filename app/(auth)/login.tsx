import Title from "@/components/Title";
import { useAuth } from "@/providers/AuthProvider";
import { MeshGradientView } from "expo-mesh-gradient";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import SwimmerButterfly from "../../assets/images/swimmer-butterfly.svg";

export interface GradientStyle {
  readonly colors: readonly [string, string, ...string[]];
  readonly start?: { x: number; y: number };
  readonly end?: { x: number; y: number };
}

export const BorderGradientYellow: GradientStyle = {
  colors: ["#1D4ED8", "#0EA5E9", "#F97316"] as const,
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
};

export default function LoginScreen() {
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    setSubmitting(true);
    setError(null);
    const res = await signIn(email.trim(), password);
    if (res && "error" in res && res.error) setError(res.error.message);
    setSubmitting(false);
  };

  return (
    <MeshGradientView
      style={{ flex: 1 }}
      columns={3}
      rows={3}
      colors={[
        "#0EA5E9", // light blue
        "#38BDF8", // sky blue
        "#1D4ED8", // deep blue
        "#F97316", // vivid orange
        "#FDBA74", // soft orange
        "#FEF3C7", // warm white/cream
        "#FFFFFF", // pure white
      ]}
      points={[
        [0, 0],
        [0.5, 0],
        [1, 0],
        [0, 0.5],
        [0.5, 0.5],
        [1, 0.5],
        [0, 1],
        [0.5, 1],
        [1, 1],
      ]}
    >
      <View
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
        }}
      >
        <SwimmerButterfly width={"100%"} height={260} />
        <View
          style={{
            position: "absolute",
            top: 170,
            width: "100%",
            opacity: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title size={"h1"} weight="bold" color="primary">
            TANAMO{" "}
          </Title>
        </View>
      </View>

      <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 16 }}>
        <Title size={"h2"} style={{ marginBottom: 8 }}>
          Connexion
        </Title>
        <View
          style={{
            borderRadius: 12,
            padding: 2,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.45)",
          }}
        >
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: "transparent",
              borderRadius: 10,
              padding: 12,
              borderWidth: 0,
              color: "#222",
            }}
            placeholderTextColor="#222"
          />
        </View>
        <View
          style={{
            borderRadius: 12,
            padding: 2,
            marginTop: 8,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.45)",
          }}
        >
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: "transparent",
              borderRadius: 10,
              padding: 12,
              borderWidth: 0,
              color: "#222",
            }}
            placeholderTextColor="#222"
          />
        </View>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <Pressable
          onPress={handleLogin}
          disabled={submitting}
          style={{ backgroundColor: "#2563eb", padding: 14, borderRadius: 8 }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "600" }}
          >
            {submitting ? "Connexion…" : "Se connecter"}
          </Text>
        </Pressable>
        <Text style={{ textAlign: "center" }}>
          Pas de compte ? <Link href="/(auth)/signup">Créer un compte</Link>
        </Text>
      </View>
    </MeshGradientView>
  );
}
