import { useAuth } from "@/providers/AuthProvider";
import useGroupStore from "@/stores/groups/useGroupStore";
import useTrainingHoursStore from "@/stores/trainingHours/useTrainingHoursStore";
import { useEffect } from "react";

interface UseHomepageReturn {
  group: string;
  trainingsHours: { hour: string }[];
  loaders: {
    groupLoading: boolean;
    trainingsLoading: boolean;
  };
}

export default function useHomepage(): UseHomepageReturn {
  const { session } = useAuth();
  const { group, fetchGroupForUser, loading: groupLoading } = useGroupStore();
  const {
    trainingsHours,
    fetchTrainingHoursByUserGroup,
    loading: trainingsLoading,
  } = useTrainingHoursStore();

  useEffect(() => {
    if (session?.user.id) {
      fetchGroupForUser(session.user.id);
      fetchTrainingHoursByUserGroup(5);
    }
  }, [session?.user.id, fetchGroupForUser, fetchTrainingHoursByUserGroup]);

  return { group, trainingsHours, loaders: { groupLoading, trainingsLoading } };
}
