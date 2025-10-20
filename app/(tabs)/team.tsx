import { StyleSheet, Text, View } from "react-native";

export default function Team() {
  return (
    <View style={styles.container}>
      <Text>Team</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
