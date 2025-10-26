import GroupTraining from "@/components/GroupTraining";
import HoursTraining from "@/components/HoursTraining";
import { Image, StyleSheet, View } from "react-native";
import useHomepage from "./useHomepage.hook";

const secondaryLogo = require("../../../assets/images/logo-tanamo.png");

export default function Homepage() {
  const { group, trainingsHours, loaders } = useHomepage();
  const { groupLoading, trainingsLoading } = loaders;
  return (
    <View style={styles.page}>
      <View style={styles.logoContainer}>
        <Image
          source={secondaryLogo}
          style={{ resizeMode: "stretch", width: "100%", height: 250 }}
        />
      </View>
      <GroupTraining isLoading={groupLoading} group={group} />
      <HoursTraining isLoading={trainingsLoading} hours={trainingsHours} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    gap: 16,
    marginTop: 64,
  },
  logoContainer: {
    backgroundColor: "orange",
  },
  container: {
    display: "flex",
    gap: 8,
  },
  groupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderColor: "transparent",
  },
});
