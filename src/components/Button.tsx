import React from "react";
import { Button as UIKittenButton, ButtonProps } from "@ui-kitten/components";

export interface CustomButtonProps extends Omit<ButtonProps, "style" | "status"> {
  theme: { [key: string]: string };
  status?: string;
  style?: any;
  children: React.ReactNode;
}

export const Button: React.FC<CustomButtonProps> = ({
  theme,
  status = "primary",
  style,
  children,
  ...props
}) => (
  <UIKittenButton
    {...props}
    status={status}
    style={{
      backgroundColor: theme["color-darkest"],
      borderColor: theme["color-dark"],
      paddingHorizontal: 24,
      paddingVertical: 16,
      marginVertical: 16,
      fontWeight: "bold",
      ...(style || {}),
    }}
    appearance="filled"
  >
    {children}
  </UIKittenButton>
);
