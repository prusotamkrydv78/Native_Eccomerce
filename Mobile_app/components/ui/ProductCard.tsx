import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function ProductCard({
  title,
  price,
  rating,
  image,
  onPress,
  onAdd,
  ctaText = "Add to Cart",
}: {
  title: string;
  price: number;
  rating: number;
  image: string;
  onPress?: () => void;
  onAdd?: () => void;
  ctaText?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.92}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden"
    >
      <View className="bg-[#F3F4F6]">
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 140 }}
          contentFit="cover"
        />
      </View>

      <View className="p-3">
        <Text numberOfLines={2} className="text-slate-900 font-semibold text-sm">
          {title}
        </Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text className="text-slate-700 font-semibold text-xs ml-1">
            {rating.toFixed(1)}
          </Text>
          <View className="flex-1" />
          <Text className="text-slate-900 font-extrabold">${price.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
          activeOpacity={0.9}
          className="mt-3 bg-[#FF9900] rounded-lg py-2 items-center justify-center"
        >
          <Text className="text-[#111827] font-extrabold text-sm">{ctaText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
