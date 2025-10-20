import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Title } from "../components";

export default function TitleExamples() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Title size="h1" weight="bold" color="primary">
          Composant Title
        </Title>

        <View style={styles.info}>
          <Text variant="normal" color="secondary">
            Composant optimisé pour les titres avec :
          </Text>
          <Text variant="caption" color="muted">
            • Font Quicksand fixe (plus de choix nécessaire)
          </Text>
          <Text variant="caption" color="muted">
            • Weight entre 600-700 (semibold à bold uniquement)
          </Text>
          <Text variant="caption" color="muted">
            • Tailles sémantiques (h1 à h6) + tailles personnalisées
          </Text>
        </View>

        {/* Tailles */}
        <View style={styles.group}>
          <Title size="h3" weight="semibold" color="secondary">
            📏 Tailles disponibles :
          </Title>

          <View style={styles.example}>
            <Title size="h1">H1 - Titre principal (32px)</Title>
            <Text variant="caption" color="muted">
              size="h1"
            </Text>
          </View>

          <View style={styles.example}>
            <Title size="h2">H2 - Sous-titre principal (28px)</Title>
            <Text variant="caption" color="muted">
              size="h2"
            </Text>
          </View>

          <View style={styles.example}>
            <Title size="h3">H3 - Titre de section (24px)</Title>
            <Text variant="caption" color="muted">
              size="h3" - défaut
            </Text>
          </View>

          <View style={styles.example}>
            <Title size="h4">H4 - Sous-titre de section (20px)</Title>
            <Text variant="caption" color="muted">
              size="h4"
            </Text>
          </View>

          <View style={styles.example}>
            <Title size="h5">H5 - Petit titre (18px)</Title>
            <Text variant="caption" color="muted">
              size="h5"
            </Text>
          </View>

          <View style={styles.example}>
            <Title size="h6">H6 - Mini titre (16px)</Title>
            <Text variant="caption" color="muted">
              size="h6"
            </Text>
          </View>

          <View style={styles.example}>
            <Title size={26}>Taille personnalisée (26px)</Title>
            <Text variant="caption" color="muted">
              size={26}
            </Text>
          </View>
        </View>

        {/* Weights */}
        <View style={styles.group}>
          <Title size="h3" weight="semibold" color="secondary">
            💪 Weights disponibles (600-700) :
          </Title>

          <Title size="h4" weight="semibold">
            Semibold (600)
          </Title>
          <Title size="h4" weight="bold">
            Bold (700) - défaut
          </Title>
          <Title size="h4" weight={650}>
            Weight personnalisé (650)
          </Title>
          <Title size="h4" weight={500}>
            Weight 500 → devient 600 (minimum)
          </Title>
          <Title size="h4" weight={800}>
            Weight 800 → devient 700 (maximum)
          </Title>
        </View>

        {/* Couleurs */}
        <View style={styles.group}>
          <Title size="h3" weight="semibold" color="secondary">
            🎨 Couleurs disponibles :
          </Title>

          <Title size="h4" color="primary">
            Primary (Orange)
          </Title>
          <Title size="h4" color="secondary">
            Secondary (Gris foncé)
          </Title>
          <Title size="h4" color="muted">
            Muted (Gris clair)
          </Title>
          <Title size="h4" color="success">
            Success (Vert)
          </Title>
          <Title size="h4" color="warning">
            Warning (Orange/Jaune)
          </Title>
          <Title size="h4" color="error">
            Error (Rouge)
          </Title>
          <Title size="h4" color="#9333EA">
            Couleur personnalisée (Violet)
          </Title>
        </View>

        {/* Font fixe */}
        <View style={styles.group}>
          <Title size="h3" weight="semibold" color="secondary">
            📝 Font utilisée :
          </Title>

          <Title size="h4">Quicksand (font fixe pour tous les titres)</Title>
          <Text variant="caption" color="muted">
            Plus besoin de spécifier fontFamily, c'est automatique !
          </Text>
        </View>

        {/* Alignements */}
        <View style={styles.group}>
          <Title size="h3" weight="semibold" color="secondary">
            📐 Alignements :
          </Title>

          <Title size="h4" textAlign="left">
            Aligné à gauche
          </Title>
          <Title size="h4" textAlign="center">
            Aligné au centre
          </Title>
          <Title size="h4" textAlign="right">
            Aligné à droite
          </Title>
        </View>

        {/* Exemples pratiques */}
        <View style={styles.group}>
          <Title size="h3" weight="semibold" color="secondary">
            🎯 Exemples pratiques :
          </Title>

          <View style={styles.card}>
            <Title size="h2" weight="bold" color="primary">
              Page d'accueil
            </Title>
            <Title size="h4" weight="semibold" color="secondary">
              Bienvenue sur Tanamo
            </Title>
            <Text variant="normal" color="muted">
              Voici un exemple d'utilisation des titres dans une interface.
            </Text>
          </View>

          <View style={styles.card}>
            <Title size="h3" weight="semibold" color="error">
              ⚠️ Erreur critique
            </Title>
            <Text variant="normal">
              Un problème important nécessite votre attention.
            </Text>
          </View>

          <View style={styles.card}>
            <Title size="h1" weight="bold" color="primary" textAlign="center">
              TANAMO
            </Title>
            <Title size="h5" weight="semibold" color="muted" textAlign="center">
              Application de gestion d'équipe
            </Title>
          </View>

          <View style={styles.card}>
            <Title
              size="h4"
              weight="semibold"
              color="success"
              onPress={() => console.log("Titre cliqué !")}
            >
              Titre cliquable 👆
            </Title>
            <Text variant="caption" color="muted">
              Appuie sur le titre pour tester le onPress
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
    marginTop: 32,
    gap: 12,
  },
  example: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    gap: 4,
  },
  card: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
    gap: 4,
  },
});
