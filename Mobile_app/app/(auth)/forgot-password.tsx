import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import NeonButton from "../../components/ui/NeonButton";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("nova@example.com");

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 pt-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 items-center justify-center"
              activeOpacity={0.9}
            >
              <Ionicons name="chevron-back" size={18} color="#111827" />
            </TouchableOpacity>
            <View className="ml-3 flex-1">
              <Text className="text-slate-900 text-xl font-extrabold">Forgot password</Text>
              <Text className="text-slate-600 text-xs font-semibold mt-1">
                We’ll send a reset link to your email.
              </Text>
            </View>
          </View>

          <GlassCard className="p-4 mt-5">
            <Text className="text-slate-700 text-xs font-extrabold">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              className="mt-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold"
            />

            <View className="mt-3 flex-row items-start">
              <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
              <Text className="text-slate-600 text-xs font-semibold ml-2 flex-1">
                This is a demo flow right now. In backend integration, this will call your reset endpoint.
              </Text>
            </View>
          </GlassCard>

          <NeonButton
            title="Send Reset Link"
            onPress={() => router.replace("/(auth)/login" as any)}
            className="mt-4"
          />

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login" as any)}
            className="mt-6 items-center"
            activeOpacity={0.9}
          >
            <Text className="text-slate-900 text-sm font-extrabold">Back to Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}
