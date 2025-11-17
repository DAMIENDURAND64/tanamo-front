import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    gap: 16,
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

export default styles;
