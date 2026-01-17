import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard, Button } from "../../components/ui";
import { useAuth } from "../../store/auth";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function ProfileOption({
  icon,
  title,
  subtitle,
  onPress,
  color = colors.primary[500],
  index,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
  index: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.delay(300 + index * 100).duration(600)}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        activeOpacity={0.7}
      >
        <GlassCard className="p-4" variant="glass">
          <View className="flex-row items-center">
            <View
              style={{ backgroundColor: `${color}15` }}
              className="h-12 w-12 rounded-2xl items-center justify-center"
            >
              <Ionicons name={icon} size={22} color={color} />
            </View>
            <View className="flex-1 ml-4 pr-4">
              <Text className="text-slate-900 font-black text-base">
                {title}
              </Text>
              <Text className="text-slate-400 font-semibold text-xs mt-1">
                {subtitle}
              </Text>
            </View>
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

export default function ProfileTab() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    logout();
  };

  const menuOptions = [
    {
      title: "My Orders",
      subtitle: "Track, return or buy things again",
      icon: "receipt-outline",
      color: "#6366F1",
      path: "/(tabs)/(stack)/orders",
    },
    {
      title: "Shipping Address",
      subtitle: "Manage your delivery locations",
      icon: "location-outline",
      color: "#F59E0B",
      path: "/(tabs)/(stack)/addresses",
    },
    {
      title: "Payment Methods",
      subtitle: "Saved cards and wallet preferences",
      icon: "card-outline",
      color: "#10B981",
      path: "/(tabs)/(stack)/payments",
    },
    {
      title: "Privacy Settings",
      subtitle: "Manage data and security",
      icon: "shield-checkmark-outline",
      color: "#EC4899",
      path: "/(tabs)/(stack)/settings",
    },
  ];

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text className="text-3xl font-black text-slate-900 tracking-tight">
            Profile
          </Text>
          <Text className="text-slate-500 font-semibold text-sm mt-1">
            Manage your account and settings
          </Text>
        </Animated.View>

        {/* User Card */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          className="mt-8"
        >
          <GlassCard className="p-5 overflow-hidden" variant="glass">
            <LinearGradient
              colors={[colors.primary[500], colors.primary[600]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-16 w-16 rounded-3xl bg-white/20 items-center justify-center border-2 border-white/30">
                  <Text className="text-white font-black text-2xl">
                    {user?.name?.[0] || "G"}
                  </Text>
                </View>
                <View className="ml-4">
                  <Text className="text-white font-black text-xl">
                    {user?.name || "Guest User"}
                  </Text>
                  <View className="flex-row items-center bg-white/20 self-start px-2 py-0.5 rounded-full mt-1">
                    <Ionicons name="ribbon" size={12} color="#FFF" />
                    <Text className="text-white font-bold text-[10px] ml-1 uppercase">
                      Gold Member
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(tabs)/(stack)/edit-profile" as any)
                }
                className="h-10 w-10 rounded-2xl bg-white/20 items-center justify-center"
              >
                <Ionicons name="settings-outline" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between mt-8 border-t border-white/20 pt-6">
              <View className="items-center flex-1">
                <Text className="text-white font-black text-lg">12</Text>
                <Text className="text-white/60 font-bold text-[10px] uppercase">
                  Orders
                </Text>
              </View>
              <View className="w-[1px] h-8 bg-white/20" />
              <View className="items-center flex-1">
                <Text className="text-white font-black text-lg">$2,400</Text>
                <Text className="text-white/60 font-bold text-[10px] uppercase">
                  Spent
                </Text>
              </View>
              <View className="w-[1px] h-8 bg-white/20" />
              <View className="items-center flex-1">
                <Text className="text-white font-black text-lg">450</Text>
                <Text className="text-white/60 font-bold text-[10px] uppercase">
                  Points
                </Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Menu Options */}
        <View className="mt-8">
          {menuOptions.map((opt, i) => (
            <ProfileOption
              key={opt.title}
              {...opt}
              icon={opt.icon as any}
              index={i}
              onPress={() => router.push(opt.path as any)}
            />
          ))}
        </View>

        {/* Help & Logout */}
        <Animated.View
          entering={FadeInDown.delay(700).duration(600)}
          className="mt-4"
        >
          <TouchableOpacity
            onPress={() => {}}
            className="flex-row items-center justify-center py-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4"
          >
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={colors.neutral[500]}
            />
            <Text className="ml-2 font-bold text-slate-500">
              Need help? Visit FAQ
            </Text>
          </TouchableOpacity>

          <Button
            title="Log Out"
            variant="ghost"
            onPress={handleLogout}
            style={{ borderColor: colors.error.main + "20" }}
            textStyle={{ color: colors.error.main }}
          />
        </Animated.View>

        {/* App Version */}
        <Text className="text-center text-slate-300 font-bold text-[10px] uppercase tracking-widest mt-12">
          Neo Store Version 1.0.4 • Beta
        </Text>
      </ScrollView>
    </AnimatedScreen>
  );
}
