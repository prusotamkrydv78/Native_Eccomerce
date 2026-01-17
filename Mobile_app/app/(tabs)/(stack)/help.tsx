import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { AnimatedScreen, GlassCard, Button } from "../../../components/ui";
import { colors, shadows, borderRadius, typography } from "../../../lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FAQS = [
  {
    id: 1,
    q: "How do I track my order?",
    a: "You can track your order in real-time by visiting Profile → My Orders and clicking on the 'Track Order' button on your active shipment.",
  },
  {
    id: 2,
    q: "What is your return policy?",
    a: "We offer a 14-day hassle-free return policy for most items. Products must be in original condition with tags intact. Some exclusions apply to beauty and kids' items.",
  },
  {
    id: 3,
    q: "Is there a delivery charge?",
    a: "Standard delivery is $15.00. However, we offer free shipping on orders over $150.00. VIP Gold members get free shipping on all orders.",
  },
  {
    id: 4,
    q: "How can I change my email?",
    a: "Go to Profile → Settings → Edit Profile to update your personal information including your name and email address.",
  },
  {
    id: 5,
    q: "Do you offer international shipping?",
    a: "Currently, we ship to over 50 countries. Shipping times and costs vary depending on the destination. You can see the exact rate at checkout.",
  },
];

function FAQItem({ item, index }: { item: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (Platform.OS === "android") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(200 + index * 100).duration(600)}
      className="mb-4"
    >
      <TouchableOpacity onPress={toggle} activeOpacity={0.9}>
        <GlassCard className="p-5" variant="glass">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-900 font-black text-base flex-1 pr-4">
              {item.q}
            </Text>
            <Ionicons
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={isOpen ? colors.primary[500] : colors.neutral[300]}
            />
          </View>
          {isOpen && (
            <View className="mt-4 pt-4 border-t border-slate-50">
              <Text className="text-slate-500 font-semibold text-sm leading-6">
                {item.a}
              </Text>
            </View>
          )}
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HelpScreen() {
  return (
    <AnimatedScreen variant="gradient" showDecorations>
      {/* Header */}
      <View className="px-5 pt-6 pb-2">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 rounded-full bg-white items-center justify-center border border-slate-100 mr-4"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.neutral[900]}
            />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              Help Center
            </Text>
            <Text className="text-slate-500 font-semibold text-sm">
              We're here to assist you 24/7
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Support Card */}
        <Animated.View entering={FadeInDown.duration(800)}>
          <GlassCard className="p-6 mb-8" variant="glass">
            <Text className="text-slate-900 font-black text-lg mb-2">
              Need direct help?
            </Text>
            <Text className="text-slate-500 font-semibold text-sm mb-6">
              Our support team typically responds within 2 hours.
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 h-14 bg-indigo-600 rounded-2xl items-center justify-center flex-row shadow-lg shadow-indigo-100">
                <Ionicons name="chatbubble-ellipses" size={20} color="#FFF" />
                <Text className="text-white font-black ml-2">Live Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 h-14 bg-white rounded-2xl items-center justify-center flex-row border border-slate-100 shadow-sm">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.neutral[800]}
                />
                <Text className="text-slate-800 font-black ml-2">Email Us</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </Animated.View>

        {/* FAQ Section */}
        <View>
          <Text className="text-slate-900 font-black text-xl mb-6">
            Frequently Asked Questions
          </Text>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.id} item={faq} index={i} />
          ))}
        </View>

        {/* Legal Links */}
        <Animated.View entering={FadeInDown.delay(800)} className="mt-8 mb-12">
          <GlassCard className="p-4" variant="glass">
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <Text className="text-slate-700 font-bold">Terms of Service</Text>
              <Ionicons
                name="link-outline"
                size={18}
                color={colors.neutral[300]}
              />
            </TouchableOpacity>
            <View className="h-[1px] bg-slate-50 w-full" />
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <Text className="text-slate-700 font-bold">Privacy Policy</Text>
              <Ionicons
                name="link-outline"
                size={18}
                color={colors.neutral[300]}
              />
            </TouchableOpacity>
          </GlassCard>
        </Animated.View>
      </ScrollView>

      {/* Footer Info */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <Text className="text-slate-300 font-black text-[10px] uppercase tracking-[3px]">
          Neo Store Support
        </Text>
      </View>
    </AnimatedScreen>
  );
}
