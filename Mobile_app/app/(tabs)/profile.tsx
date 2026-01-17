import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import NeonButton from "../../components/ui/NeonButton";
import { useAuth } from "../../store/auth";

export default function ProfileTab() {
  const { user, logout } = useAuth();

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 pt-4">
          <Text className="text-white text-2xl font-semibold">Profile</Text>
          <Text className="text-slate-400 text-sm font-medium mt-1">
            Manage your account.
          </Text>

          <GlassCard className="p-4 mt-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-12 w-12 rounded-2xl bg-[#7C3AED]/20 items-center justify-center">
                  <Ionicons name="person" size={20} color="#A78BFA" />
                </View>
                <View className="ml-3">
                  <Text className="text-white font-semibold text-base">
                    {user?.name ?? "Guest"}
                  </Text>
                  <Text className="text-slate-400 text-sm font-medium mt-1">
                    {user?.email ?? ""}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/(stack)/edit-profile" as any)}
                className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center"
              >
                <Ionicons name="pencil" size={18} color="#E2E8F0" />
              </TouchableOpacity>
            </View>
          </GlassCard>

          <View className="mt-4">
            {[
              {
                title: "Orders",
                icon: "receipt",
                onPress: () => router.push("/(tabs)/(stack)/orders" as any),
              },
              {
                title: "Notifications",
                icon: "notifications",
                onPress: () => router.push("/(tabs)/(stack)/notifications" as any),
              },
              {
                title: "Settings",
                icon: "settings",
                onPress: () => router.push("/(tabs)/(stack)/settings" as any),
              },
              {
                title: "Help",
                icon: "help-circle",
                onPress: () => router.push("/(tabs)/(stack)/help" as any),
              },
            ].map((it) => (
              <TouchableOpacity
                key={it.title}
                onPress={it.onPress}
                activeOpacity={0.9}
              >
                <GlassCard className="p-4 mb-3">
                  <View className="flex-row items-center">
                    <View className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center">
                      <Ionicons
                        name={it.icon as any}
                        size={18}
                        color="#E2E8F0"
                      />
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

          <NeonButton title="Log out" variant="ghost" onPress={() => logout()} />
        </View>
      </ScrollView>
    </Screen>
  );
}
