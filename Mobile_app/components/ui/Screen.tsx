import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SafeAreaView className={"flex-1 bg-[#F6F7F9] " + className}>
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}
