import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import NeonButton from "../../components/ui/NeonButton";

export default function RegisterScreen() {
  const [name, setName] = useState("Nova User");
  const [email, setEmail] = useState("nova@example.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

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
              <Text className="text-slate-900 text-xl font-extrabold">
                Create account
              </Text>
              <Text className="text-slate-600 text-xs font-semibold mt-1">
                Start your shopping journey.
              </Text>
            </View>
          </View>

          <GlassCard className="p-4 mt-5">
            <Text className="text-slate-700 text-xs font-extrabold">Full name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor="#94A3B8"
              className="mt-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold"
            />

            <View className="mt-4">
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
            </View>

            <View className="mt-4">
              <Text className="text-slate-700 text-xs font-extrabold">Password</Text>
              <View className="mt-2 bg-white border border-slate-200 rounded-xl px-4 py-3 flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  className="flex-1 text-slate-900 font-semibold"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  className="h-8 w-8 rounded-lg bg-white border border-slate-200 items-center justify-center"
                  activeOpacity={0.9}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={16}
                    color="#111827"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </GlassCard>

          <NeonButton
            title="Create Account"
            onPress={() => router.replace("/(auth)/login" as any)}
            className="mt-4"
          />

          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-slate-600 text-sm font-semibold">
              Already have an account?
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity className="ml-2" activeOpacity={0.9}>
                <Text className="text-slate-900 text-sm font-extrabold">Sign in</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
