import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Text, View } from "react-native";
const ProfileScreen = () => {
  return (
    <SafeAreaContextWrapper>
      <View className="flex-1 items-center justify-center">
        <Text>Profile</Text>
      </View>
    </SafeAreaContextWrapper>
  );
};
export default ProfileScreen;
