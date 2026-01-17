import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { colors, borderRadius, shadows, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ProductCard({
  title,
  price,
  rating,
  image,
  onPress,
  onAdd,
  onWishlist,
  isWishlisted = false,
  discount,
  ctaText = "Add",
}: {
  title: string;
  price: number;
  rating: number;
  image: string;
  onPress?: () => void;
  onAdd?: () => void;
  onWishlist?: () => void;
  isWishlisted?: boolean;
  discount?: number;
  ctaText?: string;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onAdd?.();
  };

  const handleWishlist = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onWishlist?.();
  };

  const originalPrice = discount ? price / (1 - discount / 100) : null;

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[styles.container, animatedStyle, shadows.sm]}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />

        {/* Badges Overlay */}
        <View style={styles.badgeOverlay}>
          {discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={18}
              color={isWishlisted ? colors.error.main : colors.neutral[600]}
            />
          </TouchableOpacity>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FBBF24" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>

        <View style={styles.priceRow}>
          <View style={styles.priceCol}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            {originalPrice && (
              <Text style={styles.oldPrice}>${originalPrice.toFixed(2)}</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            style={styles.addButton}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: borderRadius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  imageContainer: {
    backgroundColor: colors.neutral[100],
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
  },
  badgeOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountBadge: {
    backgroundColor: colors.error.main,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFF",
  },
  wishlistBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    ...shadows.sm,
  },
  ratingBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    ...shadows.sm,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.neutral[800],
    marginLeft: 3,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: typography.size.sm,
    fontWeight: "600",
    color: colors.neutral[800],
    height: 36,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 8,
  },
  priceCol: {
    flex: 1,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.primary[600],
  },
  oldPrice: {
    fontSize: 11,
    color: colors.neutral[400],
    textDecorationLine: "line-through",
    marginTop: 1,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    alignItems: "center",
    justifyContent: "center",
    ...shadows.glow(colors.primary[500]),
  },
});
