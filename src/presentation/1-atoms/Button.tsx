import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

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
    backgroundColor: "#171717",
    borderColor: "#1D1D1D",
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "#EBEBED",
    textAlign: "center",
    fontSize: 16,
  },
});
