type TrainingHoursResponse = {
  weekday: number;
  start_time: string | null;
  end_time: string | null;
  valid_from?: string | null;
  valid_to?: string | null;
};

const WEEKDAY_LABELS: Record<number, string> = {
  1: "Lundi",
  2: "Mardi",
  3: "Mercredi",
  4: "Jeudi",
  5: "Vendredi",
  6: "Samedi",
  7: "Dimanche",
};

const normalizeTime = (time: string | null): string => {
  if (!time) return "?";
  const [hours = "0", minutes = "00"] = time.split(":");
  const trimmedMinutes = minutes === "00" ? "" : minutes;
  return `${Number(hours)}h${trimmedMinutes}`.trimEnd();
};

export default function trainingHoursBuilder(
  datas: TrainingHoursResponse[]
): { hour: string }[] {
  return datas.map((data) => {
    const dayLabel = WEEKDAY_LABELS[data.weekday] ?? `Jour ${data.weekday}`;
    const startLabel = normalizeTime(data.start_time);
    const endLabel = normalizeTime(data.end_time);
    return { hour: `${dayLabel} ${startLabel} - ${endLabel}` };
  });
}
