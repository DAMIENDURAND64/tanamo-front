import React from "react";
import { Text as RNText, TextStyle } from "react-native";

// 3 variants simples
export type TextVariant = "caption" | "normal" | "bold";

// Couleurs disponibles
export type TextColor =
  | "primary" // Orange principal
  | "secondary" // Gris foncé
  | "muted" // Gris clair
  | "white" // Blanc
  | "black" // Noir
  | "success" // Vert
  | "warning" // Jaune
  | "error" // Rouge
  | string; // Couleur personnalisée (hex, rgb, etc.)

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  textAlign?: "left" | "center" | "right" | "justify";
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

export default function Text({
  children,
  variant = "normal",
  color = "black",
  textAlign = "left",
  style,
  numberOfLines,
  onPress,
  ...props
}: TextProps) {
  // Définition des 3 variants
  const getVariantStyle = (variant: TextVariant): TextStyle => {
    switch (variant) {
      case "caption":
        return {
          fontSize: 12,
          fontWeight: "400",
          color: "#718096",
          // fontFamily: "Inter",
        };
      case "bold":
        return {
          fontSize: 18,
          fontWeight: "700",
          color: "#000000",
          // fontFamily: "Inter",
        };
      default:
        return {
          fontSize: 16,
          fontWeight: "500",
          color: "#000000",
          // fontFamily: "Inter",
        };
    }
  };

  const getColor = (color: TextColor): string => {
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

  const variantStyle = getVariantStyle(variant);

  const textStyle: TextStyle = {
    ...variantStyle,
    color: getColor(color),
    textAlign: textAlign,
    ...style,
  };

  return (
    <RNText
      style={textStyle}
      numberOfLines={numberOfLines}
      onPress={onPress}
      {...props}
    >
      {children}
    </RNText>
  );
}
