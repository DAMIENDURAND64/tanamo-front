import React from "react";
import { Text as RNText, TextStyle } from "react-native";

// Tailles prédéfinies pour les titres
export type TitleSize =
  | "h1" // 32px - Titre principal
  | "h2" // 28px - Sous-titre principal
  | "h3" // 24px - Titre de section
  | "h4" // 20px - Sous-titre de section
  | "h5" // 18px - Petit titre
  | "h6" // 16px - Mini titre
  | number; // Taille personnalisée

// Weights disponibles (600-700)
export type TitleWeight =
  | "semibold" // 600
  | "bold" // 700 (maximum)
  | number; // Weight personnalisé (600-700)

// Couleurs (on réutilise les mêmes que Text)
export type TitleColor =
  | "primary" // Orange principal
  | "secondary" // Gris foncé
  | "muted" // Gris clair
  | "white" // Blanc
  | "black" // Noir
  | "success" // Vert
  | "warning" // Jaune
  | "error" // Rouge
  | string; // Couleur personnalisée

interface TitleProps {
  children: React.ReactNode;
  size?: TitleSize;
  weight?: TitleWeight;
  color?: TitleColor;
  textAlign?: "left" | "center" | "right" | "justify";
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

export default function Title({
  children,
  size = "h3",
  weight = "bold",
  color = "black",
  textAlign = "left",
  style,
  numberOfLines,
  onPress,
  ...props
}: TitleProps) {
  const getFontSize = (size: TitleSize): number => {
    if (typeof size === "number") return size;

    const sizeMap: Record<string, number> = {
      h1: 42,
      h2: 28,
      h3: 24,
      h4: 20,
      h5: 18,
      h6: 16,
    };

    return sizeMap[size] || 24;
  };

  // Mapping des couleurs
  const getColor = (color: TitleColor): string => {
    if (
      color.startsWith("#") ||
      color.startsWith("rgb") ||
      color.startsWith("hsl")
    ) {
      return color;
    }

    const colorMap: Record<string, string> = {
      primary: "#FF6B35", // Orange principal
      secondary: "#2D3748", // Gris foncé
      muted: "#718096", // Gris clair
      white: "#FFFFFF", // Blanc
      black: "#000000", // Noir
      success: "#48BB78", // Vert
      warning: "#ED8936", // Orange/Jaune
      error: "#F56565", // Rouge
    };

    return colorMap[color] || color;
  };

  // Mapping des weights (600-700)
  const getFontWeight = (weight: TitleWeight): TextStyle["fontWeight"] => {
    if (typeof weight === "number") {
      return Math.min(Math.max(weight, 600), 700) as TextStyle["fontWeight"];
    }

    const weightMap: Record<string, TextStyle["fontWeight"]> = {
      semibold: "600",
      bold: "700",
    };

    return weightMap[weight] || "600";
  };

  const titleStyle: TextStyle = {
    fontSize: getFontSize(size),
    color: getColor(color),
    fontWeight: getFontWeight(weight),
    fontFamily: "Quicksand",
    textAlign: textAlign,
    ...style,
  };

  return (
    <RNText
      style={titleStyle}
      numberOfLines={numberOfLines}
      onPress={onPress}
      {...props}
    >
      {children}
    </RNText>
  );
}
