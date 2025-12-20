import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function StartUp() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-white">
      {/* BACKGROUND IMAGE - Full screen but cleaner */}
      <View className="absolute top-0 w-full h-[70%]">
        <Image
          source={require("../../assets/admin_images/start_bg.jpg")}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "white"]}
          className="absolute bottom-0 w-full h-[30%]"
        />
      </View>

      {/* CONTENT AREA */}
      <View className="flex-1 justify-end px-10 pb-16">
        <View className="items-center">
          {/* BRANDING ELEMENT */}
          <View className="h-14 w-14 bg-[#F83758]/10 rounded-2xl items-center justify-center mb-10">
            <Ionicons name="flash" size={32} color="#F83758" />
          </View>

          <Text className="text-slate-800 text-4xl font-semibold text-center leading-[48px]">
            The Ultimate{"\n"}Admin Control
          </Text>

          <Text className="text-slate-400 text-base text-center mt-4 font-medium leading-6">
            Manage your entire marketplace with precision, speed, and elegance.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#F83758] w-full py-5 rounded-[28px] mt-16 shadow-xl shadow-[#F83758]/30 flex-row items-center justify-center"
            onPress={handleNavigate}
          >
            <Text className="text-white text-lg font-semibold">
              Get Started
            </Text>
            <View className="ml-3 bg-white/20 p-1 rounded-full">
              <Ionicons name="chevron-forward" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <Text className="text-slate-300 text-[10px] uppercase tracking-widest mt-10 font-bold">
            Powered by Stylish V1.0
          </Text>
        </View>
      </View>
    </View>
  );
}
