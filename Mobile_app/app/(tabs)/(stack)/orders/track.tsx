import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Screen from "../../../../components/ui/Screen";
import GlassCard from "../../../../components/ui/GlassCard";

export default function OrderTrack() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const steps = [
    { title: "Processing", done: true },
    { title: "Packed", done: true },
    { title: "Shipped", done: true },
    { title: "Out for delivery", done: false },
    { title: "Delivered", done: false },
  ];

  return (
    <Screen>
      <View className="px-5 pt-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={20} color="#E2E8F0" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-semibold">Tracking</Text>
          <View className="h-11 w-11" />
        </View>

        <GlassCard className="p-4 mt-4">
          <Text className="text-white font-semibold text-base">
            Order {orderId}
          </Text>
          <Text className="text-slate-400 text-sm font-medium mt-1">
            Live tracking (dummy)
          </Text>

          <View className="mt-4">
            {steps.map((s) => (
              <View key={s.title} className="flex-row items-center mb-3">
                <View
                  className={
                    "h-9 w-9 rounded-2xl items-center justify-center border " +
                    (s.done
                      ? "bg-[#34D399]/15 border-[#34D399]/30"
                      : "bg-white/5 border-white/10")
                  }
                >
                  <Ionicons
                    name={s.done ? "checkmark" : "time"}
                    size={18}
                    color={s.done ? "#34D399" : "#94A3B8"}
                  />
                </View>
                <Text className="text-slate-200 font-semibold ml-3 flex-1">
                  {s.title}
                </Text>
                <Text className="text-slate-400 text-xs font-semibold">
                  {s.done ? "Done" : "Pending"}
                </Text>
              </View>
            ))}
          </View>
        </GlassCard>
      </View>
    </Screen>
  );
}
