import { StyleSheet } from "react-native";

const loginPageStyle = StyleSheet.create({
  page: {
    flex: 1,
  },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
  },

  headerTitle: {
    position: "absolute",
    top: 170,
    width: "100%",
    opacity: 1,
    display: "flex",
    alignItems: "center",
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },

  inputContainer: {
    borderRadius: 16,
    padding: 2,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgb(119, 118, 118)",
  },

  input: {
    backgroundColor: "transparent",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgb(119, 118, 118)",
    color: "#222",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    textAlign: "center",
  },

  diveSwimmerContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
});

export default loginPageStyle;
