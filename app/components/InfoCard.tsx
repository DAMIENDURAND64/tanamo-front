import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type InfoCardProps = {
  title: string;
  children: ReactNode;
};

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#1f2937" },
});
