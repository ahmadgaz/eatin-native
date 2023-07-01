import {
    View,
    Text,
    Keyboard,
    Image,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Dimensions,
} from "react-native";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
    PanGestureHandler,
    ScrollView,
    State,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    Layout,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import homeStyles from "./styles";
import { useTheme } from "../../theme";
import {
    ingredientDataType,
    recipeDataType,
    recipeListDataType,
} from "../common/types";
import SearchResult from "../common/searchResult";
import Button from "../common/button";
import { Platform } from "expo-modules-core";
import { ScrollViewWithFadedEnds } from "./scrollViewWithFadedEnds";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function SearchResults({
    ingredients,
    showContent,
    hideContent,
    fullScreen,
}: {
    ingredients: ingredientDataType[];
    showContent: { opacity: number };
    hideContent: { opacity: number };
    fullScreen: boolean;
}) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const [searchQuery, setSearchQuery] = useState<recipeListDataType>({
        gptRecipes: [
            {
                recipe: {
                    id: 0,
                    name: "Carrot Cake",
                    cuisine: "American",
                    ingredients: [
                        { id: 0, name: "Carrots", quantity: 1, unit: "cup" },
                        { id: 1, name: "Flour", quantity: 1, unit: "cup" },
                        { id: 2, name: "Sugar", quantity: 1, unit: "cup" },
                        { id: 3, name: "Eggs", quantity: 1, unit: "cup" },
                    ],
                    steps: [
                        "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x12 inch pan.",
                        "In a medium bowl, sift together flour, baking soda, salt and cinnamon. Set aside.",
                        "In a large bowl, combine eggs, oil, sugar and vanilla. Mix well. Add flour mixture and mix well.",
                        "In a medium bowl, combine shredded carrots, coconut, walnuts, pineapple and raisins.",
                        "Using a large wooden spoon or a very heavy whisk, add carrot mixture to batter and fold in well.",
                        "Pour into prepared 9x12 inch pan, and bake at 350 degrees F (175 degrees C) for 1 hour. Check with toothpick.",
                        "Allow to cool for at least 20 minutes before serving.",
                    ],
                    cookTime: 60,
                    prepTime: 30,
                    totalTime: 90,
                    servings: 12,
                    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2292660.jpg&q=60&c=sc&orient=true&poi=auto&h=512",
                },
            },
        ],
        recipes: [
            {
                recipe: {
                    id: 0,
                    name: "Carrot Cake",
                    cuisine: "American",
                    ingredients: [
                        { id: 0, name: "Carrots", quantity: 1, unit: "cup" },
                        { id: 1, name: "Flour", quantity: 1, unit: "cup" },
                        { id: 2, name: "Sugar", quantity: 1, unit: "cup" },
                        { id: 3, name: "Eggs", quantity: 1, unit: "cup" },
                    ],
                    steps: [
                        "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x12 inch pan.",
                        "In a medium bowl, sift together flour, baking soda, salt and cinnamon. Set aside.",
                        "In a large bowl, combine eggs, oil, sugar and vanilla. Mix well. Add flour mixture and mix well.",
                        "In a medium bowl, combine shredded carrots, coconut, walnuts, pineapple and raisins.",
                        "Using a large wooden spoon or a very heavy whisk, add carrot mixture to batter and fold in well.",
                        "Pour into prepared 9x12 inch pan, and bake at 350 degrees F (175 degrees C) for 1 hour. Check with toothpick.",
                        "Allow to cool for at least 20 minutes before serving.",
                    ],
                    cookTime: 60,
                    prepTime: 30,
                    totalTime: 90,
                    servings: 12,
                    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2292660.jpg&q=60&c=sc&orient=true&poi=auto&h=512",
                },
            },
        ],
    });
    const [loadingQuery, setLoadingQuery] = useState<boolean>(false);
    const searchImageOpacity = useSharedValue<number>(0);
    const showSearchImage = useAnimatedStyle(() => {
        return {
            opacity: searchImageOpacity.value,
        };
    });

    const isEmptyList = ingredients.length <= 0;
    const isNoResults =
        !loadingQuery && !searchQuery.gptRecipes && !searchQuery.recipes;

    useEffect(() => {
        if (fullScreen && (isEmptyList || isNoResults)) {
            searchImageOpacity.value = withTiming(1, { duration: 100 });
        } else {
            searchImageOpacity.value = withTiming(0, { duration: 100 });
        }
    }, [fullScreen, isEmptyList, isNoResults]);

    return (
        <PanGestureHandler
            onGestureEvent={(event) => {
                if (event.nativeEvent.translationY > 50) {
                    Keyboard.dismiss();
                }
            }}
            onHandlerStateChange={(event) => {
                if (event.nativeEvent.oldState === State.ACTIVE) {
                    Keyboard.dismiss();
                }
            }}
        >
            <View
                style={{
                    minWidth: "100%",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Animated.View
                    style={[styles.sheetSubtitleContainer, showContent]}
                >
                    <Text style={theme.typography().subtitle1}>
                        Suggested Recipes
                    </Text>
                </Animated.View>
                <Animated.View
                    style={[styles.sheetSearchImageContainer, showSearchImage]}
                >
                    <Image
                        source={require("../../assets/images/search.png")}
                        style={styles.sheetSearchImage}
                    />
                </Animated.View>

                {fullScreen &&
                    (isEmptyList ? (
                        <Animated.View
                            key={0}
                            entering={FadeIn.duration(100)}
                            exiting={FadeOut.duration(100)}
                            style={[
                                styles.sheetSearchCTAContainer,
                                showContent,
                            ]}
                        >
                            <Text
                                style={[
                                    theme.typography("normal", "italic")
                                        .subtitle1,
                                    styles.sheetSearchCTA,
                                ]}
                            >
                                Add some ingredients to your list!
                            </Text>
                        </Animated.View>
                    ) : isNoResults ? (
                        <Animated.View
                            key={1}
                            entering={FadeIn.duration(100)}
                            exiting={FadeOut.duration(100)}
                            style={[
                                styles.sheetSearchCTAContainer,
                                showContent,
                            ]}
                        >
                            <Text
                                style={[
                                    theme.typography("normal", "italic")
                                        .subtitle1,
                                    styles.sheetSearchCTA,
                                ]}
                            >
                                No results. Try searching for something else.
                            </Text>
                        </Animated.View>
                    ) : (
                        <Animated.View
                            key={2}
                            entering={FadeIn.duration(100)}
                            exiting={FadeOut.duration(100)}
                            style={{ width: "100%" }}
                        >
                            <Queries
                                ingredients={ingredients}
                                loadingQuery={loadingQuery}
                                setLoadingQuery={setLoadingQuery}
                                fullScreen={fullScreen}
                                showContent={showContent}
                            />
                        </Animated.View>
                    ))}
            </View>
        </PanGestureHandler>
    );
}

const screen = Dimensions.get("screen");

function Queries({
    ingredients,
    loadingQuery,
    setLoadingQuery,
    fullScreen,
    showContent,
}: {
    ingredients: ingredientDataType[];
    loadingQuery: boolean;
    setLoadingQuery: React.Dispatch<React.SetStateAction<boolean>>;
    fullScreen: boolean;
    showContent: { opacity: number };
}) {
    const styles = homeStyles("light");
    const theme = useTheme("light");
    const uniqueKey = useRef<number>(1);

    const [gptQuery, setGptQuery] = useState<recipeDataType | null>(null);
    const [regularQuery, setRegularQuery] = useState<recipeDataType | null>(
        null
    );

    const [items, setItems] = useState<
        {
            key: number;
            type: "button" | "result";
            recipe?: recipeDataType;
            isGpt?: boolean;
            isPartial?: boolean;
        }[]
    >([
        {
            key: uniqueKey.current++,
            type: "button",
        },
    ]);

    useEffect(() => {
        // No idea why Typescript is complaining about this or the other one below
        // @ts-ignore
        setItems((prev) => {
            return [
                ...(gptQuery
                    ? [
                          {
                              key: uniqueKey.current++,
                              type: "result",
                              recipe: gptQuery,
                              isGpt: true,
                              isPartial: true,
                          },
                      ]
                    : []),
                ...prev,
            ];
        });
    }, [gptQuery]);
    useEffect(() => {
        // @ts-ignore
        setItems((prev) => {
            return [
                ...prev,
                ...(regularQuery
                    ? [
                          {
                              key: uniqueKey.current++,
                              type: "result",
                              recipe: regularQuery,
                              isGpt: false,
                              isPartial: true,
                          },
                      ]
                    : []),
            ];
        });
    }, [regularQuery]);

    useEffect(() => {
        setItems([
            {
                key: uniqueKey.current++,
                type: "button",
            },
        ]);
        setLoadingQuery(true);
        setTimeout(() => {
            setRegularQuery({
                recipe: {
                    id: 0,
                    name: "Carrot Cake",
                    cuisine: "American",
                    ingredients: [
                        {
                            id: 0,
                            name: "Carrots",
                            quantity: 1,
                            unit: "cup",
                        },
                        { id: 1, name: "Flour", quantity: 1, unit: "cup" },
                        { id: 2, name: "Sugar", quantity: 1, unit: "cup" },
                        { id: 3, name: "Eggs", quantity: 1, unit: "cup" },
                    ],
                    steps: [
                        "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x12 inch pan.",
                        "In a medium bowl, sift together flour, baking soda, salt and cinnamon. Set aside.",
                        "In a large bowl, combine eggs, oil, sugar and vanilla. Mix well. Add flour mixture and mix well.",
                        "In a medium bowl, combine shredded carrots, coconut, walnuts, pineapple and raisins.",
                        "Using a large wooden spoon or a very heavy whisk, add carrot mixture to batter and fold in well.",
                        "Pour into prepared 9x12 inch pan, and bake at 350 degrees F (175 degrees C) for 1 hour. Check with toothpick.",
                        "Allow to cool for at least 20 minutes before serving.",
                    ],
                    cookTime: 60,
                    prepTime: 30,
                    totalTime: 90,
                    servings: 12,
                    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2292660.jpg&q=60&c=sc&orient=true&poi=auto&h=512",
                },
            });
            setTimeout(() => {
                setGptQuery({
                    recipe: {
                        id: 1,
                        name: "Tomato Soup",
                        cuisine: "American",
                        ingredients: [
                            {
                                id: 1,
                                name: "Tomatoes",
                                quantity: 6,
                                unit: "whole",
                            },
                            {
                                id: 2,
                                name: "Onion",
                                quantity: 1,
                                unit: "whole",
                            },
                            {
                                id: 3,
                                name: "Garlic",
                                quantity: 2,
                                unit: "cloves",
                            },
                            {
                                id: 4,
                                name: "Olive Oil",
                                quantity: 2,
                                unit: "tbsp",
                            },
                        ],
                        steps: [
                            "Slice tomatoes and onion.",
                            "Saute onion and garlic in olive oil until softened.",
                            "Add tomatoes and cook until softened.",
                            "Blend until smooth and return to heat until warmed through.",
                        ],
                        cookTime: 40,
                        prepTime: 20,
                        totalTime: 60,
                        servings: 4,
                        image: "https://natashaskitchen.com/wp-content/uploads/2021/08/Tomato-Soup-Recipe-4-728x1092.jpg",
                    },
                });
                setTimeout(() => {
                    setRegularQuery({
                        recipe: {
                            id: 7,
                            name: "Beef Stir Fry",
                            cuisine: "Chinese",
                            ingredients: [
                                {
                                    id: 35,
                                    name: "Beef Strips",
                                    quantity: 500,
                                    unit: "g",
                                },
                                {
                                    id: 36,
                                    name: "Stir Fry Vegetables",
                                    quantity: 500,
                                    unit: "g",
                                },
                                {
                                    id: 37,
                                    name: "Soy Sauce",
                                    quantity: 3,
                                    unit: "tbsp",
                                },
                                {
                                    id: 38,
                                    name: "Garlic",
                                    quantity: 2,
                                    unit: "cloves",
                                },
                                {
                                    id: 39,
                                    name: "Ginger",
                                    quantity: 1,
                                    unit: "piece",
                                },
                                {
                                    id: 40,
                                    name: "Cornstarch",
                                    quantity: 1,
                                    unit: "tbsp",
                                },
                                {
                                    id: 41,
                                    name: "Chicken Stock",
                                    quantity: 200,
                                    unit: "ml",
                                },
                            ],
                            steps: [
                                "Brown the beef strips in a wok and set aside.",
                                "Stir fry the vegetables in the same wok until tender.",
                                "In a separate bowl, mix the soy sauce, minced garlic and ginger, cornstarch, and chicken stock.",
                                "Return the beef to the wok, add the sauce, and stir until thickened.",
                            ],
                            cookTime: 20,
                            prepTime: 10,
                            totalTime: 30,
                            servings: 4,
                            image: "https://www.rachelcooks.com/wp-content/uploads/2022/07/Beef-Stir-Fry-with-Vegetables019-web-1022x1536.jpg",
                        },
                    });
                    setTimeout(() => {
                        setRegularQuery({
                            recipe: {
                                id: 4,
                                name: "Chicken Tikka Masala",
                                cuisine: "Indian",
                                ingredients: [
                                    {
                                        id: 15,
                                        name: "Chicken Breasts",
                                        quantity: 4,
                                        unit: "whole",
                                    },
                                    {
                                        id: 16,
                                        name: "Yogurt",
                                        quantity: 150,
                                        unit: "g",
                                    },
                                    {
                                        id: 17,
                                        name: "Tikka Masala Paste",
                                        quantity: 3,
                                        unit: "tbsp",
                                    },
                                    {
                                        id: 18,
                                        name: "Onion",
                                        quantity: 1,
                                        unit: "whole",
                                    },
                                    {
                                        id: 19,
                                        name: "Garlic",
                                        quantity: 2,
                                        unit: "cloves",
                                    },
                                    {
                                        id: 20,
                                        name: "Canned Tomatoes",
                                        quantity: 400,
                                        unit: "g",
                                    },
                                    {
                                        id: 21,
                                        name: "Heavy Cream",
                                        quantity: 150,
                                        unit: "ml",
                                    },
                                ],
                                steps: [
                                    "Marinate the chicken breasts in yogurt and tikka masala paste and set aside.",
                                    "Chop the onion and garlic and fry until golden.",
                                    "Add the marinated chicken and cook until browned.",
                                    "Add the canned tomatoes and simmer for 20 minutes.",
                                    "Stir in the cream and serve with basmati rice.",
                                ],
                                cookTime: 30,
                                prepTime: 10,
                                totalTime: 40,
                                servings: 4,
                                image: "https://cafedelites.com/wp-content/uploads/2018/04/Best-Chicken-Tikka-Masala-IMAGE-1-1024x1536.jpg",
                            },
                        });
                        setTimeout(() => {
                            setGptQuery({
                                recipe: {
                                    id: 3,
                                    name: "Spaghetti Bolognese",
                                    cuisine: "Italian",
                                    ingredients: [
                                        {
                                            id: 9,
                                            name: "Spaghetti",
                                            quantity: 500,
                                            unit: "g",
                                        },
                                        {
                                            id: 10,
                                            name: "Ground Beef",
                                            quantity: 500,
                                            unit: "g",
                                        },
                                        {
                                            id: 11,
                                            name: "Onion",
                                            quantity: 1,
                                            unit: "whole",
                                        },
                                        {
                                            id: 12,
                                            name: "Garlic",
                                            quantity: 2,
                                            unit: "cloves",
                                        },
                                        {
                                            id: 13,
                                            name: "Tomato Puree",
                                            quantity: 400,
                                            unit: "g",
                                        },
                                        {
                                            id: 14,
                                            name: "Red Wine",
                                            quantity: 125,
                                            unit: "ml",
                                        },
                                    ],
                                    steps: [
                                        "Chop the onion and garlic and fry until golden.",
                                        "Add the ground beef and cook until browned.",
                                        "Add the tomato puree and red wine and simmer for 15 minutes.",
                                        "Meanwhile, cook the spaghetti according to packet instructions.",
                                        "Drain the spaghetti and stir through the Bolognese sauce.",
                                    ],
                                    cookTime: 30,
                                    prepTime: 10,
                                    totalTime: 40,
                                    servings: 4,
                                    image: "https://www.sprinklesandsprouts.com/wp-content/uploads/2019/04/Authentic-Spaghetti-Bolognese.jpg",
                                },
                            });
                            setRegularQuery({
                                recipe: {
                                    id: 2,
                                    name: "Pancakes",
                                    cuisine: "American",
                                    ingredients: [
                                        {
                                            id: 5,
                                            name: "Flour",
                                            quantity: 2,
                                            unit: "cup",
                                        },
                                        {
                                            id: 6,
                                            name: "Milk",
                                            quantity: 2,
                                            unit: "cup",
                                        },
                                        {
                                            id: 7,
                                            name: "Eggs",
                                            quantity: 2,
                                            unit: "whole",
                                        },
                                        {
                                            id: 8,
                                            name: "Baking Powder",
                                            quantity: 1,
                                            unit: "tbsp",
                                        },
                                    ],
                                    steps: [
                                        "Mix all ingredients in a bowl until smooth.",
                                        "Heat a greased griddle over medium-high heat.",
                                        "Pour batter onto the griddle to form pancakes.",
                                        "Cook until bubbly, then flip and cook until golden brown.",
                                    ],
                                    cookTime: 15,
                                    prepTime: 10,
                                    totalTime: 25,
                                    servings: 4,
                                    image: "https://www.allrecipes.com/thmb/kvvETNZfOtAptH69gUsK6FaKRKA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg",
                                },
                            });
                            setLoadingQuery(false);
                        }, 1000);
                    }, 100);
                }, 500);
            }, 250);
        }, 2000);
    }, [ingredients]);

    // Reference to scroll view for using scrollTo({x: 0, animated: true}}), this is needed to update faded ends on IOS
    const scrollViewRef = useRef<ScrollView>(null);
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [ingredients]);

    // Keyboard based scrollView height animation
    const keyboard = useAnimatedKeyboard();
    const scrollViewPaddingView = useAnimatedStyle(() => {
        return {
            height: keyboard.height.value + 330,
            width: "100%",
        };
    });

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
        const atStart = event.nativeEvent.contentOffset.y <= 0;
        const atEnd =
            event.nativeEvent.contentOffset.y +
                event.nativeEvent.layoutMeasurement.height >=
            event.nativeEvent.contentSize.height;

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

    return Platform.OS === "ios" ? (
        <ScrollViewWithFadedEnds
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            fadeLeftEnd={fadedEnds[0]}
            fadeRightEnd={fadedEnds[1]}
            vert
            onScroll={(event) => {
                setFadedEndsOnScroll(event);
                if (event.nativeEvent.contentOffset.y < -50) {
                    Keyboard.dismiss();
                }
            }}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="always"
        >
            {items.map((item, idx) => (
                <Animated.View
                    key={item.key}
                    entering={FadeIn.delay(100 * idx)}
                    exiting={FadeOut.duration(100)}
                    layout={Layout.duration(500).easing(
                        Easing.bezier(0.25, 1, 0.75, 1).factory()
                    )}
                >
                    {item.type === "button" ? (
                        <Button
                            loading={loadingQuery}
                            disabled={false}
                            onPress={() => {
                                if (fullScreen) return;
                            }}
                            style={showContent}
                            buttonStyle={styles.sheetGenerateCTA}
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
                                Generate More...
                            </Text>
                        </Button>
                    ) : item.type === "result" && item.recipe ? (
                        <SearchResult
                            recipe={item.recipe}
                            onPress={() => {}}
                            isLoading={loadingQuery}
                            isGpt={item.isGpt}
                            isPartial={item.isPartial}
                        />
                    ) : (
                        <></>
                    )}
                </Animated.View>
            ))}
            <Animated.View style={scrollViewPaddingView} />
        </ScrollViewWithFadedEnds>
    ) : (
        <AnimatedScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={16}
            onScroll={(event) => {
                if (event.nativeEvent.contentOffset.y < -50) {
                    Keyboard.dismiss();
                }
            }}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="always"
        >
            {items.map((item, idx) => (
                <Animated.View
                    key={item.key}
                    entering={FadeIn.delay(100 * idx)}
                    exiting={FadeOut.duration(100)}
                    layout={Layout.duration(500).easing(
                        Easing.bezier(0.25, 1, 0.75, 1).factory()
                    )}
                >
                    {item.type === "button" ? (
                        <Button
                            loading={loadingQuery}
                            disabled={false}
                            onPress={() => {
                                if (fullScreen) return;
                            }}
                            style={showContent}
                            buttonStyle={styles.sheetGenerateCTA}
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
                                Generate More...
                            </Text>
                        </Button>
                    ) : item.type === "result" && item.recipe ? (
                        <SearchResult
                            recipe={item.recipe}
                            onPress={() => {}}
                            isLoading={loadingQuery}
                            isGpt={item.isGpt}
                            isPartial={item.isPartial}
                        />
                    ) : (
                        <></>
                    )}
                </Animated.View>
            ))}
            <Animated.View style={scrollViewPaddingView} />
        </AnimatedScrollView>
    );
}
