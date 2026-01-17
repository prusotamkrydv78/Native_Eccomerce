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

import { AnimatedScreen, GlassCard, Button } from "../../../components/ui";
import { ORDERS } from "../../../lib/dummy";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function OrderItem({ order, index }: { order: any; index: number }) {
  const getStatusColor = () => {
    switch (order.status.toLowerCase()) {
      case "delivered":
        return colors.success.main;
      case "processing":
        return colors.primary[500];
      case "shipped":
        return "#6366F1";
      default:
        return colors.neutral[500];
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(100 + index * 100).duration(600)}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push({
            pathname: "/(tabs)/(stack)/orders/[orderId]",
            params: { orderId: order.id },
          } as any);
        }}
        activeOpacity={0.9}
      >
        <GlassCard className="p-4" variant="glass">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center">
                <View className="h-8 w-8 rounded-lg bg-slate-100 items-center justify-center">
                  <Ionicons
                    name="receipt-outline"
                    size={16}
                    color={colors.neutral[800]}
                  />
                </View>
                <Text className="ml-3 text-slate-900 font-black text-base">
                  #{order.id}
                </Text>
              </View>
              <Text className="text-slate-400 font-semibold text-xs mt-2">
                {order.createdAt} • {order.items.length} product
                {order.items.length > 1 ? "s" : ""}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-slate-900 font-black text-lg">
                ${order.total.toFixed(2)}
              </Text>
              <View
                style={{ backgroundColor: getStatusColor() + "15" }}
                className="px-2 py-1 rounded-md mt-1"
              >
                <Text
                  style={{ color: getStatusColor() }}
                  className="text-[10px] font-black uppercase tracking-widest"
                >
                  {order.status}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-[1px] bg-slate-50 w-full my-4" />

          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                router.push({
                  pathname: "/(tabs)/(stack)/orders/track",
                  params: { orderId: order.id },
                } as any);
              }}
              className="flex-row items-center bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100"
            >
              <Ionicons
                name="navigate-outline"
                size={16}
                color={colors.neutral[600]}
              />
              <Text className="ml-2 text-slate-600 font-bold text-xs">
                Track Order
              </Text>
            </TouchableOpacity>

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

export default function Orders() {
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
              Order History
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              Track and manage your purchases
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {ORDERS.length === 0 ? (
          <View className="items-center justify-center py-24">
            <View className="h-20 w-20 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Ionicons
                name="receipt-outline"
                size={32}
                color={colors.neutral[200]}
              />
            </View>
            <Text className="text-slate-900 font-black text-lg">
              No Orders Yet
            </Text>
            <Text className="text-slate-400 font-semibold text-center mt-2 px-10">
              You haven't made any purchases yet. Start shopping to see your
              orders here.
            </Text>
          </View>
        ) : (
          ORDERS.map((o, i) => <OrderItem key={o.id} order={o} index={i} />)
        )}
      </ScrollView>
    </AnimatedScreen>
  );
}
