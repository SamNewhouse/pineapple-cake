import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface ContainerProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ style, children, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

Container.displayName = "Container";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 0,
    margin: 0,
  },
});
