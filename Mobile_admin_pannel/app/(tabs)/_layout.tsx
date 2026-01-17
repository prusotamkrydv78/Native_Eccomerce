import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MARGIN = 20;
const TAB_BAR_WIDTH = SCREEN_WIDTH - MARGIN * 2;
const VISIBLE_TABS = 5;
const TAB_WIDTH = TAB_BAR_WIDTH / VISIBLE_TABS;

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.floatingContainer}>
      <View style={styles.tabBarInner}>
        {/* Animated Sliding Background Pill */}
        <Animated.View
          style={[
            styles.indicatorPill,
            useAnimatedStyle(() => ({
              transform: [
                {
                  translateX: withSpring(state.index * TAB_WIDTH, {
                    damping: 18,
                    stiffness: 120,
                  }),
                },
              ],
            })),
          ]}
        />

        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Hide tabs that have href: null
          if (descriptors[route.key].options.href === null) return null;

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = () => {
            switch (route.name) {
              case "index":
                return isFocused ? "grid" : "grid-outline";
              case "products":
                return isFocused ? "cube" : "cube-outline";
              case "orders":
                return isFocused ? "receipt" : "receipt-outline";
              case "users":
                return isFocused ? "people" : "people-outline";
              case "profile":
                return isFocused ? "settings" : "settings-outline";
              default:
                return "help-circle-outline";
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <View className="items-center justify-center">
                <Ionicons
                  name={getIcon() as any}
                  size={20}
                  color={isFocused ? "#F83758" : "#94a3b8"}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isFocused ? "#F83758" : "#94a3b8" },
                  ]}
                  numberOfLines={1}
                >
                  {options.title || route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaContextWrapper>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Inventory",
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: "Users",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Settings",
          }}
        />
        <Tabs.Screen
          name="(stack)"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaContextWrapper>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 34 : 20,
    left: MARGIN,
    right: MARGIN,
    height: 72,
    zIndex: 100,
  },
  tabBarInner: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    height: "100%",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "space-around",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorPill: {
    position: "absolute",
    width: TAB_WIDTH - 8,
    height: 60,
    backgroundColor: "#F8375810",
    borderRadius: 20,
    left: 4,
  },
  label: {
    fontSize: 9,
    fontWeight: "800",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
