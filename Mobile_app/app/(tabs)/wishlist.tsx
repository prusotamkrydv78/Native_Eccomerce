import React, { useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import { PRODUCTS } from "../../lib/dummy";
import ProductCard from "../../components/ui/ProductCard";

export default function WishlistTab() {
  const [ids, setIds] = useState<string[]>(["p2", "p4"]);

  const items = useMemo(() => PRODUCTS.filter((p) => ids.includes(p.id)), [ids]);

  return (
    <Screen>
      <View className="px-4 pt-3 flex-row items-center justify-between">
        <View>
          <Text className="text-slate-900 text-xl font-extrabold">Wishlist</Text>
          <Text className="text-slate-600 text-xs font-semibold mt-1">
            Saved for later.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIds([])}
          className="px-3 py-2 rounded-xl bg-white border border-slate-200"
          activeOpacity={0.9}
        >
          <Text className="text-slate-900 font-extrabold text-xs">Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 mt-3">
          {items.length === 0 ? (
            <GlassCard className="p-5">
              <Text className="text-slate-900 font-extrabold text-base">
                Your wishlist is empty
              </Text>
              <Text className="text-slate-600 text-sm font-semibold mt-2">
                Browse products and tap the heart to save.
              </Text>
            </GlassCard>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {items.map((p) => (
                <View key={p.id} className="w-[48%] mb-3">
                  <ProductCard
                    title={p.title}
                    price={p.price}
                    rating={p.rating}
                    image={p.image}
                    onPress={() =>
                      router.push(
                        {
                          pathname: "/(tabs)/(stack)/product/[productId]",
                          params: { productId: p.id },
                        } as any
                      )
                    }
                    onAdd={() => setIds((prev) => prev.filter((id) => id !== p.id))}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
