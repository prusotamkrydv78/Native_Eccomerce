import React, { useMemo } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import Screen from "../../../../components/ui/Screen";
import GlassCard from "../../../../components/ui/GlassCard";
import NeonButton from "../../../../components/ui/NeonButton";
import { PRODUCTS } from "../../../../lib/dummy";
import { useCart } from "../../../../store/cart";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const { addItem } = useCart();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0],
    [productId]
  );

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 pt-3">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 items-center justify-center"
              activeOpacity={0.9}
            >
              <Ionicons name="chevron-back" size={18} color="#111827" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/wishlist" as any)}
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 items-center justify-center"
              activeOpacity={0.9}
            >
              <Ionicons name="heart-outline" size={18} color="#111827" />
            </TouchableOpacity>
          </View>

          <View className="mt-3 rounded-xl overflow-hidden bg-[#F3F4F6] border border-slate-200">
            <Image
              source={{ uri: product.image }}
              style={{ width: "100%", height: 260 }}
              contentFit="cover"
            />
          </View>

          <View className="mt-3">
            <Text className="text-slate-900 text-xl font-extrabold">
              {product.title}
            </Text>
            <View className="flex-row items-center mt-2">
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text className="text-slate-700 font-semibold text-xs ml-1">
                  {product.rating.toFixed(1)}
                </Text>
              </View>
              <Text className="text-slate-500 font-semibold text-xs ml-2">
                • {product.category}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-slate-900 text-2xl font-extrabold">
                ${product.price.toFixed(2)}
              </Text>
              <View className="px-3 py-1.5 rounded-full bg-white border border-slate-200">
                <Text className="text-slate-800 font-semibold text-xs">
                  In stock
                </Text>
              </View>
            </View>
          </View>

          <GlassCard className="p-4 mt-4">
            <Text className="text-slate-900 font-extrabold">About this item</Text>
            <Text className="text-slate-600 text-sm font-semibold mt-2 leading-5">
              {product.description}
            </Text>
          </GlassCard>

          <NeonButton
            title="Add to Cart"
            onPress={() => {
              addItem({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              });
              router.push("/(tabs)/cart" as any);
            }}
            className="mt-4"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
