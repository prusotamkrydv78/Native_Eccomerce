import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const MOCK_USER = {
  id: "1",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  memberSince: "Member since Jan 2023",
  avatar: "https://i.pravatar.cc/150?u=jane",
  status: "ACTIVE",
  stats: {
    spent: "$4,250",
    orders: "12",
    lastActive: "Oct 24",
  },
  history: [
    {
      id: "1024",
      date: "Oct 24, 2023",
      price: "$120.00",
      status: "Delivered",
      statusColor: "#10b981",
      statusBg: "#ecfdf5",
    },
    {
      id: "1021",
      date: "Sep 12, 2023",
      price: "$45.50",
      status: "Processing",
      statusColor: "#f59e0b",
      statusBg: "#fffbeb",
    },
    {
      id: "998",
      date: "Aug 05, 2023",
      price: "$210.00",
      status: "Delivered",
      statusColor: "#10b981",
      statusBg: "#ecfdf5",
    },
    {
      id: "854",
      date: "Jul 12, 2023",
      price: "$89.99",
      status: "Refunded",
      statusColor: "#ef4444",
      statusBg: "#fef2f2",
    },
  ],
};

export default function UserDetailsScreen() {
  const { userId } = useLocalSearchParams();
  const [isBlocked, setIsBlocked] = useState(false);
  const user = MOCK_USER;

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
            User Details
          </Text>
          <TouchableOpacity className="h-12 w-12 bg-slate-100 rounded-xl items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* PROFILE INFO */}
          <View className="items-center py-2">
            <View className="relative">
              <Image
                source={{ uri: user.avatar }}
                className="h-32 w-32 rounded-full bg-slate-100"
              />
              <View className="absolute bottom-1 right-1 h-8 w-8 bg-emerald-500 rounded-full border-4 border-white" />
            </View>
            <View className="flex-row items-center mt-3">
              <Text className="text-slate-900 text-3xl font-semibold mr-1">
                {user.name}
              </Text>
              <View className="bg-emerald-100 px-3 py-1 rounded-2xl">
                <Text className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                  {user.status}
                </Text>
              </View>
            </View>
            <Text className="text-slate-500 text-base font-medium">
              {user.email}
            </Text>
            <Text className="text-slate-400 text-xs mt-0.5 font-medium">
              {user.memberSince}
            </Text>

            {/* QUICK ACTIONS */}
            <View className="flex-row gap-2 mt-4">
              <TouchableOpacity className="flex-row items-center bg-slate-100 px-8 py-4 rounded-xl">
                <Ionicons name="call" size={18} color="#F83758" />
                <Text className="text-slate-700 font-semibold ml-2">Call</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center bg-slate-100 px-8 py-4 rounded-xl">
                <Ionicons name="mail" size={18} color="#F83758" />
                <Text className="text-slate-700 font-semibold ml-2">Email</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* STATS TILES */}
          <View className="px-4 flex-row justify-between mb-4 mt-2">
            <View className="w-[31%] bg-slate-100 px-4 py-5 rounded-xl items-center justify-center">
              <Text className="text-[#F83758] text-xl font-semibold">
                {user.stats.spent}
              </Text>
              <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1 text-center">
                Total Spent
              </Text>
            </View>
            <View className="w-[31%]  bg-slate-100 px-4 py-5 rounded-xl items-center justify-center">
              <Text className="text-slate-900 text-xl font-semibold">
                {user.stats.orders}
              </Text>
              <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1 text-center">
                Orders
              </Text>
            </View>
            <View className="w-[31%] bg-slate-100 px-4 py-5 rounded-xl items-center justify-center">
              <Text className="text-slate-900 text-xl font-semibold">
                {user.stats.lastActive}
              </Text>
              <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1 text-center">
                Last Active
              </Text>
            </View>
          </View>

          {/* BLOCK TOGGLE */}
          <View className="px-4 mb-4">
            <View className="bg-slate-100 rounded-xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-12 w-12 bg-white rounded-xl items-center justify-center shadow-sm shadow-slate-200">
                  <Ionicons name="ban-outline" size={24} color="#ef4444" />
                </View>
                <View className="ml-4">
                  <Text className="text-slate-900 text-base font-semibold">
                    Block User Access
                  </Text>
                  <Text className="text-slate-400 text-xs mt-0.5 font-medium">
                    Prevent login access
                  </Text>
                </View>
              </View>
              <Switch
                value={isBlocked}
                onValueChange={setIsBlocked}
                trackColor={{ false: "#e2e8f0", true: "#F83758" }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* ORDER HISTORY */}
          <View className="px-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-900 text-xl font-semibold">
                Order History
              </Text>
              <TouchableOpacity>
                <Text className="text-[#F83758] text-xs font-semibold uppercase tracking-widest">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {user.history.map((order) => (
              <View
                key={order.id}
                className="bg-slate-100 rounded-xl p-4 mb-2 flex-row items-center"
              >
                <View className="h-14 w-14 bg-white rounded-xl items-center justify-center shadow-sm shadow-slate-100">
                  <Ionicons
                    name={
                      order.status === "Refunded"
                        ? "refresh"
                        : "bag-handle-outline"
                    }
                    size={22}
                    color="#94a3b8"
                  />
                </View>
                <View className="flex-1 ml-2">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-slate-900 font-semibold text-base">
                        Order #{order.id}
                      </Text>
                      <Text className="text-slate-400 text-xs mt-0.5 font-medium">
                        {order.date}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-slate-900 font-semibold text-base">
                        {order.price}
                      </Text>
                      <View
                        style={{ backgroundColor: order.statusBg }}
                        className="px-2 py-1 rounded-xl mt-2"
                      >
                        <Text
                          style={{ color: order.statusColor }}
                          className="text-[9px] font-bold uppercase tracking-wider"
                        >
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
