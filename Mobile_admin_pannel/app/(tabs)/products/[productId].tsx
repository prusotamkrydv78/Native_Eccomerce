import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Text } from "react-native";
const ProductDetailScreen = () => {
  return (
    <SafeAreaContextWrapper>
      <Text className="text-2xl font-bold">Product Detail</Text>
    </SafeAreaContextWrapper>
  );
};
export default ProductDetailScreen;
