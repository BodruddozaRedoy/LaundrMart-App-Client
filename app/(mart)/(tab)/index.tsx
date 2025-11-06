import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  // Dummy orders
  const orders = [
    { id: "ORD-1233", customer: "Mike Chen", time: "1 hour ago", price: "$30.00", status: "In Progress" },
    { id: "ORD-1241", customer: "Sophia Lee", time: "2 hours ago", price: "$25.00", status: "Drying" },
    { id: "ORD-1250", customer: "Daniel Kim", time: "3 hours ago", price: "$42.00", status: "Out for Delivery" },
    { id: "ORD-1262", customer: "Emma Davis", time: "Yesterday", price: "$37.00", status: "Ready for Delivery" },
  ];

  // ✅ Status background only (light)
  const getStatusBg = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-100";
      case "Drying":
        return "bg-blue-100";
      case "Out for Delivery":
        return "bg-purple-100";
      case "Ready for Delivery":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  // ✅ Status text color (dark tone)
  const getStatusText = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-orange-600";
      case "Drying":
        return "text-blue-600";
      case "Out for Delivery":
        return "text-purple-600";
      case "Ready for Delivery":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Hello, Bodruddoza Redoy
            </Text>
            <Text className="text-gray-500 text-md">Ready for laundry?</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {/* Total Orders */}
          <View className="w-[48%] bg-orange-50 rounded-2xl p-4 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-orange-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <FontAwesome6 name="clock-rotate-left" size={12} color="#ea580c" />
                <Text className="text-orange-600 text-md font-semibold">
                  Total Orders
                </Text>
              </View>
              <Text className="text-3xl font-bold text-orange-600">12</Text>
              <Text className="text-sm text-orange-600 mt-1">Pending</Text>
            </View>
          </View>

          {/* Completed Orders */}
          <View className="w-[48%] bg-green-50 rounded-2xl p-4 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-green-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <Ionicons name="checkmark-done-circle-outline" size={14} color="#16a34a" />
                <Text className="text-green-600 text-md font-semibold">
                  This Month
                </Text>
              </View>
              <Text className="text-3xl font-bold text-green-600">06</Text>
              <Text className="text-sm text-green-600 mt-1">Completed</Text>
            </View>
          </View>

          {/* Accepted Orders */}
          <View className="w-[48%] bg-blue-50 rounded-2xl p-4 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-blue-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <FontAwesome5 name="handshake" size={14} color="#2563eb" />
                <Text className="text-blue-600 text-md font-semibold">
                  This Month
                </Text>
              </View>
              <Text className="text-3xl font-bold text-blue-600">05</Text>
              <Text className="text-sm text-blue-600 mt-1">Accepted</Text>
            </View>
          </View>

          {/* Canceled Orders */}
          <View className="w-[48%] bg-red-50 rounded-2xl p-4 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-red-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <MaterialCommunityIcons name="cancel" size={16} color="#dc2626" />
                <Text className="text-red-600 text-md font-semibold">
                  This Month
                </Text>
              </View>
              <Text className="text-3xl font-bold text-red-600">04</Text>
              <Text className="text-sm text-red-600 mt-1">Canceled</Text>
            </View>
          </View>
        </View>

        {/* Alerts / Notifications */}
        <View className="border border-gray-200 rounded-2xl p-4 mb-6">
          <Text className="text-base font-semibold text-gray-900 mb-3">
            Alerts / Notifications
          </Text>

          <View className="bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-3 flex-row items-center mb-3">
            <Ionicons name="warning-outline" size={18} color="#F59E0B" />
            <View className="ml-2">
              <Text className="text-sm text-gray-800 font-medium">
                2 orders are overdue
              </Text>
              <Text className="text-xs text-gray-500">Past turnaround time</Text>
            </View>
          </View>

          <View className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-3 flex-row items-center">
            <Ionicons name="warning-outline" size={18} color="#3B82F6" />
            <View className="ml-2">
              <Text className="text-sm text-gray-800 font-medium">
                Tomorrow is a holiday
              </Text>
              <Text className="text-xs text-gray-500">Update hours?</Text>
            </View>
          </View>
        </View>

        {/* Recent Orders */}
        <View className="border border-gray-200 rounded-2xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Recent Orders
          </Text>

          {orders.map((order, index) => (
            <View
              key={index}
              className={`border-b border-gray-100 pb-3 mb-3 ${index === orders.length - 1 ? "border-b-0 mb-0 pb-0" : ""
                }`}
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sm font-semibold text-gray-900">
                  #{order.id}
                </Text>
                <View className={`px-2.5 py-1 rounded-full ${getStatusBg(order.status)}`}>
                  <Text
                    className={`text-[11px] font-semibold ${getStatusText(order.status)}`}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-gray-800">{order.customer}</Text>
              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-xs text-gray-400">{order.time}</Text>
                <Text className="text-base font-semibold text-gray-900">
                  {order.price}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
