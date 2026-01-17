import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
  onClear,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  onClear?: () => void;
}) {
  return (
    <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3 py-2">
      <Ionicons name="search" size={18} color="#111827" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        className="ml-2 flex-1 text-slate-900 font-semibold"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText("");
            onClear?.();
          }}
          className="h-8 w-8 rounded-lg items-center justify-center"
        >
          <Ionicons name="close" size={18} color="#111827" />
        </TouchableOpacity>
      )}
    </View>
  );
}
