import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

export default function NeonButton({
  title,
  onPress,
  variant = "primary",
  className = "",
  style,
}: {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
  style?: ViewStyle;
}) {
  const base = "rounded-xl py-3 items-center justify-center";

  const v =
    variant === "primary"
      ? "bg-[#FF9900]"
      : variant === "danger"
        ? "bg-[#DC2626]"
        : "bg-white border border-slate-200";

  const text =
    variant === "ghost" ? "text-slate-900" : "text-[#111827]";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={style}
      className={base + " " + v + " " + className}
    >
      <Text className={text + " font-extrabold text-sm"}>{title}</Text>
    </TouchableOpacity>
  );
}
