import { StyleSheet } from "react-native";
import { useTheme } from "../../theme";

export default function styles(mode: "light" | "dark") {
    const theme = useTheme(mode);
    return StyleSheet.create({
        loadingModal: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.options.colors.background[500],
        },
        loadingIcon: { width: 300, height: 300 },
        loadingInitialLayer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.options.colors.background[500],
        },
        button: {
            width: "100%",
            paddingHorizontal: 35,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.options.colors.accent[500],
        },
        buttonDisabled: {
            backgroundColor: theme.options.colors.text[400],
        },
        searchResultContainer: {
            width: "100%",
            height: 110,
            alignItems: "center",
            padding: 12.5,
            marginBottom: 10,
            flexWrap: "nowrap",
            flexDirection: "row",
            backgroundColor: theme.options.colors.background[400],
            borderWidth: 1,
            borderRadius: 25,
            borderColor: theme.options.colors.text[400],
        },
        tagContainer: {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
            marginRight: 5,
            paddingVertical: 5,
            flexDirection: "row",
            flexWrap: "nowrap",
            borderRadius: 20,
        },
        tagText: {
            color: theme.options.colors.text[500],
            marginHorizontal: 5,
        },
    });
}
