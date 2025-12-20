import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const { width } = Dimensions.get("window");

const MOCK_PRODUCT = {
  id: "1",
  name: "Wireless Headphones",
  description:
    "Experience world-class silence and superior sound with our latest noise-cancelling technology. Perfect for travel, office, or anywhere you want to lose yourself in music. featuring 30-hour battery life and quick charging.",
  price: "$299.99",
  sku: "WH-001-BLU",
  units: "145",
  rating: "4.8",
  reviews: "128",
  category: "Electronics",
  status: "In Stock",
  statusColor: "#10b981",
  statusBg: "#ECFDF5",
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
};

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();

  // In a real app, you would fetch product details using the productId
  const product = MOCK_PRODUCT;

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-6 py-4 flex-row justify-between items-center absolute top-0 left-0 right-0 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-12 w-12 bg-white/90 rounded-2xl items-center justify-center shadow-sm shadow-slate-200"
          >
            <Ionicons name="chevron-back" size={24} color="#171717" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/products/edit-product")}
            className="h-12 w-12 bg-white/90 rounded-2xl items-center justify-center shadow-sm shadow-slate-200"
          >
            <Ionicons name="pencil-outline" size={20} color="#171717" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* IMAGE SECTION */}
          <View className="w-full h-96">
            <Image
              source={{ uri: product.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Soft gradient or overlay can be added here if needed */}
          </View>

          {/* CONTENT SECTION */}
          <View className="flex-1 bg-white -mt-10 rounded-t-[48px] px-8 pt-10">
            {/* Category & Rating */}
            <View className="flex-row justify-between items-center mb-6">
              <View className="bg-slate-50 px-4 py-2 rounded-2xl">
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  {product.category}
                </Text>
              </View>
              <View className="flex-row items-center bg-amber-50 px-3 py-2 rounded-2xl">
                <Ionicons name="star" size={14} color="#f59e0b" />
                <Text className="text-amber-700 text-xs font-bold ml-1">
                  {product.rating}
                </Text>
                <Text className="text-amber-700/50 text-[10px] ml-1">
                  ({product.reviews})
                </Text>
              </View>
            </View>

            {/* Title & Price */}
            <Text className="text-slate-900 text-3xl font-semibold leading-tight mb-2">
              {product.name}
            </Text>
            <View className="flex-row items-center mb-8">
              <Text className="text-[#F83758] text-2xl font-bold">
                {product.price}
              </Text>
              <View className="ml-4 px-3 py-1 bg-emerald-50 rounded-lg">
                <Text className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  {product.status}
                </Text>
              </View>
            </View>

            {/* Stats Grid */}
            <View className="flex-row justify-between mb-10">
              <View className="w-[31%] bg-slate-50 p-4 rounded-3xl items-center">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mb-3">
                  <Ionicons name="barcode-outline" size={18} color="#64748b" />
                </View>
                <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                  SKU
                </Text>
                <Text
                  className="text-slate-700 text-[11px] font-semibold mt-1"
                  numberOfLines={1}
                >
                  WH-001
                </Text>
              </View>

              <View className="w-[31%] bg-slate-50 p-4 rounded-3xl items-center">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mb-3">
                  <Ionicons name="layers-outline" size={18} color="#64748b" />
                </View>
                <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                  Stock
                </Text>
                <Text className="text-slate-700 text-xs font-semibold mt-1">
                  {product.units} Units
                </Text>
              </View>

              <View className="w-[31%] bg-slate-50 p-4 rounded-3xl items-center">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mb-3">
                  <Ionicons
                    name="trending-up-outline"
                    size={18}
                    color="#64748b"
                  />
                </View>
                <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                  Growth
                </Text>
                <Text className="text-slate-700 text-xs font-semibold mt-1">
                  +12.4%
                </Text>
              </View>
            </View>

            {/* Description */}
            <View className="mb-10">
              <Text className="text-slate-900 text-lg font-semibold mb-4">
                Description
              </Text>
              <Text className="text-slate-400 text-sm leading-6">
                {product.description}
              </Text>
            </View>

            {/* Additional Details Placeholder */}
            <View className="bg-slate-50 p-6 rounded-[32px]">
              <View className="flex-row items-center mb-4">
                <View className="h-8 w-8 bg-white rounded-xl items-center justify-center mr-3">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={16}
                    color="#10b981"
                  />
                </View>
                <Text className="text-slate-600 text-xs font-semibold">
                  2 Year Warranty Guaranteed
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="h-8 w-8 bg-white rounded-xl items-center justify-center mr-3">
                  <Ionicons name="refresh-outline" size={16} color="#3b82f6" />
                </View>
                <Text className="text-slate-600 text-xs font-semibold">
                  30 Days Easy Return Policy
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM ACTION */}
        <View className="absolute bottom-0 left-0 right-0 bg-white/80 border-t border-slate-50 px-8 py-6">
          <TouchableOpacity
            onPress={() => router.push("/products/edit-product")}
            className="w-full bg-[#F83758] py-5 rounded-[24px] flex-row items-center justify-center"
          >
            <Ionicons name="settings-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-3 text-base">
              Modify Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContextWrapper>
  );
}
