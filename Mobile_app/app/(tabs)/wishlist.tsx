import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInRight,
  Layout,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import {
  AnimatedScreen,
  GlassCard,
  Button,
  ProductCard,
} from "../../components/ui";
import { PRODUCTS } from "../../lib/dummy";
import { useCart } from "../../store/cart";
import { colors, borderRadius, shadows, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function WishlistTab() {
  // Mock wishlist state - in a real app this would come from a store
  const [ids, setIds] = useState<string[]>(["p1", "p2", "p5"]);
  const { addItem } = useCart();

  const wishlistItems = useMemo(
    () => PRODUCTS.filter((p) => ids.includes(p.id)),
    [ids],
  );

  const handleRemove = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setIds([]);
  };

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      {/* Header */}
      <View className="px-5 pt-6 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              My Wishlist
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              {wishlistItems.length} items saved for later
            </Text>
          </View>
          {wishlistItems.length > 0 && (
            <TouchableOpacity
              onPress={handleClearAll}
              className="px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm"
            >
              <Text className="text-xs font-bold text-slate-500">
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {wishlistItems.length === 0 ? (
          <View className="items-center justify-center py-20 px-10">
            <View className="h-24 w-24 rounded-full bg-slate-50 items-center justify-center mb-6">
              <Ionicons
                name="heart-dislike-outline"
                size={40}
                color={colors.neutral[200]}
              />
            </View>
            <Text className="text-slate-900 font-black text-xl text-center">
              Your wishlist is lonely
            </Text>
            <Text className="text-slate-400 font-semibold text-center mt-2 leading-5">
              Explore our latest arrivals and save your favorites here.
            </Text>
            <Button
              title="Start Shopping"
              variant="primary"
              onPress={() => router.push("/shop")}
              style={{ marginTop: 32, width: "100%" }}
            />
          </View>
        ) : (
          <View className="flex-row flex-wrap">
            {wishlistItems.map((p: any, i: number) => (
              <Animated.View
                key={p.id}
                layout={Layout.springify()}
                entering={FadeInDown.delay(i * 100)}
                style={{ width: "50%", padding: 8 }}
              >
                <View className="relative">
                  <ProductCard
                    title={p.title}
                    price={p.price}
                    rating={p.rating}
                    image={p.image}
                    discount={p.discount}
                    isWishlisted={true}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/(stack)/product/[productId]",
                        params: { productId: p.id },
                      } as any)
                    }
                    onAdd={() => addItem({ ...p, productId: p.id })}
                    onWishlist={() => handleRemove(p.id)}
                  />
                </View>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </AnimatedScreen>
  );
}
