import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../../components/ui/Screen";
import GlassCard from "../../../components/ui/GlassCard";
import { ORDERS } from "../../../lib/dummy";

export default function Orders() {
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
            <Text className="text-white text-xl font-semibold">Orders</Text>
            <View className="h-11 w-11" />
          </View>

          <View className="mt-4">
            {ORDERS.map((o) => (
              <TouchableOpacity
                key={o.id}
                onPress={() =>
                  router.push(
                    {
                      pathname: "/(tabs)/(stack)/orders/[orderId]",
                      params: { orderId: o.id },
                    } as any
                  )
                }
                activeOpacity={0.9}
              >
                <GlassCard className="p-4 mb-3">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-white font-semibold text-base">
                        Order {o.id}
                      </Text>
                      <Text className="text-slate-400 text-sm font-medium mt-1">
                        {o.createdAt} • {o.items.length} item(s)
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-white font-semibold">
                        ${o.total.toFixed(2)}
                      </Text>
                      <Text className="text-[#22D3EE] text-xs font-semibold mt-1">
                        {o.status}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(
                        {
                          pathname: "/(tabs)/(stack)/orders/track",
                          params: { orderId: o.id },
                        } as any
                      );
                    }}
                    className="mt-3 flex-row items-center justify-center bg-white/10 rounded-2xl py-3"
                  >
                    <Ionicons name="navigate" size={16} color="#E2E8F0" />
                    <Text className="text-white font-semibold ml-2">Track</Text>
                  </TouchableOpacity>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
