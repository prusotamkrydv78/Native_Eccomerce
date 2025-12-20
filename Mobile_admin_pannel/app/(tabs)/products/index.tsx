import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const { width } = Dimensions.get("window");

const PRODUCTS_DATA = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise cancelling audio experience with long battery.",
    price: "$199.00",
    oldPrice: null,
    rating: "4.5",
    tag: null,
    status: "IN STOCK",
    statusColor: "#10b981",
    statusBg: "#ECFDF5",
    units: "12 units",
    sku: "WH-001",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    description: "Tactile switches with RGB lighting for gamers.",
    price: "$85.00",
    oldPrice: "$120",
    rating: null,
    tag: "Sale",
    status: "LOW STOCK",
    statusColor: "#f59e0b",
    statusBg: "#FFFBEB",
    units: "3 units",
    sku: "MK-202",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80",
  },
  {
    id: "3",
    name: "Smart Watch Series 7",
    description: "Advanced fitness tracking and health monitoring.",
    price: "$299.00",
    oldPrice: null,
    rating: null,
    tag: null,
    status: "OUT OF STOCK",
    statusColor: "#ef4444",
    statusBg: "#FEF2F2",
    units: "0 units",
    sku: "SW-77",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  },
  {
    id: "4",
    name: "Raspberry Pi 4 Model B",
    description: "Powerful microcomputer for hobbyists and makers.",
    price: "$45.00",
    oldPrice: null,
    rating: null,
    tag: null,
    status: "IN STOCK",
    statusColor: "#10b981",
    statusBg: "#ECFDF5",
    units: "450 units",
    sku: "RPI-4B",
    image:
      "https://plus.unsplash.com/premium_photo-1682125235036-d1ab54176df9?w=400&q=80",
  },
];

const CATEGORIES = ["All", "In Stock", "Low Stock", "Out of Stock"];

export default function ProductsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-6 pt-4 pb-2 flex-row justify-between items-center bg-white">
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
              <Ionicons name="menu-outline" size={24} color="#171717" />
            </TouchableOpacity>
            <Text className="text-slate-700 text-xl font-semibold">
              All Products
            </Text>
          </View>
          <TouchableOpacity className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
            <View className="bg-[#facc15]/30 h-full w-full items-center justify-center">
              <Ionicons name="person" size={20} color="#854d0e" />
            </View>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR - BORDERLESS */}
        <View className="px-6 py-4 bg-white">
          <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-3">
            <Ionicons name="search-outline" size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search products..."
              className="flex-1 ml-3 text-slate-700 font-medium"
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* CATEGORY CHIPS */}
          <View className="py-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  className={`mr-3 px-6 py-3 rounded-2xl ${
                    activeCategory === cat ? "bg-[#F83758]" : "bg-slate-50"
                  }`}
                >
                  <Text
                    className={`font-semibold text-xs ${
                      activeCategory === cat
                        ? "text-surface-light"
                        : "text-slate-500"
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* LIST HEADER INFO */}
          <View className="px-6 flex-row justify-between items-center mb-6">
            <View className="flex-row items-baseline">
              <Text className="text-slate-700 text-xl font-semibold">
                52,082+
              </Text>
              <Text className="text-slate-400 text-xs font-semibold ml-2">
                Items
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="flex-row items-center bg-slate-50 px-4 py-2 rounded-xl mr-2">
                <Text className="text-slate-600 text-xs font-semibold mr-2">
                  Sort
                </Text>
                <Ionicons
                  name="swap-vertical-outline"
                  size={14}
                  color="#64748b"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center bg-slate-50 px-4 py-2 rounded-xl">
                <Text className="text-slate-600 text-xs font-semibold mr-2">
                  Filter
                </Text>
                <Ionicons name="funnel-outline" size={14} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          {/* PRODUCTS LIST - CLEAN BORDERLESS TILES */}
          <View className="px-6">
            {PRODUCTS_DATA.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => router.push(`/products/${product.id}`)}
                className="bg-white rounded-[40px] p-2 mb-6"
              >
                <View className="flex-row items-center">
                  {/* Image Container */}
                  <View className="h-28 w-28 bg-slate-50 rounded-[32px] items-center justify-center">
                    <Image
                      source={{ uri: product.image }}
                      className="h-24 w-24 rounded-[24px]"
                      resizeMode="cover"
                    />
                    {product.tag && (
                      <View className="absolute top-2 left-2 bg-[#F83758] px-2 py-1 rounded-lg">
                        <Text className="text-[10px] font-semibold text-surface-light">
                          {product.tag}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Details Container */}
                  <View className="flex-1 ml-4 pr-4">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text
                          className="text-slate-700 font-semibold text-base leading-tight"
                          numberOfLines={1}
                        >
                          {product.name}
                        </Text>
                        <Text className="text-slate-400 text-[11px] font-medium mt-1">
                          {product.sku}
                        </Text>
                      </View>
                      <View
                        style={{ backgroundColor: product.statusBg }}
                        className="px-2 py-1 rounded-lg"
                      >
                        <Text
                          style={{ color: product.statusColor }}
                          className="text-[8px] font-semibold uppercase tracking-widest"
                        >
                          {product.status.split(" ")[0]}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row justify-between items-center mt-4">
                      <View className="flex-row items-center">
                        <Text className="text-[#F83758] text-lg font-semibold">
                          {product.price}
                        </Text>
                        {product.oldPrice && (
                          <Text className="text-slate-300 text-xs font-medium ml-2 line-through">
                            {product.oldPrice}
                          </Text>
                        )}
                      </View>
                      <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg">
                        <Ionicons name="star" size={10} color="#facc15" />
                        <Text className="text-slate-600 text-[10px] font-semibold ml-1">
                          {product.rating || "4.0"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* FLOATING ACTION BUTTON - FLAT & CLEAN */}
        <TouchableOpacity
          className="absolute bottom-10 right-8 h-16 w-16 bg-[#F83758] rounded-full items-center justify-center"
          onPress={() => router.push(`/products/add-product`)}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaContextWrapper>
  );
}
