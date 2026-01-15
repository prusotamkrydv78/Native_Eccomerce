import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "../global.css"
import { StatusBar } from "react-native";
const Layout = () => {
  return (
    <>
    <StatusBar backgroundColor="white" />
      <Stack screenOptions={{
        headerShown: false
      }} />
      <PortalHost />
    </>
  );
};

export default Layout;
