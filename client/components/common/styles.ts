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
    });
}
