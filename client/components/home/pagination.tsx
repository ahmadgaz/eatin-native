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
import { useTheme } from "../../theme";
import hexToRgb from "../../utils/hexToRgb";

const screen = Dimensions.get("screen");

export default function Pagination({
    data,
    scrollX,
}: {
    data: carouselDataType[];
    scrollX: SharedValue<number>;
}) {
    const theme = useTheme("light");
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

                const width = useAnimatedStyle(() => {
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
                const color = useAnimatedStyle(() => {
                    const r = [
                        hexToRgb(theme.options.colors.background[400]).r,
                        hexToRgb(theme.options.colors.background[500]).r,
                    ];
                    const g = [
                        hexToRgb(theme.options.colors.background[400]).g,
                        hexToRgb(theme.options.colors.background[500]).g,
                    ];
                    const b = [
                        hexToRgb(theme.options.colors.background[400]).b,
                        hexToRgb(theme.options.colors.background[500]).b,
                    ];
                    const dotColorRed = interpolate(
                        scrollX.value,
                        inputRange,
                        [r[0], r[1], r[0]],
                        Extrapolate.CLAMP
                    );
                    const dotColorGreen = interpolate(
                        scrollX.value,
                        inputRange,
                        [g[0], g[1], g[0]],
                        Extrapolate.CLAMP
                    );
                    const dotColorBlue = interpolate(
                        scrollX.value,
                        inputRange,
                        [b[0], b[1], b[0]],
                        Extrapolate.CLAMP
                    );

                    return {
                        backgroundColor: `rgb(${dotColorRed}, ${dotColorGreen}, ${dotColorBlue})`,
                    };
                });

                return (
                    <Animated.View
                        key={idx}
                        style={[
                            idx === 0
                                ? styles.carouselPaginationDotWide
                                : styles.carouselPaginationDotRegular,
                            width,
                            color,
                        ]}
                    />
                );
            })}
        </View>
    );
}
