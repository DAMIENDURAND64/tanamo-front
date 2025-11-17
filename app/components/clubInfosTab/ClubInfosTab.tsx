import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../Text";
import Title from "../Title";
import styles from "./clubInfosTab.style";
import useClubInfosTab from "./useClubInfosTab.hook";

export default function ClubInfoTab() {
  const { clubInfo, loading, error } = useClubInfosTab();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff8c00" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  if (!clubInfo) {
    return null;
  }

  const openLink = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.clubInfoCard}>
        <Title style={styles.clubInfoTitle}>{clubInfo.name}</Title>

        {!!clubInfo.address && (
          <View style={styles.clubInfoItem}>
            <View style={styles.clubInfoLabelRow}>
              <Ionicons name="location" size={28} color="#ff8c00" />
              <Text style={styles.clubInfoValue}>{clubInfo.address}</Text>
            </View>
          </View>
        )}

        {!!clubInfo.email && (
          <TouchableOpacity
            style={styles.clubInfoItem}
            onPress={() => openLink(`mailto:${clubInfo.email}`)}
          >
            <View style={styles.clubInfoLabelRow}>
              <Ionicons name="at-circle" size={28} color="#ff8c00" />
              <Text style={styles.clubInfoValueLink}>Nous contacter</Text>
            </View>
          </TouchableOpacity>
        )}

        {clubInfo.instagram && (
          <TouchableOpacity
            style={styles.clubInfoItem}
            onPress={() => openLink(clubInfo.instagram)}
          >
            <View style={styles.clubInfoLabelRow}>
              <FontAwesome name="instagram" size={28} color="#E4405F" />
              <Text style={styles.clubInfoValueLink}>@team_tanamo</Text>
            </View>
          </TouchableOpacity>
        )}

        {clubInfo.facebook && (
          <TouchableOpacity
            style={styles.clubInfoItem}
            onPress={() => openLink(clubInfo.facebook)}
          >
            <View style={styles.clubInfoLabelRow}>
              <FontAwesome name="facebook-square" size={28} color="#1877F2" />
              <Text style={styles.clubInfoValueLink}>
                Tarentaise Natation Le Morel
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
