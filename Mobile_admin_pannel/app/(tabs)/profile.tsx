import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifications, setIsNotifications] = useState(true);

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-6 py-4 items-center">
          <Text className="text-slate-700 text-xl font-semibold">Settings</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* PROFILE SECTION */}
          <View className="items-center py-10">
            <View className="relative">
              <View className="h-32 w-32 rounded-full border-4 border-[#F83758]/10 p-1">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?u=alex_admin" }}
                  className="h-full w-full rounded-full"
                />
              </View>
              <TouchableOpacity className="absolute bottom-1 right-1 h-10 w-10 bg-[#F83758] rounded-full border-4 border-white items-center justify-center">
                <Ionicons name="pencil" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-slate-900 text-2xl font-semibold mt-4">
              Alex Johnson
            </Text>
            <Text className="text-slate-400 text-sm mt-1 font-medium">
              admin@stylish-app.com
            </Text>
          </View>

          {/* ACCOUNT SETTINGS CARD */}
          <View className="px-6 mb-8">
            <View className="bg-slate-50 rounded-[32px] overflow-hidden">
              <TouchableOpacity className="flex-row items-center px-6 py-5">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center">
                  <Ionicons name="person-outline" size={20} color="#64748b" />
                </View>
                <Text className="flex-1 ml-4 text-slate-700 font-semibold">
                  Edit Profile
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
              </TouchableOpacity>

              <View className="h-[1px] bg-white mx-6" />

              <TouchableOpacity className="flex-row items-center px-6 py-5">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#64748b"
                  />
                </View>
                <Text className="flex-1 ml-4 text-slate-700 font-semibold">
                  Change Password
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* APP SETTINGS SECTION */}
          <View className="px-10 mb-4">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              App Settings
            </Text>
          </View>

          <View className="px-6 mb-10">
            <View className="bg-slate-50 rounded-[32px] overflow-hidden">
              <View className="flex-row items-center px-6 py-5 border-b border-white/50">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center">
                  <Ionicons name="moon-outline" size={20} color="#64748b" />
                </View>
                <Text className="flex-1 ml-4 text-slate-700 font-semibold">
                  Dark Mode
                </Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: "#e2e8f0", true: "#F83758" }}
                  thumbColor="white"
                />
              </View>

              <View className="flex-row items-center px-6 py-5">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center">
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#64748b"
                  />
                </View>
                <Text className="flex-1 ml-4 text-slate-700 font-semibold">
                  Notifications
                </Text>
                <Switch
                  value={isNotifications}
                  onValueChange={setIsNotifications}
                  trackColor={{ false: "#e2e8f0", true: "#F83758" }}
                  thumbColor="white"
                />
              </View>
            </View>
          </View>

          {/* LOGOUT BUTTON */}
          <View className="px-6">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-rose-50 py-5 rounded-[24px]"
              onPress={() => router.replace("/(auth)/login")}
            >
              <Ionicons name="log-out-outline" size={22} color="#F83758" />
              <Text className="text-[#F83758] font-semibold ml-3 text-base">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
