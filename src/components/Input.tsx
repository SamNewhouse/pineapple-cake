import React, { useState } from "react";
import { Input as UIKittenInput, InputProps } from "@ui-kitten/components";

export interface CustomInputProps
  extends Omit<InputProps, "style" | "status" | "onFocus" | "onBlur"> {
  theme: { [key: string]: string };
  style?: any;
  status?: string;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

export const Input = React.forwardRef<any, CustomInputProps>(
  ({ theme, style, status = "primary", onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <UIKittenInput
        {...props}
        ref={ref}
        status={status}
        style={{
          marginBottom: 16,
          width: "80%",
          backgroundColor: theme["color-darkest"],
          borderRadius: 4,
          borderWidth: 1,
          fontSize: 18,
          borderColor: focused ? theme["color-primary"] : theme["color-dark"],
          ...(style || {}),
        }}
        placeholderTextColor={theme["color-text-inactive"]}
        textStyle={{
          color: theme["color-text"],
          fontSize: 16,
          paddingVertical: 5,
          paddingHorizontal: 0,
        }}
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
