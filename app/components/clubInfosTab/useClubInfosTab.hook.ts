import { ClubInfo, fetchClubInfo } from "@/lib/teamApi";
import { useEffect, useState } from "react";

interface UseClubInfosTabReturn {
  clubInfo: ClubInfo | null;
  loading: boolean;
  error: string | null;
}

export default function useClubInfosTab(): UseClubInfosTabReturn {
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const CLUB_ID = "2447";

  useEffect(() => {
    const loadClubInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const info = await fetchClubInfo(CLUB_ID);
        setClubInfo(info);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des informations du club."
        );
      } finally {
        setLoading(false);
      }
    };

    loadClubInfo();
  }, []);
  return {
    clubInfo,
    loading,
    error,
  };
}
