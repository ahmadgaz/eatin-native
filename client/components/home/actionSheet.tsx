import { View, Text, Image, TextInput, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../theme";
import homeStyles from "./styles";
import AutocompleteInput from "./autocompleteInput";
import Animated, {
    FadeIn,
    FadeOut,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ingredientDataType, recipeListDataType } from "../common/types";
import Button from "../common/button";
import SearchResult from "../common/searchResult";
import SearchResults from "./searchResults";

export default function ActionSheet({
    fullScreen,
    setFullScreen,
    screen,
}: {
    screen: { width: number; height: number };
    fullScreen: boolean;
    setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const contentOpacity = useSharedValue<number>(1); // Fade-in/ Fade-out actionsheet content using this value. Changes based on whether input is focused or not.
    const sheetHeight = useSharedValue<number>(290 - screen.height); // Length the absolutely positioned action sheet is away from bottom of screen. Changes based on whether input is focused or not
    const [ingredients, setIngredients] = useState<ingredientDataType[]>([
        { id: 0, name: "Carrots" },
    ]);

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
                    />
                </View>
            </Animated.View>
            <Animated.View style={[styles.sheetSubtitleContainer, hideContent]}>
                <Text style={theme.typography().subtitle1}>
                    Type your ingredients comma-separated in the space below.
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
            <View style={{ width: "100%", position: "relative" }}>
                <Button
                    loading={false}
                    disabled={false}
                    onPress={() => {
                        if (fullScreen) return;
                    }}
                    style={[styles.sheetCTA, hideContent]}
                >
                    <Text
                        style={[
                            theme.typography("bold").subtitle1,
                            {
                                fontSize: 18,
                                color: theme.options.colors.text[300],
                            },
                        ]}
                    >
                        Get Started
                    </Text>
                </Button>
                <SearchResults
                    ingredients={ingredients}
                    showContent={showContent}
                    hideContent={hideContent}
                    fullScreen={fullScreen}
                />
            </View>
        </Animated.View>
    );
}
