import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import NageSection from "../nageSection/NageSection";
import Text from "../Text";
import styles from "./perfomanceTab.style";
import usePerfomanceTab from "./usePerfomanceTab.hook";

export default function PerformancesTab() {
  const {
    data,
    loading,
    error,
    refreshing,
    selectedSeason,
    setSelectedSeason,
    activeTab,
    setActiveTab,
    onRefresh,
    AVAILABLE_SEASONS,
  } = usePerfomanceTab();

  // Afficher le loader uniquement s'il n'y a pas encore de données
  if (loading && !refreshing && !data) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const sortedNages = Object.entries(data.performances_by_nage).sort((a, b) => {
    const totalA = a[1].M.length + a[1].F.length;
    const totalB = b[1].M.length + b[1].F.length;
    return totalB - totalA;
  });

  const filteredNages = sortedNages.filter(
    ([_, perfs]) => perfs[activeTab].length > 0
  );

  return (
    <>
      <View style={styles.performanceHeader}>
        <Text style={styles.seasonTitle}>
          Saison {data?.saison || selectedSeason}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.seasonScrollView}
          contentContainerStyle={styles.seasonPickerContainer}
        >
          {AVAILABLE_SEASONS.map((seasonYear: string) => (
            <TouchableOpacity
              key={seasonYear}
              style={[
                styles.seasonButton,
                selectedSeason === seasonYear && styles.activeSeasonButton,
              ]}
              onPress={() => setSelectedSeason(seasonYear)}
            >
              <Text
                style={
                  selectedSeason === seasonYear
                    ? styles.activeSeasonButtonText
                    : styles.seasonButtonText
                }
              >
                {seasonYear}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "M" && styles.activeTab]}
            onPress={() => setActiveTab("M")}
          >
            <Text
              style={activeTab === "M" ? styles.activeTabText : styles.tabText}
            >
              Hommes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "F" && styles.activeTab]}
            onPress={() => setActiveTab("F")}
          >
            <Text
              style={activeTab === "F" ? styles.activeTabText : styles.tabText}
            >
              Femmes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.loadingText}>Chargement des données...</Text>
          </View>
        )}

        {!loading && filteredNages.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Aucune performance trouvée pour cette catégorie
            </Text>
          </View>
        )}

        {!loading && filteredNages.length > 0 && (
          <>
            {filteredNages.map(([nage, perfs]) => (
              <NageSection
                key={nage}
                nage={nage}
                performances={perfs[activeTab]}
              />
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
}
