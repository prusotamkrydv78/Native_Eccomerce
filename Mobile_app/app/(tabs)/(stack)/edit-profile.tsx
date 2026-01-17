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
import { useAuth } from "../../../store/auth";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function EditProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Premium User");
  const [email, setEmail] = useState(user?.email || "user@example.com");

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
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
              Edit Profile
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              Update your personal information
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <Animated.View
          entering={FadeInDown.duration(800)}
          className="items-center py-8"
        >
          <TouchableOpacity className="relative">
            <View className="h-28 w-28 rounded-[40px] bg-white items-center justify-center shadow-lg border-4 border-white">
              <Text className="text-indigo-600 font-black text-4xl">
                {name[0]}
              </Text>
            </View>
            <View className="absolute bottom-0 right-0 h-10 w-10 bg-indigo-600 rounded-2xl items-center justify-center border-4 border-white shadow-md">
              <Ionicons name="camera" size={18} color="#FFF" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Form Section */}
        <View className="mt-4">
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              leftIcon="person-outline"
            />
          </Animated.View>

          <View className="h-4" />

          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Input
              label="Email address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              leftIcon="mail-outline"
              autoCapitalize="none"
            />
          </Animated.View>

          <View className="h-4" />

          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <Input
              label="Phone Number"
              value="+977 9812345678"
              editable={false}
              placeholder="Phone number"
              leftIcon="call-outline"
            />
          </Animated.View>
        </View>

        {/* Action Button */}
        <Animated.View
          entering={FadeInDown.delay(800).duration(600)}
          className="mt-12"
        >
          <Button
            title="Save Changes"
            variant="primary"
            onPress={handleSave}
            style={{ height: 60 }}
          />
        </Animated.View>
      </ScrollView>
    </AnimatedScreen>
  );
}
