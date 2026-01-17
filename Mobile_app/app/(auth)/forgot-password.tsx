import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft, 
  ZoomIn,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import AnimatedScreen from "../../components/ui/AnimatedScreen";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { colors, shadows, borderRadius, typography } from "../../lib/theme";

// Success State Component
function SuccessState({ email }: { email: string }) {
  return (
    <Animated.View
      entering={ZoomIn.duration(400).springify()}
      style={styles.successContainer}
    >
      <LinearGradient
        colors={[colors.success.main, colors.success.dark]}
        style={styles.successIcon}
      >
        <Ionicons name="checkmark" size={40} color="#fff" />
      </LinearGradient>

      <Animated.Text
        entering={FadeInUp.delay(200).duration(400)}
        style={styles.successTitle}
      >
        Check Your Email
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.delay(300).duration(400)}
        style={styles.successSubtitle}
      >
        We've sent a password reset link to:
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.delay(400).duration(400)}
        style={styles.successEmail}
      >
        {email}
      </Animated.Text>

      <Animated.View
        entering={FadeInUp.delay(500).duration(400)}
        style={styles.successTips}
      >
        <GlassCard variant="solid" style={styles.tipCard}>
          <View style={styles.tipRow}>
            <View style={styles.tipIconContainer}>
              <Ionicons
                name="time-outline"
                size={18}
                color={colors.primary[600]}
              />
            </View>
            <Text style={styles.tipText}>Link expires in 1 hour</Text>
          </View>
          <View style={styles.tipRow}>
            <View style={styles.tipIconContainer}>
              <Ionicons
                name="folder-outline"
                size={18}
                color={colors.primary[600]}
              />
            </View>
            <Text style={styles.tipText}>
              Check your spam folder if you don't see it
            </Text>
          </View>
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(600).duration(400)}
        style={styles.successActions}
      >
        <Button
          title="Back to Sign In"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.replace("/(auth)/login");
          }}
          variant="primary"
          size="lg"
          leftIcon="arrow-back"
        />

        <TouchableOpacity
          style={styles.resendButton}
          activeOpacity={0.7}
          onPress={() => Haptics.selectionAsync()}
        >
          <Text style={styles.resendText}>Didn't receive it?</Text>
          <Text style={styles.resendLink}>Resend Email</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

// Header Component
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
    </Animated.View>
  );
}

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <AnimatedScreen variant="gradient" showDecorations>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentSuccess}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <SuccessState email={email} />
        </ScrollView>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen variant="gradient" showDecorations>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />

        {/* Illustration */}
        <Animated.View
          entering={FadeIn.duration(500)}
          style={styles.illustrationContainer}
        >
          <LinearGradient
            colors={[colors.primary[100], colors.primary[50]]}
            style={styles.illustrationBg}
          >
            <View style={styles.illustrationIconBg}>
              <Ionicons
                name="key-outline"
                size={48}
                color={colors.primary[600]}
              />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Title Section */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          style={styles.titleSection}
        >
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </Text>
        </Animated.View>

        {/* Form Card */}
        <GlassCard variant="elevated" style={styles.formCard} delay={400}>
          <Input
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError("");
            }}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={error}
            accessibilityLabel="Email input for password reset"
          />

          <Animated.View entering={FadeInUp.delay(500).duration(500)}>
            <Button
              title="Send Reset Link"
              onPress={handleResetPassword}
              loading={isSubmitting}
              disabled={isSubmitting}
              rightIcon="send"
              size="lg"
            />
          </Animated.View>
        </GlassCard>

        {/* Security Note */}
        <Animated.View
          entering={FadeIn.delay(600).duration(400)}
          style={styles.securityNote}
        >
          <View style={styles.securityIconContainer}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color={colors.neutral[400]}
            />
          </View>
          <Text style={styles.securityText}>
            Your security is our priority. Password reset links are encrypted
            and expire after 1 hour.
          </Text>
        </Animated.View>

        {/* Back to Sign In */}
        <Animated.View
          entering={FadeInUp.delay(700).duration(500)}
          style={styles.backToSignIn}
        >
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.replace("/(auth)/login");
            }}
            style={styles.backToSignInButton}
            activeOpacity={0.7}
            accessibilityLabel="Back to sign in"
            accessibilityRole="link"
          >
            <Ionicons name="arrow-back" size={18} color={colors.primary[600]} />
            <Text style={styles.backToSignInText}>Back to Sign In</Text>
          </TouchableOpacity>
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
  scrollContentSuccess: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
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
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  illustrationBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...shadows.md,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: typography.size["2xl"],
    fontWeight: "800",
    color: colors.neutral[900],
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: typography.size.base,
    color: colors.neutral[500],
    textAlign: "center",
    lineHeight: 24,
  },
  formCard: {
    marginBottom: 24,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 32,
  },
  securityIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  securityText: {
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.neutral[500],
    lineHeight: 20,
  },
  backToSignIn: {
    alignItems: "center",
  },
  backToSignInButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backToSignInText: {
    fontSize: typography.size.base,
    fontWeight: "600",
    color: colors.primary[600],
  },
  // Success State Styles
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.glow(colors.success.main),
    marginBottom: 24,
  },
  successTitle: {
    fontSize: typography.size["2xl"],
    fontWeight: "800",
    color: colors.neutral[900],
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: typography.size.base,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  successEmail: {
    fontSize: typography.size.lg,
    fontWeight: "700",
    color: colors.primary[600],
    marginBottom: 32,
  },
  successTips: {
    width: "100%",
    marginBottom: 32,
  },
  tipCard: {
    padding: 16,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.neutral[600],
  },
  successActions: {
    width: "100%",
    alignItems: "center",
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
    paddingVertical: 12,
  },
  resendText: {
    fontSize: typography.size.sm,
    color: colors.neutral[500],
  },
  resendLink: {
    fontSize: typography.size.sm,
    fontWeight: "600",
    color: colors.primary[600],
  },
});
