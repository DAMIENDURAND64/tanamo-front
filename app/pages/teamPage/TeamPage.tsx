import ClubInfoTab from "@/components/clubInfosTab/ClubInfosTab";
import PerformancesTab from "@/components/perfomanceTab/PerfomanceTab";
import Text from "@/components/Text";
import Title from "@/components/Title";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./teamPage.style";

type MainTabType = "infos" | "performances";

export default function TeamPage() {
  const insets = useSafeAreaInsets();
  const [mainTab, setMainTab] = useState<MainTabType>("infos");

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Title>Club de Tanamo</Title>

        <View style={styles.mainTabContainer}>
          <TouchableOpacity
            style={[
              styles.mainTab,
              mainTab === "infos" && styles.activeMainTab,
            ]}
            onPress={() => setMainTab("infos")}
          >
            <Text
              style={
                mainTab === "infos"
                  ? styles.activeMainTabText
                  : styles.mainTabText
              }
            >
              Infos Club
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.mainTab,
              mainTab === "performances" && styles.activeMainTab,
            ]}
            onPress={() => setMainTab("performances")}
          >
            <Text
              style={
                mainTab === "performances"
                  ? styles.activeMainTabText
                  : styles.mainTabText
              }
            >
              Performances
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {mainTab === "infos" ? <ClubInfoTab /> : <PerformancesTab />}
    </View>
  );
}
