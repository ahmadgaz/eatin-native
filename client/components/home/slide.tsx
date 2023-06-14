import { View, Text } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { carouselDataType } from "./types";
import { useTheme } from "../../theme";
import homeStyles from "./styles";
import HighlightedText from "../common/highlightedText";

const screen = Dimensions.get("screen");

export default function Slide({ item }: { item: carouselDataType }) {
    const theme = useTheme("light");
    const styles = homeStyles("light");

    return (
        <View
            style={{
                width: screen.width,
                ...styles.carouselSlideContainer,
            }}
        >
            <View style={styles.carouselSlideContent}>
                <HighlightedText
                    style={[
                        theme.typography("bold").h1,
                        styles.carouselSlideTitle,
                    ]}
                >
                    {item.title}
                </HighlightedText>
                <Text
                    style={[
                        theme.typography("bold").subtitle1,
                        styles.carouselSlideText,
                    ]}
                >
                    {item.description}
                </Text>
            </View>
        </View>
    );
}
