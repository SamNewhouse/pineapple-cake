export const colors = {
  background: "#1D1D1D",
  card: "#111111",
  text: "#EBEBED",
  textMuted: "#96949A",
  accent: "#9D8751",
  danger: "#DE5246",
  info: "#5BA1F2",
  white: "#fff",
  black: "#000",
  transparent: "transparent",
};

export const font = {
  h1: 28,
  h2: 24,
  h3: 20,
  body: 16,
  small: 13,
  weightRegular: "400" as const,
  weightBold: "bold" as const,
  letterSpacing: 0.2,
  family: "System",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  round: 999,
};

export const shadow = {
  color: colors.black,
  radius: 10,
  offset: { width: 0, height: 4 },
  elevation: 8,
};
