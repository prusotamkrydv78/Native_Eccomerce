import { Tabs } from "expo-router";
import "../global.css";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function RootLayout() {
  return (
    <SafeAreaContextWrapper>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#F83758",
          tabBarInactiveTintColor: "#94a3b8",
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
            height: 85,
            paddingBottom: 25,
            paddingTop: 12,
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.03,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "700",
            textTransform: "capitalize",
            marginTop: 4,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: "Users",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Inventory",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "cube" : "cube-outline"}
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                color={color}
                size={22}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaContextWrapper>
  );
}
