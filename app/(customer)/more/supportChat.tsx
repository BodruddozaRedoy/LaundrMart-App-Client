import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface SupportChatRoom {
  id: number;
  name: string;
  other_user: string;
  other_user_image: string | null;
  last_message: string | null;
  unseen_count: number;
  updated_at: string;
}

const SupportChatScreen = () => {
  const [search, setSearch] = useState("");

  const { data: messages = [], isLoading, isError, refetch } = useQuery<SupportChatRoom[]>({
    queryKey: ["supportChat"],
    queryFn: async () => {
      const res = await api.get("/message/api/room");
      // Check if res.data is the array or if it's nested inside another 'data' property
      return Array.isArray(res.data) ? res.data : res.data.data || [];
    },
  });

  const filtered = useMemo(() => {
    return messages.filter((msg) =>
      (msg.other_user || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [messages, search]);

  const renderItem = ({ item }: { item: SupportChatRoom }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(customer)/more/chat",
          params: {
            roomId: String(item.id),
            receiverName: item.other_user,
            receiverImage: item.other_user_image ?? ""
          },
        })
      }
      className="flex-row items-center justify-between py-3 border-b border-gray-100"
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.other_user_image ?? "https://via.placeholder.com/150" }}
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        <View className="ml-3">
          <Text className="text-gray-800 font-semibold">{item.other_user}</Text>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>
            {item.last_message ?? "No messages yet"}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-gray-400 text-xs mb-1">
          {new Date(item.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        {item.unseen_count > 0 && (
          <View className="w-3 h-3 rounded-full bg-[#007AFF]" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="flex-row items-center mb-4 mt-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">Messages</Text>
      </View>

      <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mb-3">
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          className="ml-2 flex-1 text-gray-700"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" className="mt-10" />
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={<Text className="text-center text-gray-400 mt-10">No conversations found</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default SupportChatScreen;