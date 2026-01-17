import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  Layout,
  SlideInRight,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard, Button } from "../../components/ui";
import { useCart } from "../../store/cart";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function CartItem({
  item,
  onUpdateQty,
  onRemove,
  index,
}: {
  item: any;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      layout={Layout.springify()}
      className="mb-4"
    >
      <GlassCard className="p-3" variant="glass">
        <View className="flex-row">
          {/* Image Container */}
          <View className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
            <Image
              source={{ uri: item.image }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>

          {/* Details Container */}
          <View className="flex-1 ml-4 justify-between py-1">
            <View className="flex-row justify-between items-start">
              <View className="flex-1 pr-2">
                <Text
                  numberOfLines={1}
                  className="text-slate-900 font-black text-base"
                >
                  {item.title}
                </Text>
                <Text className="text-slate-400 font-bold text-xs uppercase mt-1">
                  Qty: {item.qty} • ${item.price.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  onRemove();
                }}
                className="p-1"
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={colors.error.main}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-indigo-600 font-black text-lg">
                ${(item.price * item.qty).toFixed(2)}
              </Text>

              <View className="flex-row items-center bg-slate-50 rounded-xl px-1 border border-slate-100">
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onUpdateQty(item.qty - 1);
                  }}
                  className="h-8 w-8 items-center justify-center"
                >
                  <Ionicons name="remove" size={18} color="#111827" />
                </TouchableOpacity>
                <View className="min-w-[24] items-center">
                  <Text className="text-slate-900 font-black text-sm">
                    {item.qty}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onUpdateQty(item.qty + 1);
                  }}
                  className="h-8 w-8 items-center justify-center"
                >
                  <Ionicons name="add" size={18} color="#111827" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
}

export default function CartTab() {
  const { items, itemCount, subtotal, setQty, removeItem } = useCart();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 15.0 : 0;
  const total = subtotal + tax + shipping;

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      <View className="px-5 pt-6 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              Shopping Bag
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              {itemCount} products ready for checkout
            </Text>
          </View>
          <View className="h-10 w-10 rounded-full bg-white items-center justify-center border border-slate-100 shadow-sm">
            <Ionicons name="bag-handle" size={20} color={colors.primary[500]} />
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View className="items-center justify-center py-20 px-10">
            <View className="h-24 w-24 rounded-full bg-slate-50 items-center justify-center mb-6">
              <Ionicons
                name="cart-outline"
                size={40}
                color={colors.neutral[200]}
              />
            </View>
            <Text className="text-slate-900 font-black text-xl text-center">
              Your bag is empty
            </Text>
            <Text className="text-slate-400 font-semibold text-center mt-2 leading-5">
              Looks like you haven't added anything to your cart yet.
            </Text>
            <Button
              title="Browse Shop"
              variant="primary"
              onPress={() => router.push("/shop")}
              style={{ marginTop: 32, width: "100%" }}
            />
          </View>
        ) : (
          <>
            {items.map((it, idx) => (
              <CartItem
                key={it.productId}
                item={it}
                index={idx}
                onUpdateQty={(qty) => setQty(it.productId, qty)}
                onRemove={() => removeItem(it.productId)}
              />
            ))}

            {/* Price Summary Card */}
            <Animated.View
              entering={FadeInDown.delay(items.length * 100).duration(600)}
              className="mt-4"
            >
              <GlassCard className="p-5" variant="glass">
                <Text className="text-slate-900 font-black text-lg mb-4">
                  Price Summary
                </Text>

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
                  <Text className="text-slate-500 font-semibold">
                    Est. Tax (10%)
                  </Text>
                  <Text className="text-slate-900 font-black">
                    ${tax.toFixed(2)}
                  </Text>
                </View>

                <View className="h-[1px] bg-slate-100 w-full mb-4" />

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

            {/* Promo Code Card */}
            <Animated.View
              entering={FadeInDown.delay(items.length * 100 + 100).duration(
                600,
              )}
              className="mt-4"
            >
              <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <View className="flex-row items-center">
                  <Ionicons
                    name="pricetag-outline"
                    size={20}
                    color={colors.primary[500]}
                  />
                  <Text className="ml-3 font-bold text-slate-700">
                    Apply Promo Code
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.neutral[300]}
                />
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </ScrollView>

      {/* Floating Checkout Footer */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={styles.footerGradient}
          />
          <View className="px-5 pb-8">
            <Button
              title="Proceed to Checkout"
              variant="primary"
              onPress={() => router.push("/(tabs)/(stack)/checkout" as any)}
              style={{ height: 60 }}
              rightIcon="arrow-forward"
            />
          </View>
        </View>
      )}
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  footerGradient: {
    height: 60,
  },
});
