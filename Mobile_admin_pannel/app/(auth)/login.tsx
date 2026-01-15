import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { login } from "../../api/auth.api";
import { tokenStorage } from "../../utils/tokenStorage";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";

const Login = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // if (!adminData.email || !adminData.password) {
    //   Alert.alert("Error", "Please fill in all fields");
    //   return;
    // }
    setLoading(true);
    try {
      console.log(adminData);
      const res = await login(adminData);
      const data = await res;
      if (data.firstName) {
        //     // Store tokens
        const { accessToken, refreshToken, role } = data;
        //     // Ensure user is admin
        if (role !== "Admin") {
          Alert.alert("Unauthorized", "Only admins can access this panel");
          return;
        }
        await tokenStorage.setTokens(accessToken, refreshToken);

        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during login. Please check your connection.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 32,
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}
        <View className="pt-10 pb-10 justify-center items-center">
          <View className="h-16 w-16 bg-[#F83758] rounded-[24px] items-center justify-center mb-10 shadow-lg shadow-[#F83758]/40">
            <Ionicons name="key" size={32} color="white" />
          </View>
          <Text className="text-slate-800 text-4xl font-semibold  text-center">
            Welcome Back,{"\n"}Admin
          </Text>
          <Text className="text-slate-400 text-base    font-medium">
            Sign in to manage your store
          </Text>
        </View>

        {/* FORM AREA */}
        <View className="space-y-2">
          {/* Email Field */}
          <View>
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1 ml-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-slate-100 rounded-md px-4 py-2">
              <Ionicons name="mail-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 ml-4 text-slate-700 font-medium"
                placeholder="admin@stylish.com"
                placeholderTextColor="#cbd5e1"
                value={adminData.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) =>
                  setAdminData({ ...adminData, email: text })
                }
              />
            </View>
          </View>

          {/* Password Field */}
          <View className="mt-3">
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3 ml-2">
              Password
            </Text>
            <View className="flex-row items-center bg-slate-100 rounded-md px-4 py-2">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 ml-4 text-slate-700 font-medium"
                placeholder="••••••••"
                placeholderTextColor="#cbd5e1"
                value={adminData.password}
                secureTextEntry={!showPassword}
                onChangeText={(text) =>
                  setAdminData({ ...adminData, password: text })
                }
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity className="items-end mt-2 px-2">
            <Text className="text-[#F83758] font-semibold text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#F83758] w-full py-4 rounded-md mt-5 shadow-xl shadow-[#F83758]/30 items-center"
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-semibold">
                Sign In to Dashboard
              </Text>
            )}
          </TouchableOpacity>

          {/* Support Link */}
          <View className="mt-5 items-center">
            <Text className="text-slate-400 font-medium text-sm">
              New staff member?{" "}
              <Text className="text-[#F83758] font-semibold underline">
                Contact Support
              </Text>
            </Text>
          </View>
          <View className="mt-20 items-center justify-center">
            <Text className="text-slate-400 font-medium text-sm text-center">
              Build by, <Ionicons name="heart" size={20} color={"#F83758"} />{" "}
              <Text className="text-[#F83758] font-semibold text-center">
                Prusotam
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
