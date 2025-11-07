import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import { colors, font, borderRadius, shadow, spacing } from "../../config/theme";
import { log, logError } from "../../lib/logging";

const baseToastStyle = {
  backgroundColor: colors.background,
  borderRadius: borderRadius.md,
  ...shadow,
};

const contentContainerStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
};

const text1Style = {
  fontSize: font.body,
  fontWeight: font.weightBold,
  letterSpacing: font.letterSpacing,
  fontFamily: font.family,
};

const text2Style = {
  fontSize: font.small,
  marginTop: spacing.xs,
  fontFamily: font.family,
};

export const toastConfig: ToastConfig = {
  success: (props) => {
    log("[TOAST.Success]", props.text1, props.text2);
    return (
      <BaseToast
        {...props}
        style={{
          ...baseToastStyle,
          borderLeftColor: colors.accent,
        }}
        contentContainerStyle={contentContainerStyle}
        text1Style={{
          ...text1Style,
          color: colors.text,
        }}
        text2Style={{
          ...text2Style,
          color: colors.accent,
        }}
      />
    );
  },
  error: (props) => {
    logError("[TOAST.Error]", props.text1, props.text2);
    return (
      <ErrorToast
        {...props}
        style={{
          ...baseToastStyle,
          borderLeftColor: colors.danger,
        }}
        contentContainerStyle={contentContainerStyle}
        text1Style={{
          ...text1Style,
          color: colors.danger,
        }}
        text2Style={{
          ...text2Style,
          color: colors.textMuted,
        }}
      />
    );
  },
  info: (props) => {
    log("[TOAST.Info]", props.text1, props.text2);
    return (
      <BaseToast
        {...props}
        style={{
          ...baseToastStyle,
          borderLeftColor: colors.info,
        }}
        contentContainerStyle={contentContainerStyle}
        text1Style={{
          ...text1Style,
          color: colors.text,
        }}
        text2Style={{
          ...text2Style,
          color: colors.info,
        }}
      />
    );
  },
};
