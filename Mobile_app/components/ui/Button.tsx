import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { colors, borderRadius, shadows, typography } from "../../lib/theme";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const variantStyles: Record<
  ButtonVariant,
  {
    gradient: [string, string];
    textColor: string;
    borderColor?: string;
    shadow: typeof shadows.md;
  }
> = {
  primary: {
    gradient: [colors.primary[500], colors.primary[600]],
    textColor: "#fff",
    shadow: shadows.glow(colors.primary[500]),
  },
  secondary: {
    gradient: [colors.accent[500], colors.accent[600]],
    textColor: "#fff",
    shadow: shadows.glow(colors.accent[500]),
  },
  ghost: {
    gradient: ["transparent", "transparent"],
    textColor: colors.neutral[700],
    borderColor: colors.neutral[300],
    shadow: shadows.sm,
  },
  danger: {
    gradient: [colors.error.main, colors.error.dark],
    textColor: "#fff",
    shadow: shadows.glow(colors.error.main),
  },
  success: {
    gradient: [colors.success.main, colors.success.dark],
    textColor: "#fff",
    shadow: shadows.glow(colors.success.main),
  },
};

const sizeStyles: Record<
  ButtonSize,
  {
    height: number;
    paddingHorizontal: number;
    fontSize: number;
    iconSize: number;
    borderRadius: number;
  }
> = {
  sm: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: typography.size.sm,
    iconSize: 16,
    borderRadius: borderRadius.lg,
  },
  md: {
    height: 52,
    paddingHorizontal: 24,
    fontSize: typography.size.base,
    iconSize: 20,
    borderRadius: borderRadius.xl,
  },
  lg: {
    height: 60,
    paddingHorizontal: 32,
    fontSize: typography.size.lg,
    iconSize: 22,
    borderRadius: borderRadius["2xl"],
  },
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  style,
  textStyle,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const variantConfig = variantStyles[variant];
  const sizeConfig = sizeStyles[size];

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    opacity.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    opacity.value = withTiming(1, { duration: 100 });
  };

  const handlePress = () => {
    if (disabled || loading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Micro-animation on press
    scale.value = withSequence(
      withSpring(0.95, { damping: 10, stiffness: 400 }),
      withSpring(1, { damping: 15, stiffness: 300 }),
    );

    onPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : opacity.value,
  }));

  const isGhost = variant === "ghost";
  const gradientColors = disabled
    ? [colors.neutral[300], colors.neutral[400]]
    : variantConfig.gradient;

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1}
      style={[animatedStyle, fullWidth && styles.fullWidth, style]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityLabel={title}
    >
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            height: sizeConfig.height,
            paddingHorizontal: sizeConfig.paddingHorizontal,
            borderRadius: sizeConfig.borderRadius,
            borderWidth: isGhost ? 1.5 : 0,
            borderColor: variantConfig.borderColor,
          },
          !disabled && variantConfig.shadow,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variantConfig.textColor} />
        ) : (
          <View style={styles.content}>
            {leftIcon && (
              <Ionicons
                name={leftIcon}
                size={sizeConfig.iconSize}
                color={variantConfig.textColor}
                style={styles.leftIcon}
              />
            )}
            <Text
              style={[
                styles.text,
                {
                  fontSize: sizeConfig.fontSize,
                  color: variantConfig.textColor,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {rightIcon && (
              <Ionicons
                name={rightIcon}
                size={sizeConfig.iconSize}
                color={variantConfig.textColor}
                style={styles.rightIcon}
              />
            )}
          </View>
        )}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
