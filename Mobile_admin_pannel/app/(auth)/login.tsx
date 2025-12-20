import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
const Login = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleLogin = () => {
    // if (
    //   adminData.email === "prusotam@gmail.com" &&
    //   adminData.password === "test"
    // ) {
    //   Alert.alert("Login Success");
    router.push("/");
    // } else {
    //   Alert.alert("Invalid credentials");
    //   adminData.email = "";
    //   adminData.password = "";
    // }
  };

  return (
    <View className="flex-1 justify-center gap-3 px-8">
      <Text className="text-6xl font-bold text-center">
        Welcome Back Admin!
      </Text>
      <View className="flex flex-col gap-3 py-8 w-full">
        <View className=" flex-row gap-2 justify-start items-center w-full border-b border-gray-300">
          <Ionicons name="person" size={24} color="gray" />
          <TextInput
            className="text-xl p-2 "
            placeholder="Username or Email"
            value={adminData.email}
            onChangeText={(text) => setAdminData({ ...adminData, email: text })}
          />
        </View>

        <View className="flex flex-row gap-2 justify-start items-center w-full border-b border-gray-300">
          <Ionicons name="lock-closed" size={24} color="gray" />
          <TextInput
            className="text-xl p-2"
            placeholder="Password"
            value={adminData.password}
            onChangeText={(text) =>
              setAdminData({ ...adminData, password: text })
            }
          />
        </View>
        <View className="flex flex-col gap-2 justify-end items-end my-2">
          <Text className="text-primary text-center">Forgot Password?</Text>
        </View>
        <TouchableOpacity
          className="bg-primary p-2 rounded-md w-full"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-2xl py-1">Login</Text>
        </TouchableOpacity>
        <View className="flex flex-col gap-2">
          <Text className="text-center text-xl">
            Don't have an account?{" "}
            <Text onPress={() => {}} className="text-primary underline">
              contact with admin
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Login;
