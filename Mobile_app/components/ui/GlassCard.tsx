import React from "react";
import { View } from "react-native";

export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={
        "bg-white border border-slate-200 rounded-xl shadow-sm " + className
      }
    >
      {children}
    </View>
  );
}
