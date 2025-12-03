import { fetchEstivalRankings, SeasonPerformances } from "@/lib/teamApi";
import { useEffect, useState } from "react";
const CLUB_ID = "2447";
type TabType = "M" | "F";

export const AVAILABLE_SEASONS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
];

interface UsePerfomanceTabReturn {
  data: SeasonPerformances | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRefresh: () => Promise<void>;
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  AVAILABLE_SEASONS: string[];
}
export default function usePerfomanceTab(): UsePerfomanceTabReturn {
  const [selectedSeason, setSelectedSeason] = useState(AVAILABLE_SEASONS[0]);
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
    AVAILABLE_SEASONS,
    selectedSeason,
    setSelectedSeason,
  };
}
