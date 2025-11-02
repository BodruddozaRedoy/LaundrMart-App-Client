import { images } from "@/constants";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width * 0.9;
const KNOB_SIZE = 60;

interface SlideToOrderProps {
  onSlideComplete?: () => void;
}

const SlideToOrder: React.FC<SlideToOrderProps> = ({ onSlideComplete }) => {
  const translateX = useSharedValue(0);
  const maxSlide = SLIDE_WIDTH - KNOB_SIZE - 10;

  /** ✅ Latest Gesture API using context for offset tracking */
  const pan = Gesture.Pan()
    .onBegin(() => {
      // prepare context if needed
    })
    .onUpdate((event) => {
      translateX.value = Math.min(Math.max(0, event.translationX), maxSlide);
    })
    .onEnd(() => {
      if (translateX.value > maxSlide * 0.9) {
        translateX.value = withSpring(maxSlide);
        if (onSlideComplete) {
          runOnJS(onSlideComplete)();
        }
      } else {
        translateX.value = withSpring(0);
      }
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        {/* Text */}
        <Text style={styles.text} className="ml-56">Slide to place order</Text>
        {/* Logo */}
        <Image source={images.SliderArrow} style={styles.logo} resizeMode="contain" />

        {/* Knob */}
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.knob, knobStyle]}>
            <Image
              source={images.Logo}
              style={styles.knobLogo}
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};

export default SlideToOrder;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -60, // right above tab bar
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
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
  },
  logo: {
    position: "absolute",
    left: 160,
    width: 50,
    // height: 40,
  },
  knob: {
    position: "absolute",
    left: 60,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    // borderRadius: 10,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOpacity: 0.15,
    // shadowOffset: { width: 0, height: 3 },
    // shadowRadius: 5,
  },
  knobLogo: {
    width: 130,
    // height: 20,
  },
});
