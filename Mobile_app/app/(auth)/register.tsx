import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import AnimatedScreen from "../../components/ui/AnimatedScreen";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

// Password Strength Indicator
function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const barColors = [
    colors.error.main,
    colors.warning.main,
    colors.warning.dark,
    colors.success.main,
    colors.success.dark,
  ];

  if (!password) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={styles.strengthContainer}
    >
      <View style={styles.strengthBars}>
        {[0, 1, 2, 3, 4].map((index) => (
          <View
            key={index}
            style={[
              styles.strengthBar,
              {
                backgroundColor:
                  index < strength
                    ? barColors[strength - 1]
                    : colors.neutral[200],
              },
            ]}
          />
        ))}
      </View>
      <Text
        style={[
          styles.strengthLabel,
          {
            color: strength > 0 ? barColors[strength - 1] : colors.neutral[400],
          },
        ]}
      >
        {labels[strength - 1] || "Too Short"}
      </Text>
    </Animated.View>
  );
}

// Header with Back Button
function Header() {
  return (
    <Animated.View entering={SlideInLeft.duration(400)} style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
        style={styles.backButton}
        activeOpacity={0.8}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Ionicons name="chevron-back" size={22} color={colors.neutral[700]} />
      </TouchableOpacity>

      <View style={styles.headerTextContainer}>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(400)}
          style={styles.headerTitle}
        >
          Create Account
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(400)}
          style={styles.headerSubtitle}
        >
          Join us and start your shopping journey
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(auth)/login");
    } catch (error) {
      setErrors({ email: "This email is already registered" });
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
        <Header />

        {/* Form Card */}
        <GlassCard variant="elevated" style={styles.formCard} delay={300}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChangeText={(text) => updateField("fullName", text)}
            leftIcon="person-outline"
            autoCapitalize="words"
            autoComplete="name"
            error={errors.fullName}
            accessibilityLabel="Full name input"
          />

          <Input
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChangeText={(text) => updateField("email", text)}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
            accessibilityLabel="Email input"
          />

          <Input
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChangeText={(text) => updateField("password", text)}
            leftIcon="lock-closed-outline"
            isPassword
            error={errors.password}
            accessibilityLabel="Password input"
          />

          <PasswordStrength password={formData.password} />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField("confirmPassword", text)}
            leftIcon="shield-checkmark-outline"
            isPassword
            error={errors.confirmPassword}
            accessibilityLabel="Confirm password input"
          />

          {/* Terms Checkbox */}
          <Animated.View
            entering={FadeIn.delay(500).duration(400)}
            style={styles.termsContainer}
          >
            <TouchableOpacity
              onPress={() => {
                setAcceptedTerms(!acceptedTerms);
                Haptics.selectionAsync();
                if (errors.terms) setErrors((e) => ({ ...e, terms: "" }));
              }}
              style={styles.checkbox}
              activeOpacity={0.8}
              accessibilityLabel="Accept terms and conditions"
              accessibilityRole="checkbox"
              accessibilityState={{ checked: acceptedTerms }}
            >
              <LinearGradient
                colors={
                  acceptedTerms
                    ? [colors.primary[500], colors.primary[600]]
                    : ["transparent", "transparent"]
                }
                style={[
                  styles.checkboxInner,
                  !acceptedTerms && styles.checkboxUnchecked,
                ]}
              >
                {acceptedTerms && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </Animated.View>
          {errors.terms && (
            <Text style={styles.termsError}>{errors.terms}</Text>
          )}

          {/* Create Account Button */}
          <Animated.View
            entering={FadeInUp.delay(600).duration(500)}
            style={styles.buttonContainer}
          >
            <Button
              title="Create Account"
              onPress={handleCreateAccount}
              loading={isSubmitting}
              disabled={isSubmitting}
              rightIcon="arrow-forward"
              size="lg"
            />
          </Animated.View>
        </GlassCard>

        {/* Sign In Link */}
        <Animated.View
          entering={FadeInUp.delay(700).duration(500)}
          style={styles.signInContainer}
        >
          <Text style={styles.signInText}>Already have an account?</Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityLabel="Sign in to existing account"
              accessibilityRole="link"
            >
              <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xl,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
    ...shadows.sm,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: typography.size["2xl"],
    fontWeight: "800",
    color: colors.neutral[900],
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: typography.size.sm,
    color: colors.neutral[500],
    marginTop: 4,
  },
  formCard: {
    marginBottom: 24,
  },
  strengthContainer: {
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: typography.size.xs,
    fontWeight: "600",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxUnchecked: {
    borderWidth: 2,
    borderColor: colors.neutral[300],
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: typography.size.sm,
    color: colors.neutral[600],
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary[600],
    fontWeight: "600",
  },
  termsError: {
    fontSize: typography.size.xs,
    color: colors.error.main,
    marginTop: -4,
    marginBottom: 12,
    marginLeft: 34,
  },
  buttonContainer: {
    marginTop: 8,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  signInText: {
    fontSize: typography.size.base,
    color: colors.neutral[500],
  },
  signInLink: {
    fontSize: typography.size.base,
    fontWeight: "700",
    color: colors.primary[600],
  },
});
