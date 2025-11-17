import { fetchEstivalRankings, SeasonPerformances } from "@/lib/teamApi";
import { useEffect, useState } from "react";
const CLUB_ID = "2447";
type TabType = "M" | "F";

interface UsePerfomanceTabParams {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

interface UsePerfomanceTabReturn {
  data: SeasonPerformances | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRefresh: () => Promise<void>;
}
export default function usePerfomanceTab({
  selectedSeason,
  onSeasonChange,
}: UsePerfomanceTabParams): UsePerfomanceTabReturn {
  const [data, setData] = useState<SeasonPerformances | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("F");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const sex = activeTab === "F" ? "2" : "1";
        const result = await fetchEstivalRankings(CLUB_ID, selectedSeason, sex);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab, selectedSeason]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const sex = activeTab === "F" ? "2" : "1";
      const result = await fetchEstivalRankings(CLUB_ID, selectedSeason, sex);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setRefreshing(false);
    }
  };
  return {
    data,
    loading,
    error,
    refreshing,
    activeTab,
    setActiveTab,
    onRefresh,
  };
}
