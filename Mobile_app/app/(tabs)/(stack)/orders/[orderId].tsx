import React, { useMemo } from "react";
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
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInRight,
  Layout,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard, Button } from "../../../../components/ui";
import { ORDERS, PRODUCTS } from "../../../../lib/dummy";
import {
  colors,
  shadows,
  borderRadius,
  typography,
} from "../../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function StatusBadge({ status }: { status: string }) {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case "delivered":
        return {
          color: colors.success.main,
          bg: colors.success.main + "15",
          icon: "checkmark-circle",
        };
      case "processing":
        return {
          color: colors.primary[500],
          bg: colors.primary[500] + "15",
          icon: "sync",
        };
      case "shipped":
        return { color: "#6366F1", bg: "#6366F115", icon: "bus" };
      default:
        return {
          color: colors.neutral[500],
          bg: colors.neutral[100],
          icon: "time",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
      <Ionicons name={config.icon as any} size={14} color={config.color} />
      <Text style={[styles.statusText, { color: config.color }]}>{status}</Text>
    </View>
  );
}

export default function OrderDetails() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = useMemo(
    () => ORDERS.find((o: any) => o.id === orderId) ?? ORDERS[0],
    [orderId],
  );

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
              Order Details
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              #{order.id}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <Animated.View entering={FadeInDown.duration(600)}>
          <GlassCard className="p-5" variant="glass">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  Order Status
                </Text>
                <View className="mt-2">
                  <StatusBadge status={order.status} />
                </View>
              </View>
              <View className="items-end">
                <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  Ordered On
                </Text>
                <Text className="text-slate-900 font-black text-sm mt-1">
                  {order.createdAt}
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-slate-50 w-full mt-6 mb-4" />

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/(stack)/orders/track",
                  params: { orderId: order.id },
                } as any)
              }
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="map-outline"
                  size={20}
                  color={colors.primary[500]}
                />
                <Text className="ml-3 font-bold text-slate-700">
                  Track Shipment
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.neutral[300]}
              />
            </TouchableOpacity>
          </GlassCard>
        </Animated.View>

        {/* Items List */}
        <View className="mt-8">
          <Text className="text-slate-900 font-black text-lg mb-4">
            Items Summary
          </Text>
          {order.items.map((item: any, i: number) => {
            // Try to find image from PRODUCTS
            const productInfo = PRODUCTS.find(
              (p) => p.id === item.productId || p.title === item.title,
            );
            return (
              <Animated.View
                key={i}
                entering={FadeInDown.delay(200 + i * 100).duration(600)}
                className="mb-3"
              >
                <GlassCard className="p-3" variant="glass">
                  <View className="flex-row">
                    <View className="h-16 w-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                      <Image
                        source={{
                          uri:
                            productInfo?.image ||
                            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                        }}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="cover"
                      />
                    </View>
                    <View className="flex-1 ml-4 justify-center">
                      <Text
                        numberOfLines={1}
                        className="text-slate-900 font-black text-sm"
                      >
                        {item.title}
                      </Text>
                      <Text className="text-slate-400 font-bold text-[10px] uppercase mt-1">
                        {item.qty} unit{item.qty > 1 ? "s" : ""} • $
                        {item.price.toFixed(2)}
                      </Text>
                    </View>
                    <View className="justify-center items-end">
                      <Text className="text-slate-900 font-black text-sm">
                        ${(item.price * item.qty).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </GlassCard>
              </Animated.View>
            );
          })}
        </View>

        {/* Shipping Info */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.section}
        >
          <Text className="text-slate-900 font-black text-lg mb-4">
            Shipping Address
          </Text>
          <GlassCard className="p-5" variant="glass">
            <View className="flex-row">
              <View className="h-10 w-10 bg-indigo-50 rounded-xl items-center justify-center">
                <Ionicons
                  name="location"
                  size={20}
                  color={colors.primary[500]}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-slate-900 font-black text-sm">
                  Home Office
                </Text>
                <Text className="text-slate-500 font-semibold text-xs mt-1 leading-5">
                  4521 Neo Street, Cyber District{"\n"}Kathmandu, Bagmati, 44600
                </Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Price Breakdown */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.section}
        >
          <GlassCard className="p-5" variant="glass">
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500 font-semibold">Subtotal</Text>
              <Text className="text-slate-900 font-black">
                ${(order.total * 0.9).toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500 font-semibold">Shipping Fee</Text>
              <Text className="text-slate-900 font-black">$15.00</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-slate-500 font-semibold">Tax (10%)</Text>
              <Text className="text-slate-900 font-black">
                ${(order.total * 0.1).toFixed(2)}
              </Text>
            </View>
            <View className="h-[1px] bg-slate-50 w-full mb-4" />
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-900 font-black text-lg">
                Total Paid
              </Text>
              <Text className="text-indigo-600 font-black text-xl">
                ${order.total.toFixed(2)}
              </Text>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Actions */}
        <Animated.View
          entering={FadeInDown.delay(700).duration(600)}
          className="mt-8 flex-row gap-4"
        >
          <Button
            title="Invoice"
            variant="ghost"
            onPress={() => {}}
            style={{ flex: 1 }}
            leftIcon="document-text-outline"
          />
          <Button
            title="Help Center"
            variant="ghost"
            onPress={() => router.push("/(tabs)/(stack)/help" as any)}
            style={{ flex: 1, borderColor: colors.neutral[200] }}
            leftIcon="help-circle-outline"
          />
        </Animated.View>
      </ScrollView>

      {/* Reorder Sticky Button (Dummy) */}
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
          style={styles.bottomGradient}
        />
        <View className="px-5 pb-8">
          <Button
            title="Buy These Items Again"
            variant="primary"
            onPress={() =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              )
            }
            style={{ height: 56 }}
            leftIcon="refresh-outline"
          />
        </View>
      </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 32,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  bottomGradient: {
    height: 40,
  },
});
