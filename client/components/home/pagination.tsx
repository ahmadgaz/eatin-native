import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { carouselDataType } from "./types";
import homeStyles from "./styles";
import Animated, {
    Extrapolate,
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const screen = Dimensions.get("screen");

export default function Pagination({
    data,
    scrollX,
}: {
    data: carouselDataType[];
    scrollX: SharedValue<number>;
}) {
    const styles = homeStyles("light");

    return (
        <View style={styles.carouselPaginationContainer}>
            {data.map((item, idx) => {
                /*******************************************************************************/
                // Interpolates the dot width based on the scrollX value
                // EXAMPLE:
                // Slide 1:
                // [ -400, 0, 400 ]   // at scrollX value 0, dotWidth is 24
                // [    8,24,   8 ]
                // Slide 2:
                // [ 0, 400, 800 ]   // at scrollX value 400, dotWidth is 24
                // [ 8,  24,   8 ]
                // Slide 3:
                // [ 400, 800, 1200 ]   // at scrollX value 800, dotWidth is 24
                // [   8,  24,    8 ]
                /*******************************************************************************/

                const inputRange = [
                    (idx - 1) * screen.width,
                    idx * screen.width,
                    (idx + 1) * screen.width,
                ];

                const animatedStyle = useAnimatedStyle(() => {
                    const dotWidth = interpolate(
                        scrollX.value,
                        inputRange,
                        [8, 24, 8],
                        Extrapolate.CLAMP
                    );

                    return {
                        width: dotWidth,
                    };
                });

                return (
                    <Animated.View
                        key={idx}
                        style={[styles.carouselPaginationDot, animatedStyle]}
                    />
                );
            })}
        </View>
    );
}
