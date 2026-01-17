import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { colors, borderRadius, shadows, typography } from "../../lib/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products...",
  onClear,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  onClear?: () => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      [colors.neutral[200], colors.primary[500]],
    );

    const backgroundColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      ["#FFFFFF", colors.neutral[50]],
    );

    return {
      borderColor,
      backgroundColor,
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withSpring(1, { damping: 15, stiffness: 200 });
    Haptics.selectionAsync();
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withSpring(0, { damping: 15, stiffness: 200 });
  };

  return (
    <AnimatedView style={[styles.container, containerStyle, shadows.sm]}>
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? colors.primary[500] : colors.neutral[400]}
        style={styles.searchIcon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral[400]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        selectionColor={colors.primary[500]}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onChangeText("");
            onClear?.();
          }}
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle" size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
      )}

      {/* Focus indicator line */}
      <Animated.View
        style={[
          styles.focusLine,
          useAnimatedStyle(() => ({
            transform: [{ scaleX: focusAnim.value }],
          })),
        ]}
      />
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.neutral[900],
    fontWeight: "600",
    paddingVertical: Platform.OS === "ios" ? 0 : 8,
  },
  clearButton: {
    padding: 4,
  },
  focusLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary[500],
    borderRadius: 1,
  },
});
