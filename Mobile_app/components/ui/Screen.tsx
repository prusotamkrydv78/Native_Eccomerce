import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../lib/theme";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
};

/**
 * Basic Screen wrapper with SafeAreaView
 * For premium animated screens, use AnimatedScreen instead
 */
export default function Screen({
  children,
  className = "",
  backgroundColor = colors.neutral[50],
  edges = ["top", "bottom"],
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={{ flex: 1, backgroundColor }}
      className={className}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
