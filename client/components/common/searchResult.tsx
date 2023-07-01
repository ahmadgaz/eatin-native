import {
    View,
    Text,
    Image,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { recipeDataType } from "./types";
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import commonStyles from "./styles";
import { useTheme } from "../../theme";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "expo-modules-core";
import { ScrollViewWithFadedEnds } from "../home/scrollViewWithFadedEnds";
import Tag from "./tag";
import { FlashIcon } from "../../assets/icons/flash-icon";
import { PersonIcon } from "../../assets/icons/person-icon";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function SearchResult({
    recipe,
    onPress,
    isLoading,
    isDisabled = false,
    isGpt = false,
    isPartial = false,
}: {
    recipe: recipeDataType;
    onPress: () => any;
    isLoading: boolean;
    isDisabled?: boolean;
    isGpt?: boolean;
    isPartial?: boolean;
}) {
    const theme = useTheme("light");
    const styles = commonStyles("light");

    // Set width of textView and truncate text if necessary
    const [textViewWidth, setTextViewWidth] = useState<number>(0);

    // Reference to scroll view for using scrollTo({x: 0, animated: true}}), this is needed to update faded ends on IOS
    const scrollViewRef = useRef<ScrollView>(null);
    useEffect(
        () => {
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        },
        [
            /* add dependancy */
        ]
    );

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

    // Animated loading stuff
    useEffect(() => {
        if (isLoading) {
            loadingOpacity.value = 0.8;
            loadingOpacity.value = withRepeat(
                withTiming(1, { duration: 500 }),
                -1,
                true
            );
        } else {
            loadingOpacity.value = withTiming(0, { duration: 500 });
        }
    }, []);
    const loadingOpacity = useSharedValue<number>(0.8);
    const loadingOpacityStyle = useAnimatedStyle(() => {
        return {
            opacity: loadingOpacity.value,
        };
    });

    return (
        <Animated.View
            layout={Layout.duration(500).easing(
                Easing.bezier(0.25, 1, 0.75, 1).factory()
            )}
            style={[
                styles.searchResultContainer,
                isGpt
                    ? { borderColor: theme.options.colors.primary[400] }
                    : null,
            ]}
        >
            {isLoading ? (
                <Animated.View
                    style={[
                        loadingOpacityStyle,
                        {
                            width: 85,
                            height: 85,
                            borderRadius: 16,
                            backgroundColor: isGpt
                                ? theme.options.colors.primary[400]
                                : theme.options.colors.text[400],
                        },
                    ]}
                    entering={FadeIn.duration(100)}
                    exiting={FadeOut.duration(100)}
                />
            ) : (
                <Animated.Image
                    entering={FadeIn.duration(100)}
                    exiting={FadeOut.duration(100)}
                    source={{ uri: recipe.recipe.image }}
                    style={{ width: 85, height: 85, borderRadius: 16 }}
                />
            )}
            <View
                onLayout={(event) => {
                    setTextViewWidth(event.nativeEvent.layout.width);
                }}
                style={{
                    flex: 1,
                    height: 80,
                    marginLeft: 18,
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flexDirection: "column",
                    }}
                >
                    <Text
                        style={[
                            theme.typography("bold").subtitle1,
                            { fontSize: 14, marginBottom: 3 },
                            isGpt
                                ? { color: theme.options.colors.primary[500] }
                                : null,
                        ]}
                    >
                        {recipe.recipe.name}
                    </Text>
                    <Text
                        style={[
                            theme.typography().subtitle1,
                            {
                                fontSize: 10,
                                marginBottom: 3,
                                color: theme.options.colors.text[400],
                            },
                        ]}
                    >
                        {truncateString(
                            recipe.recipe.steps.join(" "),
                            textViewWidth / 2.75
                        )}
                    </Text>
                </View>
                {Platform.OS === "ios" ? (
                    <ScrollViewWithFadedEnds
                        ref={scrollViewRef}
                        contentContainerStyle={{
                            alignItems: "center",
                            flexDirection: "row-reverse",
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        alwaysBounceHorizontal={false}
                        fadeLeftEnd={fadedEnds[0]}
                        fadeRightEnd={fadedEnds[1]}
                        onScroll={setFadedEndsOnScroll}
                        scrollEventThrottle={16}
                        keyboardShouldPersistTaps="always"
                    >
                        {recipe.recipe.servings && (
                            <Tag
                                text={recipe.recipe.servings.toString()}
                                emphasized
                                colors={{
                                    background: [
                                        theme.options.colors.text[400],
                                    ],
                                    text: [theme.options.colors.text[500]],
                                }}
                                iconLeft={
                                    <PersonIcon
                                        color={theme.options.colors.text[500]}
                                    />
                                }
                            />
                        )}
                        {isGpt && (
                            <Tag
                                text="AI Generated"
                                emphasized
                                colors={{
                                    background: [
                                        theme.options.colors.primary[400],
                                    ],
                                    text: [theme.options.colors.primary[500]],
                                }}
                                iconRight={
                                    <FlashIcon
                                        color={
                                            theme.options.colors.primary[500]
                                        }
                                    />
                                }
                            />
                        )}
                    </ScrollViewWithFadedEnds>
                ) : (
                    <AnimatedScrollView
                        overScrollMode="never"
                        ref={scrollViewRef}
                        contentContainerStyle={{
                            alignItems: "center",
                            flexDirection: "row-reverse",
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={setFadedEndsOnScroll}
                        scrollEventThrottle={16}
                        fadingEdgeLength={30}
                        keyboardShouldPersistTaps="always"
                    >
                        {recipe.recipe.servings && (
                            <Tag
                                text={recipe.recipe.servings.toString()}
                                emphasized
                                colors={{
                                    background: [
                                        theme.options.colors.text[400],
                                    ],
                                    text: [theme.options.colors.text[500]],
                                }}
                                iconLeft={
                                    <PersonIcon
                                        color={theme.options.colors.text[500]}
                                    />
                                }
                            />
                        )}
                        {isGpt && (
                            <Tag
                                text="AI Generated"
                                emphasized
                                colors={{
                                    background: [
                                        theme.options.colors.primary[400],
                                    ],
                                    text: [theme.options.colors.primary[500]],
                                }}
                                iconRight={
                                    <FlashIcon
                                        color={
                                            theme.options.colors.primary[500]
                                        }
                                    />
                                }
                            />
                        )}
                    </AnimatedScrollView>
                )}
            </View>
        </Animated.View>
    );
}

function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
}
