import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import {
  AnimatedScreen,
  GlassCard,
  Button,
  Input,
} from "../../../components/ui";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ChangePasswordScreen() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    if (!currentPass || !newPass || !confirmPass) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }, 1500);
  };

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
              Security
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              Update your account password
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(800)} className="mt-6">
          <GlassCard className="p-6" variant="glass">
            <View className="items-center mb-8">
              <View className="h-16 w-16 bg-slate-50 rounded-3xl items-center justify-center mb-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={32}
                  color={colors.primary[500]}
                />
              </View>
              <Text className="text-slate-900 font-black text-center text-lg">
                Change Password
              </Text>
              <Text className="text-slate-400 font-semibold text-center text-sm mt-1 px-4">
                Your password must be at least 8 characters long and contain
                symbols.
              </Text>
            </View>

            <View className="gap-5">
              <Input
                label="Current Password"
                placeholder="••••••••"
                value={currentPass}
                onChangeText={setCurrentPass}
                secureTextEntry
                leftIcon="key-outline"
              />

              <View className="h-[1px] bg-slate-50 w-full my-2" />

              <Input
                label="New Password"
                placeholder="••••••••"
                value={newPass}
                onChangeText={setNewPass}
                secureTextEntry
                leftIcon="shield-outline"
              />

              <Input
                label="Confirm New Password"
                placeholder="••••••••"
                value={confirmPass}
                onChangeText={setConfirmPass}
                secureTextEntry
                leftIcon="shield-checkmark-outline"
              />
            </View>
          </GlassCard>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          className="mt-8"
        >
          <Button
            title="Update Password"
            variant="primary"
            onPress={handleUpdate}
            loading={loading}
            style={{ height: 60 }}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          className="mt-12 items-center"
        >
          <TouchableOpacity className="flex-row items-center bg-rose-50 px-6 py-3 rounded-2xl border border-rose-100">
            <Ionicons
              name="log-out-outline"
              size={18}
              color={colors.error.main}
            />
            <Text className="ml-2 text-rose-600 font-black text-sm">
              Sign out of all devices
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </AnimatedScreen>
  );
}
