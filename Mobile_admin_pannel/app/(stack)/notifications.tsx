import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New order received",
    body: "Order ORD-3920 was placed successfully.",
    time: "2m ago",
    icon: "receipt-outline",
    color: "#6366f1",
    bg: "#EEF2FF",
    unread: true,
  },
  {
    id: "2",
    title: "Low stock alert",
    body: "Mechanical Keyboard is running low.",
    time: "1h ago",
    icon: "alert-circle-outline",
    color: "#f59e0b",
    bg: "#FFFBEB",
    unread: true,
  },
  {
    id: "3",
    title: "Payout processed",
    body: "Your last payout has been processed.",
    time: "Yesterday",
    icon: "card-outline",
    color: "#10b981",
    bg: "#ECFDF5",
    unread: false,
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        <View className="px-4 py-2 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-12 w-12 bg-slate-100 rounded-xl items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="#171717" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-xl font-semibold">
            Notifications
          </Text>
          <View className="h-12 w-12" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-4 mt-2">
            {NOTIFICATIONS.map((n) => (
              <TouchableOpacity
                key={n.id}
                className="bg-slate-50 rounded-xl p-4 mb-2 flex-row"
              >
                <View
                  style={{ backgroundColor: n.bg }}
                  className="h-12 w-12 rounded-xl items-center justify-center"
                >
                  <Ionicons name={n.icon as any} size={22} color={n.color} />
                </View>
                <View className="flex-1 ml-3">
                  <View className="flex-row justify-between items-start">
                    <Text
                      className="text-slate-900 font-semibold text-base"
                      numberOfLines={1}
                    >
                      {n.title}
                    </Text>
                    <Text className="text-slate-400 text-xs font-medium">
                      {n.time}
                    </Text>
                  </View>
                  <Text className="text-slate-500 text-sm mt-1" numberOfLines={2}>
                    {n.body}
                  </Text>
                </View>
                {n.unread && (
                  <View className="h-2 w-2 bg-[#F83758] rounded-full mt-2" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
