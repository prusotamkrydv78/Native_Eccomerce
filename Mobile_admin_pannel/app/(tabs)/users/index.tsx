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
        <View className="px-4 py-2 flex-row justify-between items-start">
          <View>
            <Text className="text-slate-900 text-3xl font-semibold">
              User List
            </Text>
            <Text className="text-slate-400 text-sm font-medium">
              Manage your team members
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity className="h-12 w-12 mr-2 bg-slate-100 rounded-xl items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#171717"
              />
              <View className="absolute top-3 right-3 h-2 w-2 bg-[#F83758] rounded-full " />
            </TouchableOpacity>
            <TouchableOpacity className="h-12 w-12 bg-[#F83758] rounded-xl items-center justify-center shadow-lg shadow-[#F83758]/30">
              <Ionicons name="add" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* SEARCH BAR */}
          <View className="px-4 mb-2">
            <View className="flex-row items-center bg-slate-100 rounded-xl px-4 py-2">
              <Ionicons name="search-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder="Search any user..."
                className="flex-1 ml-3 text-slate-700 font-medium"
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity>
                <Ionicons name="filter-outline" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* FILTERS */}
          <View className="mb-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 14 }}
            >
              {FILTER_OPTIONS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`mr-2 px-4 py-3.5 rounded-xl ${
                    activeFilter === filter ? "bg-[#F83758]" : "bg-slate-100"
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
          <View className="px-4">
            {USERS_DATA.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => router.push(`/users/${user.id}`)}
                className="bg-slate-100 rounded-xl p-4 px-2 mb-2 flex-row items-center"
              >
                <View className="relative">
                  <Image
                    source={{ uri: user.avatar }}
                    className="h-16 w-16 rounded-xl bg-slate-200"
                  />
                  <View
                    className={`absolute -bottom-1  -right-1 h-4 w-4 rounded-full border-2 border-white ${user.status === "active" ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                </View>

                <View className="flex-1 ml-2">
                  <View className="flex-row items-center">
                    <Text className="text-slate-900 font-semibold text-lg mr-2">
                      {user.name}
                    </Text>
                    {user.role && (
                      <View
                        style={{ backgroundColor: user.roleBg }}
                        className="px-2 py-0.5 rounded-xl"
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
                  <Text className="text-slate-400 text-xs font-medium">
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
