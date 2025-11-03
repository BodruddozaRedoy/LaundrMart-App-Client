import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, FlatList } from "react-native";

const notifications = [
  {
    id: "1",
    message: "Your laundry has been delivered. Thank you for using LaundrMart!",
    time: "2 min ago",
  },
  {
    id: "2",
    message: "A driver is picking up your order for delivery.",
    time: "2 min ago",
  },
  {
    id: "3",
    message: "AJ LaundryMart has finished your laundry.",
    time: "2 min ago",
  },
  {
    id: "4",
    message: `"Your laundry has been received by AJ LaundryMart"`,
    time: "2 min ago",
  },
  {
    id: "5",
    message: "A driver is on the way to pick up your laundry.",
    time: "2 min ago",
  },
  {
    id: "6",
    message: "AJ LaundryMart accepted your order. Pickup is scheduled for 10th October 10AM.",
    time: "2 min ago",
  },
  {
    id: "7",
    message: "Your order has been submitted to AJ LaundryMart for review.",
    time: "2 min ago",
  },
];

export default function NotificationScreen() {
  return (
    <View className="flex-1 bg-white px-5 pt-4">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View className="flex-row items-start mb-5">
            {/* Notification Icon */}
            <View className="w-8 h-8 bg-[#EFF6FF] rounded-full items-center justify-center mt-0.5 mr-3">
              <Ionicons name="notifications-outline" size={18} color="#2563EB" />
            </View>

            {/* Message + Time */}
            <View className="flex-1">
              <Text className="text-[#1E293B] text-sm leading-5">
                {item.message}
              </Text>
              <Text className="text-xs text-[#94A3B8] mt-1">{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
