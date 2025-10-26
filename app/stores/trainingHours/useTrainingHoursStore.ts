import supabase from "@/lib/supabase";
import trainingHoursBuilder from "@/services/builders/trainingHoursBuilder/trainingHoursBuilder";
import { create } from "zustand";

export type TrainingHours = {
  id: number;
  group_id: number;
  weekday: number;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  valid_from: string | null;
  valid_to: string | null;
};

type TrainingHoursState = {
  trainingsHours: { hour: string }[];
  loading: boolean;
  error: string | null;
  fetchTrainingHoursByUserGroup: (groupId: number) => Promise<void>;
  reset: () => void;
};

const INITIAL_STATE: Pick<
  TrainingHoursState,
  "trainingsHours" | "loading" | "error"
> = {
  trainingsHours: [],
  loading: false,
  error: null,
};

const useTrainingHoursStore = create<TrainingHoursState>((set) => ({
  ...INITIAL_STATE,
  async fetchTrainingHoursByUserGroup(groupId: number) {
    set({ loading: true, error: null });
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("training_recurring")
      .select("*")
      .eq("group_id", groupId)
      .or(`valid_to.is.null,valid_to.gte.${today}`);

    if (error) {
      set({ error: error.message, trainingsHours: [], loading: false });
      return;
    }

    set({
      trainingsHours: trainingHoursBuilder(data ?? []),
      loading: false,
      error: null,
    });
  },
  reset() {
    set({ ...INITIAL_STATE });
  },
}));

export default useTrainingHoursStore;
