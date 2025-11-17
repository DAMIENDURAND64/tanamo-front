import { ActivityIndicator, StyleSheet, View } from "react-native";
import Text from "./Text";
import Title from "./Title";

interface GroupTrainingProps {
  isLoading: boolean;
  group: string;
}

export default function GroupTraining({
  isLoading,
  group,
}: GroupTrainingProps) {
  return (
    <View style={styles.container}>
      <Title
        weight={800}
        color="secondary"
        style={{
          alignSelf: "flex-start",
        }}
      >
        Groupe
      </Title>
      {isLoading ? (
        <View style={[styles.groupBox, styles.loadingBox]}>
          <ActivityIndicator size="small" color="#0066cc" />
        </View>
      ) : (
        <View style={styles.groupBox}>
          <Text variant="bold">{group}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 8,
    paddingHorizontal: 4,
  },
  groupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "rgba(0, 76, 255, 0.4)",
    borderColor: "transparent",
  },
  loadingBox: {
    backgroundColor: "#f0f0f0",
  },
});
