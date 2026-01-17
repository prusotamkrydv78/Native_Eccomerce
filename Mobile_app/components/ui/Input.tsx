import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { colors, borderRadius, shadows, typography } from "../../lib/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  variant?: "default" | "filled";
};

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword = false,
  variant = "default",
  value,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Animation values
  const focusAnim = useSharedValue(0);
  const errorAnim = useSharedValue(0);
  const labelAnim = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    focusAnim.value = withSpring(isFocused ? 1 : 0, {
      damping: 20,
      stiffness: 200,
    });
  }, [isFocused]);

  useEffect(() => {
    if (error) {
      errorAnim.value = 0;
      errorAnim.value = withSpring(1, { damping: 12, stiffness: 200 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      errorAnim.value = withTiming(0);
    }
  }, [error]);

  useEffect(() => {
    labelAnim.value = withTiming(value || isFocused ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [value, isFocused]);

  const containerStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? colors.error.main
      : interpolateColor(
          focusAnim.value,
          [0, 1],
          [colors.neutral[200], colors.primary[500]],
        );

    const backgroundColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      [colors.neutral[50], "rgba(249, 115, 22, 0.05)"],
    );

    return {
      borderColor,
      backgroundColor: variant === "filled" ? backgroundColor : "#fff",
      transform: [
        {
          scale: withSpring(error ? 1 : 1, { damping: 15 }),
        },
      ],
    };
  });

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(labelAnim.value > 0.5 ? -8 : 0) },
      { scale: withTiming(labelAnim.value > 0.5 ? 0.85 : 1) },
    ],
    color: interpolateColor(
      focusAnim.value,
      [0, 1],
      [colors.neutral[500], colors.primary[600]],
    ),
  }));

  const errorStyle = useAnimatedStyle(() => ({
    opacity: errorAnim.value,
    transform: [{ translateY: withSpring(errorAnim.value === 1 ? 0 : -10) }],
  }));

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Haptics.selectionAsync();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const effectiveRightIcon = isPassword
    ? showPassword
      ? "eye-off-outline"
      : "eye-outline"
    : rightIcon;

  const effectiveOnRightIconPress = isPassword
    ? togglePassword
    : onRightIconPress;

  return (
    <View style={styles.wrapper}>
      {/* Floating Label */}
      {label && (
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            error && { color: colors.error.main },
          ]}
        >
          {label}
        </Animated.Text>
      )}

      {/* Input Container */}
      <AnimatedView style={[styles.container, containerStyle, shadows.sm]}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={styles.iconContainer}>
            <Ionicons
              name={leftIcon}
              size={20}
              color={isFocused ? colors.primary[500] : colors.neutral[400]}
            />
          </View>
        )}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={colors.neutral[400]}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (effectiveRightIcon || isPassword) && styles.inputWithRightIcon,
          ]}
          {...props}
        />

        {/* Right Icon / Password Toggle */}
        {(effectiveRightIcon || isPassword) && (
          <TouchableOpacity
            onPress={effectiveOnRightIconPress}
            style={styles.rightIconButton}
            activeOpacity={0.7}
            accessibilityLabel={
              isPassword ? "Toggle password visibility" : undefined
            }
          >
            <Ionicons
              name={effectiveRightIcon as keyof typeof Ionicons.glyphMap}
              size={20}
              color={isFocused ? colors.primary[500] : colors.neutral[400]}
            />
          </TouchableOpacity>
        )}

        {/* Focus indicator line */}
        <Animated.View
          style={[
            styles.focusLine,
            useAnimatedStyle(() => ({
              transform: [{ scaleX: focusAnim.value }],
              backgroundColor: error ? colors.error.main : colors.primary[500],
            })),
          ]}
        />
      </AnimatedView>

      {/* Error Message */}
      {error && (
        <Animated.View style={[styles.errorContainer, errorStyle]}>
          <Ionicons name="alert-circle" size={14} color={colors.error.main} />
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}

      {/* Hint Text */}
      {hint && !error && <Text style={styles.hintText}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: typography.size.xs,
    fontWeight: "600",
    color: colors.neutral[600],
    marginBottom: 8,
    marginLeft: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.xl,
    paddingHorizontal: 16,
    minHeight: 56,
    overflow: "hidden",
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: typography.size.base,
    color: colors.neutral[900],
    fontWeight: "500",
    paddingVertical: 16,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  rightIconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: borderRadius.md,
  },
  focusLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    fontSize: typography.size.xs,
    color: colors.error.main,
    marginLeft: 4,
    fontWeight: "500",
  },
  hintText: {
    fontSize: typography.size.xs,
    color: colors.neutral[500],
    marginTop: 6,
    marginLeft: 4,
  },
});
