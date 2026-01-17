import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MetricCard = ({ title, value, subValue, icon, color, trend }: any) => (
  <View
    style={{ width: (SCREEN_WIDTH - 48) / 2 }}
    className="bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-4"
  >
    <View className="flex-row justify-between items-start mb-3">
      <View
        style={{ backgroundColor: `${color}15` }}
        className="h-10 w-10 rounded-2xl items-center justify-center"
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      {trend && (
        <View className="flex-row items-center bg-emerald-50 px-2 py-0.5 rounded-lg">
          <Ionicons name="trending-up" size={12} color="#10b981" />
          <Text className="text-emerald-600 text-[10px] font-bold ml-1">
            {trend}%
          </Text>
        </View>
      )}
    </View>
    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
      {title}
    </Text>
    <Text className="text-slate-900 text-xl font-black mt-1">{value}</Text>
    {subValue && (
      <Text className="text-slate-500 text-[10px] font-medium mt-1">
        {subValue}
      </Text>
    )}
  </View>
);

const QuickAction = ({ label, icon, color, bg, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ width: (SCREEN_WIDTH - 60) / 3 }}
    className="items-center mb-6"
  >
    <View
      style={{ backgroundColor: bg }}
      className="h-14 w-14 rounded-2xl items-center justify-center mb-2 shadow-sm"
    >
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text className="text-slate-600 text-[11px] font-semibold text-center">
      {label}
    </Text>
  </TouchableOpacity>
);

const InventoryAlert = ({ name, stock, type }: any) => (
  <View className="flex-row items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 mb-2">
    <View className="flex-row items-center">
      <View
        className={`h-2 w-2 rounded-full mr-3 ${type === "out" ? "bg-rose-500" : "bg-amber-500"}`}
      />
      <Text className="text-slate-700 font-semibold text-sm">{name}</Text>
    </View>
    <View
      className={`px-3 py-1 rounded-full ${type === "out" ? "bg-rose-50" : "bg-amber-50"}`}
    >
      <Text
        className={`text-[10px] font-black ${type === "out" ? "text-rose-600" : "text-amber-600"}`}
      >
        {type === "out" ? "STOCK OUT" : `${stock} LEFT`}
      </Text>
    </View>
  </View>
);

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaContextWrapper>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="px-5 pt-4 pb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-slate-400 text-[11px] font-black uppercase tracking-[3px]">
              Admin Pannel
            </Text>
            <Text className="text-slate-900 text-2xl font-black">
              Dashboard
            </Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="h-10 w-10 bg-slate-50 rounded-xl items-center justify-center mr-2">
              <Ionicons name="search-outline" size={20} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-10 bg-slate-50 rounded-xl items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#64748b"
              />
              <View className="absolute top-3 right-3 h-2 w-2 bg-rose-500 rounded-full border-2 border-white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* TOP METRICS GRID */}
          <View className="px-5 mt-2 flex-row flex-wrap justify-between">
            <MetricCard
              title="Total Sales"
              value="$24,580.00"
              subValue="+$1,200 today"
              icon="cash-outline"
              color="#6366f1"
              trend={12.5}
            />
            <MetricCard
              title="Orders"
              value="158"
              subValue="12 pending"
              icon="cart-outline"
              color="#f59e0b"
            />
            <MetricCard
              title="Inventory"
              value="42 Items"
              subValue="5 low stock"
              icon="cube-outline"
              color="#10b981"
            />
            <MetricCard
              title="Customers"
              value="1,240"
              subValue="+18 this week"
              icon="people-outline"
              color="#ec4899"
              trend={4.2}
            />
          </View>

          {/* QUICK ACTIONS */}
          <View className="px-5 mt-6">
            <Text className="text-slate-900 text-lg font-black mb-5">
              Quick Actions
            </Text>
            <View className="flex-row flex-wrap justify-between">
              <QuickAction
                label="Add Product"
                icon="add-circle-outline"
                color="#F83758"
                bg="#FEF2F4"
                onPress={() =>
                  router.push("/(tabs)/products/add-product" as any)
                }
              />
              <QuickAction
                label="Categories"
                icon="grid-outline"
                color="#6366f1"
                bg="#EEF2FF"
                onPress={() => {}}
              />
              <QuickAction
                label="Refunds"
                icon="refresh-outline"
                color="#ec4899"
                bg="#FDF2F8"
                onPress={() => {}}
              />
              <QuickAction
                label="Coupons"
                icon="ticket-outline"
                color="#f59e0b"
                bg="#FFFBEB"
                onPress={() => {}}
              />
              <QuickAction
                label="Reports"
                icon="bar-chart-outline"
                color="#10b981"
                bg="#ECFDF5"
                onPress={() => {}}
              />
              <QuickAction
                label="Add Staff"
                icon="person-add-outline"
                color="#64748b"
                bg="#F8FAFC"
                onPress={() => {}}
              />
            </View>
          </View>

          {/* SALES TREND MINI DASHBOARD */}
          <View className="px-5 mt-2">
            <View className="bg-slate-900 p-5 rounded-[32px] overflow-hidden">
              <View className="flex-row justify-between items-center mb-6">
                <View>
                  <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Revenue trend
                  </Text>
                  <Text className="text-white text-xl font-black mt-1">
                    $12,450.00
                  </Text>
                </View>
                <View className="bg-white/10 px-3 py-1.5 rounded-full">
                  <Text className="text-white text-[10px] font-black uppercase">
                    This Month
                  </Text>
                </View>
              </View>

              {/* Dummy Chart Representation */}
              <View className="flex-row items-end justify-between h-20 px-2">
                {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                  <View
                    key={i}
                    style={{ height: h, width: 20 }}
                    className={`rounded-t-lg ${i === 3 ? "bg-indigo-500" : "bg-white/20"}`}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* INVENTORY ALERTS */}
          <View className="px-5 mt-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-900 text-lg font-black">
                Stock Alerts
              </Text>
              <TouchableOpacity>
                <Text className="text-indigo-600 text-xs font-bold uppercase">
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <InventoryAlert
              name="Nebula Runner Sneakers"
              stock={0}
              type="out"
            />
            <InventoryAlert name="Quantum Noise Headset" stock={4} type="low" />
            <InventoryAlert name="Neo Minimal Desk Lamp" stock={7} type="low" />
          </View>

          {/* RECENT ORDERS */}
          <View className="px-5 mt-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-900 text-lg font-black">
                Recent Orders
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/orders" as any)}
              >
                <Text className="text-indigo-600 text-xs font-bold uppercase underline">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-slate-50 border border-slate-100 rounded-[32px] p-2">
              {[
                {
                  id: "ORD-9921",
                  user: "Sarah J.",
                  amount: "$149.00",
                  status: "Shipped",
                  color: "#6366f1",
                },
                {
                  id: "ORD-8812",
                  user: "Mike Chen",
                  amount: "$82.50",
                  status: "Pending",
                  color: "#f59e0b",
                },
                {
                  id: "ORD-7754",
                  user: "Elena R.",
                  amount: "$210.00",
                  status: "Delivered",
                  color: "#10b981",
                },
              ].map((order, i) => (
                <View
                  key={order.id}
                  className={`flex-row items-center justify-between p-4 ${i !== 2 ? "border-b border-slate-200/50" : ""}`}
                >
                  <View className="flex-row items-center">
                    <View className="h-10 w-10 bg-white rounded-xl items-center justify-center border border-slate-100 shadow-sm mr-4">
                      <Text className="text-slate-900 font-black text-xs">
                        {order.user[0]}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-slate-900 font-bold text-sm">
                        {order.user}
                      </Text>
                      <Text className="text-slate-400 text-[10px] font-bold">
                        #{order.id}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-slate-900 font-black text-sm">
                      {order.amount}
                    </Text>
                    <View
                      style={{ backgroundColor: `${order.color}15` }}
                      className="px-2 py-0.5 rounded-lg mt-1"
                    >
                      <Text
                        style={{ color: order.color }}
                        className="text-[9px] font-black uppercase"
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* QUICK LINKS / FOOTER */}
          <View className="px-5 mt-10 flex-row justify-between">
            <TouchableOpacity className="flex-row items-center bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 flex-1 mr-3">
              <Ionicons name="settings-outline" size={18} color="#64748b" />
              <Text className="ml-2 text-slate-600 font-bold text-xs uppercase">
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-rose-50 px-5 py-3 rounded-2xl border border-rose-100 flex-1">
              <Ionicons name="log-out-outline" size={18} color="#F83758" />
              <Text className="ml-2 text-rose-600 font-bold text-xs uppercase">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaContextWrapper>
  );
};

export default HomeScreen;
