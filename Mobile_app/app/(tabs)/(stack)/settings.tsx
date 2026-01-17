import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../../components/ui/Screen";
import GlassCard from "../../../components/ui/GlassCard";

export default function Settings() {
  const items = [
    {
      title: "Edit profile",
      icon: "person",
      onPress: () => router.push("/(tabs)/(stack)/edit-profile" as any),
    },
    {
      title: "Change password",
      icon: "key",
      onPress: () => router.push("/(tabs)/(stack)/change-password" as any),
    },
    {
      title: "Help",
      icon: "help-circle",
      onPress: () => router.push("/(tabs)/(stack)/help" as any),
    },
  ];

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
            <Text className="text-white text-xl font-semibold">Settings</Text>
            <View className="h-11 w-11" />
          </View>

          <View className="mt-4">
            {items.map((it) => (
              <TouchableOpacity key={it.title} onPress={it.onPress} activeOpacity={0.9}>
                <GlassCard className="p-4 mb-3">
                  <View className="flex-row items-center">
                    <View className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center">
                      <Ionicons name={it.icon as any} size={18} color="#E2E8F0" />
                    </View>
                    <Text className="text-white font-semibold text-base ml-3 flex-1">
                      {it.title}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
