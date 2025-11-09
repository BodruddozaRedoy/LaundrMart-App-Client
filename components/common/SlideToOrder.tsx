import { images } from "@/constants";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width * 0.9;
const KNOB_SIZE = 60;

export default function SlideToOrder() {
    const translateX = useSharedValue(0);
    const frontOpacity = useSharedValue(1); // 🔹 to fade out the slider visuals
    const maxSlide = SLIDE_WIDTH - KNOB_SIZE - 10;

    const [statusText, setStatusText] = useState("Slide to place order");
    const isMounted = useRef(true);
    const confirming = useRef(false); // prevent retriggers

    /** ---- handle final confirmation ---- */
    const handleConfirm = useCallback(() => {
        if (!isMounted.current || confirming.current) return;
        confirming.current = true;
        setStatusText("Lets Go!");

        // 🔹 Fade out the blue front part
        frontOpacity.value = withTiming(0, { duration: 400 });

        // Wait before navigating
        setTimeout(() => {
            if (!isMounted.current) return;

            router.push("/(customer)/order/placeOrder"); // change as needed
            confirming.current = false;
            setStatusText("Slide to place order");
            translateX.value = 0;
            frontOpacity.value = withTiming(1, { duration: 0 }); // reset instantly
        }, 1000);
    }, []);

    /** ---- gesture logic ---- */
    const pan = Gesture.Pan()
        .onUpdate((e) => {
            if (confirming.current) return;
            const x = Math.min(Math.max(0, e.translationX), maxSlide);
            translateX.value = x;
            if (x > maxSlide * 0.6) {
                runOnJS(setStatusText)("Release to confirm");
            } else {
                runOnJS(setStatusText)("Release to confirm");
            }
        })
        .onEnd(() => {
            if (confirming.current) return;
            if (translateX.value > maxSlide * 0.7) {
                translateX.value = withSpring(maxSlide);
                runOnJS(handleConfirm)();
            } else {
                translateX.value = withSpring(0);
                runOnJS(setStatusText)("Slide to place order");
            }
        });

    /** ---- reset when returning ---- */
    useFocusEffect(
        useCallback(() => {
            isMounted.current = true;
            confirming.current = false;
            translateX.value = withSpring(0);
            frontOpacity.value = withTiming(1, { duration: 0 });
            setStatusText("Slide to place order");
            return () => {
                isMounted.current = false;
            };
        }, [])
    );

    /** ---- animations ---- */
    const bgStyle = useAnimatedStyle(() => {
        const width = interpolate(
            translateX.value,
            [0, maxSlide],
            [0, SLIDE_WIDTH],
            Extrapolate.CLAMP
        );
        return { width };
    });

    const frontStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: frontOpacity.value, // fade front visuals
    }));

    const textStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, maxSlide * 0.4],
            [0, 1],
            Extrapolate.CLAMP
        );
        const tx = interpolate(
            translateX.value,
            [0, maxSlide],
            [-SLIDE_WIDTH / 2, 0],
            Extrapolate.CLAMP
        );
        return { opacity, transform: [{ translateX: tx }] };
    });

    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                {/* 🟩 Background expanding */}
                <Animated.View style={[styles.behindSlide, bgStyle]} />

                {/* 🟢 Text layer */}
                <Animated.View style={[styles.textLayer, textStyle]}>
                    <Text style={styles.behindText}>{statusText}</Text>
                </Animated.View>

                {/* 🟦 Foreground visuals */}
                <GestureDetector gesture={pan}>
                    <Animated.View style={[StyleSheet.absoluteFill, frontStyle]}>
                        <View className="flex items-center justify-center mt-8">
                            <Image
                                source={images.SliderArrow}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <View style={styles.knob}>
                                <Image
                                    source={images.SliderLogo}
                                    style={styles.knobLogo}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="text-white ml-48">Slide to place order</Text>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },
    slider: {
        width: SLIDE_WIDTH,
        height: 80,
        backgroundColor: "#017FC6",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    behindSlide: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#28C76F",
        borderRadius: 40,
    },
    textLayer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    behindText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    logo: {
        position: "absolute",
        left: 160,
        width: 40,
    },
    knob: {
        position: "absolute",
        left: 60,
        width: KNOB_SIZE,
        height: KNOB_SIZE,
        alignItems: "center",
        justifyContent: "center",
    },
    knobLogo: {
        width: 130,
    },
});
