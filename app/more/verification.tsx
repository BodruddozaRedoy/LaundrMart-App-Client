import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const VerificationScreen = () => {
  return (
    <View className="flex-1 bg-white px-5 pt-10">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          Verification
        </Text>
      </View>

      {/* Title */}
      <View className="mb-3">
        <Text className="text-xl font-semibold text-gray-800 mb-1">
          Email Verification
        </Text>
        <Text className="text-sm text-gray-500">
          Please enter the Email we will send the OTP in this Email.
        </Text>
      </View>

      {/* Input */}
      <View className="mt-5 mb-6">
        <Text className="text-sm text-gray-700 mb-1">
          Enter Email/Phone Number
        </Text>
        <TextInput
          placeholder="ahmadjubayerr@gmail.com"
          className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700"
        />
      </View>

      {/* Button */}
      <TouchableOpacity className="bg-[#007AFF] rounded-xl py-3">
        <Text className="text-white text-center font-semibold text-base">
          Send OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;
