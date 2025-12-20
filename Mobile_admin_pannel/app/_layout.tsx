import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "../global.css"
const Layout = () => {
  return (
    <>
      <Stack screenOptions={{
        headerShown: false
      }} />
      <PortalHost />
    </>
  );
};

export default Layout;
