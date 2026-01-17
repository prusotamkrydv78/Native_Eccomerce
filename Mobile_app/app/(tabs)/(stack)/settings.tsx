import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard } from "../../../components/ui";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function SettingItem({ it, index }: { it: any; index: number }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(100 + index * 100).duration(600)}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          it.onPress();
        }}
        activeOpacity={0.8}
      >
        <GlassCard className="p-4" variant="glass">
          <View className="flex-row items-center">
            <View className="h-11 w-11 rounded-2xl bg-slate-100 items-center justify-center">
              <Ionicons
                name={it.icon as any}
                size={20}
                color={colors.neutral[800]}
              />
            </View>
            <Text className="text-slate-900 font-black text-base ml-4 flex-1">
              {it.title}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.neutral[300]}
            />
          </View>
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Settings() {
  const items = [
    {
      title: "Edit Profile",
      icon: "person-outline",
      onPress: () => router.push("/(tabs)/(stack)/edit-profile" as any),
    },
    {
      title: "Change Password",
      icon: "key-outline",
      onPress: () => router.push("/(tabs)/(stack)/change-password" as any),
    },
    {
      title: "Notification Settings",
      icon: "notifications-outline",
      onPress: () => {},
    },
    {
      title: "Privacy & Security",
      icon: "shield-checkmark-outline",
      onPress: () => {},
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => router.push("/(tabs)/(stack)/help" as any),
    },
  ];

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      {/* Header */}
      <View className="px-5 pt-6 pb-2">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 rounded-full bg-white items-center justify-center border border-slate-100 mr-4"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.neutral[900]}
            />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              Settings
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              Personalize your app experience
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4">
          {items.map((it, i) => (
            <SettingItem key={it.title} it={it} index={i} />
          ))}
        </View>

        <View className="mt-10 items-center">
          <Text className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">
            Neo Store App • v1.0.4
          </Text>
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
}
