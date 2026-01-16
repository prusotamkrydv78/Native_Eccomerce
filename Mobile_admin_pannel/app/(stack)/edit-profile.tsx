import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function EditProfileScreen() {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("admin@stylish-app.com");

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
            Edit Profile
          </Text>
          <View className="h-12 w-12" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-4 mt-3">
            <View className="bg-slate-100 rounded-xl px-4 py-3 mb-2">
              <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="text-slate-900 font-semibold text-base mt-1"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View className="bg-slate-100 rounded-xl px-4 py-3 mb-2">
              <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="text-slate-900 font-semibold text-base mt-1"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-[#F83758] py-4 rounded-xl items-center justify-center mt-2"
            >
              <Text className="text-surface-light font-semibold text-base">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
