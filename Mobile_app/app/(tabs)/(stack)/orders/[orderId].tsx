import React, { useMemo } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Screen from "../../../../components/ui/Screen";
import GlassCard from "../../../../components/ui/GlassCard";
import { ORDERS } from "../../../../lib/dummy";

export default function OrderDetails() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = useMemo(
    () => ORDERS.find((o) => o.id === orderId) ?? ORDERS[0],
    [orderId]
  );

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={20} color="#E2E8F0" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold">Order</Text>
            <View className="h-11 w-11" />
          </View>

          <GlassCard className="p-4 mt-4">
            <Text className="text-white font-semibold text-base">#{order.id}</Text>
            <Text className="text-slate-400 text-sm font-medium mt-1">
              {order.createdAt} • {order.status}
            </Text>
            <View className="h-[1px] bg-white/10 my-3" />
            {order.items.map((it, idx) => (
              <View
                key={idx}
                className="flex-row items-center justify-between py-2"
              >
                <Text className="text-slate-200 font-semibold flex-1 pr-3">
                  {it.title} × {it.qty}
                </Text>
                <Text className="text-white font-semibold">
                  ${(it.price * it.qty).toFixed(2)}
                </Text>
              </View>
            ))}
            <View className="h-[1px] bg-white/10 my-3" />
            <View className="flex-row items-center justify-between">
              <Text className="text-slate-300 font-semibold">Total</Text>
              <Text className="text-white font-semibold">
                ${order.total.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push(
                  {
                    pathname: "/(tabs)/(stack)/orders/track",
                    params: { orderId: order.id },
                  } as any
                )
              }
              className="mt-4 flex-row items-center justify-center bg-white/10 rounded-2xl py-3"
            >
              <Ionicons name="navigate" size={16} color="#E2E8F0" />
              <Text className="text-white font-semibold ml-2">Track order</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </ScrollView>
    </Screen>
  );
}
