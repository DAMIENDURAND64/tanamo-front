import Text from "@/components/Text";
import Title from "@/components/Title";
import { Image, StyleSheet, View } from "react-native";

export default function Homepage() {
  return (
    <View style={styles.page}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo-tanamo.png")}
          style={{ resizeMode: "stretch", width: "100%", height: 250 }}
        />
      </View>
      <View style={styles.container}>
        <Title weight={800} color="secondary">
          Groupe
        </Title>
        <View style={styles.groupBox}>
          <Text variant="bold" color="primary">
            C1
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Title weight={800} color="secondary">
          Horaires d&apos;entrainement
        </Title>
        <View style={styles.groupBox}>
          <Text variant="bold" color="primary">
            Jeudi 19h-20h15 / Samedi 18h-19h30
          </Text>
        </View>
      </View>
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
  examples: {
    marginTop: 24,
    gap: 12,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
});
