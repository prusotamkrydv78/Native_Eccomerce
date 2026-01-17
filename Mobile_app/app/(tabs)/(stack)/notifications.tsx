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
import { NOTIFICATIONS } from "../../../lib/dummy";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function NotificationItem({ n, index }: { n: any; index: number }) {
  const getIconConfig = () => {
    switch (n.type) {
      case "promo":
        return { icon: "pricetag", color: "#F59E0B", bg: "#F59E0B15" };
      case "order":
        return { icon: "cube", color: "#6366F1", bg: "#6366F115" };
      case "alert":
        return {
          icon: "alert-circle",
          color: colors.error.main,
          bg: colors.error.main + "15",
        };
      default:
        return {
          icon: "notifications",
          color: colors.primary[500],
          bg: colors.primary[500] + "15",
        };
    }
  };

  const config = getIconConfig();

  return (
    <Animated.View
      entering={FadeInDown.delay(100 + index * 100).duration(600)}
      className="mb-3"
    >
      <TouchableOpacity activeOpacity={0.8}>
        <GlassCard className="p-4" variant="glass">
          <View className="flex-row items-start">
            <View
              style={{ backgroundColor: config.bg }}
              className="h-12 w-12 rounded-2xl items-center justify-center"
            >
              <Ionicons
                name={config.icon as any}
                size={22}
                color={config.color}
              />
            </View>
            <View className="ml-4 flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-slate-900 font-black text-base">
                  {n.title}
                </Text>
                <Text className="text-slate-400 font-bold text-[10px] uppercase">
                  {n.time}
                </Text>
              </View>
              <Text className="text-slate-500 font-semibold text-sm mt-1 leading-5">
                {n.body}
              </Text>
            </View>
          </View>
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Notifications() {
  return (
    <AnimatedScreen variant="gradient" showDecorations>
      {/* Header */}
      <View className="px-5 pt-6 pb-2">
        <View className="flex-row items-center justify-between">
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
                Notifications
              </Text>
              <Text className="text-slate-500 font-semibold text-sm">
                Stay updated with latest activities
              </Text>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <Text className="text-indigo-600 font-black text-xs uppercase">
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATIONS.length === 0 ? (
          <View className="items-center justify-center py-24">
            <View className="h-20 w-20 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Ionicons
                name="notifications-off-outline"
                size={32}
                color={colors.neutral[200]}
              />
            </View>
            <Text className="text-slate-900 font-black text-lg">
              All caught up!
            </Text>
            <Text className="text-slate-400 font-semibold text-center mt-2 px-10">
              You don't have any new notifications at the moment.
            </Text>
          </View>
        ) : (
          NOTIFICATIONS.map((n: any, i: number) => (
            <NotificationItem key={n.id} n={n} index={i} />
          ))
        )}
      </ScrollView>
    </AnimatedScreen>
  );
}
