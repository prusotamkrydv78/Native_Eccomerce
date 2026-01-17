import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolate,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard, Button } from "../../../../components/ui";
import { PRODUCTS } from "../../../../lib/dummy";
import { useCart } from "../../../../store/cart";
import {
  colors,
  shadows,
  borderRadius,
  typography,
} from "../../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COLOR_OPTIONS = [
  { name: "Midnight", hex: "#111827" },
  { name: "Nebula", hex: "#6366F1" },
  { name: "Cyber", hex: "#EC4899" },
];

const SIZE_OPTIONS = ["S", "M", "L", "XL"];

const TABS = ["Description", "Specifications", "Reviews"];

export default function ProductDetails() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0],
    [productId],
  );

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      borderBottomWidth: opacity > 0.8 ? 1 : 0,
      borderBottomColor: colors.neutral[100],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.2, 1],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [-100, 0, 500],
      [0, 0, 100],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addItem({ ...product, productId: product.id });
  };

  const handleWishlist = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsWishlisted(!isWishlisted);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Custom Animated Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerBtn}
          className="bg-white items-center justify-center shadow-sm border border-slate-50"
        >
          <Ionicons name="chevron-back" size={24} color={colors.neutral[900]} />
        </TouchableOpacity>

        <Animated.View
          style={useAnimatedStyle(() => ({
            opacity: interpolate(scrollY.value, [250, 300], [0, 1]),
          }))}
        >
          <Text style={styles.headerTitle} numberOfLines={1}>
            {product.title}
          </Text>
        </Animated.View>

        <TouchableOpacity
          onPress={handleWishlist}
          style={styles.headerBtn}
          className="bg-white items-center justify-center shadow-sm border border-slate-50"
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={22}
            color={isWishlisted ? colors.error.main : colors.neutral[900]}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Product Image Section */}
        <Animated.View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={{ uri: product.image }}
            style={styles.mainImage}
            contentFit="cover"
            transition={1000}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.02)"]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Content Section */}
        <View style={styles.content}>
          <Animated.View
            entering={FadeInDown.delay(200).duration(800).springify()}
          >
            {/* Category & Badge */}
            <View className="flex-row items-center justify-between">
              <View className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50">
                <Text className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">
                  {product.category}
                </Text>
              </View>
              <View className="flex-row items-center bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100">
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text className="text-amber-700 font-black text-xs ml-1.5">
                  {product.rating.toFixed(1)}
                </Text>
                <Text className="text-amber-400 text-[10px] font-bold ml-1">
                  (120+)
                </Text>
              </View>
            </View>

            {/* Title & Price */}
            <Text style={styles.title}>{product.title}</Text>
            <View className="flex-row items-end mt-3">
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {product.discount && (
                <View className="flex-row items-center ml-3 mb-1">
                  <Text style={styles.oldPrice}>
                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                  </Text>
                  <View className="bg-rose-500 px-2 py-0.5 rounded-md ml-2">
                    <Text className="text-white font-black text-[10px] uppercase">
                      -{product.discount}%
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </Animated.View>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            {TABS.map((tab, i) => (
              <TouchableOpacity
                key={tab}
                onPress={() => {
                  Haptics.selectionAsync();
                  setActiveTab(i);
                }}
                style={[styles.tab, activeTab === i && styles.activeTab]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === i && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === i && (
                  <Animated.View
                    entering={FadeIn.duration(200)}
                    style={styles.activeTabIndicator}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <Animated.View
            key={activeTab}
            entering={FadeInDown.duration(300)}
            style={styles.tabContent}
          >
            {activeTab === 0 && (
              <Text style={styles.description}>
                {product.description ||
                  "Experience the future of comfort and style with our flagship product. Designed for durability and the modern lifestyle with premium materials and ethical manufacturing."}
              </Text>
            )}
            {activeTab === 1 && (
              <View className="gap-3">
                {[
                  { label: "Material", value: "100% Organic Cotton" },
                  { label: "Weight", value: "250g" },
                  { label: "Fit", value: "Regular Fit" },
                  { label: "Origin", value: "Made in Italy" },
                ].map((spec, i) => (
                  <View
                    key={i}
                    className="flex-row justify-between py-2 border-b border-slate-50"
                  >
                    <Text className="text-slate-400 font-bold text-xs uppercase tracking-wide">
                      {spec.label}
                    </Text>
                    <Text className="text-slate-800 font-bold text-xs">
                      {spec.value}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {activeTab === 2 && (
              <View className="items-center py-4">
                <Ionicons
                  name="chatbubbles-outline"
                  size={32}
                  color={colors.neutral[200]}
                />
                <Text className="text-slate-400 font-bold mt-2">
                  No reviews yet. Be the first!
                </Text>
              </View>
            )}
          </Animated.View>

          {/* Color Selector */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Select Color</Text>
            <View className="flex-row items-center gap-4 mt-4">
              {COLOR_OPTIONS.map((color, i) => (
                <TouchableOpacity
                  key={color.name}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedColor(i);
                  }}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.hex },
                    selectedColor === i && styles.colorCircleActive,
                  ]}
                >
                  {selectedColor === i && (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Size Selector */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.section}
          >
            <View className="flex-row items-center justify-between">
              <Text style={styles.sectionTitle}>Select Size</Text>
              <TouchableOpacity>
                <Text className="text-indigo-600 font-black text-xs uppercase tracking-wider">
                  Size Guide
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-3 mt-4">
              {SIZE_OPTIONS.map((size, i) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedSize(i);
                  }}
                  className={`h-14 w-14 rounded-2xl items-center justify-center border-2 ${
                    selectedSize === i
                      ? "bg-slate-900 border-slate-900 shadow-lg"
                      : "bg-white border-slate-100"
                  }`}
                >
                  <Text
                    className={`font-black text-base ${selectedSize === i ? "text-white" : "text-slate-600"}`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Trust Badges */}
          <View className="mt-12 flex-row items-center justify-between bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <View className="items-center">
              <View className="h-10 w-10 bg-white rounded-xl items-center justify-center shadow-sm">
                <Ionicons
                  name="shield-checkmark"
                  size={20}
                  color={colors.primary[500]}
                />
              </View>
              <Text className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-tighter">
                Secure
              </Text>
            </View>
            <View className="items-center">
              <View className="h-10 w-10 bg-white rounded-xl items-center justify-center shadow-sm">
                <Ionicons name="bus" size={20} color={colors.primary[500]} />
              </View>
              <Text className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-tighter">
                Fast Ship
              </Text>
            </View>
            <View className="items-center">
              <View className="h-10 w-10 bg-white rounded-xl items-center justify-center shadow-sm">
                <Ionicons
                  name="refresh"
                  size={20}
                  color={colors.primary[500]}
                />
              </View>
              <Text className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-tighter">
                14d Return
              </Text>
            </View>
            <View className="items-center">
              <View className="h-10 w-10 bg-white rounded-xl items-center justify-center shadow-sm">
                <Ionicons
                  name="headset"
                  size={20}
                  color={colors.primary[500]}
                />
              </View>
              <Text className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-tighter">
                24/7 Support
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.95)", "#FFFFFF"]}
          style={styles.bottomGradient}
        />
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={handleWishlist}
            style={styles.wishlistActionBtn}
            className="border border-slate-100"
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={26}
              color={isWishlisted ? colors.error.main : colors.neutral[600]}
            />
          </TouchableOpacity>
          <Button
            title="Add to Shopping Bag"
            variant="primary"
            onPress={handleAddToCart}
            style={{ flex: 1, height: 60 }}
            rightIcon="cart-outline"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: Platform.OS === "ios" ? 104 : 84,
    paddingTop: Platform.OS === "ios" ? 54 : 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.neutral[900],
    maxWidth: SCREEN_WIDTH * 0.5,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.15,
    backgroundColor: "#F8FAFC",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36,
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.neutral[900],
    marginTop: 16,
    letterSpacing: -1,
    lineHeight: 36,
  },
  price: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary[600],
    letterSpacing: -0.5,
  },
  oldPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.neutral[300],
    textDecorationLine: "line-through",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  tab: {
    paddingBottom: 12,
    marginRight: 24,
    position: "relative",
  },
  activeTab: {},
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.neutral[400],
  },
  activeTabText: {
    color: colors.neutral[900],
    fontWeight: "900",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primary[500],
    borderRadius: 2,
  },
  tabContent: {
    marginTop: 20,
  },
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.neutral[900],
    letterSpacing: -0.3,
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  colorCircleActive: {
    transform: [{ scale: 1.15 }],
    ...shadows.md,
  },
  description: {
    fontSize: 15,
    color: colors.neutral[500],
    lineHeight: 26,
    fontWeight: "500",
  },
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
  actionsRow: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    gap: 16,
  },
  wishlistActionBtn: {
    height: 60,
    width: 60,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
});
