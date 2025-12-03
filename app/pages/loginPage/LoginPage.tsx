import Title from "@/components/Title";
import { MeshGradientView } from "expo-mesh-gradient";
import { Link, Redirect } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DiveSwimmerSVG from "../../../assets/images/dive-swimmer.svg";
import SwimmerButterflySVG from "../../../assets/images/swimmer-butterfly.svg";
import loginPageStyle from "./loginPage.style";
import useLoginPage from "./useLoginPage.hook";

export default function LoginPage() {
  const insets = useSafeAreaInsets();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    submitting,
    handleLogin,
    loading,
    session,
  } = useLoginPage();

  if (!loading && session) {
    return <Redirect href="/(tabs)" />;
  }

  const MeshGradientColors = [
    "#0EA5E9", // light blue
    "#38BDF8", // sky blue
    "#1D4ED8", // deep blue
    "#F97316", // vivid orange
    "#FDBA74", // soft orange
    "#FEF3C7", // warm white/cream
    "#E0AB79", // orange
    "#E0AB79", // orange
    "#EBC9B7", // orange
  ];

  const MeshGradientPoints = [
    [0, 0],
    [0.5, 0],
    [1, 0],
    [0, 0.5],
    [0.5, 0.5],
    [1, 0.5],
    [0, 1],
    [0.5, 1],
    [1, 1],
  ];

  return (
    <MeshGradientView
      style={loginPageStyle.page}
      columns={3}
      rows={3}
      colors={MeshGradientColors}
      points={MeshGradientPoints}
    >
      <View style={{ flex: 1 }}>
        <View style={loginPageStyle.header}>
          <SwimmerButterflySVG width={"100%"} height={260} />

          <View style={loginPageStyle.headerTitle}>
            <Title size={"h1"} weight="bold" color="primary">
              TANAMO
            </Title>
          </View>
        </View>
        <View style={loginPageStyle.content}>
          <Title size={"h2"} style={{ marginBottom: 8 }}>
            Connexion
          </Title>

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={loginPageStyle.input}
            placeholderTextColor="#222"
          />

          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={loginPageStyle.input}
            placeholderTextColor="#222"
          />

          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          <Pressable
            onPress={handleLogin}
            disabled={submitting}
            style={loginPageStyle.button}
          >
            <Title size="h4" weight="bold" color="white">
              {submitting ? "Connexion…" : "Se connecter"}
            </Title>
          </Pressable>
          <Text style={loginPageStyle.buttonText}>
            Pas de compte ? <Link href="/(auth)/signup">Créer un compte</Link>
          </Text>
        </View>
        <View
          style={[
            loginPageStyle.diveSwimmerContainer,
            { bottom: insets.bottom + 20 },
          ]}
        >
          <DiveSwimmerSVG width={150} height={150} />
        </View>
      </View>
    </MeshGradientView>
  );
}
