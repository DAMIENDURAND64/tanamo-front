import HoursTraining from "@/components/HoursTraining";
import InfoCard from "@/components/InfoCard";
import PerformanceList from "@/components/PerformanceList";
import ProfileTabs from "@/components/ProfileTabs";
import Title from "@/components/Title";
import supabase from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import fetchNageurPerformances, {
  NagePerformance,
} from "@/services/extranatApi";
import useTrainingHoursStore from "@/stores/trainingHours/useTrainingHoursStore";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfilTab() {
  const insets = useSafeAreaInsets();
  const { session, user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"infos" | "performances">("infos");
  const [iuf, setIuf] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [performances, setPerformances] = useState<NagePerformance[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [specialtySwim, setSpecialtySwim] = useState<string>("");
  const [antiSpecialtySwim, setAntiSpecialtySwim] = useState<string>("");

  const {
    trainingsHours,
    fetchTrainingHoursByUserGroup,
    loading: trainingsLoading,
  } = useTrainingHoursStore();

  useEffect(() => {
    if (!session) {
      setIuf(null);
      setFirstName("");
      setLastName("");
      setBirthDate("");
      setGroup("");
      setSpecialtySwim("");
      setAntiSpecialtySwim("");
      return;
    }

    let isMounted = true;

    // Récupérer les infos du profil avec le nom du groupe
    supabase
      .from("profiles_with_group")
      .select(
        "ffn_iuf, first_name, last_name, birth_date, group_name, group_id, specialty_swim, anti_specialty_swim"
      )
      .eq("id", session.user.id)
      .maybeSingle()
      .then(async ({ data, error: fetchError }) => {
        if (!isMounted) return;
        if (fetchError) {
          setIuf(null);
          setFirstName("");
          setLastName("");
          setBirthDate("");
          setGroup("");
          setSpecialtySwim("");
          setAntiSpecialtySwim("");
        } else {
          setIuf((data as any)?.ffn_iuf ?? null);
          setFirstName((data as any)?.first_name ?? "");
          setLastName((data as any)?.last_name ?? "");
          setBirthDate((data as any)?.birth_date ?? "");
          setGroup((data as any)?.group_name ?? "");
          setSpecialtySwim((data as any)?.specialty_swim ?? "");
          setAntiSpecialtySwim((data as any)?.anti_specialty_swim ?? "");

          // Récupérer les horaires du groupe si on a un group_id
          const gid = (data as any)?.group_id;
          if (gid) {
            fetchTrainingHoursByUserGroup(gid);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [session, fetchTrainingHoursByUserGroup]);

  useEffect(() => {
    if (!session || !iuf) {
      setPerformances([]);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchNageurPerformances(iuf)
      .then((nageur) => {
        if (!isMounted) return;

        setPerformances(nageur.nages);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Impossible de récupérer les performances.");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [session, iuf]);

  if (!session) return <Redirect href="/(auth)/login" />;

  const displayName = `${firstName} ${lastName}`;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Title>{displayName}</Title>
        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === "infos" && (
          <View style={styles.content}>
            <InfoCard title="Informations personnelles">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email :</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
              {birthDate && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date de naissance :</Text>
                  <Text style={styles.infoValue}>
                    {new Date(birthDate).toLocaleDateString("fr-FR")}
                  </Text>
                </View>
              )}
            </InfoCard>

            <InfoCard title="Informations FFN">
              {iuf && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Licence FFN :</Text>
                  <Text style={styles.infoValue}>{iuf}</Text>
                </View>
              )}
              {group && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Groupe :</Text>
                  <Text style={styles.infoValue}>{group}</Text>
                </View>
              )}
            </InfoCard>

            <InfoCard title="Nages">
              {specialtySwim && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Spé :</Text>
                  <Text style={styles.infoValue}>{specialtySwim}</Text>
                </View>
              )}
              {antiSpecialtySwim && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Anti-spé:</Text>
                  <Text style={styles.infoValue}>{antiSpecialtySwim}</Text>
                </View>
              )}
            </InfoCard>

            <HoursTraining
              isLoading={trainingsLoading}
              hours={trainingsHours}
            />
          </View>
        )}

        {activeTab === "performances" && (
          <View style={styles.content}>
            <PerformanceList
              items={performances}
              loading={loading}
              error={error}
            />
          </View>
        )}

        <Pressable onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
    paddingTop: 64,
  },
  content: {
    gap: 12,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },
  trainingHour: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 4,
  },
  notice: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
  },
  helper: {
    color: "#6b7280",
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});
