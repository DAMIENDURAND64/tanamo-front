import ClubInfoTab from "@/components/clubInfosTab/ClubInfosTab";
import PerformancesTab from "@/components/perfomanceTab/PerfomanceTab";
import Text from "@/components/Text";
import Title from "@/components/Title";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./teamPage.style";

export const AVAILABLE_SEASONS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
];

type MainTabType = "infos" | "performances";

export default function TeamPage() {
  const insets = useSafeAreaInsets();
  const [mainTab, setMainTab] = useState<MainTabType>("infos");
  const [selectedSeason, setSelectedSeason] = useState(AVAILABLE_SEASONS[0]);

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

      {mainTab === "infos" ? (
        <ClubInfoTab />
      ) : (
        <PerformancesTab
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
      )}
    </View>
  );
}
