import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const PickupNowScreen = () => {
    const { latitude, longitude, currentAddress } = useLocalSearchParams<{
        latitude: string;
        longitude: string;
        currentAddress: string;
    }>();

    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    useEffect(() => {
        const loadAddresses = async () => {
            const saved = await AsyncStorage.getItem("savedAddresses");
            if (saved) {
                const parsed = JSON.parse(saved);
                setAddresses(parsed);
            }
        };
        loadAddresses();
    }, []);

    const handleSelect = (addr: any) => {
        setSelectedAddress(addr);
    };

    const handleContinue = () => {
        if (!selectedAddress) return;
        router.push({
            pathname: "/order/chooseLaundryMart",
            params: {
                latitude: selectedAddress.latitude.toString(),
                longitude: selectedAddress.longitude.toString(),
                currentAddress: selectedAddress.currentAddress,
            },
        });
    };

    return (
        <View className="flex-1 bg-white px-5 pt-5">
            <Text className="text-2xl font-bold text-black">Your Locations</Text>
            <Text className="text-md text-gray-500 mt-1 mb-5">
                Where should we pick up your laundry?
            </Text>

            {/* Saved Addresses */}
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelect(item)}
                        className={`flex-row justify-between items-center border rounded-2xl p-4 mb-3 ${selectedAddress?.id === item.id
                            ? "border-[#017FC6] bg-[#E5F3FF]"
                            : "border-gray-200 bg-white"
                            }`}
                    >
                        <View className="flex-1 ml-2">
                            <Text className="text-lg font-semibold text-black">
                                {item.label}
                            </Text>
                            <Text className="text-md text-gray-600 mt-1">
                                {item.currentAddress}
                            </Text>
                        </View>
                        {selectedAddress?.id === item.id && (
                            <Ionicons name="checkmark-circle" size={24} color="#017FC6" />
                        )}
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text className="text-gray-500 text-center mt-10">
                        No saved addresses yet.
                    </Text>
                }
                ListFooterComponent={() => (
                    <TouchableOpacity
                        onPress={() => router.push("/order/addNewAddress")}
                        className="flex-row items-center justify-center mt-6 h-12 bg-gray-50 rounded-xl border border-gray-200"
                    >
                        <Ionicons name="add-circle-outline" size={20} color="#017FC6" />
                        <Text className="text-[#017FC6] font-medium text-sm ml-2">
                            Add New Address
                        </Text>
                    </TouchableOpacity>
                )}
            />



            {/* Continue Button */}
            <TouchableOpacity
                onPress={() => router.push("/order/chooseLaundryMart")}
                disabled={!selectedAddress}
                className="w-full absolute bottom-10 right-5 left-5 opacity-100"
            >
                <PrimaryButton
                    text="Continue"
                //   disabled={!selectedAddress}
                />
            </TouchableOpacity>
        </View>
    );
};

export default PickupNowScreen;
