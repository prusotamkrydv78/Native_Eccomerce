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

export default function SearchTab() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { addItem } = useCart();

  const results = useMemo(() => {
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
      <View className="px-4 pt-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-slate-900 text-xl font-extrabold">Search</Text>
            <Text className="text-slate-600 text-xs font-semibold mt-1">
              Find products quickly.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(stack)/settings" as any)}
            className="h-10 w-10 rounded-xl bg-white border border-slate-200 items-center justify-center"
            activeOpacity={0.9}
          >
            <Ionicons name="options-outline" size={18} color="#111827" />
          </TouchableOpacity>
        </View>

        <View className="mt-3">
          <SearchBar value={q} onChangeText={setQ} placeholder="Search products" />
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
                activeOpacity={0.9}
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
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 mt-3">
          <GlassCard className="p-3">
            <Text className="text-slate-700 font-semibold text-xs">
              {results.length} result(s)
            </Text>
          </GlassCard>

          <View className="mt-3 flex-row flex-wrap justify-between">
            {results.map((p) => (
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
