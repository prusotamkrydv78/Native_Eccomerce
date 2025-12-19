import { Image, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
export default function StartUp() {
    const router = useRouter()
    const handleNavigate = () => {
        router.push("/(auth)/login")
    }
    return (
        <View className="flex-1 items-center justify-end">
            <Image
                source={require("../../assets/admin_images/start_bg.jpg")}
                className="absolute w-full h-full"
                resizeMode="contain"
            />

            <LinearGradient
                colors={["rgba(0, 0, 0, 0.0)", "rgba(0, 0, 0, 0.8)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60%",
                }}
            >
                <View className=" p-4 rounded-t-3xl bg-transparent h-1/2 py-8 justify-center items-center">
                    <Text className="text-5xl text-white font-bold text-center pb-2">You want Authentic, here you go!</Text>
                    <Text className="text-xl text-center pb-4 text-white">Find it here, buy it now!!</Text>
                    <TouchableOpacity className="bg-primary p-2 rounded-md"
                        onPress={handleNavigate}
                    >
                        <Text className="text-white text-3xl text-center px-20 py-2 ">Get Started</Text>
                    </TouchableOpacity>

                </View>

            </LinearGradient>
        </View>
    );
}