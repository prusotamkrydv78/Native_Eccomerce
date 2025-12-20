import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaContextWrapper>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-white">
        {/* HEADER SECTION - REFINED & BORDERLESS */}
        <View className="px-6 pt-6 pb-4 flex-row justify-between items-center bg-white">
          <View>
            <Text className="text-slate-400 text-xs  uppercase tracking-widest">
              Internal Control
            </Text>
            <Text className="text-neutral-800 text-2xl font-bold">
              Management
            </Text>
          </View>
          <View className="flex-row ">
            <TouchableOpacity className="h-12 w-12 bg-slate-50 rounded-2xl items-center justify-center">
              <Ionicons name="search-outline" size={22} color="#171717" />
            </TouchableOpacity>
            <TouchableOpacity className="h-12 w-12 bg-slate-50 rounded-2xl items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#171717"
              />
              <View className="absolute top-3 right-3 h-3 w-3 bg-[#F83758] rounded-full " />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="pb-10">
            {/* MAIN REVENUE CARD - RADIANT STYLE */}
            <View className="px-6 mt-4">
              <LinearGradient
                colors={["#F83758", "#FF6B8B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 40,
                  padding: 32,
                }}
              >
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white/70 text-xs font-bold uppercase tracking-[2px]">
                      Portfolio Value
                    </Text>
                    <Text className="text-white text-4xl font-bold tracking-tighter">
                      $12,450.00
                    </Text>
                  </View>
                </View>

                <View className="mt-8 flex-row items-center justify-between">
                  <View className="flex-row items-center bg-white/10 px-4 py-2 rounded-2xl">
                    <Ionicons name="trending-up" size={16} color="green" />
                    <Text className="text-white text-xs font-bold ml-2">
                      +12.5% increase
                    </Text>
                  </View>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-white text-xs font-bold mr-1">
                      ANALYSIS
                    </Text>
                    <Ionicons name="chevron-forward" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              {/* Subtle colored glow instead of gray shadow */}
              <View className="h-4 bg-[#F83758]/10 mx-10 rounded-b-full scale-x-90" />
            </View>

            {/* LIVE METRICS - BORDERLESS TILE DESIGN */}
            <View className="mt-12 px-6">
              <View className="flex-row justify-between items-center mb-8">
                <View>
                  <Text className="text-neutral-900 text-xl font-bold tracking-tight">
                    Live Inventory
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <View className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-2" />
                    <Text className="text-slate-400 text-xs font-medium">
                      Real-time store updates
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="py-2 px-4 bg-slate-50 rounded-2xl">
                  <Text className="text-[#F83758] text-xs font-bold uppercase tracking-wider">
                    Manage
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between">
                {/* Sale Tile */}
                <View className="w-[31%] bg-blue-50/40 p-5 rounded-[40px] items-center">
                  <View className="h-14 w-14 bg-white rounded-3xl items-center justify-center mb-4">
                    <Ionicons name="flash" size={24} color="#3b82f6" />
                  </View>
                  <Text className="text-blue-900/40 text-[9px] font-bold uppercase tracking-[2px] mb-1">
                    Sales
                  </Text>
                  <Text className="text-blue-900 text-2xl font-bold">145</Text>
                </View>

                {/* Pending Tile */}
                <View className="w-[31%] bg-amber-50/40 p-5 rounded-[40px] items-center">
                  <View className="h-14 w-14 bg-white rounded-3xl items-center justify-center mb-4">
                    <Ionicons name="time" size={24} color="#f59e0b" />
                  </View>
                  <Text className="text-amber-900/40 text-[9px] font-bold uppercase tracking-[2px] mb-1">
                    Pending
                  </Text>
                  <Text className="text-amber-900 text-2xl font-bold">12</Text>
                </View>

                {/* Stock Tile */}
                <View className="w-[31%] bg-emerald-50/40 p-5 rounded-[40px] items-center">
                  <View className="h-14 w-14 bg-white rounded-3xl items-center justify-center mb-4">
                    <Ionicons name="cube" size={24} color="#10b981" />
                  </View>
                  <Text className="text-emerald-900/40 text-[9px] font-bold uppercase tracking-[2px] mb-1">
                    Products
                  </Text>
                  <Text className="text-emerald-900 text-2xl font-bold">
                    482
                  </Text>
                </View>
              </View>
            </View>

            {/* QUICK ACTIONS - RADIANT TILES */}
            <View className="px-6 mt-16 pb-2">
              <View className="flex-row items-center mb-8">
                <Text className="text-neutral-900 text-xl font-bold tracking-tight">
                  Quick Actions
                </Text>
                <View className="ml-4 h-[1px] flex-1 bg-slate-100" />
              </View>
              <View className="flex-row justify-between">
                {[
                  {
                    label: "Add",
                    icon: "add",
                    color: "#F83758",
                    bg: "#FEF2F4",
                  },
                  {
                    label: "Orders",
                    icon: "reader",
                    color: "#6366f1",
                    bg: "#EEF2FF",
                  },
                  {
                    label: "Users",
                    icon: "people",
                    color: "#10b981",
                    bg: "#ECFDF5",
                  },
                  {
                    label: "Help",
                    icon: "help-circle",
                    color: "#64748b",
                    bg: "#F8FAFC",
                  },
                ].map((item, idx) => (
                  <View key={idx} className="items-center w-[22%]">
                    <TouchableOpacity
                      style={{ backgroundColor: item.bg }}
                      className="h-16 w-16 rounded-[28px] items-center justify-center mb-3"
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={28}
                        color={item.color}
                      />
                    </TouchableOpacity>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider text-center">
                      {item.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* RECENT ACTIVITY - REFINED & SMOOTH */}
            <View className="px-6 mt-12">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-neutral-800 text-lg font-bold">
                  Recent Activity
                </Text>
                <TouchableOpacity>
                  <Text className="text-slate-400 text-xs font-medium">
                    View History
                  </Text>
                </TouchableOpacity>
              </View>

              {[
                {
                  name: "Sarah Johnson",
                  id: "0021",
                  amount: "+ $149",
                  status: "Done",
                  time: "2 min ago",
                  color: "#10b981",
                  bg: "#ECFDF5",
                },
                {
                  name: "Mike Chen",
                  id: "0020",
                  amount: "+ $82",
                  status: "Pending",
                  time: "1 hour ago",
                  color: "#f59e0b",
                  bg: "#FFFBEB",
                },
                {
                  name: "Elena Rodriguez",
                  id: "0019",
                  amount: "+ $210",
                  status: "Done",
                  time: "3 hours ago",
                  color: "#10b981",
                  bg: "#ECFDF5",
                },
              ].map((order, idx) => (
                <View key={idx} className="flex-row items-center mb-7">
                  <View
                    style={{ backgroundColor: order.bg }}
                    className="h-12 w-12 rounded-2xl items-center justify-center"
                  >
                    <Text
                      style={{ color: order.color }}
                      className="font-bold text-base"
                    >
                      {order.name[0]}
                    </Text>
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-neutral-800 font-medium text-base">
                      {order.name}
                    </Text>
                    <Text className="text-slate-400 text-xs mt-0.5">
                      Order #{order.id} • {order.time}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-neutral-800 font-bold text-base">
                      {order.amount}
                    </Text>
                    <Text
                      style={{
                        color: order.status === "Done" ? "#10b981" : "#f59e0b",
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider mt-1"
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
};

export default HomeScreen;
