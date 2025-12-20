import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Login = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, you'd validate credentials here
    router.replace("/");
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
        <View className="pt-20 pb-16">
          <View className="h-16 w-16 bg-[#F83758] rounded-[24px] items-center justify-center mb-10 shadow-lg shadow-[#F83758]/40">
            <Ionicons name="key" size={32} color="white" />
          </View>
          <Text className="text-slate-800 text-4xl font-semibold leading-[48px]">
            Welcome Back,{"\n"}Admin
          </Text>
          <Text className="text-slate-400 text-base mt-2 font-medium">
            Sign in to manage your store
          </Text>
        </View>

        {/* FORM AREA */}
        <View className="space-y-5">
          {/* Email Field */}
          <View>
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3 ml-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-slate-50 rounded-[28px] px-6 py-5">
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
          <View className="mt-6">
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3 ml-2">
              Password
            </Text>
            <View className="flex-row items-center bg-slate-50 rounded-[28px] px-6 py-5">
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

          <TouchableOpacity className="items-end mt-4 px-2">
            <Text className="text-[#F83758] font-semibold text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#F83758] w-full py-5 rounded-[28px] mt-12 shadow-xl shadow-[#F83758]/30 items-center"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg font-semibold">
              Sign In to Dashboard
            </Text>
          </TouchableOpacity>

          {/* Support Link */}
          <View className="mt-10 items-center">
            <Text className="text-slate-400 font-medium text-sm">
              New staff member?{" "}
              <Text className="text-[#F83758] font-semibold">
                Contact Support
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
