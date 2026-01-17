import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedScrollHandler,
  SharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import {
  AnimatedScreen,
  GlassCard,
  SearchBar,
  ProductCard,
  Button,
} from "../../components/ui";
import {
  CATEGORIES,
  PRODUCTS,
  BANNERS,
  TRUST_INDICATORS,
} from "../../lib/dummy";
import { useCart } from "../../store/cart";
import { useAuth } from "../../store/auth";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// --- Sub-components ---

// 1. Sticky Header Component
function StickyHeader({
  scrollY,
  itemCount,
}: {
  scrollY: SharedValue<number>;
  itemCount: number;
}) {
  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 50], [0, 1]);
    return {
      opacity,
      backgroundColor: "#FFF",
      borderBottomWidth: interpolate(scrollY.value, [0, 50], [0, 1]),
      borderBottomColor: colors.neutral[100],
    };
  });

  return (
    <Animated.View style={[styles.headerContainer, headerStyle]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="menu-outline" size={26} color={colors.neutral[900]} />
        </TouchableOpacity>

        <View style={styles.headerLogo}>
          <Text style={styles.logoText}>NEO</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => router.push("/(tabs)/(stack)/notifications" as any)}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.neutral[800]}
            />
            <View style={styles.dot} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => router.push("/(tabs)/cart" as any)}
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color={colors.neutral[800]}
            />
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

// 2. Banner Carousel
function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={BANNERS}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} style={styles.bannerSlide}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.bannerImage}
              imageStyle={{ borderRadius: borderRadius.xl }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.6)", "transparent"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.bannerGradient}
              >
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <TouchableOpacity style={styles.bannerBtn}>
                  <Text style={styles.bannerBtnText}>Shop Now</Text>
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setActiveIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.pagination}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              activeIndex === i && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// 3. Category Quick Access
function CategoryQuickAccess({
  selectedCat,
  onSelect,
}: {
  selectedCat: string;
  onSelect: (c: string) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat, i) => (
          <Animated.View key={cat.name} entering={FadeInRight.delay(i * 100)}>
            <TouchableOpacity
              style={styles.catItem}
              onPress={() => {
                Haptics.selectionAsync();
                router.push({
                  pathname: "/shop",
                  params: { cat: cat.name },
                } as any);
              }}
            >
              <View
                style={[
                  styles.catIconContainer,
                  selectedCat === cat.name && {
                    backgroundColor: colors.primary[500],
                    borderColor: colors.primary[500],
                  },
                ]}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={24}
                  color={
                    selectedCat === cat.name ? "#FFF" : colors.neutral[600]
                  }
                />
              </View>
              <Text
                style={[
                  styles.catName,
                  selectedCat === cat.name && {
                    color: colors.primary[600],
                    fontWeight: "800",
                  },
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

// 4. Flash Sale Timer Content
function FlashSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState(3600 * 4); // 4 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Ionicons name="flash" size={16} color="#FFF" />
      <Text style={styles.timerText}>Ends in {formatTime(timeLeft)}</Text>
    </View>
  );
}

// --- Main Screen ---

export default function EnhancedHomeTab() {
  const { addItem, itemCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const popularProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isPopular),
    [],
  );
  const flashSaleProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isFlashSale),
    [],
  );
  const newArrivals = useMemo(() => PRODUCTS.filter((p) => p.isNew), []);

  const filteredProducts = PRODUCTS; // No longer filtered on home screen as search bar redirects

  return (
    <View style={{ flex: 1, backgroundColor: colors.neutral[50] }}>
      <StickyHeader scrollY={scrollY} itemCount={itemCount} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Top Section (Static Search + Delivery) */}
        <View style={styles.topSection}>
          <View style={styles.headerRowStatic}>
            <View style={styles.logoAndMenu}>
              <TouchableOpacity style={styles.menuBtnSmall}>
                <Ionicons
                  name="menu-outline"
                  size={24}
                  color={colors.neutral[900]}
                />
              </TouchableOpacity>
              <Text style={styles.logoTextMain}>NEO</Text>
            </View>
            <View style={styles.rightIconsStatic}>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(tabs)/(stack)/notifications" as any)
                }
              >
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={colors.neutral[800]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/cart" as any)}
                style={{ marginLeft: 12 }}
              >
                <Ionicons
                  name="cart-outline"
                  size={22}
                  color={colors.neutral[800]}
                />
                {itemCount > 0 && (
                  <View style={styles.badgeSmall}>
                    <Text style={styles.badgeTextSmall}>{itemCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.searchSection}
            activeOpacity={0.9}
            onPress={() => router.push("/search")}
          >
            <View style={styles.fakeSearchBar}>
              <Ionicons name="search" size={20} color={colors.neutral[400]} />
              <Text style={styles.fakeSearchText}>
                Search products, categories...
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deliveryInfo} activeOpacity={0.7}>
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.primary[500]}
            />
            <Text style={styles.deliveryText}>
              Deliver to{" "}
              <Text style={styles.deliveryAddress}>Kathmandu, Nepal</Text>
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={14}
              color={colors.neutral[400]}
            />
          </TouchableOpacity>
        </View>

        {/* 1. Hero Promo Banner */}
        <BannerCarousel />

        {/* 2. Category Quick Access */}
        <CategoryQuickAccess selectedCat={"All"} onSelect={() => {}} />

        {/* 3. Flash Sale Section */}
        <View style={styles.flashSaleSection}>
          <LinearGradient
            colors={[colors.error.main, colors.error.dark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.flashHeader}
          >
            <View style={styles.flashTitleContainer}>
              <Text style={styles.flashTitle}>Flash Sale</Text>
              <FlashSaleCountdown />
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllTextWhite}>See All</Text>
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalGrid}
          >
            {flashSaleProducts.map((p, i) => (
              <View key={p.id} style={styles.horizontalCardWrapper}>
                <ProductCard
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  image={p.image}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(stack)/product/[productId]",
                      params: { productId: p.id },
                    } as any)
                  }
                  onAdd={() => addItem({ ...p, productId: p.id })}
                />
                {p.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{p.discount}%</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 4. Popular Section */}
        <View style={styles.sectionStack}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalGrid}
          >
            {popularProducts.map((p) => (
              <View key={p.id} style={styles.horizontalCardWrapper}>
                <ProductCard
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  image={p.image}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(stack)/product/[productId]",
                      params: { productId: p.id },
                    } as any)
                  }
                  onAdd={() => addItem({ ...p, productId: p.id })}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 5. Curated Collections */}
        <View style={styles.sectionStack}>
          <Text style={styles.sectionTitle}>Curated Collections</Text>
          <View style={styles.collectionsGrid}>
            <TouchableOpacity style={styles.collectionCard} activeOpacity={0.8}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
                }}
                style={styles.collectionImg}
                imageStyle={{ borderRadius: borderRadius.xl }}
              >
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionTitle}>Under $99</Text>
                  <Text style={styles.collectionLabel}>Budget Deals</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.collectionCard} activeOpacity={0.8}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
                }}
                style={styles.collectionImg}
                imageStyle={{ borderRadius: borderRadius.xl }}
              >
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionTitle}>Premium</Text>
                  <Text style={styles.collectionLabel}>Quality Picks</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. New Arrivals */}
        <View style={styles.sectionStack}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🆕 Newly Arrived</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalGrid}
          >
            {newArrivals.map((p) => (
              <View key={p.id} style={styles.horizontalCardWrapper}>
                <ProductCard
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  image={p.image}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(stack)/product/[productId]",
                      params: { productId: p.id },
                    } as any)
                  }
                  onAdd={() => addItem({ ...p, productId: p.id })}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 7. All Products (Grid as Fallback) */}
        <View style={styles.sectionStack}>
          <Text style={styles.sectionTitle}>Explorer All</Text>
          <View style={styles.mainGrid}>
            {filteredProducts.map((p, i) => (
              <View key={p.id} style={styles.gridItem}>
                <ProductCard
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  image={p.image}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(stack)/product/[productId]",
                      params: { productId: p.id },
                    } as any)
                  }
                  onAdd={() => addItem({ ...p, productId: p.id })}
                />
              </View>
            ))}
          </View>
        </View>

        {/* 8. Trust Indicators */}
        <View style={styles.trustFooter}>
          <View style={styles.trustGrid}>
            {TRUST_INDICATORS.map((item, i) => (
              <View key={i} style={styles.trustItem}>
                <View style={styles.trustIcon}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={colors.primary[500]}
                  />
                </View>
                <Text style={styles.trustText}>{item.text}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.footerCopy}>
            © 2026 NEO Store. All rights reserved.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: Platform.OS === "ios" ? 100 : 70,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 50,
  },
  menuBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLogo: {
    flex: 1,
    alignItems: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
    color: colors.primary[500],
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: colors.primary[500],
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  badgeText: {
    fontSize: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  dot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error.main,
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  topSection: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...shadows.sm,
  },
  headerRowStatic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  logoAndMenu: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuBtnSmall: {
    marginRight: 10,
  },
  logoTextMain: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary[500],
    letterSpacing: 1.5,
  },
  rightIconsStatic: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeSmall: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: colors.primary[500],
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  badgeTextSmall: {
    fontSize: 8,
    color: "#FFF",
    fontWeight: "bold",
  },
  searchSection: {
    paddingHorizontal: 20,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 12,
  },
  deliveryText: {
    fontSize: 13,
    color: colors.neutral[600],
    marginLeft: 6,
    flex: 1,
  },
  deliveryAddress: {
    fontWeight: "700",
    color: colors.neutral[900],
  },
  carouselContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bannerSlide: {
    width: SCREEN_WIDTH - 40,
    height: 180,
    marginRight: 10,
  },
  bannerImage: {
    flex: 1,
    overflow: "hidden",
  },
  bannerGradient: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },
  bannerSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFF",
    marginTop: 4,
  },
  bannerBtn: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  bannerBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primary[600],
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.neutral[300],
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 18,
    backgroundColor: colors.primary[500],
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.neutral[900],
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingRight: 4,
  },
  catItem: {
    alignItems: "center",
    marginRight: 20,
  },
  catIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral[100],
    ...shadows.sm,
  },
  catName: {
    fontSize: 12,
    color: colors.neutral[600],
    marginTop: 8,
    fontWeight: "600",
  },
  flashSaleSection: {
    marginTop: 24,
    backgroundColor: "#FFF",
    paddingBottom: 20,
    ...shadows.sm,
  },
  flashHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  flashTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flashTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
    marginRight: 12,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 4,
  },
  seeAllTextWhite: {
    fontSize: 13,
    color: "#FFF",
    fontWeight: "700",
  },
  horizontalGrid: {
    paddingLeft: 20,
    paddingRight: 4,
    marginTop: 16,
    gap: 16,
  },
  horizontalCardWrapper: {
    width: SCREEN_WIDTH * 0.45,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.error.main,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  sectionStack: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary[600],
    fontWeight: "700",
  },
  collectionsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  collectionCard: {
    flex: 1,
    height: 120,
  },
  collectionImg: {
    flex: 1,
  },
  collectionOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: borderRadius.xl,
    padding: 16,
    justifyContent: "flex-end",
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
  },
  collectionLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  mainGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  gridItem: {
    width: "50%",
    padding: 8,
  },
  trustFooter: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  trustGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
  },
  trustIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  trustText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.neutral[600],
  },
  footerCopy: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 12,
    color: colors.neutral[400],
  },
  fakeSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    height: 52,
    borderRadius: borderRadius.xl,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  fakeSearchText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.neutral[400],
    fontWeight: "600",
  },
});
