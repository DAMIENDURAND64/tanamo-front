import { Pressable, StyleSheet, Text, View } from "react-native";

type TabId = "infos" | "performances";

type ProfileTabsProps = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

const TABS: { id: TabId; label: string }[] = [
  { id: "infos", label: "Infos" },
  { id: "performances", label: "Performances" },
];

export default function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#ff8c00",
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  tabLabelActive: {
    color: "#fff",
  },
});
