import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { borderRadius, colors, font, spacing } from "../../config/theme";

export interface CustomButtonProps {
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
}

export const Button: React.FC<CustomButtonProps> = ({ style, children, onPress, ...props }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...props} activeOpacity={0.8}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.card,
    borderColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
  },
  text: {
    fontWeight: font.weightBold,
    color: colors.text,
    textAlign: "center",
    fontSize: font.body,
  },
});
