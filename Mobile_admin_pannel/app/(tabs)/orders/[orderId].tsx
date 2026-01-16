import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const MOCK_ORDER = {
  id: "#849201",
  date: "Oct 24, 2023",
  status: "Processing Order",
  paymentStatus: "Paid",
  paymentMethod: "Stripe",
  customer: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=jane",
    address: "123 Market St, San Francisco, CA 94103",
  },
  items: [
    {
      id: "1",
      name: "Wireless Headphones",
      details: "Black • Size: Standard",
      price: "$50.00",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    },
    {
      id: "2",
      name: "Ceramic Mug Set",
      details: "White • Size: Set of 2",
      price: "$25.00",
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?w=200&q=80",
    },
  ],
  summary: {
    subtotal: "$100.00",
    tax: "$5.00",
    shipping: "$10.00",
    total: "$115.00",
  },
};

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDER;

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-4 py-2 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-12 w-12 bg-slate-100 rounded-xl items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="#171717" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-xl font-semibold">
            Order Details
          </Text>
          <TouchableOpacity className="h-12 w-12 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Order Meta Info */}
          <View className="px-4 py-4">
            <Text className="text-slate-400 text-xs font-medium ">
              Order No.
            </Text>
            <View className="flex-row justify-between items-end">
              <Text className="text-slate-900 text-3xl font-semibold">
                {order.id}
              </Text>
              <Text className="text-slate-400 text-xs font-semibold ">
                {order.date}
              </Text>
            </View>
          </View>

          {/* Payment Status Card */}
          <View className="px-4 mb-2">
            <View className="bg-slate-100 rounded-xl p-4 flex-row items-center">
              <View className="h-12 w-12 bg-emerald-100 rounded-xl items-center justify-center">
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-slate-900 font-semibold text-base">
                  Payment Verified
                </Text>
                <Text className="text-slate-400 text-xs  font-medium">
                  Payment confirmed via {order.paymentMethod}
                </Text>
              </View>
              <View className="bg-emerald-100 px-3 py-1.5 rounded-md">
                <Text className="text-emerald-700 text-[10px] font-bold tracking-widest uppercase">
                  {order.paymentStatus}
                </Text>
              </View>
            </View>
          </View>

          {/* Order Status Section */}
          <View className="px-4 mb-4">
            <Text className="text-slate-900 text-lg font-semibold mb-1">
              Order Status
            </Text>
            <TouchableOpacity className="bg-slate-100 rounded-xl px-4 py-4 flex-row justify-between items-center">
              <Text className="text-slate-600 font-medium">{order.status}</Text>
              <Ionicons name="chevron-down" size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Items List */}
          <View className="px-4 mb-2">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-900 text-lg font-semibold">
                Items
              </Text>
              <Text className="text-slate-400 text-sm font-semibold">
                {order.items.length} Items
              </Text>
            </View>
            {order.items.map((item) => (
              <View
                key={item.id}
                className="bg-slate-100/50 rounded-xl p-2 mb-2 flex-row items-center"
              >
                <Image
                  source={{ uri: item.image }}
                  className="h-20 w-20 rounded-xl bg-slate-100"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-2">
                  <Text
                    className="text-slate-900 font-semibold text-base"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-slate-400 text-xs mt-0.5 font-medium">
                    {item.details}
                  </Text>
                  <View className="flex-row justify-between items-center mt-3 pr-4">
                    <Text className="text-slate-400 text-xs font-semibold">
                      Qty: {item.qty}
                    </Text>
                    <Text className="text-slate-900 font-semibold text-base">
                      {item.price}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Shipping Details */}
          <View className="px-4 mb-2">
            <Text className="text-slate-900 text-lg font-semibold mb-2">
              Shipping Details
            </Text>
            <View className="bg-slate-100 rounded-xl p-4">
              <View className="flex-row items-center mb-4">
                <Image
                  source={{ uri: order.customer.avatar }}
                  className="h-12 w-12 rounded-xl"
                />
                <View className="ml-2">
                  <View className="flex-row items-center">
                    <Text className="text-slate-900 font-semibold text-base mr-1">
                      {order.customer.name}
                    </Text>
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color="#F83758"
                    />
                  </View>
                  <Text className="text-slate-400 text-xs mt-0.5 font-medium">
                    {order.customer.email}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start">
                <View className="h-10 w-10 bg-white rounded-xl items-center justify-center">
                  <Ionicons name="location-outline" size={18} color="#F83758" />
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-slate-900 font-semibold text-sm">
                    123 Market St
                  </Text>
                  <Text className="text-slate-400 text-xs mt-1 font-medium">
                    San Francisco, CA 94103
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="px-4 flex-row gap-2 mb-2">
            <TouchableOpacity className="flex-1 bg-slate-100 py-4 rounded-xl items-center justify-center">
              <Text className="text-slate-400 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-[1.5] bg-[#F83758] py-4 rounded-xl items-center justify-center">
              <Text className="text-surface-light font-semibold">
                Mark Shipped
              </Text>
            </TouchableOpacity>
          </View>

          {/* Order Summary */}
          <View className="mx-4 px-2 py-2 bg-slate-100 rounded-xl">
            <Text className="text-slate-900 text-lg font-semibold mb-2">
              Order Summary
            </Text>
            <View className="space-y-4">
              <View className="flex-row justify-between">
                <Text className="text-slate-400 font-medium">Subtotal</Text>
                <Text className="text-slate-900 font-semibold">
                  {order.summary.subtotal}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-slate-400 font-medium">Tax (5%)</Text>
                <Text className="text-slate-900 font-semibold">
                  {order.summary.tax}
                </Text>
              </View>
              <View className="flex-row justify-between mb-4">
                <Text className="text-slate-400 font-medium">Shipping</Text>
                <Text className="text-slate-900 font-semibold">
                  {order.summary.shipping}
                </Text>
              </View>
              <View className="h-[1px] bg-slate-400/50 w-full my-2" />
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-900 text-xl font-semibold">
                  Total
                </Text>
                <Text className="text-[#F83758] text-2xl font-bold">
                  {order.summary.total}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
