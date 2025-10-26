import supabase from "@/lib/supabase";
import { create } from "zustand";

type GroupState = {
  group: string;
  loading: boolean;
  error: string | null;
  fetchGroupForUser: (userId: string) => Promise<void>;
  reset: () => void;
};

const INITIAL_STATE: Pick<GroupState, "group" | "loading" | "error"> = {
  group: "",
  loading: false,
  error: null,
};

const useGroupStore = create<GroupState>((set) => ({
  ...INITIAL_STATE,
  async fetchGroupForUser(userId: string) {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("profiles")
      .select("group:groups(name)")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      set({ error: error.message, group: "", loading: false });
      return;
    }

    const groupField = (data as any)?.group;
    const groupName = Array.isArray(groupField)
      ? groupField[0]?.name ?? ""
      : groupField?.name ?? "";

    set({ group: groupName, loading: false, error: null });
  },
  reset() {
    set({ ...INITIAL_STATE });
  },
}));

export default useGroupStore;
