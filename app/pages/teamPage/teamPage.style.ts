import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  mainTabContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  activeMainTab: {
    backgroundColor: "#ff8c00",
  },
  mainTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeMainTabText: {
    color: "#fff",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 15,
  },

  tabContainer: {
    flexDirection: "row",
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
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
  scrollView: {
    flex: 1,
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

  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default styles;
