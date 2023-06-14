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

export default function ActionSheet({
    screen,
}: {
    screen: { width: number; height: number };
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const contentOpacity = useSharedValue<number>(1);
    const sheetHeight = useSharedValue<number>(290 - screen.height);
    const changeContentOpacity = useAnimatedStyle(() => {
        return {
            opacity: contentOpacity.value,
        };
    });
    const translateSheet = useAnimatedStyle(() => {
        return {
            bottom: sheetHeight.value,
        };
    });

    useEffect(() => {}, []);

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
            <Animated.View
                style={[styles.sheetTitleContainer, changeContentOpacity]}
            >
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
            <Animated.View
                style={[styles.sheetSubtitleContainer, changeContentOpacity]}
            >
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
                />
            </View>
        </Animated.View>
    );
}
