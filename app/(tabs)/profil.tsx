import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

export default function Tab() {
  const { session, user, signOut } = useAuth();
  if (!session) return <Redirect href="/(auth)/login" />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text>Email: {user?.email}</Text>
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 22, marginBottom: 12 },
  button: { backgroundColor: '#ef4444', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 16 },
});
