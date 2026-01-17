import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../../components/ui/Screen";
import GlassCard from "../../../components/ui/GlassCard";
import { NOTIFICATIONS } from "../../../lib/dummy";

export default function Notifications() {
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
            <Text className="text-white text-xl font-semibold">Notifications</Text>
            <View className="h-11 w-11" />
          </View>

          <View className="mt-4">
            {NOTIFICATIONS.map((n) => (
              <GlassCard key={n.id} className="p-4 mb-3">
                <View className="flex-row items-center">
                  <View className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center">
                    <Ionicons
                      name={n.type === "promo" ? "pricetag" : n.type === "order" ? "cube" : "information"}
                      size={18}
                      color="#A78BFA"
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold text-base">
                      {n.title}
                    </Text>
                    <Text className="text-slate-400 text-sm font-medium mt-1">
                      {n.body}
                    </Text>
                  </View>
                  <Text className="text-slate-500 text-xs font-semibold">
                    {n.time}
                  </Text>
                </View>
              </GlassCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
