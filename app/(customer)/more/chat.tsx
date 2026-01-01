import HeaderBackButton from "@/components/common/HeaderBackButton";
import { api } from "@/lib/axios";
import {
  connectChatSocket,
  disconnectChatSocket,
  sendChatMessage,
} from "@/lib/chatSocket";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

/* =====================
   TYPES
===================== */
interface ChatMessage {
  id: number;
  text: string | null;
  user: string;
  sender: number;
  room: number;
  file: string | null;
  created_at: string;
  updated_at: string;
  seen: boolean;
}

const MY_USER_ID = 102; // replace with real user id

/* =====================
   COMPONENT
===================== */
const ChatScreen = () => {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);

  /* =====================
     RESET ON ROOM CHANGE
  ===================== */
  useEffect(() => {
    setLiveMessages([]);
  }, [roomId]);

  /* =====================
     LOAD HISTORY
  ===================== */
  const { data: history = [] } = useQuery<ChatMessage[]>({
    queryKey: ["chat", roomId],
    queryFn: async () => {
      const res = await api.get(`/message/api/message/${roomId}`);
      return res.data ?? [];
    },
  });

  /* =====================
     WEBSOCKET
  ===================== */
  useEffect(() => {
    let active = true;

    const initSocket = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return;

      connectChatSocket(Number(roomId), token, (data) => {
        if (
          active &&
          data?.type === "chat_message" &&
          data?.message
        ) {
          setLiveMessages((prev) => {
            if (prev.some((m) => m.id === data.message.id)) {
              return prev;
            }
            return [...prev, data.message];
          });
        }
      });
    };

    initSocket();

    return () => {
      active = false;
      disconnectChatSocket();
    };
  }, [roomId]);

  /* =====================
     MERGE + SORT (ONCE)
  ===================== */
  const mergedMessages = useMemo(() => {
    const map = new Map<number, ChatMessage>();

    [...history, ...liveMessages].forEach((msg) => {
      map.set(msg.id, msg);
    });

    return Array.from(map.values()).sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    );
  }, [history, liveMessages]);

  /* =====================
     PICK IMAGE
  ===================== */
  const pickImage = async () => {
    const perm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return alert("Gallery permission required");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  /* =====================
     SEND MESSAGE
  ===================== */
  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) return;

    const text = message;
    const image = selectedImage;

    setMessage("");
    setSelectedImage(null);
    Keyboard.dismiss();

    if (text.trim()) {
      sendChatMessage({
        type: "chat_message",
        message: text,
      });
    }

    if (image) {
      const formData = new FormData();
      formData.append("file", {
        uri:
          Platform.OS === "android"
            ? image
            : image.replace("file://", ""),
        name: "chat.jpg",
        type: "image/jpeg",
      } as any);

      await api.post(`/message/api/message/${roomId}`, formData);
    }
  };

  /* =====================
     RENDER MESSAGE
  ===================== */
  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.sender === MY_USER_ID;

    return (
      <View
        className={`flex-row ${isMe ? "justify-end" : "justify-start"
          } mb-3 px-2`}
      >
        <View
          className={`max-w-[75%] p-3 rounded-2xl ${isMe ? "bg-primary" : "bg-gray-100"
            }`}
        >
          {item.text && (
            <Text
              className={`text-sm ${isMe ? "text-white" : "text-gray-800"
                }`}
            >
              {item.text}
            </Text>
          )}

          {item.file && (
            <Image
              source={{ uri: item.file }}
              className="w-48 h-48 rounded-xl mt-2"
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={90}
        >
          {/* Header */}
          <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
            <HeaderBackButton
              onPress={() =>
                router.push("/(customer)/more/supportChat")
              }
            />
            <Text className="ml-3 font-semibold">Chat</Text>
          </View>

          {/* Messages */}
          <FlatList
            data={mergedMessages}
            // inverted
            keyExtractor={(item) => String(item.id)}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 10 }}
          />

          {/* Image Preview */}
          {selectedImage && (
            <View className="px-5 pb-2">
              <Image
                source={{ uri: selectedImage }}
                className="w-24 h-24 rounded-xl"
              />
            </View>
          )}

          {/* Input */}
          <View className="flex-row items-center border-t border-gray-100 px-5 py-4">
            <TextInput
              placeholder="Send message"
              value={message}
              onChangeText={setMessage}
              className="flex-1 bg-gray-100 rounded-full px-4 py-3"
            />

            <TouchableOpacity onPress={pickImage} className="ml-2">
              <Ionicons
                name="image-outline"
                size={22}
                color="#007AFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSendMessage}
              className="ml-2 p-3 rounded-full bg-primary"
            >
              <Ionicons name="send" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChatScreen;
