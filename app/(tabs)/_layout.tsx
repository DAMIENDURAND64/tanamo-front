import { useAuth } from "@/providers/AuthProvider";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!loading && !session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "orange" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          headerShown: false,
          title: "Club",
          tabBarIcon: ({ color }) => (
            <Entypo name="sports-club" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          headerShown: false,
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
