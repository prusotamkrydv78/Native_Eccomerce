import React, { useEffect } from "react";
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  FadeIn,
  SlideInUp,
} from "react-native-reanimated";
import { colors } from "../../lib/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type AnimatedScreenProps = {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "dark";
  showDecorations?: boolean;
  keyboardAvoiding?: boolean;
};

// Decorative floating orbs for premium feel
function FloatingOrbs() {
  const orb1Y = useSharedValue(0);
  const orb2Y = useSharedValue(0);
  const orb3Y = useSharedValue(0);

  useEffect(() => {
    orb1Y.value = withTiming(-20, {
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
    });
    orb2Y.value = withTiming(15, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    orb3Y.value = withTiming(-10, {
      duration: 3500,
      easing: Easing.inOut(Easing.ease),
    });

    // Loop animation
    const interval = setInterval(() => {
      orb1Y.value = withTiming(orb1Y.value === 0 ? -20 : 0, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      });
      orb2Y.value = withTiming(orb2Y.value === 0 ? 15 : 0, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      });
      orb3Y.value = withTiming(orb3Y.value === 0 ? -10 : 0, {
        duration: 3500,
        easing: Easing.inOut(Easing.ease),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const orb1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: orb1Y.value }],
  }));

  const orb2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: orb2Y.value }],
  }));

  const orb3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: orb3Y.value }],
  }));

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT * 0.5,
        overflow: "hidden",
      }}
      pointerEvents="none"
    >
      {/* Large orange orb - top right */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: -80,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: colors.primary[400],
            opacity: 0.15,
          },
          orb1Style,
        ]}
      />
      {/* Medium purple orb - top left */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 60,
            left: -40,
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.accent[400],
            opacity: 0.1,
          },
          orb2Style,
        ]}
      />
      {/* Small accent orb - center */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 180,
            right: 40,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary[300],
            opacity: 0.2,
          },
          orb3Style,
        ]}
      />
    </View>
  );
}

export default function AnimatedScreen({
  children,
  variant = "default",
  showDecorations = true,
  keyboardAvoiding = true,
}: AnimatedScreenProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withSpring(0, { damping: 20, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const backgroundColors: [string, string, ...string[]] =
    variant === "gradient"
      ? [colors.neutral[50], colors.primary[50]]
      : variant === "dark"
        ? [colors.neutral[900], colors.neutral[950]]
        : [colors.neutral[50], colors.neutral[100]];

  const statusBarStyle = variant === "dark" ? "light" : "dark";

  const content = (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      {children}
    </Animated.View>
  );

  return (
    <LinearGradient colors={backgroundColors} style={{ flex: 1 }}>
      <StatusBar barStyle={`${statusBarStyle}-content`} />
      <SafeAreaView style={{ flex: 1 }}>
        {showDecorations && variant !== "dark" && <FloatingOrbs />}
        {keyboardAvoiding ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

// Pre-built animation presets for children
export const screenAnimations = {
  fadeIn: FadeIn.duration(500),
  slideUp: SlideInUp.duration(400).springify(),
};
