import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import AnimatedScreen from "../../components/ui/AnimatedScreen";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../store/auth";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Animated Logo Component
function AnimatedLogo() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Subtle pulse animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={[colors.primary[500], colors.primary[600]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoContainer}
      >
        <Ionicons name="bag-handle" size={36} color="#fff" />
      </LinearGradient>
    </Animated.View>
  );
}

// Social Button Component
function SocialButton({
  icon,
  label,
  onPress,
  delay = 0,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  delay?: number;
}) {
  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(500)}>
      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.8}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress?.();
        }}
        accessibilityLabel={`Sign in with ${label}`}
        accessibilityRole="button"
      >
        <Ionicons name={icon} size={22} color={colors.neutral[700]} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await login(email, password);
    } catch (error) {
      setErrors({ password: "Invalid email or password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero Section */}
        <Animated.View
          entering={FadeIn.duration(600)}
          style={styles.heroSection}
        >
          <AnimatedLogo />

          <Animated.Text
            entering={FadeInDown.delay(200).duration(500)}
            style={styles.title}
          >
            Welcome Back
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(300).duration(500)}
            style={styles.subtitle}
          >
            Sign in to continue your premium shopping experience
          </Animated.Text>
        </Animated.View>

        {/* Form Section */}
        <GlassCard variant="elevated" style={styles.formCard} delay={400}>
          <Input
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
            }}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
            accessibilityLabel="Email input field"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password)
                setErrors((e) => ({ ...e, password: undefined }));
            }}
            leftIcon="lock-closed-outline"
            isPassword
            autoComplete="password"
            error={errors.password}
            accessibilityLabel="Password input field"
          />

          {/* Forgot Password Link */}
          <Animated.View
            entering={FadeIn.delay(600).duration(400)}
            style={styles.forgotContainer}
          >
            <Link href="/(auth)/forgot-password" asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                accessibilityLabel="Forgot password"
                accessibilityRole="link"
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>

          {/* Sign In Button */}
          <Animated.View entering={FadeInUp.delay(700).duration(500)}>
            <Button
              title="Sign In"
              onPress={handleSignIn}
              loading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
              rightIcon="arrow-forward"
              size="lg"
            />
          </Animated.View>
        </GlassCard>

        {/* Divider */}
        <Animated.View
          entering={FadeIn.delay(800).duration(400)}
          style={styles.dividerContainer}
        >
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </Animated.View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <SocialButton icon="logo-google" label="Google" delay={850} />
          <SocialButton icon="logo-apple" label="Apple" delay={900} />
          <SocialButton icon="logo-facebook" label="Facebook" delay={950} />
        </View>

        {/* Sign Up Link */}
        <Animated.View
          entering={FadeInUp.delay(1000).duration(500)}
          style={styles.signUpContainer}
        >
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityLabel="Create new account"
              accessibilityRole="link"
            >
              <Text style={styles.signUpLink}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.glow(colors.primary[500]),
  },
  title: {
    fontSize: typography.size["3xl"],
    fontWeight: "800",
    color: colors.neutral[900],
    marginTop: 24,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.size.base,
    color: colors.neutral[500],
    marginTop: 8,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formCard: {
    marginBottom: 24,
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },
  forgotText: {
    fontSize: typography.size.sm,
    fontWeight: "600",
    color: colors.primary[600],
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[200],
  },
  dividerText: {
    fontSize: typography.size.sm,
    color: colors.neutral[400],
    paddingHorizontal: 16,
    fontWeight: "500",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
    ...shadows.sm,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  signUpText: {
    fontSize: typography.size.base,
    color: colors.neutral[500],
  },
  signUpLink: {
    fontSize: typography.size.base,
    fontWeight: "700",
    color: colors.primary[600],
  },
});
