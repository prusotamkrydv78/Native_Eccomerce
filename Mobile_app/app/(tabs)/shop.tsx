import React, { useMemo, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import {
  AnimatedScreen,
  GlassCard,
  SearchBar,
  ProductCard,
  Button,
} from "../../components/ui";
import { CATEGORIES, PRODUCTS } from "../../lib/dummy";
import { useCart } from "../../store/cart";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ShopScreen() {
  const params = useLocalSearchParams<{ q?: string; cat?: string }>();
  const [searchQuery, setSearchQuery] = useState(params.q || "");
  const [selectedCategory, setSelectedCategory] = useState(params.cat || "All");
  const { addItem } = useCart();

  // Handle incoming params from Home screen or Navigation
  useEffect(() => {
    if (params.q) setSearchQuery(params.q);
    if (params.cat) setSelectedCategory(params.cat);
  }, [params.q, params.cat]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const okCat =
        selectedCategory === "All" ? true : p.category === selectedCategory;
      const okTitle = searchQuery.trim()
        ? p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
        : true;
      return okCat && okTitle;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/(tabs)/(stack)/product/[productId]",
      params: { productId },
    } as any);
  };

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      {/* Header Area */}
      <View className="px-5 pt-6 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              Explore Shop
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              Find your next favorite item
            </Text>
          </View>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-white items-center justify-center border border-slate-100 shadow-sm"
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={colors.neutral[800]}
            />
          </TouchableOpacity>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for electronics, wear..."
        />
      </View>

      {/* Category Horizontal Scroll */}
      <View className="mt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        >
          {CATEGORIES.map((cat, i) => (
            <Animated.View key={cat.name} entering={FadeInRight.delay(i * 50)}>
              <TouchableOpacity
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedCategory(cat.name);
                }}
                className={`px-5 py-2.5 rounded-2xl border ${
                  selectedCategory === cat.name
                    ? "bg-slate-900 border-slate-900"
                    : "bg-white border-slate-100"
                }`}
              >
                <Text
                  className={`text-sm font-bold ${
                    selectedCategory === cat.name
                      ? "text-white"
                      : "text-slate-500"
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Results Info */}
        <View className="px-2 mb-4 flex-row items-center justify-between">
          <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Showing {filteredProducts.length} Results
          </Text>
          <View className="h-[1px] flex-1 bg-slate-100 ml-4" />
        </View>

        {/* Product Grid */}
        <View className="flex-row flex-wrap">
          {filteredProducts.map((p, i) => (
            <Animated.View
              key={p.id}
              entering={FadeInDown.delay(i * 50)}
              style={{ width: "50%", padding: 8 }}
            >
              <ProductCard
                title={p.title}
                price={p.price}
                rating={p.rating}
                image={p.image}
                discount={p.discount}
                onPress={() => handleProductPress(p.id)}
                onAdd={() => {
                  addItem({ ...p, productId: p.id });
                }}
              />
            </Animated.View>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View className="items-center justify-center py-20">
            <View className="h-20 w-20 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Ionicons
                name="search-outline"
                size={32}
                color={colors.neutral[300]}
              />
            </View>
            <Text className="text-slate-900 font-black text-lg">
              No Items Found
            </Text>
            <Text className="text-slate-400 font-semibold text-center mt-1 px-10">
              We couldn't find anything matching "{searchQuery}". Try a
              different term.
            </Text>
            <Button
              variant="ghost"
              title="Clear Search"
              onPress={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              style={{ marginTop: 24 }}
            />
          </View>
        )}
      </ScrollView>
    </AnimatedScreen>
  );
}
