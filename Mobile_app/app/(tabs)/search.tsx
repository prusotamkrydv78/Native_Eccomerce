import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeIn, Layout } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import {
  AnimatedScreen,
  SearchBar,
  ProductCard,
  GlassCard,
  Button,
} from "../../components/ui";
import { PRODUCTS } from "../../lib/dummy";
import { useCart } from "../../store/cart";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const RECENT_SEARCHES = [
  "Nike Air Max",
  "iPhone 15 Pro",
  "Cotton T-shirt",
  "Smart Watch",
];
const TRENDING_KEYWORDS = [
  "Wireless Earbuds",
  "Summer Collection",
  "Running Shoes",
  "Premium Tech",
];

export default function SearchScreen() {
  const [q, setQ] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { addItem } = useCart();

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q.trim().toLowerCase()) ||
        p.category.toLowerCase().includes(q.trim().toLowerCase()),
    );
  }, [q]);

  const handleSearch = (term: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQ(term);
  };

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      {/* Header Container */}
      <View className="px-5 pt-6 pb-4">
        <View className="flex-row items-center mb-6">
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
          <Text className="text-2xl font-black text-slate-900 tracking-tight">
            Search
          </Text>
        </View>

        <SearchBar
          value={q}
          onChangeText={setQ}
          placeholder="What are you looking for?"
          onClear={() => setQ("")}
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {!q.trim() ? (
          <Animated.View entering={FadeIn.duration(400)} className="px-5">
            {/* Recent Searches */}
            <View className="mt-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-slate-900 font-extrabold text-base">
                  Recent Searches
                </Text>
                <TouchableOpacity>
                  <Text className="text-slate-400 font-bold text-xs uppercase">
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {RECENT_SEARCHES.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleSearch(item)}
                    className="flex-row items-center bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={colors.neutral[400]}
                    />
                    <Text className="ml-2 text-slate-600 font-bold text-sm">
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending Keywords */}
            <View className="mt-10">
              <Text className="text-slate-900 font-extrabold text-base mb-4">
                Trending Now
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {TRENDING_KEYWORDS.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleSearch(item)}
                    className="flex-row items-center bg-indigo-50/50 px-4 py-2.5 rounded-2xl border border-indigo-100"
                  >
                    <Ionicons
                      name="trending-up"
                      size={14}
                      color={colors.primary[500]}
                    />
                    <Text className="ml-2 text-indigo-600 font-bold text-sm">
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Empty Search Illustration */}
            <View className="items-center justify-center mt-20 opacity-30">
              <Ionicons name="search" size={80} color={colors.neutral[200]} />
              <Text className="text-slate-400 font-bold mt-4">
                Discover something new
              </Text>
            </View>
          </Animated.View>
        ) : (
          <View className="px-5">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                {results.length} results found
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-indigo-600 font-bold text-xs">
                  Filter
                </Text>
                <Ionicons
                  name="options-outline"
                  size={14}
                  color={colors.primary[500]}
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap -mx-2">
              {results.map((p: any, i: number) => (
                <Animated.View
                  key={p.id}
                  entering={FadeInDown.delay(i * 50)}
                  layout={Layout.springify()}
                  style={{ width: "50%", padding: 8 }}
                >
                  <ProductCard
                    title={p.title}
                    price={p.price}
                    rating={p.rating}
                    image={p.image}
                    discount={p.discount}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/(stack)/product/[productId]",
                        params: { productId: p.id },
                      } as any)
                    }
                    onAdd={() => addItem({ ...p, productId: p.id })}
                  />
                </Animated.View>
              ))}
            </View>

            {results.length === 0 && (
              <View className="items-center justify-center py-20">
                <View className="h-20 w-20 rounded-full bg-slate-50 items-center justify-center mb-4">
                  <Ionicons
                    name="alert-circle-outline"
                    size={32}
                    color={colors.neutral[300]}
                  />
                </View>
                <Text className="text-slate-900 font-black text-lg">
                  No Results Found
                </Text>
                <Text className="text-slate-400 font-semibold text-center mt-2 px-10">
                  We couldn't find anything matching "{q}". Try a different term
                  or keyword.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </AnimatedScreen>
  );
}
