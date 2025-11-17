import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },

  scrollView: {
    flex: 1,
  },

  clubInfoCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clubInfoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff8c00",
    marginBottom: 20,
    textAlign: "center",
  },

  clubInfoLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  clubInfoLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  clubInfoValue: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },

  clubInfoValueLink: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },

  clubInfoItem: {
    marginBottom: 20,
  },
});

export default styles;
