import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";


const InboxScreen = () => {
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // sample messages
  const messages = [
    { id: "1", sender: "other", type: "text", text: "Hi, are you available?", time: "9:41 AM" },
    { id: "2", sender: "me", type: "text", text: "Yes, I am Available", time: "9:42 AM" },
    { id: "3", sender: "date", text: "Thursday 24, 2025" },
    { id: "4", sender: "other", type: "text", text: "Hi, Did you hear?", time: "9:44 AM" },
    { id: "5", sender: "other", type: "audio", time: "9:45 AM" },
    { id: "6", sender: "other", type: "text", text: "Ok!", time: "9:46 AM" },
    { id: "7", sender: "me", type: "audio", time: "9:47 AM" },
  ];

  // render each chat bubble
  const renderMessage = ({ item }: any) => {
    if (item.sender === "date") {
      return (
        <View className="items-center my-3">
          <Text className="text-xs text-gray-400">{item.text}</Text>
        </View>
      );
    }

    const isMe = item.sender === "me";

    return (
      <View
        className={`flex-row ${isMe ? "justify-end" : "justify-start"} mb-3 px-2`}
      >
        {!isMe && (
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
            }}
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        )}

        <View
          className={`max-w-[75%] p-3 rounded-2xl ${isMe ? "bg-primary" : "bg-gray-100"
            }`}
        >
          {item.type === "text" && (
            <Text
              className={`${isMe ? "text-white" : "text-gray-800"
                } text-sm leading-5`}
            >
              {item.text}
            </Text>
          )}

          {item.type === "audio" && (
            <View
              className={`flex-row items-center ${isMe ? "justify-end" : "justify-start"
                }`}
            >
              <Ionicons
                name="play-circle"
                size={20}
                color={isMe ? "white" : "#007AFF"}
              />
              <Text
                className={`mx-2 text-xs ${isMe ? "text-white" : "text-gray-700"
                  }`}
              >
                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
              </Text>
              <Ionicons
                name="volume-high-outline"
                size={16}
                color={isMe ? "white" : "#007AFF"}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  // helper badge renderer
  const renderStatusBadge = (status: string) => {
    let bg = "#E0F2FE";
    let color = "#0284C7";
    if (status === "Processing") {
      bg = "#FEF9C3";
      color = "#CA8A04";
    } else if (status === "Completed") {
      bg = "#DCFCE7";
      color = "#15803D";
    }
    return (
      <View
        style={{
          backgroundColor: bg,
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
        }}
      >
        <Text style={{ color, fontSize: 12, fontWeight: "600" }}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <HeaderBackButton onPress={() => router.push("/(mart)/(tab)/chat")} />

        <View className="flex-row items-center ml-3 flex-1">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
            }}
            className="w-9 h-9 rounded-full"
          />
          <View className="ml-2">
            <Text className="text-gray-800 font-semibold">Shirts Laundry</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              <Text className="text-xs text-gray-500">Active Now</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity>
            <Entypo name="phone" size={24} color="#017FC6" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-2">
            <Ionicons name="ellipsis-vertical" size={20} color="#444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info bar */}
      <View className="rounded-lg flex-row justify-center items-center gap-2 py-3 bg-primary/10 mx-3 mt-2">
        <Text className="text-black/50">View customer order details?</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text className="text-primary font-bold">Click here.</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <View className="flex-row items-center border-t border-gray-100 px-5 py-4">
        <TextInput
          placeholder="Send Message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          className="flex-1 bg-gray-100 rounded-full px-4 py-4 text-sm text-gray-700"
        />

        <TouchableOpacity className="ml-2">
          <Ionicons name="image-outline" size={22} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity className="ml-3 p-2 rounded-full bg-primary">
          <Ionicons name="mic-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal: order details */}
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-t-3xl p-5 pb-10">
            {/* header */}
            <View className="w-12 h-1.5 bg-gray-300 self-center rounded-full mb-4" />

            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-medium text-[#1E293B]">
                Order #LMX9321
              </Text>
              {renderStatusBadge("Processing")}
            </View>

            {/* date */}
            <View className="flex-row items-center mb-3">
              <Ionicons name="calendar-outline" size={16} color="#64748B" />
              <Text className="text-sm text-[#64748B] ml-2">24 Oct 2025</Text>
            </View>

            {/* address */}
            <Text className="text-base font-semibold text-[#1E293B] mb-1">
              Address
            </Text>
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={18} color="#2563EB" />
              <Text className="text-sm text-[#1E293B] ml-2">
                123 Main Street, Dhaka, Bangladesh
              </Text>
            </View>

            {/* details */}
            <Text className="text-base font-semibold text-[#1E293B] mb-2">
              Order Details
            </Text>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-[#475569]">Bag Size</Text>
              <Text className="text-sm text-[#1E293B]">Medium</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-[#475569]">
                Can clothes be mixed?
              </Text>
              <Text className="text-sm text-[#1E293B]">Yes</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-[#475569]">Service</Text>
              <Text className="text-sm text-[#1E293B]">Wash & Fold</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-sm text-[#475569]">Estimated Cost</Text>
              <Text className="text-sm font-semibold text-[#2563EB]">
                $18.50
              </Text>
            </View>

            {/* notes */}
            <View className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-4">
              <Text className="text-xs text-[#475569]">
                <Text className="font-semibold text-[#1E293B]">Notes: </Text>
                Please handle with care, one shirt has a stain mark.
              </Text>
            </View>

            {/* actions */}
            <View className="gap-3 mt-2">
              <TouchableOpacity className="bg-primary rounded-lg py-3 items-center">
                <Text className="text-sm font-medium text-white">
                  Mark as Ready for Pickup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#CBD5E1] rounded-lg py-3 items-center">
                <Text className="text-sm font-medium text-[#1E293B]">
                  Mark as Picked Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(mart)/report/reportDamage")
                }
                className="bg-primary/10 rounded-lg py-3 items-center"
              >
                <Text className="text-sm font-medium text-primary">
                  Report Damage / Stain
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="border border-gray-300 rounded-lg py-3 items-center mt-2"
              >
                <Text className="text-sm text-gray-700 font-medium">
                  Close
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InboxScreen;
