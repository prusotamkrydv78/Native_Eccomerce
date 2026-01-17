import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import NeonButton from "../../components/ui/NeonButton";
import { useAuth } from "../../store/auth";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("nova@example.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 pt-6">
          <View className="items-center">
            <View className="h-14 w-14 rounded-2xl bg-[#FF9900] items-center justify-center">
              <Ionicons name="bag-handle" size={22} color="#111827" />
            </View>
            <Text className="text-slate-900 text-2xl font-extrabold mt-4">
              Sign in
            </Text>
            <Text className="text-slate-600 text-sm font-semibold mt-2 text-center">
              Welcome back. Continue shopping with a clean, fast checkout.
            </Text>
          </View>

          <GlassCard className="p-4 mt-6">
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

            <View className="items-end mt-3">
              <Link href={"/(auth)/forgot-password" as any} asChild>
                <TouchableOpacity activeOpacity={0.9}>
                  <Text className="text-slate-900 font-extrabold text-xs">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </GlassCard>

          <NeonButton title="Sign In" onPress={() => login(email, password)} className="mt-4" />

          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-slate-600 text-sm font-semibold">
              New here?
            </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity className="ml-2" activeOpacity={0.9}>
                <Text className="text-slate-900 text-sm font-extrabold">
                  Create account
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
