import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const FAQ = [
  {
    id: "1",
    q: "How do I add a new product?",
    a: "Go to Inventory > Add Product and fill the product details.",
  },
  {
    id: "2",
    q: "Where can I track an order?",
    a: "Open Orders > select an order > Track.",
  },
  {
    id: "3",
    q: "How do I reset my password?",
    a: "Open Settings > Change Password and follow the steps.",
  },
];

export default function HelpScreen() {
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
          <Text className="text-slate-900 text-xl font-semibold">Help</Text>
          <View className="h-12 w-12" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-4 mt-2">
            <View className="bg-slate-50 rounded-xl p-4">
              <View className="flex-row items-center">
                <View className="h-12 w-12 bg-white rounded-xl items-center justify-center">
                  <Ionicons name="help-circle-outline" size={22} color="#64748b" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-slate-900 text-lg font-semibold">
                    Support
                  </Text>
                  <Text className="text-slate-400 text-xs font-medium mt-0.5">
                    Quick answers for common tasks
                  </Text>
                </View>
              </View>
            </View>

            <View className="mt-3">
              {FAQ.map((item) => (
                <View key={item.id} className="bg-slate-50 rounded-xl p-4 mb-2">
                  <Text className="text-slate-900 font-semibold text-base">
                    {item.q}
                  </Text>
                  <Text className="text-slate-500 text-sm mt-1">{item.a}</Text>
                </View>
              ))}
            </View>

            <View className="bg-slate-100 rounded-xl p-4 mt-2">
              <Text className="text-slate-700 font-semibold text-base">
                Contact
              </Text>
              <Text className="text-slate-400 text-xs font-medium mt-1">
                support@stylish-app.com
              </Text>
              <Text className="text-slate-400 text-xs font-medium mt-1">
                +977 98XXXXXXXX
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
