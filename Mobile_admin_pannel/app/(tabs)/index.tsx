import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View, StatusBar } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaContextWrapper>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-white">
        {/* HEADER SECTION - REFINED & BORDERLESS */}
        <View className="px-4 pt-3 pb-3 flex-row justify-between items-center bg-white">
          <View className="flex-1">
            <Text className="text-slate-400 text-[11px] uppercase tracking-[2px]">
              Internal Control
            </Text>
            <Text className="text-slate-900 text-2xl font-semibold">
              Management
            </Text>
            <Text className="text-slate-400 text-xs font-medium mt-1">
              Overview of today’s activity
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.push("/(stack)/help")}
              className="h-11 w-11 bg-slate-100 rounded-xl items-center justify-center mr-2"
            >
              <Ionicons name="search-outline" size={20} color="#171717" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(stack)/notifications")}
              className="h-11 w-11 bg-slate-100 rounded-xl items-center justify-center"
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#171717"
              />
              <View className="absolute top-3.5 right-3.5 h-2 w-2 bg-[#F83758] rounded-full " />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="pb-5">
            {/* MAIN REVENUE CARD - RADIANT STYLE */}
            <View className="px-4 mt-2">
              <LinearGradient
                colors={["#F83758", "#FF6B8B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 24,
                  padding: 20,
                }}
              >
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-surface-light/80 text-xs font-semibold uppercase tracking-[2px]">
                      Portfolio Value
                    </Text>
                    <Text className="text-surface-light text-4xl font-semibold tracking-tighter mt-1">
                      $00.00
                    </Text>
                    <Text className="text-surface-light/80 text-xs font-medium mt-1">
                      Updated just now
                    </Text>
                  </View>
                  <View className="bg-white/15 h-12 w-12 rounded-2xl items-center justify-center">
                    <Ionicons name="stats-chart" size={22} color="white" />
                  </View>
                </View>

                <View className="mt-4 flex-row items-center justify-between">
                  <View className="flex-row items-center bg-white/10 px-4 py-2 rounded-xl">
                    <Ionicons name="trending-up" size={16} color="green" />
                    <Text className="text-surface-light text-xs font-semibold ml-2">
                      +12.5% increase
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push("/(stack)/analysis")}
                    className="flex-row items-center bg-white/15 px-4 py-2 rounded-xl"
                  >
                    <Text className="text-surface-light text-xs font-semibold mr-1">
                      ANALYSIS
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              {/* Subtle colored glow instead of gray shadow */}
              {/* <View className="h-4 bg-[#F83758]/10 mx-10 rounded-b-full scale-x-100" /> */}
            </View>

            {/* LIVE METRICS - BORDERLESS TILE DESIGN */}
            <View className="mt-5 px-4">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-slate-800 text-xl font-semibold tracking-tight">
                    Live Inventory
                  </Text>
                  <View className="flex-row items-center">
                    <View className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-2" />
                    <Text className="text-slate-400 text-xs font-medium">
                      Real-time store updates
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/products")}
                  className="py-2 px-4 bg-slate-100 rounded-xl"
                >
                  <Text className="text-[#F83758] text-xs font-semibold uppercase tracking-wider">
                    Manage
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between mt-4">
                {/* Sale Tile */}
                <View className="w-[31%] bg-blue-100/40 p-4 justify-center rounded-2xl items-center">
                  <View className="h-14 w-14 bg-white rounded-2xl items-center justify-center mb-4">
                    <Ionicons name="flash" size={24} color="#3b82f6" />
                  </View>
                  <Text className="text-blue-900/40 text-[9px] font-semibold uppercase tracking-[2px]">
                    Sales
                  </Text>
                  <Text className="text-blue-900 text-2xl font-semibold">
                    145
                  </Text>
                </View>

                {/* Pending Tile */}
                <View className="w-[31%] bg-yellow-100/40 p-4 justify-center  rounded-2xl items-center">
                  <View className="h-14 w-14 bg-white rounded-2xl items-center justify-center mb-4">
                    <Ionicons name="time" size={24} color="#f59e0b" />
                  </View>
                  <Text className="text-amber-900/40 text-[9px] font-semibold uppercase tracking-[2px]">
                    Pending
                  </Text>
                  <Text className="text-amber-900 text-2xl font-semibold">
                    12
                  </Text>
                </View>

                {/* Stock Tile */}
                <View className="w-[31%] bg-emerald-100/40 p-4 justify-center  rounded-2xl items-center">
                  <View className="h-14 w-14 bg-white rounded-2xl items-center justify-center mb-4">
                    <Ionicons name="cube" size={24} color="#10b981" />
                  </View>
                  <Text className="text-emerald-900/40 text-[9px] font-semibold uppercase tracking-[2px]">
                    Products
                  </Text>
                  <Text className="text-emerald-900 text-2xl font-semibold">
                    482
                  </Text>
                </View>
              </View>
            </View>

            {/* QUICK ACTIONS - RADIANT TILES */}
            <View className="px-4 mt-4 pb-2">
              <View className="flex-row items-center mb-2">
                <Text className="text-slate-800 text-xl font-semibold tracking-tight">
                  Quick Actions
                </Text>
                <View className="ml-2 h-[1px] flex-1 bg-slate-200" />
              </View>
              <View className="flex-row justify-between">
                {[
                  {
                    label: "Add",
                    icon: "add",
                    color: "#F83758",
                    bg: "#FEF2F4",
                    screen: "/(tabs)/products/add-product",
                  },
                  {
                    label: "Orders",
                    icon: "reader",
                    color: "#6366f1",
                    bg: "#EEF2FF",

                    screen: "/(tabs)/orders",
                  },
                  {
                    label: "Users",
                    icon: "people",
                    color: "#10b981",
                    bg: "#ECFDF5",
                    screen: "/(tabs)/users",
                  },
                  {
                    label: "Help",
                    icon: "help-circle",
                    color: "#64748b",
                    bg: "#F8FAFC",
                    screen: "/(stack)/help",
                  },
                ].map((item, idx) => (
                  <View
                    key={idx}
                    className="items-center justify-center w-[22%]"
                  >
                    <TouchableOpacity
                      onPress={() => router.push(item.screen as any)}
                      style={{ backgroundColor: item.bg }}
                      className="h-16 w-16 rounded-2xl items-center justify-center mb-2"
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={28}
                        color={item.color}
                      />
                    </TouchableOpacity>
                    <Text className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider text-center">
                      {item.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* RECENT ACTIVITY - REFINED & SMOOTH */}
            <View className="px-4 mt-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-slate-700 text-lg font-semibold">
                  Recent Activity
                </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/orders")}>
                  <Text className="text-slate-400 text-xs underline font-medium">
                    View History
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="bg-slate-50 rounded-2xl p-3">
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
                  <View
                    key={idx}
                    className={`flex-row items-center ${idx === 0 ? "" : "mt-3"}`}
                  >
                    <View
                      style={{ backgroundColor: order.bg }}
                      className="h-12 w-12 rounded-xl items-center justify-center"
                    >
                      <Text
                        style={{ color: order.color }}
                        className="font-semibold text-base"
                      >
                        {order.name[0]}
                      </Text>
                    </View>
                    <View className="ml-4 flex-1">
                      <Text className="text-slate-700 font-medium text-base">
                        {order.name}
                      </Text>
                      <Text className="text-slate-400 text-xs mt-0.5">
                        Order #{order.id} • {order.time}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-slate-700 font-semibold text-base">
                        {order.amount}
                      </Text>
                      <View
                        style={{
                          backgroundColor:
                            order.status === "Done" ? "#ECFDF5" : "#FFFBEB",
                        }}
                        className="px-2 py-1 rounded-xl mt-1"
                      >
                        <Text
                          style={{
                            color:
                              order.status === "Done"
                                ? "#10b981"
                                : "#f59e0b",
                          }}
                          className="text-[10px] font-semibold uppercase tracking-wider"
                        >
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
};

export default HomeScreen;
