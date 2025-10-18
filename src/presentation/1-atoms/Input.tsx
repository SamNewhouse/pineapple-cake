import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

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
            borderColor: focused ? "#444444" : "#1D1D1D",
          },
          style,
        ]}
        placeholderTextColor="#6f6f6f"
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
    marginBottom: 16,
    width: "80%",
    backgroundColor: "#171717",
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    color: "#EBEBED",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
