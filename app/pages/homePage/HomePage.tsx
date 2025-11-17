import GroupTraining from "@/components/GroupTraining";
import HoursTraining from "@/components/HoursTraining";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./homePage.style";
import useHomepage from "./useHomePage.hook";

const secondaryLogo = require("../../../assets/images/logo-tanamo.png");

export default function HomePage() {
  const insets = useSafeAreaInsets();
  const { group, trainingsHours, loaders } = useHomepage();
  const { groupLoading, trainingsLoading } = loaders;

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
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
