import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function OrderDetails() {
  const { orderId } = useLocalSearchParams();

  return (
    <View>
      <Text>Order ID: {orderId}</Text>
    </View>
  );
}
