import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../components";

export default function TextExamples() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="bold" color="primary">
          Les 3 variants de texte
        </Text>

        {/* Les 3 variants */}
        <View style={styles.group}>
          <Text variant="bold" color="secondary">
            📝 Variants disponibles :
          </Text>

          <View style={styles.example}>
            <Text variant="caption">Caption</Text>
            <Text variant="caption" color="muted">
              • Taille: 12px • Weight: 400 • Usage: labels, sous-titres discrets
            </Text>
          </View>

          <View style={styles.example}>
            <Text variant="normal">Normal</Text>
            <Text variant="caption" color="muted">
              • Taille: 16px • Weight: 400 • Usage: texte principal, paragraphes
            </Text>
          </View>

          <View style={styles.example}>
            <Text variant="bold">Bold</Text>
            <Text variant="caption" color="muted">
              • Taille: 18px • Weight: 700 • Usage: titres, éléments importants
            </Text>
          </View>
        </View>

        {/* Couleurs */}
        <View style={styles.group}>
          <Text variant="bold" color="secondary">
            🎨 Couleurs disponibles :
          </Text>

          <Text variant="normal" color="primary">
            Primary (Orange)
          </Text>
          <Text variant="normal" color="secondary">
            Secondary (Gris foncé)
          </Text>
          <Text variant="normal" color="muted">
            Muted (Gris clair)
          </Text>
          <Text variant="normal" color="success">
            Success (Vert)
          </Text>
          <Text variant="normal" color="warning">
            Warning (Orange/Jaune)
          </Text>
          <Text variant="normal" color="error">
            Error (Rouge)
          </Text>
          <Text variant="normal" color="#9333EA">
            Couleur personnalisée (violet)
          </Text>
        </View>

        {/* Exemples pratiques */}
        <View style={styles.group}>
          <Text variant="bold" color="secondary">
            🎯 Exemples d&apos;utilisation :
          </Text>

          <View style={styles.card}>
            <Text variant="bold" color="primary">
              Titre de section
            </Text>
            <Text variant="normal" color="secondary">
              Voici un paragraphe avec du texte normal qui explique quelque
              chose d&apos;important.
            </Text>
            <Text variant="caption" color="muted">
              Label ou information secondaire
            </Text>
          </View>

          <View style={styles.card}>
            <Text variant="bold" color="error">
              ⚠️ Message d&apos;erreur
            </Text>
            <Text variant="normal" color="black">
              Une erreur est survenue lors du traitement.
            </Text>
            <Text variant="caption" color="muted">
              Code erreur: E001
            </Text>
          </View>

          <View style={styles.card}>
            <Text variant="bold" color="success">
              ✅ Succès
            </Text>
            <Text variant="normal" color="black">
              L&apos;opération s&apos;est déroulée avec succès.
            </Text>
            <Text
              variant="caption"
              color="primary"
              onPress={() => console.log("Action cliquée !")}
            >
              Appuyer pour voir les détails
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
  },
  group: {
    marginTop: 24,
    gap: 8,
  },
  example: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    gap: 4,
  },
  card: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 8,
    marginTop: 8,
  },
});
