import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../../components/ui/Screen";
import GlassCard from "../../../components/ui/GlassCard";
import NeonButton from "../../../components/ui/NeonButton";
import { useCart } from "../../../store/cart";

export default function Checkout() {
  const { subtotal, clear, items } = useCart();
  const [name, setName] = useState("Nova User");
  const [address, setAddress] = useState("Neo Street 404, Cyber City");

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
            <Text className="text-white text-xl font-semibold">Checkout</Text>
            <View className="h-11 w-11" />
          </View>

          <GlassCard className="p-4 mt-4">
            <Text className="text-white font-semibold text-base">Shipping</Text>

            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-4">
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor="#64748b"
              className="text-white font-semibold text-base mt-2"
            />

            <View className="h-[1px] bg-white/10 my-4" />

            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
              Address
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Delivery address"
              placeholderTextColor="#64748b"
              className="text-white font-semibold text-base mt-2"
            />
          </GlassCard>

          <GlassCard className="p-4 mt-3">
            <Text className="text-white font-semibold text-base">Summary</Text>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-slate-300 font-semibold">Items</Text>
              <Text className="text-white font-semibold">{items.length}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-slate-300 font-semibold">Subtotal</Text>
              <Text className="text-white font-semibold">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-slate-300 font-semibold">Shipping</Text>
              <Text className="text-white font-semibold">$5.00</Text>
            </View>
            <View className="h-[1px] bg-white/10 my-3" />
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-semibold">Total</Text>
              <Text className="text-white font-semibold">
                ${(subtotal + 5).toFixed(2)}
              </Text>
            </View>
          </GlassCard>

          <NeonButton
            title="Place order"
            onPress={() => {
              clear();
              router.push("/(tabs)/(stack)/orders" as any);
            }}
            className="mt-4"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
