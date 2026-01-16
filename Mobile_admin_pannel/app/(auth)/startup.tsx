import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/utils/tokenStorage";

const { width, height } = Dimensions.get("window");

export default function StartUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    router.push("/(auth)/login");
  };
  useEffect(() => {
    redirectToHome();
  }, []);

  const redirectToHome = async () => {
    setIsLoading(true);
    const isUserLogin =
      (await tokenStorage.getAccessToken()) ||
      (await tokenStorage.getRefreshToken());
    if (isUserLogin) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      router.replace("/(tabs)");
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* BACKGROUND IMAGE - Full screen but cleaner */}
      <View className="absolute top-10 w-full h-[70%]">
        <Image
          source={require("../../assets/admin_images/start_bg.jpg")}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.5)", "white"]}
          className="absolute inset-0"
          locations={[0, 0.6, 1]}
        />
      </View>

      {/* CONTENT AREA */}
      <View className="flex-1 justify-end px-10 pb-2">
        <View className="items-center">
          {/* BRANDING ELEMENT */}
          <View className="h-14 w-14 bg-[#F83758]/10 rounded-2xl items-center justify-center mb-10">
            <Ionicons name="flash" size={48} color="#F83758" />
          </View>

          <Text className="text-slate-800 text-4xl font-semibold text-center leading-[48px]">
            The Ultimate{"\n"}Admin Control
          </Text>

          <Text className="text-slate-400 text-base text-center mt-2 font-medium leading-6">
            Manage your entire marketplace with precision, speed, and elegance.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#F83758] w-full py-5 rounded-xl mt-16 shadow-xl shadow-[#F83758]/30 flex-row items-center justify-center"
            onPress={handleNavigate}
          >
            <Text className="text-white text-lg font-semibold">
              Get Started
            </Text>
            <View className="ml-1  rounded-full">
              <Ionicons name="arrow-forward" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <Text className="text-slate-300 text-[10px] uppercase tracking-widest mt-10 font-bold">
            Powered by Stylish V1.0
          </Text>
          <View className=" mt-2 items-center justify-center">
            <Text className="text-slate-400 font-medium text-sm text-center">
              Build by, <Ionicons name="heart" size={20} color={"#F83758"} />{" "}
              <Text className="text-[#F83758] font-semibold text-center">
                Prusotam
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
