import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function OrdersScreen() {
  return (
    <View>
      <Pressable onPress={() => router.push("/orders/123")}>
        <Text>Go to Order #123</Text>
      </Pressable>
    </View>
  );
}
