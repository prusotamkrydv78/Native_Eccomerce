/**
 * Premium Theme System
 * Curated color palette with modern design tokens
 */

export const colors = {
  // Primary Brand Colors - Rich Orange Gradient
  primary: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",
    500: "#F97316", // Main primary
    600: "#EA580C",
    700: "#C2410C",
    800: "#9A3412",
    900: "#7C2D12",
  },

  // Accent - Modern Purple
  accent: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7", // Main accent
    600: "#9333EA",
    700: "#7E22CE",
    800: "#6B21A8",
    900: "#581C87",
  },

  // Neutral - Refined Slate
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },

  // Semantic Colors
  success: {
    light: "#D1FAE5",
    main: "#10B981",
    dark: "#059669",
  },
  error: {
    light: "#FEE2E2",
    main: "#EF4444",
    dark: "#DC2626",
  },
  warning: {
    light: "#FEF3C7",
    main: "#F59E0B",
    dark: "#D97706",
  },

  // Special Effects
  glass: {
    white: "rgba(255, 255, 255, 0.85)",
    whiteMedium: "rgba(255, 255, 255, 0.6)",
    whiteLight: "rgba(255, 255, 255, 0.3)",
    dark: "rgba(15, 23, 42, 0.7)",
    border: "rgba(255, 255, 255, 0.2)",
  },

  // Gradients (as arrays for LinearGradient)
  gradients: {
    primary: ["#F97316", "#EA580C"],
    primarySoft: ["#FFF7ED", "#FFEDD5"],
    accent: ["#A855F7", "#7E22CE"],
    warm: ["#F97316", "#FB923C", "#FBBF24"],
    sunset: ["#F97316", "#EC4899"],
    premium: ["#1E293B", "#0F172A"],
    glass: ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"],
  },
};

export const typography = {
  // Font families (to be loaded with expo-font)
  family: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semibold: "Inter-SemiBold",
    bold: "Inter-Bold",
    extrabold: "Inter-ExtraBold",
  },

  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },

  // Line heights
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },

  // Letter spacing
  tracking: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  }),
};

export const animation = {
  duration: {
    fastest: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slowest: 700,
  },
  easing: {
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: { damping: 15, stiffness: 150 },
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
};
