import { NagePerformance } from "@/services/extranatApi";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import Title from "./Title";

type PerformanceListProps = {
  items: NagePerformance[];
  loading: boolean;
  error?: string | null;
};

export default function PerformanceList({
  items,
  loading,
  error,
}: PerformanceListProps) {
  if (error) {
    return (
      <View style={[styles.card, styles.errorCard]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.helper}>
          Aucune performance à afficher pour le moment.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {items.map((item) => {
        return (
          <View key={item.name} style={styles.card}>
            <View style={styles.accentBar} />
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <Title>{item.name ?? "Nage inconnue"}</Title>
                {item.points && item.points !== "na" && (
                  <Text style={styles.badgeBlue}>{item.points}</Text>
                )}
              </View>
              <View style={styles.metaGrid}>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>Temps : </Text>
                  <Title>{item.temps ?? "?"}</Title>
                </View>
              </View>

              <View style={styles.footerRow}>
                <Text style={styles.badgeOrange}>
                  Bassin {item.bassin ? `${item.bassin} m` : "?"}
                </Text>
                <Text style={styles.badgeOrange}>{item.date}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 8,
  },
  accentBar: {
    height: 4,
    backgroundColor: "#2563eb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  badgeBlue: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 12,
  },
  badgeOrange: {
    backgroundColor: "#feecdbff",
    color: "#d8741dff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 12,
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metaBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    gap: 6,
  },
  metaHighlight: {
    backgroundColor: "#eef2ff",
  },
  metaLabel: {
    color: "#6b7280",
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  metaValue: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  footerLabel: { color: "#6b7280", fontSize: 13, fontWeight: "600" },
  footerValue: { color: "#1f2937", fontWeight: "500" },
  emptyCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
  },
  helper: { color: "#6b7280", textAlign: "center" },
  errorCard: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
  },
  errorText: { color: "#b91c1c", fontWeight: "600" },
});
