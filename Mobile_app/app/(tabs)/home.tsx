import React, { useMemo, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Screen from "../../components/ui/Screen";
import GlassCard from "../../components/ui/GlassCard";
import { CATEGORIES, PRODUCTS } from "../../lib/dummy";
import SearchBar from "../../components/ui/SearchBar";
import ProductCard from "../../components/ui/ProductCard";
import { useCart } from "../../store/cart";

export default function HomeTab() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { addItem, itemCount } = useCart();

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const okCat = cat === "All" ? true : p.category === cat;
      const okQ = q.trim()
        ? p.title.toLowerCase().includes(q.trim().toLowerCase())
        : true;
      return okCat && okQ;
    });
  }, [q, cat]);

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 pt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-slate-500 text-xs font-semibold">
                Deliver to
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={16} color="#111827" />
                <Text className="text-slate-900 font-extrabold ml-1">
                  Neo Street 404
                </Text>
                <Ionicons name="chevron-down" size={14} color="#111827" />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/(stack)/notifications" as any)}
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 items-center justify-center mr-2"
              activeOpacity={0.9}
            >
              <Ionicons name="notifications-outline" size={18} color="#111827" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/cart" as any)}
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 items-center justify-center"
              activeOpacity={0.9}
            >
              <Ionicons name="cart-outline" size={18} color="#111827" />
              {itemCount > 0 && (
                <View className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-[#FF9900] items-center justify-center border border-white">
                  <Text className="text-[11px] font-extrabold text-[#111827]">
                    {itemCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            <SearchBar
              value={q}
              onChangeText={setQ}
              placeholder="Search products"
            />
          </View>

          <View className="mt-3">
            <GlassCard className="p-4 border-0">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-slate-900 font-extrabold text-base">
                    Deals for you
                  </Text>
                  <Text className="text-slate-600 font-semibold text-xs mt-1">
                    Save more with fast checkout.
                  </Text>
                </View>
                <View className="h-10 w-10 rounded-xl bg-[#FF9900] items-center justify-center">
                  <Ionicons name="flash" size={18} color="#111827" />
                </View>
              </View>
            </GlassCard>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          >
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCat(c)}
                  className={
                    "mr-2 px-4 py-2 rounded-full border " +
                    (active
                      ? "bg-[#111827] border-[#111827]"
                      : "bg-white border-slate-200")
                  }
                >
                  <Text
                    className={
                      "text-sm font-semibold " +
                      (active ? "text-white" : "text-slate-800")
                    }
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="mt-4 flex-row flex-wrap justify-between">
            {filtered.map((p) => (
              <View key={p.id} className="w-[48%] mb-3">
                <ProductCard
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  image={p.image}
                  onPress={() =>
                    router.push(
                      {
                        pathname: "/(tabs)/(stack)/product/[productId]",
                        params: { productId: p.id },
                      } as any
                    )
                  }
                  onAdd={() =>
                    addItem({
                      productId: p.id,
                      title: p.title,
                      price: p.price,
                      image: p.image,
                    })
                  }
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
