import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const STEPS = [
  { id: "1", title: "Order Placed", subtitle: "We received your order" },
  { id: "2", title: "Processing", subtitle: "Preparing items" },
  { id: "3", title: "Shipped", subtitle: "Handed over to courier" },
  { id: "4", title: "Out for Delivery", subtitle: "Courier is nearby" },
  { id: "5", title: "Delivered", subtitle: "Delivered successfully" },
];

export default function OrderTrackScreen() {
  const { orderId } = useLocalSearchParams();

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        <View className="px-4 py-2 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-12 w-12 bg-slate-100 rounded-xl items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="#171717" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-xl font-semibold">
            Track Order
          </Text>
          <View className="h-12 w-12" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-4 mt-2">
            <View className="bg-slate-50 rounded-xl p-4">
              <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                Order ID
              </Text>
              <Text className="text-slate-900 text-2xl font-semibold mt-2">
                {String(orderId || "-")}
              </Text>
              <Text className="text-slate-400 text-sm font-medium mt-1">
                Live tracking is a placeholder here.
              </Text>
            </View>

            <View className="mt-3">
              {STEPS.map((s, idx) => (
                <View key={s.id} className="flex-row">
                  <View className="items-center mr-3">
                    <View className="h-10 w-10 rounded-xl bg-emerald-100 items-center justify-center">
                      <Ionicons name="checkmark" size={18} color="#10b981" />
                    </View>
                    {idx !== STEPS.length - 1 && (
                      <View className="w-[2px] flex-1 bg-slate-200 my-2" />
                    )}
                  </View>
                  <View className="flex-1 pb-4">
                    <Text className="text-slate-900 font-semibold text-base">
                      {s.title}
                    </Text>
                    <Text className="text-slate-400 text-sm font-medium mt-1">
                      {s.subtitle}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
