import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function AnalysisScreen() {
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
          <Text className="text-slate-900 text-xl font-semibold">Analysis</Text>
          <View className="h-12 w-12" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-4 mt-2">
            <View className="bg-slate-50 rounded-xl p-4">
              <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                Summary
              </Text>
              <Text className="text-slate-900 text-2xl font-semibold mt-2">
                Sales Performance
              </Text>
              <Text className="text-slate-400 text-sm font-medium mt-1">
                This screen is a placeholder for charts and KPIs.
              </Text>
            </View>

            <View className="flex-row justify-between mt-3">
              <View className="w-[48%] bg-slate-100 rounded-xl p-4">
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Orders
                </Text>
                <Text className="text-slate-900 text-2xl font-semibold mt-2">
                  128
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="trending-up" size={16} color="#10b981" />
                  <Text className="text-emerald-600 text-xs font-semibold ml-2">
                    +8.2%
                  </Text>
                </View>
              </View>
              <View className="w-[48%] bg-slate-100 rounded-xl p-4">
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Revenue
                </Text>
                <Text className="text-slate-900 text-2xl font-semibold mt-2">
                  $3,420
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="trending-up" size={16} color="#10b981" />
                  <Text className="text-emerald-600 text-xs font-semibold ml-2">
                    +3.4%
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-slate-100 rounded-xl p-4 mt-3">
              <Text className="text-slate-700 font-semibold text-base">
                Next step
              </Text>
              <Text className="text-slate-400 text-sm mt-1">
                Tell me what charts/KPIs you want here and I’ll implement them.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
