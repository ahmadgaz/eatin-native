import { View, Text, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import homeStyles from "./styles";
import { useTheme } from "../../theme";
import Animated, {
    Extrapolate,
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import hexToRgb from "../../utils/hexToRgb";

export default function AutocompleteInput({
    screen,
    sheetHeight,
    contentOpacity,
}: {
    screen: { width: number; height: number };
    sheetHeight: SharedValue<number>;
    contentOpacity: SharedValue<number>;
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const textInput = useRef<TextInput>(null);
    const [ingredients, setIngredients] = useState<
        { id: number; name: string }[]
    >([]);
    const changeColorAnimation = useSharedValue<number>(0);

    const inputRange = [0, 100, 0];

    useEffect(() => {
        sheetHeight.value = withTiming(290 - screen.height);
        contentOpacity.value = withTiming(1);
        changeColorAnimation.value = 0;
    }, []);

    useEffect(() => {
        console.log(ingredients);
    }, [ingredients]);

    const r = [
        hexToRgb(theme.options.colors.text[400]).r,
        hexToRgb(theme.options.colors.accent[400]).r,
    ];
    const g = [
        hexToRgb(theme.options.colors.text[400]).g,
        hexToRgb(theme.options.colors.accent[400]).g,
    ];
    const b = [
        hexToRgb(theme.options.colors.text[400]).b,
        hexToRgb(theme.options.colors.accent[400]).b,
    ];

    const titleColor = useAnimatedStyle(() => {
        const inputColorRed = interpolate(
            changeColorAnimation.value,
            inputRange,
            [r[0], r[1], r[0]],
            Extrapolate.CLAMP
        );
        const inputColorGreen = interpolate(
            changeColorAnimation.value,
            inputRange,
            [g[0], g[1], g[0]],
            Extrapolate.CLAMP
        );
        const inputColorBlue = interpolate(
            changeColorAnimation.value,
            inputRange,
            [b[0], b[1], b[0]],
            Extrapolate.CLAMP
        );
        return {
            color: `rgb(${inputColorRed}, ${inputColorGreen}, ${inputColorBlue})`,
        };
    });
    const inputBorderColor = useAnimatedStyle(() => {
        const inputColorRed = interpolate(
            changeColorAnimation.value,
            inputRange,
            [r[0], r[1], r[0]],
            Extrapolate.CLAMP
        );
        const inputColorGreen = interpolate(
            changeColorAnimation.value,
            inputRange,
            [g[0], g[1], g[0]],
            Extrapolate.CLAMP
        );
        const inputColorBlue = interpolate(
            changeColorAnimation.value,
            inputRange,
            [b[0], b[1], b[0]],
            Extrapolate.CLAMP
        );
        return {
            borderColor: `rgb(${inputColorRed}, ${inputColorGreen}, ${inputColorBlue})`,
        };
    });

    return (
        <>
            <Animated.Text
                style={[
                    theme.typography().subtitle1,
                    styles.sheetTextInputTitle,
                    titleColor,
                ]}
            >
                INGREDIENTS
            </Animated.Text>
            <Animated.View
                style={[styles.sheetTextInputContainer, inputBorderColor]}
            >
                <TextInput
                    ref={textInput}
                    style={styles.sheetTextInput}
                    cursorColor={theme.options.colors.accent[500]}
                    placeholder="Search..."
                    placeholderTextColor={theme.options.colors.text[400]}
                    selectionColor={theme.options.colors.accent[400]}
                    onFocus={() => {
                        sheetHeight.value = withTiming(0);
                        contentOpacity.value = withTiming(0);
                        changeColorAnimation.value = withTiming(100);
                    }}
                    onEndEditing={() => {
                        sheetHeight.value = withTiming(290 - screen.height);
                        contentOpacity.value = withTiming(1);
                        changeColorAnimation.value = withTiming(0);
                    }}
                    onSubmitEditing={(text) => {
                        text.persist();
                        setIngredients((prevIngredients) => [
                            ...prevIngredients,
                            {
                                id: prevIngredients.length,
                                name: text?.nativeEvent?.text
                                    ? text.nativeEvent.text
                                    : "",
                            },
                        ]);
                        textInput.current?.clear();
                    }}
                />
            </Animated.View>
        </>
    );
}
