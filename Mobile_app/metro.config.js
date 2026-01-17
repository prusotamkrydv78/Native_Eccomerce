const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = Array.from(
  new Set([
    ...(config.resolver.sourceExts ?? []),
    "js",
    "jsx",
    "ts",
    "tsx",
    "cjs",
    "mjs",
    "json",
    "css",
  ])
);

module.exports = withNativeWind(config, { input: './app/global.css' });