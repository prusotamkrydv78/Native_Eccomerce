import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

interface SafeAreaContextWrapperProps {
  children: React.ReactNode;
}

const SafeAreaContextWrapper = ({ children }: SafeAreaContextWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaContextWrapper;
