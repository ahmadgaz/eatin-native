import { View, Text } from "react-native";
import { useTheme } from "../../theme";
import React from "react";

export default function HighlightedText({
    children,
    style,
}: {
    children: string;
    style: Object[];
}) {
    const theme = useTheme("light");

    return (
        <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {children.split(" ").map((word, idx) => {
                    return (
                        <View
                            key={idx}
                            style={{
                                height: 60,
                            }}
                        >
                            <Text style={style}>
                                {word}
                                {idx !== children.split(" ").length - 1
                                    ? " "
                                    : ""}
                            </Text>
                            <View
                                style={{
                                    position: "absolute",
                                    left: 5,
                                    bottom: 0,
                                    zIndex: -1,
                                    width: "100%",
                                    height: 25,
                                    backgroundColor:
                                        theme.options.colors.accent[500],
                                }}
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
