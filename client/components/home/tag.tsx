import { StyleSheet, View, Text } from "react-native";
import React from "react";
import homeStyles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeleteIcon } from "../../assets/icons/delete-icon";
import Animated, {
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

export default function Tag({
    id,
    text,
    changeColorAnimation,
    setIngredients,
}: {
    id: number;
    text: string;
    changeColorAnimation: SharedValue<number>;
    setIngredients: React.Dispatch<
        React.SetStateAction<{ id: number; name: string }[]>
    >;
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const changeColorAnimationInputRange = [0, 100, 0];

    // Colors to animate between based on focus status
    const tagBackgroundColors_R = [
        hexToRgb(theme.options.colors.text[400]).r,
        hexToRgb(theme.options.colors.accent[400]).r,
    ];
    const tagBackgroundColors_G = [
        hexToRgb(theme.options.colors.text[400]).g,
        hexToRgb(theme.options.colors.accent[400]).g,
    ];
    const tagBackgroundColors_B = [
        hexToRgb(theme.options.colors.text[400]).b,
        hexToRgb(theme.options.colors.accent[400]).b,
    ];

    const tagTextAndIconColors_R = [
        hexToRgb(theme.options.colors.text[500]).r,
        hexToRgb(theme.options.colors.accent[500]).r,
    ];
    const tagTextAndIconColors_G = [
        hexToRgb(theme.options.colors.text[500]).g,
        hexToRgb(theme.options.colors.accent[500]).g,
    ];
    const tagTextAndIconColors_B = [
        hexToRgb(theme.options.colors.text[500]).b,
        hexToRgb(theme.options.colors.accent[500]).b,
    ];

    const inputTagContainerColor = useAnimatedStyle(() => {
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
    });

    const inputTagTextColor = useAnimatedStyle(() => {
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
    });

    // Enter and exit animation
    const opacity = useSharedValue<number>(0);
    const fadeIn = () => {
        opacity.value = withTiming(1, { duration: 100 });
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
        <Animated.View layout={Layout.duration(100)}>
            <TouchableOpacity
                onLayout={fadeIn}
                onPress={() => {
                    fadeOut();
                    setTimeout(() => {
                        setIngredients((prev) => {
                            return prev.filter(
                                (ingredient) => ingredient.id !== id
                            );
                        });
                    }, 100);
                }}
            >
                <Animated.View style={[enterExitAnimation]}>
                    <Animated.View
                        style={[
                            styles.sheetTextInputTagContainer,
                            inputTagContainerColor,
                        ]}
                    >
                        <Animated.Text
                            style={[
                                styles.sheetTextInputTagText,
                                inputTagTextColor,
                            ]}
                        >
                            {text}
                        </Animated.Text>
                        <DeleteIcon
                            changeColorAnimation={changeColorAnimation}
                        />
                    </Animated.View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}
