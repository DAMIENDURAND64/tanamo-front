import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nageSection: {
    marginBottom: 20,
  },

  nageTitleContainer: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    flex: 1,
  },

  chevron: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },

  perfRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },

  rankNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    width: 35,
  },

  nageurInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  nageurName: {
    fontSize: 14,
    color: "#333",
  },

  yearOfBirth: {
    fontSize: 13,
    color: "#999",
  },

  temps: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0066cc",
    marginLeft: 10,
  },
});

export default styles;
