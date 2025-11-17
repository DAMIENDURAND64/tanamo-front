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

  retryButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  seasonScrollView: {
    marginBottom: 15,
  },

  seasonPickerContainer: {
    flexDirection: "row",
    gap: 8,
  },

  tabContainer: {
    flexDirection: "row",
    gap: 10,
  },

  performanceHeader: {
    padding: 20,
    paddingTop: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  seasonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },

  scrollView: {
    flex: 1,
  },

  emptyState: {
    padding: 40,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },

  activeTab: {
    backgroundColor: "#0066cc",
  },

  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },

  activeTabText: {
    color: "#fff",
  },

  seasonButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  activeSeasonButton: {
    backgroundColor: "#e8f4ff",
    borderColor: "#0066cc",
  },

  seasonButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  activeSeasonButtonText: {
    color: "#0066cc",
  },
});

export default styles;
