import { StyleSheet, View } from "react-native";
import { AutoSkeletonView } from "react-native-auto-skeleton";
import Text from "./Text";
import Title from "./Title";

interface HoursTrainingProps {
  isLoading: boolean;
  hours: { hour: string }[];
}

export default function HoursTraining({
  isLoading,
  hours,
}: HoursTrainingProps) {
  return (
    <AutoSkeletonView
      isLoading={isLoading}
      defaultRadius={8}
      animationType="pulse"
    >
      <View style={styles.container}>
        <Title
          weight={800}
          color="secondary"
          style={{
            alignSelf: "flex-start",
          }}
        >
          Horaires d&apos;entrainement
        </Title>
        <View style={styles.groupBox}>
          {hours.map((hour) => (
            <Text key={hour.hour} variant="bold">
              {hour.hour}
            </Text>
          ))}
        </View>
      </View>
    </AutoSkeletonView>
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
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "rgba(0, 76, 255, 0.4)",
    borderColor: "transparent",
  },
});
