import React from "react";
import {
    ActivityIndicator,
    Platform,
    RefreshControl,
    StatusBar,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
    children: React.ReactNode;

    /* Layout */
    scrollable?: boolean;
    padding?: boolean;
    bgColor?: string;

    /* Keyboard */
    keyboardAvoiding?: boolean;

    /* Status bar */
    statusBarStyle?: "dark-content" | "light-content";
    statusBarBg?: string;

    /* Refresh */
    refreshing?: boolean;
    onRefresh?: () => void;

    /* Loading */
    loading?: boolean;

    /* Bottom space (tab bar, buttons) */
    bottomSafe?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    scrollable = false,
    padding = true,
    bgColor = "bg-white",
    keyboardAvoiding = true,
    statusBarStyle = "dark-content",
    statusBarBg = "#ffffff",
    refreshing = false,
    onRefresh,
    loading = false,
    bottomSafe = true,
}) => {
    if (scrollable || keyboardAvoiding) {
        return (
            <SafeAreaView className={`flex-1 ${bgColor}`}>
                <StatusBar
                    barStyle={statusBarStyle}
                    backgroundColor={statusBarBg}
                />

                <KeyboardAwareScrollView
                    className={padding ? "px-5" : ""}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: bottomSafe ? 24 : 0,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraHeight={Platform.OS === 'ios' ? 0 : 0}
                    extraScrollHeight={Platform.OS === 'ios' ? 120 : 150}
                    enableResetScrollToCoords={false}
                    refreshControl={
                        onRefresh ? (
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        ) : undefined
                    }
                >
                    {children}
                </KeyboardAwareScrollView>

                {/* Loading Overlay */}
                {loading && (
                    <View className="absolute inset-0 bg-black/30 items-center justify-center">
                        <View className="bg-white px-6 py-4 rounded-xl flex-row items-center">
                            <ActivityIndicator size="small" color="#000" />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        );
    }

    // Non-scrollable, non-keyboard-avoiding view
    return (
        <SafeAreaView className={`flex-1 ${bgColor}`}>
            <StatusBar
                barStyle={statusBarStyle}
                backgroundColor={statusBarBg}
            />

            <View
                className={`flex-1 ${padding ? "px-5" : ""}`}
                style={{
                    paddingBottom: bottomSafe ? 24 : 0,
                }}
            >
                {children}
            </View>

            {/* Loading Overlay */}
            {loading && (
                <View className="absolute inset-0 bg-black/30 items-center justify-center">
                    <View className="bg-white px-6 py-4 rounded-xl flex-row items-center">
                        <ActivityIndicator size="small" color="#000" />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default ScreenWrapper;