import React, { useEffect } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard, Button } from "../../../../components/ui";
import {
  colors,
  shadows,
  borderRadius,
  typography,
} from "../../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TRACK_STEPS = [
  {
    id: 1,
    title: "Order Placed",
    time: "Oct 24, 09:15 AM",
    status: "done",
    icon: "receipt",
  },
  {
    id: 2,
    title: "Processing",
    time: "Oct 24, 11:30 AM",
    status: "done",
    icon: "sync",
  },
  {
    id: 3,
    title: "Packed & Ready",
    time: "Oct 25, 02:45 PM",
    status: "done",
    icon: "cube",
  },
  {
    id: 4,
    title: "On the Way",
    time: "Available soon",
    status: "active",
    icon: "bus",
  },
  {
    id: 5,
    title: "Delivered",
    time: "Estimated Oct 26",
    status: "pending",
    icon: "home",
  },
];

function PulseMarker() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      true,
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="items-center justify-center">
      <Animated.View
        style={[
          animatedStyle,
          {
            backgroundColor: colors.primary[500],
            width: 40,
            height: 40,
            borderRadius: 20,
            position: "absolute",
          },
        ]}
      />
      <View className="h-4 w-4 rounded-full bg-indigo-600 border-2 border-white" />
    </View>
  );
}

export default function OrderTrack() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

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
              Track Order
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              #{orderId || "ORD-9921"}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Visual Map/Preview Area */}
        <Animated.View entering={FadeInDown.duration(800)}>
          <GlassCard
            className="p-0 overflow-hidden"
            variant="glass"
            style={{ height: 220 }}
          >
            <LinearGradient
              colors={["#EEF2FF", "#E0E7FF"]}
              style={StyleSheet.absoluteFill}
            />
            {/* Dummy Map Illustration */}
            <View className="flex-1 items-center justify-center">
              <View className="w-full px-10">
                <View className="h-1 bg-indigo-100 rounded-full w-full relative">
                  <View className="absolute left-0 h-full bg-indigo-600 w-[70%] rounded-full" />
                  <View className="absolute left-0 -top-1.5">
                    <View className="h-4 w-4 bg-white border-2 border-slate-300 rounded-full" />
                  </View>
                  <View className="absolute left-[70%] -top-3">
                    <PulseMarker />
                  </View>
                  <View className="absolute right-0 -top-1.5">
                    <Ionicons
                      name="location"
                      size={20}
                      color={colors.neutral[300]}
                    />
                  </View>
                </View>
              </View>

              <View className="mt-10 items-center">
                <Text className="text-slate-400 font-black text-[10px] uppercase tracking-[2px]">
                  Estimated Arrival
                </Text>
                <Text className="text-indigo-600 font-black text-3xl mt-1">
                  Tomorrow, 4 PM
                </Text>
              </View>
            </View>

            <View className="p-4 bg-white/80 border-t border-slate-100 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-10 w-10 rounded-full bg-slate-100 items-center justify-center">
                  <Ionicons
                    name="person"
                    size={20}
                    color={colors.neutral[800]}
                  />
                </View>
                <View className="ml-3">
                  <Text className="text-slate-900 font-black text-xs">
                    Aravind Kumar
                  </Text>
                  <Text className="text-slate-400 font-bold text-[10px]">
                    Your Delivery Hero
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="h-10 w-10 bg-indigo-600 rounded-2xl items-center justify-center shadow-lg shadow-indigo-200">
                <Ionicons name="call" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Timeline Steps */}
        <View className="mt-8 px-2">
          {TRACK_STEPS.map((step, i) => (
            <Animated.View
              key={step.id}
              entering={FadeInDown.delay(300 + i * 100).duration(600)}
              className="flex-row items-start"
            >
              {/* Connector Line */}
              <View className="items-center mr-6">
                <View
                  style={{
                    backgroundColor:
                      step.status === "done"
                        ? colors.primary[500]
                        : colors.neutral[100],
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    zIndex: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={
                    step.status === "active" ? "border-2 border-indigo-200" : ""
                  }
                >
                  {step.status === "done" ? (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  ) : (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          step.status === "active"
                            ? colors.primary[500]
                            : colors.neutral[300],
                      }}
                    />
                  )}
                </View>
                {i !== TRACK_STEPS.length - 1 && (
                  <View
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: 50,
                      backgroundColor:
                        step.status === "done"
                          ? colors.primary[500]
                          : colors.neutral[100],
                    }}
                  />
                )}
              </View>

              {/* Content */}
              <View className="flex-1 pb-10">
                <View className="flex-row items-center">
                  <Ionicons
                    name={step.icon as any}
                    size={16}
                    color={
                      step.status === "done"
                        ? colors.primary[600]
                        : colors.neutral[400]
                    }
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 16,
                      fontWeight: step.status === "pending" ? "700" : "900",
                      color:
                        step.status === "pending"
                          ? colors.neutral[400]
                          : colors.neutral[900],
                    }}
                  >
                    {step.title}
                  </Text>
                </View>
                <Text className="text-slate-400 font-bold text-xs mt-1.5">
                  {step.time}
                </Text>

                {step.status === "active" && (
                  <Animated.View
                    entering={FadeIn.delay(800)}
                    className="mt-3 bg-indigo-50 p-3 rounded-2xl border border-indigo-100"
                  >
                    <Text className="text-indigo-600 font-bold text-[11px] leading-4">
                      Your package has left the sorting facility and is now in
                      transit to your city.
                    </Text>
                  </Animated.View>
                )}
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Footer Actions */}
        <Animated.View
          entering={FadeInDown.delay(900).duration(600)}
          className="mt-4"
        >
          <GlassCard
            className="p-4 flex-row items-center justify-between"
            variant="glass"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.primary[500]}
              />
              <Text className="ml-3 font-bold text-slate-700">
                Notify me on delivery
              </Text>
            </View>
            <TouchableOpacity className="h-6 w-10 bg-indigo-600 rounded-full items-center justify-center">
              <View className="h-4 w-4 bg-white rounded-full ml-auto mr-1" />
            </TouchableOpacity>
          </GlassCard>
        </Animated.View>
      </ScrollView>

      {/* Primary Action */}
      <View style={styles.bottomBar}>
        <View className="px-5 pb-8">
          <Button
            title="Update Delivery Preferences"
            variant="ghost"
            onPress={() => {}}
            style={{ backgroundColor: "#FFF" }}
          />
        </View>
      </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
