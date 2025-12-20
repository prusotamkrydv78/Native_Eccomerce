import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function EditProductScreen() {
  const [isActive, setIsActive] = useState(true);

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-6 py-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-12 w-12 bg-slate-50 rounded-2xl items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="#171717" />
          </TouchableOpacity>
          <Text className="text-slate-700 text-xl font-semibold">
            Edit Product
          </Text>
          <TouchableOpacity className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
            <View className="bg-[#facc15]/30 h-full w-full items-center justify-center">
              <Ionicons name="person" size={20} color="#854d0e" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* IMAGE SECTION */}
          <View className="px-6 mt-4">
            <View className="relative h-64 bg-slate-50 rounded-[40px] overflow-hidden">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
              <TouchableOpacity className="absolute top-4 right-4 h-10 w-10 bg-white rounded-full items-center justify-center">
                <Ionicons name="pencil" size={18} color="#171717" />
              </TouchableOpacity>
            </View>
            {/* Pagination Dots */}
            <View className="flex-row justify-center mt-6">
              <View className="h-1.5 w-6 bg-[#F83758] rounded-full mx-1" />
              <View className="h-1.5 w-1.5 bg-slate-200 rounded-full mx-1" />
              <View className="h-1.5 w-1.5 bg-slate-200 rounded-full mx-1" />
            </View>
          </View>

          {/* INPUT FIELDS */}
          <View className="px-6 mt-10">
            {/* Name */}
            <View className="flex-row items-center bg-slate-50 rounded-[28px] px-6 py-4 mb-4">
              <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mr-4">
                <Ionicons name="briefcase-outline" size={20} color="#64748b" />
              </View>
              <TextInput
                defaultValue="Wireless Headphones"
                className="flex-1 text-slate-800 font-medium"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Category */}
            <View className="flex-row items-center bg-slate-50 rounded-[28px] px-6 py-4 mb-4">
              <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mr-4">
                <Ionicons name="apps-outline" size={20} color="#64748b" />
              </View>
              <Text className="flex-1 text-slate-800 font-medium">
                Electronics
              </Text>
              <Ionicons name="chevron-down" size={20} color="#94a3b8" />
            </View>

            {/* Price & Stock Row */}
            <View className="flex-row justify-between mb-4">
              <View className="w-[48%] flex-row items-center bg-slate-50 rounded-[28px] px-6 py-4">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mr-3">
                  <Ionicons name="logo-usd" size={18} color="#64748b" />
                </View>
                <TextInput
                  defaultValue="299.99"
                  keyboardType="numeric"
                  className="flex-1 text-slate-800 font-medium"
                  placeholderTextColor="#94a3b8"
                />
              </View>
              <View className="w-[48%] flex-row items-center bg-slate-50 rounded-[28px] px-6 py-4">
                <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mr-3">
                  <Ionicons name="archive-outline" size={20} color="#64748b" />
                </View>
                <TextInput
                  defaultValue="45"
                  keyboardType="numeric"
                  className="flex-1 text-slate-800 font-medium"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            {/* Description */}
            <View className="bg-slate-50 rounded-[32px] px-6 py-5 mb-8">
              <TextInput
                defaultValue="Experience world-class silence and superior sound with our latest noise-cancelling technology. Perfect for travel or office use."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="text-slate-600 font-medium leading-6 h-24"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Toggle */}
            <View className="flex-row justify-between items-center px-4 mb-4">
              <View>
                <Text className="text-slate-700 font-semibold text-base">
                  Active Listing
                </Text>
                <Text className="text-slate-400 text-xs mt-0.5">
                  Visible to customers
                </Text>
              </View>
              <Switch
                value={isActive}
                onValueChange={setIsActive}
                trackColor={{ false: "#e2e8f0", true: "#F83758" }}
                thumbColor="white"
              />
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM ACTIONS */}
        <View className="px-6 py-6 border-t border-slate-50 flex-row justify-between items-center">
          <TouchableOpacity className="bg-slate-50 py-4 px-8 rounded-[24px] flex-row items-center">
            <Ionicons
              name="trash-outline"
              size={20}
              color="#64748b"
              className="mr-2"
            />
            <Text className="text-slate-500 font-semibold ml-2">Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 ml-4 bg-[#F83758] py-4 rounded-[24px] flex-row items-center justify-center">
            <Ionicons
              name="checkmark"
              size={20}
              color="white"
              className="mr-2"
            />
            <Text className="text-surface-light font-semibold ml-2">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContextWrapper>
  );
}
