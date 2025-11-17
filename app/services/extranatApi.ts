const API_BASE_URL =
  process.env.EXPO_PUBLIC_FFN_API_BASE_URL ?? "http://localhost:8000";

export type NagePerformance = {
  name: string | null;
  temps: string | null;
  points: string | null;
  bassin: string | null;
  date: string | null;
  classement: string | null;
};

export type NageurPerformances = {
  name: string | null;
  nages: NagePerformance[];
};

export default async function fetchNageurPerformances(iuf: string) {
  const response = await fetch(
    `${API_BASE_URL}/nageurs/${iuf}?allPerformances=false`
  );
  if (!response.ok) {
    throw new Error("Impossible de récupérer les performances");
  }
  return (await response.json()) as NageurPerformances;
}
