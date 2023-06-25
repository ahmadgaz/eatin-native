import {
    View,
    Text,
    TextInput,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TextInputSubmitEditingEventData,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import homeStyles from "./styles";
import { useTheme } from "../../theme";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    Layout,
    LayoutAnimationsValues,
    SharedValue,
    Transition,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import hexToRgb from "../../utils/hexToRgb";
import Tag from "./tag";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { ScrollViewWithFadedEnds } from "./scrollViewWithFadedEnds";
import "react-native-get-random-values";
import { Platform } from "react-native";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

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

    const scrollViewRef = useRef<ScrollView>(null);
    const id = useRef<number>(1);
    const addIngredient = (
        text: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => {
        textInput.current?.clear();
        text.persist();
        if (text?.nativeEvent?.text) {
            setIngredients((prevIngredients) => [
                ...prevIngredients,
                {
                    id: id.current++,
                    name: text.nativeEvent.text,
                },
            ]);
        }
    };

    // Scroll to end of scrollview when an ingredient is added
    const [ingredientsLength, setIngredientsLength] = useState<number>(
        ingredients.length
    );
    useEffect(() => {
        if (ingredients.length > ingredientsLength) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 50);
        }
        setIngredientsLength(ingredients.length);
    }, [ingredients]);

    // Fade the ends of the scrollview when the scrollview is scrolled
    const [fadedEnds, setFadedEnds] = useState<boolean[]>([false, true]); // Whether the ends of the scrollview are faded or not. Used to change the scrollview style.
    const setFadedEndsLeft = (value: boolean) => {
        setFadedEnds((prev) => [value, prev[1]]);
    };
    const setFadedEndsRight = (value: boolean) => {
        setFadedEnds((prev) => [prev[0], value]);
    };
    const setFadedEndsOnScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const atStart = event.nativeEvent.contentOffset.x <= 0;
        const atEnd =
            event.nativeEvent.contentOffset.x +
                event.nativeEvent.layoutMeasurement.width >=
            event.nativeEvent.contentSize.width;

        if (atStart) {
            setFadedEndsLeft(false);
        } else {
            setFadedEndsLeft(true);
        }

        if (atEnd) {
            setFadedEndsRight(false);
        } else {
            setFadedEndsRight(true);
        }
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
                    onSubmitEditing={addIngredient}
                    blurOnSubmit={false}
                />
                <View
                    style={{
                        height: 30,
                        width: "100%",
                        marginTop: 12,
                        position: "relative",
                    }}
                >
                    {Platform.OS === "ios" ? (
                        <ScrollViewWithFadedEnds
                            ref={scrollViewRef}
                            contentContainerStyle={{ alignItems: "center" }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            alwaysBounceHorizontal={false}
                            fadeLeftEnd={fadedEnds[0]}
                            fadeRightEnd={fadedEnds[1]}
                            onScroll={setFadedEndsOnScroll}
                            scrollEventThrottle={16}
                            keyboardShouldPersistTaps="always"
                        >
                            {ingredients.map((ingredient) => (
                                <Tag
                                    key={ingredient.id}
                                    id={ingredient.id}
                                    text={ingredient.name}
                                    setIngredients={setIngredients}
                                    changeColorAnimation={changeColorAnimation}
                                />
                            ))}
                        </ScrollViewWithFadedEnds>
                    ) : (
                        <AnimatedScrollView
                            overScrollMode="never"
                            ref={scrollViewRef}
                            contentContainerStyle={{ alignItems: "center" }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            onScroll={setFadedEndsOnScroll}
                            scrollEventThrottle={16}
                            fadingEdgeLength={30}
                            keyboardShouldPersistTaps="always"
                        >
                            {ingredients.map((ingredient) => (
                                <Tag
                                    key={ingredient.id}
                                    id={ingredient.id}
                                    text={ingredient.name}
                                    setIngredients={setIngredients}
                                    changeColorAnimation={changeColorAnimation}
                                />
                            ))}
                        </AnimatedScrollView>
                    )}
                </View>
                {!ingredients.length && (
                    <View style={{ position: "relative", width: "100%" }}>
                        <Text
                            style={[
                                theme.typography("normal", "italic").subtitle1,
                                styles.sheetTextInputCTA,
                            ]}
                        >
                            Hit 'Enter' to add an ingredient.
                        </Text>
                    </View>
                )}
            </Animated.View>
        </>
    );
}
