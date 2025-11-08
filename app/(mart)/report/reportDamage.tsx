import HeaderBackButton from "@/components/common/HeaderBackButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportDamageScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState("");

    const takePhoto = async () => {
        // console.log(ImagePicker.MediaType);
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Camera access is needed to take a photo.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // 📂 Upload from gallery
    const uploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Gallery access is needed to upload an image.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!image) {
            Alert.alert("Please upload or take a photo first.");
            return;
        }

        Alert.alert("Submitted!", "Your report has been sent successfully.");
        setImage(null);
        setDescription("");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="px-5 pt-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center mb-4 justify-between">
                    <HeaderBackButton onPress={() => router.back()} />
                    <Text className="ml-2 text-lg font-semibold text-center text-gray-900">
                        Report Damage / Stain
                    </Text>
                    <View />
                </View>

                {/* Upload Section */}
                <Text className="text-md font-semibold text-gray-800 mt-4">
                    Upload picture / Take a Photo <Text className="text-red-500">*</Text>
                </Text>

                <View className="flex-row justify-between my-5">
                    {/* Upload Button */}
                    <TouchableOpacity
                        onPress={uploadImage}
                        className="flex-1 bg-primary py-3 rounded-lg flex-row items-center justify-center mr-2"
                        activeOpacity={0.8}
                    >
                        <Ionicons name="cloud-upload-outline" size={18} color="white" />
                        <Text className="text-white font-semibold ml-2">Upload</Text>
                    </TouchableOpacity>

                    {/* Take Photo Button */}
                    <TouchableOpacity
                        onPress={takePhoto}
                        className="flex-1 bg-primary py-3 rounded-lg flex-row items-center justify-center ml-2"
                        activeOpacity={0.8}
                    >
                        <Ionicons name="camera-outline" size={18} color="white" />
                        <Text className="text-white font-semibold ml-2">Take Photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Image Preview */}
                {image && (
                    <View className="items-center mb-6">
                        <Image
                            source={{ uri: image }}
                            className="w-full h-56 rounded-xl"
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            onPress={() => setImage(null)}
                            className="mt-2"
                        >
                            <Text className="text-red-500 text-sm font-medium">
                                Remove Image
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Description */}
                <Text className="text-md font-semibold text-gray-800 mb-2">
                    Description (Optional)
                </Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Type here"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={5}
                    className="border border-gray-300 text-start rounded-xl px-4 text-gray-900 mb-6 text-sm"
                />

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="w-full"
                    activeOpacity={0.8}
                >
                    <PrimaryButton text="Submit"/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
