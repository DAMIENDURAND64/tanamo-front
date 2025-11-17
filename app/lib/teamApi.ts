import supabase from "../lib/supabase";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_FFN_API_BASE_URL ?? "http://localhost:8000";

export type Performance = {
  nageur: string;
  temps: string;
  classement: string;
  competition: string;
  iuf: string;
  yearofbirth: string;
};

export type PerformancesByNage = {
  [nage: string]: {
    M: Performance[];
    F: Performance[];
  };
};

export type SeasonPerformances = {
  saison: string;
  club_id: string;
  performances_by_nage: PerformancesByNage;
};

/**
 * Récupère les performances d'un club pour une saison, groupées par nage et sexe
 */
export async function fetchSeasonPerformances(
  clubId: string,
  year: string
): Promise<SeasonPerformances> {
  const response = await fetch(
    `${API_BASE_URL}/clubs/${clubId}/saisons/${year}/performances`
  );
  if (!response.ok) {
    throw new Error("Impossible de récupérer les performances");
  }
  return (await response.json()) as SeasonPerformances;
}

/**
 * Récupère les rankings de natation estivale d'un club
 */
export async function fetchEstivalRankings(
  clubId: string,
  year: string,
  sex: "1" | "2" // 1 = Hommes, 2 = Dames
): Promise<SeasonPerformances> {
  const response = await fetch(
    `${API_BASE_URL}/clubs/${clubId}/saisons/${year}/estival/performances?sex=${sex}`
  );
  if (!response.ok) {
    throw new Error("Impossible de récupérer les rankings estivaux");
  }
  return (await response.json()) as SeasonPerformances;
}

export type ClubInfo = {
  club_id: string;
  name: string;
  address: string;
  email: string;
  instagram?: string;
  facebook?: string;
};

export async function fetchClubInfo(clubId: string): Promise<ClubInfo> {
  const { data, error } = await supabase
    .from("club_info")
    .select("*")
    .eq("club_id", clubId)
    .single();

  if (error) {
    throw new Error(
      `Impossible de récupérer les informations du club: ${error.message}`
    );
  }

  return data as ClubInfo;
}

// Export par défaut requis par React Navigation
export default {};
