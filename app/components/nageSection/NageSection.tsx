import { Performance } from "@/lib/teamApi";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "../Text";
import styles from "./nageSection.style";

export default function NageSection({
  nage,
  performances,
}: {
  nage: string;
  performances: Performance[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.nageSection}>
      <TouchableOpacity
        style={styles.nageTitleContainer}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.nageTitle}>
          {nage} ({performances.length})
        </Text>
        <Text style={styles.chevron}>{isExpanded ? "▼" : "▶"}</Text>
      </TouchableOpacity>
      {isExpanded &&
        performances.map((perf, index) => (
          <View
            key={`${perf.iuf}-${perf.temps}-${index}`}
            style={styles.perfRow}
          >
            <Text style={styles.rankNumber}>{index + 1}.</Text>
            <View style={styles.nageurInfo}>
              <Text style={styles.nageurName}>{perf.nageur}</Text>
              {perf.yearofbirth !== "na" && (
                <Text style={styles.yearOfBirth}>({perf.yearofbirth})</Text>
              )}
            </View>
            <Text style={styles.temps}>{perf.temps}</Text>
          </View>
        ))}
    </View>
  );
}
