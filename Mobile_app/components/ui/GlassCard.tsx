import React from "react";
import { View, StyleSheet, ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors, borderRadius, shadows } from "../../lib/theme";

type GlassCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  variant?: "glass" | "solid" | "elevated";
  intensity?: number;
  padding?: number;
  animated?: boolean;
  delay?: number;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export default function GlassCard({
  children,
  style,
  className,
  variant = "glass",
  intensity = 80,
  padding = 20,
  animated = true,
  delay = 0,
}: GlassCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const enteringAnimation = animated
    ? FadeInUp.duration(400).delay(delay).springify()
    : undefined;

  if (variant === "solid") {
    return (
      <AnimatedView
        entering={enteringAnimation}
        style={[styles.solidCard, { padding }, shadows.md, style]}
      >
        {children}
      </AnimatedView>
    );
  }

  if (variant === "elevated") {
    return (
      <AnimatedView
        entering={enteringAnimation}
        style={[styles.elevatedCard, { padding }, shadows.lg, style]}
      >
        {children}
      </AnimatedView>
    );
  }

  // Glass variant - True glassmorphism effect
  return (
    <AnimatedView
      entering={enteringAnimation}
      style={[styles.glassContainer, animatedStyle, style]}
    >
      {/* Blur background - works best on iOS */}
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={intensity}
          tint="light"
          style={[styles.blurView, { borderRadius: borderRadius.xl }]}
        >
          <View style={[styles.glassContent, { padding }]}>{children}</View>
        </BlurView>
      ) : (
        // Android fallback with semi-transparent background
        <View style={[styles.androidGlass, { padding }]}>{children}</View>
      )}

      {/* Subtle border overlay for glass effect */}
      <View style={styles.borderOverlay} pointerEvents="none" />
    </AnimatedView>
  );
}

// Additional preset cards
export function FeatureCard({
  children,
  icon,
  title,
  style,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  style?: ViewStyle;
}) {
  return (
    <GlassCard variant="elevated" style={style}>
      {icon && <View style={styles.featureIcon}>{icon}</View>}
      {children}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: borderRadius.xl,
    overflow: "hidden",
    ...shadows.md,
  },
  blurView: {
    overflow: "hidden",
  },
  glassContent: {
    backgroundColor: colors.glass.white,
  },
  androidGlass: {
    backgroundColor: colors.glass.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  borderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.whiteLight,
  },
  solidCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  elevatedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: borderRadius["2xl"],
    borderWidth: 0,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});
