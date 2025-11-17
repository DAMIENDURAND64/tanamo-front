import Text from "@/components/Text";
import Title from "@/components/Title";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./profilPage.style";

type ProfilTabType = "infos" | "performances";

export default function ProfilPage() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ProfilTabType>("infos");

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Title>Mon Profil</Title>

        {/* Onglets */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "infos" && styles.activeTab]}
            onPress={() => setActiveTab("infos")}
          >
            <Text
              style={
                activeTab === "infos" ? styles.activeTabText : styles.tabText
              }
            >
              Informations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "performances" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("performances")}
          >
            <Text
              style={
                activeTab === "performances"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              Mes Performances
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenu des onglets */}
      <View style={styles.content}>
        {activeTab === "infos" ? (
          <Text style={styles.placeholderText}>Informations à venir...</Text>
        ) : (
          <Text style={styles.placeholderText}>Performances à venir...</Text>
        )}
      </View>
    </View>
  );
}
