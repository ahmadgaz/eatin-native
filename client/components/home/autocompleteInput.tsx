import { View, Text, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import homeStyles from "./styles";
import { useTheme } from "../../theme";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import hexToRgb from "../../utils/hexToRgb";
import Tag from "./tag";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export default function AutocompleteInput({
    screen,
    sheetHeight,
    contentOpacity,
    ingredients,
    setIngredients,
    setFullscreen,
}: {
    screen: { width: number; height: number };
    sheetHeight: SharedValue<number>;
    contentOpacity: SharedValue<number>;
    ingredients: { id: number; name: string }[];
    setIngredients: React.Dispatch<
        React.SetStateAction<{ id: number; name: string }[]>
    >;
    setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const textInput = useRef<TextInput>(null);
    const changeColorAnimation = useSharedValue<number>(0); // Animated value for changing the color of the input border and tag elements
    const changeColorAnimationInputRange = [0, 100, 0]; // For interpolating between "changeColorAnimation" and RGB Values

    // Colors to animate between
    const borderColors_R = [
        hexToRgb(theme.options.colors.text[400]).r, // Unfocused color
        hexToRgb(theme.options.colors.accent[400]).r, // Focused color
    ];
    const borderColors_G = [
        hexToRgb(theme.options.colors.text[400]).g, // Unfocused color
        hexToRgb(theme.options.colors.accent[400]).g, // Focused color
    ];
    const borderColors_B = [
        hexToRgb(theme.options.colors.text[400]).b, // Unfocused color
        hexToRgb(theme.options.colors.accent[400]).b, // Focused color
    ];

    // Animated style for border color
    const inputBorderColorAnimated = useAnimatedStyle(() => {
        const inputColorRed = interpolate(
            changeColorAnimation.value,
            changeColorAnimationInputRange,
            [borderColors_R[0], borderColors_R[1], borderColors_R[0]],
            Extrapolate.CLAMP
        );
        const inputColorGreen = interpolate(
            changeColorAnimation.value,
            changeColorAnimationInputRange,
            [borderColors_G[0], borderColors_G[1], borderColors_G[0]],
            Extrapolate.CLAMP
        );
        const inputColorBlue = interpolate(
            changeColorAnimation.value,
            changeColorAnimationInputRange,
            [borderColors_B[0], borderColors_B[1], borderColors_B[0]],
            Extrapolate.CLAMP
        );
        return {
            borderColor: `rgb(${inputColorRed}, ${inputColorGreen}, ${inputColorBlue})`,
        };
    });

    /* Animations that play when input is focused:
        - sheetHeight changes to make the action sheet fullscreen.
        - setFullscreen changes to change the status bar color.
        - contentOpacity changes to fade out the action sheet content and fade in the input autocomplete content.
        - changeColorAnimation changes to change the color of the input border and tag elements.
    */
    const focusTheInput = () => {
        sheetHeight.value = withTiming(0, {
            duration: 750,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
        });
        setFullscreen(true);
        contentOpacity.value = withTiming(0, {
            duration: 750,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
        });
        changeColorAnimation.value = withTiming(100, {
            duration: 750,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
        });
    };

    const unfocusTheInput = () => {
        sheetHeight.value = withTiming(290 - screen.height, {
            duration: 750,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
        });
        contentOpacity.value = withTiming(1, {
            duration: 750,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
        });
        setFullscreen(false);
        changeColorAnimation.value = 0;
    };

    // Make sure the input is unfocused when the component mounts
    useEffect(unfocusTheInput, []);

    // Tests
    useEffect(() => {
        console.log(ingredients);
    }, [ingredients]);

    return (
        <>
            <Animated.View
                style={[
                    styles.sheetTextInputContainer,
                    inputBorderColorAnimated,
                ]}
            >
                <TextInput
                    ref={textInput}
                    style={styles.sheetTextInput}
                    cursorColor={theme.options.colors.accent[500]}
                    placeholder="Ingredients..."
                    placeholderTextColor={theme.options.colors.text[400]}
                    selectionColor={theme.options.colors.accent[400]}
                    onFocus={focusTheInput}
                    onEndEditing={unfocusTheInput}
                    onSubmitEditing={(text) => {
                        text.persist();
                        // textInput.current?.
                        if (text?.nativeEvent?.text) {
                            setIngredients((prevIngredients) => [
                                ...prevIngredients,
                                {
                                    id: prevIngredients.length,
                                    name: text.nativeEvent.text,
                                },
                            ]);
                        }
                        textInput.current?.clear();
                    }}
                />
                <View
                    style={{
                        height: 30,
                        width: "100%",
                        marginTop: 12,
                        position: "relative",
                    }}
                >
                    <MaskedView
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            height: "100%",
                        }}
                        maskElement={
                            <LinearGradient
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    height: "100%",
                                }}
                                colors={[
                                    "transparent",
                                    "#192f6a",
                                    "#192f6a",
                                    "transparent",
                                ]}
                                locations={[0, 0 + 0.05, 1 - 0.05, 1]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            />
                        }
                    >
                        <ScrollView
                            contentContainerStyle={{ alignItems: "center" }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            alwaysBounceHorizontal={false}
                        >
                            {ingredients.map((ingredient) => (
                                <Tag
                                    key={ingredient.id}
                                    text={ingredient.name}
                                    changeColorAnimation={changeColorAnimation}
                                />
                            ))}
                        </ScrollView>
                    </MaskedView>
                </View>
            </Animated.View>
        </>
    );
}
