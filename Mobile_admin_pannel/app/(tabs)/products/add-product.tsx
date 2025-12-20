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

export default function AddProductScreen() {
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
            Add Product
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
          {/* IMAGE UPLOAD SECTION */}
          <View className="px-6 mt-4">
            <View className="h-64 bg-slate-50 rounded-[40px] items-center justify-center overflow-hidden">
              <View className="items-center">
                <View className="h-16 w-16 bg-white rounded-3xl items-center justify-center mb-4">
                  <Ionicons
                    name="cloud-upload-outline"
                    size={32}
                    color="#F83758"
                  />
                </View>
                <Text className="text-slate-400    text-sm tracking-tight">
                  Upload Product Images
                </Text>
                <Text className="text-slate-300 text-xs mt-1">
                  Tap to select from gallery
                </Text>
              </View>
            </View>
            {/* Pagination Dots Placeholder */}
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
                placeholder="Product Name"
                className="flex-1 text-slate-800 font-medium"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Category */}
            <View className="flex-row items-center bg-slate-50 rounded-[28px] px-6 py-4 mb-4">
              <View className="h-10 w-10 bg-white rounded-2xl items-center justify-center mr-4">
                <Ionicons name="apps-outline" size={20} color="#64748b" />
              </View>
              <Text className="flex-1 text-slate-400 font-medium">
                Select Category
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
                  placeholder="Price"
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
                  placeholder="Stock"
                  keyboardType="numeric"
                  className="flex-1 text-slate-800 font-medium"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            {/* Description */}
            <View className="bg-slate-50 rounded-[32px] px-6 py-5 mb-8">
              <TextInput
                placeholder="Experience world-class silence and superior sound with our latest noise-cancelling technology..."
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
                <Text className="text-slate-700 text-base">Active Listing</Text>
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
        <View className="px-6 py-6  flex-row justify-between items-center">
          <TouchableOpacity className="bg-slate-50 py-4 px-8 rounded-[24px]">
            <Text className="text-slate-400 ">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 ml-4 bg-[#F83758] py-4 rounded-[24px] flex-row items-center justify-center">
            <Ionicons
              name="checkmark"
              size={20}
              color="white"
              className="mr-2"
            />
            <Text className="text-[#fff]  ml-2">Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContextWrapper>
  );
}
