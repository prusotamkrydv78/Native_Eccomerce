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

const USERS_DATA = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.r@example.com",
    role: "Admin",
    roleColor: "#ef4444",
    roleBg: "#fef2f2",
    avatar: "https://i.pravatar.cc/150?u=alex",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Jones",
    email: "sarah.j@example.com",
    role: null,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen88@example.com",
    role: "Blocked",
    roleColor: "#64748b",
    roleBg: "#f1f5f9",
    avatar: "https://i.pravatar.cc/150?u=michael",
    status: "blocked",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Admin",
    roleColor: "#ef4444",
    roleBg: "#fef2f2",
    avatar: "https://i.pravatar.cc/150?u=emily",
    status: "active",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    role: null,
    avatar: "https://i.pravatar.cc/150?u=david",
    status: "active",
  },
  {
    id: "6",
    name: "Anna Lee",
    email: "anna.lee@example.com",
    role: null,
    avatar: "https://i.pravatar.cc/150?u=anna",
    status: "active",
  },
];

const FILTER_OPTIONS = ["All Users", "Active", "Blocked", "Admin"];

export default function UserListScreen() {
  const [activeFilter, setActiveFilter] = useState("All Users");

  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-6 py-8 flex-row justify-between items-start">
          <View>
            <Text className="text-slate-900 text-3xl font-semibold">
              User List
            </Text>
            <Text className="text-slate-400 text-sm mt-1 font-medium">
              Manage your team members
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity className="h-12 w-12 bg-slate-50 rounded-2xl items-center justify-center mr-3 relative">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#171717"
              />
              <View className="absolute top-3 right-3 h-2 w-2 bg-black rounded-full border border-white" />
            </TouchableOpacity>
            <TouchableOpacity className="h-12 w-12 bg-[#F83758] rounded-2xl items-center justify-center shadow-lg shadow-[#F83758]/30">
              <Ionicons name="add" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* SEARCH BAR */}
          <View className="px-6 mb-8">
            <View className="flex-row items-center bg-slate-50 rounded-[24px] px-6 py-4">
              <Ionicons name="search-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder="Search any user..."
                className="flex-1 ml-4 text-slate-700 font-medium"
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity>
                <Ionicons name="filter-outline" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* FILTERS */}
          <View className="mb-10">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {FILTER_OPTIONS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`mr-3 px-8 py-3.5 rounded-[20px] ${
                    activeFilter === filter ? "bg-[#F83758]" : "bg-slate-50"
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

          {/* USERS LIST */}
          <View className="px-6">
            {USERS_DATA.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => router.push(`/users/${user.id}`)}
                className="bg-slate-50/50 rounded-[32px] p-5 mb-5 flex-row items-center"
              >
                <View className="relative">
                  <Image
                    source={{ uri: user.avatar }}
                    className="h-16 w-16 rounded-[24px] bg-slate-50"
                  />
                  <View
                    className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${user.status === "active" ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                </View>

                <View className="flex-1 ml-4">
                  <View className="flex-row items-center">
                    <Text className="text-slate-900 font-semibold text-lg mr-2">
                      {user.name}
                    </Text>
                    {user.role && (
                      <View
                        style={{ backgroundColor: user.roleBg }}
                        className="px-2 py-0.5 rounded-lg"
                      >
                        <Text
                          style={{ color: user.roleColor }}
                          className="text-[8px] font-bold uppercase tracking-wider"
                        >
                          {user.role}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-slate-400 text-xs mt-1 font-medium">
                    {user.email}
                  </Text>
                </View>

                <TouchableOpacity className="h-10 w-10 items-center justify-center">
                  <Ionicons
                    name="ellipsis-vertical"
                    size={18}
                    color="#cbd5e1"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
}
