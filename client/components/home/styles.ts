import { StyleSheet } from "react-native";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";
import { useTheme } from "../../theme";

export default function styles(mode: "light" | "dark") {
    const theme = useTheme(mode);
    return StyleSheet.create({
        carouselPaginationContainer: {
            position: "absolute",
            bottom: 440,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        carouselPaginationDotWide: {
            width: 24,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 2,
        },
        carouselPaginationDotRegular: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 2,
        },
        carouselSlideContainer: {
            paddingHorizontal: 30,
            paddingTop: 105,
        },
        carouselSlideContent: {},
        carouselSlideTitle: {
            margin: 3,
            color: theme.options.colors.background[500],
            textAlign: "left",
        },
        carouselSlideText: {
            marginTop: 20,
            marginHorizontal: 3,
            color: theme.options.colors.background[500],
            textAlign: "left",
        },
        logo: {
            position: "absolute",
            top: 70,
            margin: 3,
            color: theme.options.colors.background[500],
        },
        container: {
            flex: 1,
            alignItems: "center",
        },
        heroVideoContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            zIndex: -2,
            justifyContent: "center",
            alignItems: "center",
        },
        backdrop: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            zIndex: -1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            opacity: 0.3,
        },
    });
}
