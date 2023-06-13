import { StyleSheet } from "react-native";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";
import { useTheme } from "../../theme";

export default function styles(mode: "light" | "dark") {
    const theme = useTheme(mode);
    return StyleSheet.create({
        carouselPaginationContainer: {
            position: "absolute",
            bottom: 425,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        carouselPaginationDot: {
            // width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 2,
            backgroundColor: theme.options.colors.background[500],
        },
        carouselContainer: {
            padding: 30,
        },
        carouselContent: {},
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        heroVideoContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            zIndex: -1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
}
