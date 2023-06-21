import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../theme";
import homeStyles from "./styles";
import AutocompleteInput from "./autocompleteInput";
import Animated, {
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function ActionSheet({
    screen,
}: {
    screen: { width: number; height: number };
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const contentOpacity = useSharedValue<number>(1); // Fade-in/ Fade-out actionsheet content using this value. Changes based on whether input is focused or not.
    const sheetHeight = useSharedValue<number>(290 - screen.height); // Length the absolutely positioned action sheet is away from bottom of screen. Changes based on whether input is focused or not
    const [fullScreen, setFullScreen] = useState<boolean>(false); // Whether the action sheet is fullscreen or not. Used to change status bar color. Changes based on whether input is focused or not
    const [ingredients, setIngredients] = useState<
        { id: number; name: string }[]
    >([{ id: 0, name: "Carrots" }]);
    const hideContent = useAnimatedStyle(() => {
        return {
            opacity: contentOpacity.value,
        };
    });
    const showContent = useAnimatedStyle(() => {
        return {
            opacity: 1 - contentOpacity.value,
        };
    });
    const translateSheet = useAnimatedStyle(() => {
        return {
            bottom: sheetHeight.value,
        };
    });

    return (
        <Animated.View
            style={[
                styles.sheetContainer,
                {
                    width: screen.width,
                    height: screen.height + 150,
                },
                translateSheet,
            ]}
        >
            {fullScreen && <StatusBar style="dark" />}
            <Animated.View style={[styles.sheetTitleContainer, hideContent]}>
                <Text style={[theme.typography("bold").h3, { width: "60%" }]}>
                    Let's Stock Your Pantry!
                </Text>
                <View style={styles.sheetHeroImageContainer}>
                    <Image
                        source={require("../../assets/images/heroimage.png")}
                        style={styles.sheetHeroImage}
                    ></Image>
                </View>
            </Animated.View>
            <Animated.View style={[styles.sheetSubtitleContainer, hideContent]}>
                <Text style={theme.typography().subtitle1}>
                    Start typing the ingredients you have on hand in the space
                    below.
                </Text>
            </Animated.View>
            <View style={styles.sheetAutoCompleteInputContainer}>
                <AutocompleteInput
                    screen={screen}
                    sheetHeight={sheetHeight}
                    contentOpacity={contentOpacity}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    setFullscreen={setFullScreen}
                />
            </View>
            <Animated.View style={[styles.sheetSubtitleContainer, showContent]}>
                <Text style={theme.typography().subtitle1}>
                    Suggested Searches
                </Text>
            </Animated.View>
            <Animated.View
                style={[styles.sheetSearchCTAContainer, showContent]}
            >
                {!ingredients.length && (
                    <Text
                        style={[
                            theme.typography("normal", "italic").subtitle1,
                            styles.sheetSearchCTA,
                        ]}
                    >
                        Start typing and we'll suggest ingredients for you.
                    </Text>
                )}
            </Animated.View>
        </Animated.View>
    );
}