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
import { useCart } from "../../../store/cart";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PAYMENT_METHODS = [
  { id: "card", name: "Credit/Debit Card", icon: "card", color: "#6366F1" },
  { id: "apple", name: "Apple Pay", icon: "logo-apple", color: "#000000" },
  { id: "google", name: "Google Pay", icon: "logo-google", color: "#4285F4" },
  { id: "cod", name: "Cash on Delivery", icon: "cash", color: "#10B981" },
];

export default function Checkout() {
  const { subtotal, clear, items, itemCount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("home");

  const tax = subtotal * 0.1;
  const shipping = 15.0;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    clear();
    router.replace("/(tabs)/(stack)/orders" as any);
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
              Checkout
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              {itemCount} items ready to ship
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Shipping Address Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <Text className="text-slate-900 font-black text-lg mb-4">
            Shipping Address
          </Text>

          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
              setAddress("home");
            }}
            activeOpacity={0.9}
            className="mb-3"
          >
            <GlassCard
              className={`p-4 ${address === "home" ? "border-primary-500 bg-indigo-50/50" : ""}`}
              variant="glass"
            >
              <View className="flex-row items-center">
                <View
                  className={`h-10 w-10 rounded-xl items-center justify-center ${address === "home" ? "bg-indigo-600" : "bg-slate-100"}`}
                >
                  <Ionicons
                    name="home"
                    size={20}
                    color={address === "home" ? "#FFF" : colors.neutral[400]}
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-slate-900 font-black text-sm">
                    Home (Default)
                  </Text>
                  <Text className="text-slate-500 font-semibold text-xs mt-1">
                    4521 Neo Street, Cyber District, Kathmandu
                  </Text>
                </View>
                <View
                  className={`h-6 w-6 rounded-full border-2 items-center justify-center ${address === "home" ? "border-indigo-600 bg-indigo-600" : "border-slate-200"}`}
                >
                  {address === "home" && (
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  )}
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
              setAddress("office");
            }}
            activeOpacity={0.9}
          >
            <GlassCard
              className={`p-4 ${address === "office" ? "border-primary-500 bg-indigo-50/50" : ""}`}
              variant="glass"
            >
              <View className="flex-row items-center">
                <View
                  className={`h-10 w-10 rounded-xl items-center justify-center ${address === "office" ? "bg-indigo-600" : "bg-slate-100"}`}
                >
                  <Ionicons
                    name="business"
                    size={20}
                    color={address === "office" ? "#FFF" : colors.neutral[400]}
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-slate-900 font-black text-sm">
                    Work Office
                  </Text>
                  <Text className="text-slate-500 font-semibold text-xs mt-1">
                    Industrial Park Area, Block B, Kathmandu
                  </Text>
                </View>
                <View
                  className={`h-6 w-6 rounded-full border-2 items-center justify-center ${address === "office" ? "border-indigo-600 bg-indigo-600" : "border-slate-200"}`}
                >
                  {address === "office" && (
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  )}
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        </Animated.View>

        {/* Payment Method Section */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          className="mt-8"
        >
          <Text className="text-slate-900 font-black text-lg mb-4">
            Payment Method
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  setPaymentMethod(method.id);
                }}
                style={{ width: (SCREEN_WIDTH - 56) / 2 }}
                activeOpacity={0.9}
              >
                <GlassCard
                  className={`p-4 items-center ${paymentMethod === method.id ? "border-indigo-600 bg-indigo-50/50" : ""}`}
                  variant="glass"
                >
                  <Ionicons
                    name={method.icon as any}
                    size={28}
                    color={
                      paymentMethod === method.id
                        ? method.color
                        : colors.neutral[300]
                    }
                  />
                  <Text
                    className={`mt-2 font-black text-xs ${paymentMethod === method.id ? "text-slate-900" : "text-slate-400"}`}
                  >
                    {method.name}
                  </Text>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Price Summary Section */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(600)}
          className="mt-8"
        >
          <Text className="text-slate-900 font-black text-lg mb-4">
            Order Summary
          </Text>
          <GlassCard className="p-5" variant="glass">
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500 font-semibold">Subtotal</Text>
              <Text className="text-slate-900 font-black">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500 font-semibold">
                Shipping (Standard)
              </Text>
              <Text className="text-slate-900 font-black">
                ${shipping.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-slate-500 font-semibold">Tax (10%)</Text>
              <Text className="text-slate-900 font-black">
                ${tax.toFixed(2)}
              </Text>
            </View>
            <View className="h-[1px] bg-slate-50 w-full mb-4" />
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-900 font-black text-xl">
                Total Amount
              </Text>
              <Text className="text-indigo-600 font-black text-2xl">
                ${total.toFixed(2)}
              </Text>
            </View>
          </GlassCard>
        </Animated.View>
      </ScrollView>

      {/* Place Order Sticky Button */}
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
          style={styles.bottomGradient}
        />
        <View className="px-5 pb-8">
          <Button
            title="Place Your Order"
            variant="primary"
            onPress={handlePlaceOrder}
            style={{ height: 60 }}
            rightIcon="lock-closed-outline"
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
  bottomGradient: {
    height: 60,
  },
});
