import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const ORDERS_DATA = [
  {
    id: "ORD-3920",
    date: "Today, 10:30 AM",
    customer: "John Doe",
    items: "2 items",
    category: "Electronics",
    price: "$124.50",
    status: "Shipped",
    statusColor: "#8b5cf6",
    statusBg: "#f5f3ff",
    avatar: "https://i.pravatar.cc/150?u=john",
    hasTrack: true,
  },
  {
    id: "ORD-3919",
    date: "Today, 09:15 AM",
    customer: "Sarah Smith",
    items: "1 item",
    category: "Home Decor",
    price: "$45.00",
    status: "Pending",
    statusColor: "#f59e0b",
    statusBg: "#fffbeb",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    hasTrack: false,
  },
  {
    id: "ORD-3918",
    date: "Yesterday, 4:45 PM",
    customer: "Mike Ross",
    items: "4 items",
    category: "Accessories",
    price: "$210.00",
    status: "Delivered",
    statusColor: "#10b981",
    statusBg: "#ecfdf5",
    avatar: "https://i.pravatar.cc/150?u=mike",
    hasTrack: false,
  },
  {
    id: "ORD-3917",
    date: "Yesterday, 2:15 PM",
    customer: "Jessica Pearson",
    items: "1 item",
    category: "Beauty",
    price: "$89.99",
    status: "Cancelled",
    statusColor: "#ef4444",
    statusBg: "#fef2f2",
    avatar: "https://i.pravatar.cc/150?u=jessica",
    hasTrack: false,
  },
];

const FILTER_OPTIONS = ["All", "Pending", "Shipped", "Delivered"];

export default function OrdersScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-6 py-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
              <Ionicons name="grid-outline" size={20} color="#171717" />
            </TouchableOpacity>
            <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
              <Ionicons name="bag-handle-outline" size={20} color="#F83758" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="h-11 w-11 rounded-2xl bg-slate-200 overflow-hidden">
            <View className="bg-teal-500/20 h-full w-full items-center justify-center">
              <Ionicons name="person" size={22} color="#0d9488" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* TITLE */}
          <View className="px-6 py-4">
            <Text className="text-slate-900 text-3xl font-semibold">
              Order List
            </Text>
          </View>

          {/* SEARCH BAR */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center bg-slate-50 rounded-2xl px-5 py-3.5">
              <Ionicons name="search-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder="Search"
                className="flex-1 ml-3 text-slate-700 font-medium"
                placeholderTextColor="#94a3b8"
              />
              <Ionicons name="mic-outline" size={20} color="#94a3b8" />
            </View>
          </View>

          {/* FILTERS */}
          <View className="mb-8">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {FILTER_OPTIONS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`mr-3 px-8 py-3.5 rounded-2xl ${
                    activeFilter === filter ? "bg-black" : "bg-slate-50"
                  }`}
                >
                  <Text
                    className={`font-semibold text-xs ${
                      activeFilter === filter
                        ? "text-surface-light"
                        : "text-slate-500"
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* ORDERS LIST */}
          <View className="px-6">
            {ORDERS_DATA.map((order) => (
              <View key={order.id} className="bg-white rounded-[40px] p-6 mb-6">
                {/* Order Meta */}
                <View className="flex-row justify-between items-center mb-6">
                  <View>
                    <Text className="text-slate-900 font-semibold text-base">
                      Order #{order.id}
                    </Text>
                    <Text className="text-slate-400 text-xs mt-1 font-medium">
                      {order.date}
                    </Text>
                  </View>
                  <View
                    style={{ backgroundColor: order.statusBg }}
                    className="px-4 py-2 rounded-xl"
                  >
                    <Text
                      style={{ color: order.statusColor }}
                      className="text-[10px] font-semibold uppercase tracking-widest"
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>

                {/* Customer Info */}
                <View className="flex-row items-center mb-8">
                  <Image
                    source={{ uri: order.avatar }}
                    className="h-14 w-14 rounded-2xl bg-slate-50"
                  />
                  <View className="flex-1 ml-4">
                    <Text className="text-slate-900 font-semibold text-lg">
                      {order.customer}
                    </Text>
                    <Text className="text-slate-400 text-xs mt-1 font-medium">
                      {order.items} • {order.category}
                    </Text>
                  </View>
                  <Text className="text-[#F83758] text-xl font-semibold">
                    {order.price}
                  </Text>
                </View>

                {/* Actions */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => router.push(`/orders/${order.id}`)}
                    className={`flex-1 py-4 rounded-2xl items-center justify-center ${order.hasTrack ? "bg-slate-50" : "bg-slate-50 w-full"}`}
                  >
                    <Text className="text-slate-500 font-semibold text-xs">
                      Details
                    </Text>
                  </TouchableOpacity>
                  {order.hasTrack && (
                    <TouchableOpacity className="flex-1 bg-[#F83758] py-4 rounded-2xl items-center justify-center">
                      <Text className="text-surface-light font-semibold text-xs">
                        Track
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
