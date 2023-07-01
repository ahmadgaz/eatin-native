import { StyleSheet, View, Text } from "react-native";
import React from "react";
import commonStyles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeleteIcon } from "../../assets/icons/delete-icon";
import Animated, {
    Easing,
    Extrapolate,
    FadeIn,
    FadeOut,
    interpolate,
    Layout,
    LayoutAnimationsValues,
    SharedValue,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import hexToRgb from "../../utils/hexToRgb";
import { useTheme } from "../../theme";
import { ingredientDataType } from "./types";

export default function Tag({
    id,
    text,
    emphasized,
    changeColorAnimation,
    setList,
    colors,
    iconLeft,
    iconRight,
}: {
    id?: number;
    text: string;
    emphasized?: boolean;
    changeColorAnimation?: SharedValue<number>;
    setList?: React.Dispatch<React.SetStateAction<Array<any>>>;
    colors: { background: string[]; text: string[] };
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
}) {
    const theme = useTheme("light");
    const styles = commonStyles("light");
    const changeColorAnimationInputRange = [0, 100, 0];

    // Colors to animate between based on focus status
    const tagBackgroundColors_R = [
        hexToRgb(colors.background[0]).r,
        hexToRgb(colors.background[1]).r,
    ];
    const tagBackgroundColors_G = [
        hexToRgb(colors.background[0]).g,
        hexToRgb(colors.background[1]).g,
    ];
    const tagBackgroundColors_B = [
        hexToRgb(colors.background[0]).b,
        hexToRgb(colors.background[1]).b,
    ];

    const tagTextAndIconColors_R = [
        hexToRgb(colors.text[0]).r,
        hexToRgb(colors.text[1]).r,
    ];
    const tagTextAndIconColors_G = [
        hexToRgb(colors.text[0]).g,
        hexToRgb(colors.text[1]).g,
    ];
    const tagTextAndIconColors_B = [
        hexToRgb(colors.text[0]).b,
        hexToRgb(colors.text[1]).b,
    ];

    const inputTagContainerColor = useAnimatedStyle(() => {
        if (changeColorAnimation) {
            const inputColorRed = interpolate(
                changeColorAnimation.value,
                changeColorAnimationInputRange,
                [
                    tagBackgroundColors_R[0],
                    tagBackgroundColors_R[1],
                    tagBackgroundColors_R[0],
                ],
                Extrapolate.CLAMP
            );
            const inputColorGreen = interpolate(
                changeColorAnimation.value,
                changeColorAnimationInputRange,
                [
                    tagBackgroundColors_G[0],
                    tagBackgroundColors_G[1],
                    tagBackgroundColors_G[0],
                ],
                Extrapolate.CLAMP
            );
            const inputColorBlue = interpolate(
                changeColorAnimation.value,
                changeColorAnimationInputRange,
                [
                    tagBackgroundColors_B[0],
                    tagBackgroundColors_B[1],
                    tagBackgroundColors_B[0],
                ],
                Extrapolate.CLAMP
            );
            return {
                backgroundColor: `rgb(${inputColorRed}, ${inputColorGreen}, ${inputColorBlue})`,
            };
        }
        return { backgroundColor: colors.background[0] };
    });

    const inputTagTextColor = useAnimatedStyle(() => {
        if (changeColorAnimation) {
            const inputColorRed = interpolate(
                changeColorAnimation.value,
                changeColorAnimationInputRange,
                [
                    tagTextAndIconColors_R[0],
                    tagTextAndIconColors_R[1],
                    tagTextAndIconColors_R[0],
                ],
                Extrapolate.CLAMP
            );
            const inputColorGreen = interpolate(
                changeColorAnimation.value,
                changeColorAnimationInputRange,
                [
                    tagTextAndIconColors_G[0],
                    tagTextAndIconColors_G[1],
                    tagTextAndIconColors_G[0],
                ],
                Extrapolate.CLAMP
            );
            const inputColorBlue = interpolate(
                changeColorAnimation.value,
                changeColorAnimationInputRange,
                [
                    tagTextAndIconColors_B[0],
                    tagTextAndIconColors_B[1],
                    tagTextAndIconColors_B[0],
                ],
                Extrapolate.CLAMP
            );
            return {
                color: `rgb(${inputColorRed}, ${inputColorGreen}, ${inputColorBlue})`,
            };
        }
        return { color: colors.text[0] };
    });

    // Enter and exit animation
    const opacity = useSharedValue<number>(0);
    const fadeIn = () => {
        opacity.value = withTiming(1, { duration: 300 });
    };
    const fadeOut = () => {
        opacity.value = withTiming(0, { duration: 100 });
    };
    const enterExitAnimation = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            layout={Layout.duration(500).easing(
                Easing.bezier(0.25, 1, 0.75, 1).factory()
            )}
        >
            <TouchableOpacity
                onLayout={fadeIn}
                onPress={() => {
                    if (setList === undefined) return;

                    fadeOut();
                    setTimeout(() => {
                        setList((prev) => {
                            return prev.filter(
                                (ingredient) => ingredient.id !== id
                            );
                        });
                    }, 300);
                }}
            >
                <Animated.View style={[enterExitAnimation]}>
                    <Animated.View
                        style={[styles.tagContainer, inputTagContainerColor]}
                    >
                        {iconLeft}
                        <Animated.Text
                            style={[
                                styles.tagText,
                                inputTagTextColor,
                                emphasized
                                    ? {
                                          fontStyle: "italic",
                                          fontWeight: "bold",
                                      }
                                    : null,
                            ]}
                        >
                            {text}
                        </Animated.Text>
                        {iconRight}
                    </Animated.View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}
