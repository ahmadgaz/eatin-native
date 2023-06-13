import { View, Text } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { carouselDataType } from "./types";
import { useTheme } from "../../theme";
import homeStyles from "./styles";

const screen = Dimensions.get("screen");

export default function Slide({ item }: { item: carouselDataType }) {
    const theme = useTheme("light");
    const styles = homeStyles("light");

    return (
        <View
            style={{
                width: screen.width,
                height: screen.height,
                ...styles.carouselContainer,
            }}
        >
            <View style={styles.carouselContent}>
                <Text
                    style={{
                        margin: 3,
                        textAlign: "left",
                        ...theme.typography().h5,
                    }}
                >
                    {item.title}
                </Text>
                <Text
                    style={{
                        margin: 3,
                        textAlign: "left",
                        ...theme.typography().subtitle1,
                    }}
                >
                    {item.description}
                </Text>
            </View>
        </View>
    );
}
