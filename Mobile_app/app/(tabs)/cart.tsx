import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import NeonButton from "../../components/ui/NeonButton";
import { useCart } from "../../store/cart";

export default function CartTab() {
  const { items, itemCount, subtotal, setQty, removeItem } = useCart();

  return (
    <Screen>
      <View className="px-4 pt-3">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-slate-900 text-xl font-extrabold">Cart</Text>
            <Text className="text-slate-600 text-xs font-semibold mt-1">
              {itemCount} item(s)
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home" as any)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200"
            activeOpacity={0.9}
          >
            <Text className="text-slate-900 font-extrabold text-xs">Shop more</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 mt-3">
          {items.length === 0 ? (
            <GlassCard className="p-5">
              <Text className="text-slate-900 font-extrabold text-base">
                Your cart is empty
              </Text>
              <Text className="text-slate-600 text-sm font-semibold mt-2">
                Add items from Home or Search.
              </Text>
            </GlassCard>
          ) : (
            items.map((it) => (
              <GlassCard key={it.productId} className="p-3 mb-3">
                <View className="flex-row">
                  <View className="h-20 w-20 rounded-xl overflow-hidden bg-[#F3F4F6]">
                    {!!it.image ? (
                      <Image
                        source={{ uri: it.image }}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="cover"
                      />
                    ) : (
                      <View className="flex-1 items-center justify-center">
                        <Ionicons name="image" size={20} color="#6B7280" />
                      </View>
                    )}
                  </View>

                  <View className="flex-1 ml-3">
                    <Text numberOfLines={2} className="text-slate-900 font-extrabold">
                      {it.title}
                    </Text>
                    <Text className="text-slate-700 font-semibold mt-1">
                      ${it.price.toFixed(2)}
                    </Text>

                    <View className="flex-row items-center mt-3">
                      <TouchableOpacity
                        onPress={() => setQty(it.productId, it.qty - 1)}
                        className="h-9 w-9 rounded-lg bg-white border border-slate-200 items-center justify-center"
                        activeOpacity={0.9}
                      >
                        <Ionicons name="remove" size={18} color="#111827" />
                      </TouchableOpacity>
                      <Text className="text-slate-900 font-extrabold mx-3">
                        {it.qty}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setQty(it.productId, it.qty + 1)}
                        className="h-9 w-9 rounded-lg bg-white border border-slate-200 items-center justify-center"
                        activeOpacity={0.9}
                      >
                        <Ionicons name="add" size={18} color="#111827" />
                      </TouchableOpacity>

                      <View className="flex-1" />

                      <TouchableOpacity
                        onPress={() => removeItem(it.productId)}
                        className="h-9 w-9 rounded-lg bg-white border border-slate-200 items-center justify-center"
                        activeOpacity={0.9}
                      >
                        <Ionicons name="trash-outline" size={18} color="#111827" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </GlassCard>
            ))
          )}

          {items.length > 0 && (
            <GlassCard className="p-4 mt-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-slate-700 font-semibold">Subtotal</Text>
                <Text className="text-slate-900 font-extrabold">
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              <Text className="text-slate-500 text-xs font-semibold mt-2">
                Shipping and taxes calculated at checkout.
              </Text>
              <NeonButton
                title="Checkout"
                onPress={() => router.push("/(tabs)/(stack)/checkout" as any)}
                className="mt-4"
              />
            </GlassCard>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
