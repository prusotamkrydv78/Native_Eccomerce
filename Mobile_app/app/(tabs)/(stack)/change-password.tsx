import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../../components/ui/Screen";
import GlassCard from "../../../components/ui/GlassCard";
import NeonButton from "../../../components/ui/NeonButton";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

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
            <Text className="text-white text-xl font-semibold">Change Password</Text>
            <View className="h-11 w-11" />
          </View>

          <GlassCard className="p-4 mt-4">
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
              Current password
            </Text>
            <TextInput
              value={oldPass}
              onChangeText={setOldPass}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              className="text-white font-semibold text-base mt-2"
            />

            <View className="h-[1px] bg-white/10 my-4" />

            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
              New password
            </Text>
            <TextInput
              value={newPass}
              onChangeText={setNewPass}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              className="text-white font-semibold text-base mt-2"
            />
          </GlassCard>

          <NeonButton title="Update" onPress={() => router.back()} className="mt-4" />
        </View>
      </ScrollView>
    </Screen>
  );
}
