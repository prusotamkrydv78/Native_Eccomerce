import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../../components/ui/Screen";
import GlassCard from "../../../components/ui/GlassCard";

export default function Help() {
  const faqs = [
    { q: "How do I track my order?", a: "Open Profile → Orders → Track." },
    { q: "Can I cancel an order?", a: "Dummy flow for now (backend later)." },
    { q: "Refund policy?", a: "Refunds depend on product category and condition." },
  ];

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-11 w-11 rounded-2xl bg-white/10 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={20} color="#E2E8F0" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold">Help</Text>
            <View className="h-11 w-11" />
          </View>

          <GlassCard className="p-4 mt-4">
            <Text className="text-white font-semibold text-base">Support</Text>
            <Text className="text-slate-400 text-sm font-medium mt-2">
              We’re here to help. Browse FAQs or contact us.
            </Text>

            <View className="flex-row items-center mt-4">
              <View className="h-10 w-10 rounded-2xl bg-white/10 items-center justify-center">
                <Ionicons name="mail" size={16} color="#E2E8F0" />
              </View>
              <Text className="text-slate-200 font-semibold ml-3">support@neo.com</Text>
            </View>
          </GlassCard>

          <View className="mt-3">
            {faqs.map((f) => (
              <GlassCard key={f.q} className="p-4 mb-3">
                <Text className="text-white font-semibold">{f.q}</Text>
                <Text className="text-slate-400 text-sm font-medium mt-2">
                  {f.a}
                </Text>
              </GlassCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
