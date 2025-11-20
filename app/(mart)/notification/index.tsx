import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    Text,
    View,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet detection
const { width } = Dimensions.get("window");
const isMd = width >= 768;      // iPad
const isLg = width >= 1024;     // Large Tablet

// 📌 Dynamic scaling reused across all your screens
const textLg = isLg ? "text-3xl" : isMd ? "text-2xl" : "text-lg";
const textMd = isLg ? "text-2xl" : isMd ? "text-xl" : "text-md";
const textSm = isLg ? "text-lg" : isMd ? "text-base" : "text-xs";
const iconSize = isLg ? 34 : isMd ? 26 : 18;
const bubbleSize = isLg ? 48 : isMd ? 42 : 32;

const notifications = [
    {
        id: "1",
        message: "Your laundry has been delivered. Thank you for using LaundrMart!",
        time: "2 min ago",
    },
    { id: "2", message: "A driver is picking up your order for delivery.", time: "2 min ago" },
    { id: "3", message: "AJ LaundryMart has finished your laundry.", time: "2 min ago" },
    { id: "4", message: "Your laundry has been received by AJ LaundryMart.", time: "2 min ago" },
    { id: "5", message: "A driver is on the way to pick up your laundry.", time: "2 min ago" },
    {
        id: "6",
        message:
            "AJ LaundryMart accepted your order. Pickup is scheduled for 10th October 10AM.",
        time: "2 min ago",
    },
    { id: "7", message: "Your order has been submitted to AJ LaundryMart for review.", time: "2 min ago" },
];

export default function NotificationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-white">

              {/* HEADER */}
              <View
                  className="flex-row items-center justify-between border-b border-[#E2E8F0]"
                  style={{
                      paddingHorizontal: isMd ? 30 : 20,
                      paddingTop: isMd ? 30 : 20,
                      paddingBottom: isMd ? 18 : 12,
                  }}
              >
                  <HeaderBackButton onPress={() => router.back()} />
                  <Text
                      className={`font-semibold text-[#1E293B] ${textLg}`}
                  >
                      Notifications
                  </Text>
                  <View style={{ width: isMd ? 30 : 20 }} />
              </View>

              {/* NOTIFICATION LIST */}
              <ScrollView
                  className="pt-4"
                  contentContainerStyle={{
                      paddingTop: isMd ? 20 : 10,
                      paddingBottom: isMd ? 60 : 30,
                      paddingHorizontal: isMd ? 30 : 20,
                  }}
                  showsVerticalScrollIndicator={false}
              >
                  {notifications.map((item) => (
              <View
                  key={item.id}
                  className="flex-row items-start mb-6"
                  style={{ marginBottom: isMd ? 28 : 20 }}
              >
                  {/* ICON */}
                  <View
                      className="rounded-full items-center justify-center"
                      style={{
                          width: bubbleSize,
                          height: bubbleSize,
                          backgroundColor: "#EFF6FF",
                          marginTop: 2,
                          marginRight: isMd ? 16 : 12,
                      }}
                  >
                      <Ionicons
                          name="notifications-outline"
                          size={iconSize}
                          color="#2563EB"
                      />
                  </View>

                  {/* MESSAGE */}
                  <View className="flex-1">
                      <Text
                          className={`text-[#1E293B] leading-5 ${textMd}`}
                      >
                          {item.message}
                      </Text>

                      <Text
                          className={`text-[#94A3B8] mt-1 ${textSm}`}
                      >
                          {item.time}
                      </Text>
                  </View>
              </View>
          ))}
              </ScrollView>

          </View>
      </SafeAreaView>
  );
}
