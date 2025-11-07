import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { borderRadius, colors, font, spacing } from "../../config/theme";

export interface CustomInputProps extends Omit<TextInputProps, "style" | "onFocus" | "onBlur"> {
  style?: any;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

export const Input = React.forwardRef<any, CustomInputProps>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <TextInput
        {...props}
        ref={ref}
        style={[
          styles.input,
          {
            borderColor: focused ? colors.textMuted : colors.background,
          },
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    marginBottom: spacing.md,
    width: "80%",
    backgroundColor: colors.card,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    fontSize: font.body,
    color: colors.text,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
});
