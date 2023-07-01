import { StyleSheet } from "react-native";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";
import { useTheme } from "../../theme";

export default function styles(mode: "light" | "dark") {
    const theme = useTheme(mode);
    return StyleSheet.create({
        /* CAROUSEL*/
        carouselPaginationContainer: {
            position: "absolute",
            bottom: 0,
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

        /*BACKGROUND*/
        logo: {
            marginVertical: 20,
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

        /*SHEET*/
        sheetShadow: {
            position: "absolute",
            zIndex: -1,
            backgroundColor: theme.options.colors.background[500],
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            shadowOpacity: 0.5,
            shadowRadius: 40,
            shadowOffset: { width: 0, height: -50 },
        },
        sheetContainer: {
            position: "absolute",
            zIndex: 1,
            backgroundColor: theme.options.colors.background[500],
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 30,
            paddingTop: 40,
            alignItems: "center",
        },
        sheetTitleContainer: {
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom: 15,
        },
        sheetSubtitleContainer: {
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom: 20,
        },
        sheetCTA: {
            position: "absolute",
            top: 0,
            zIndex: 1,
            width: "100%",
        },
        sheetGenerateCTA: {
            width: "100%",
            backgroundColor: theme.options.colors.primary[500],
            marginBottom: 10,
        },
        sheetHeroImageContainer: {
            width: 90,
            height: 90,
            backgroundColor: theme.options.colors.background[400],
            borderRadius: 45,
            justifyContent: "center",
            alignItems: "center",
        },
        sheetHeroImage: {
            width: 81,
            height: 80,
        },

        /*SHEET INPUT*/
        sheetAutoCompleteInputContainer: {
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom: 20,
        },
        sheetTextInputCTA: {
            position: "absolute",
            fontSize: 14,
            left: 0,
            zIndex: 1,
            transform: [{ translateY: -25 }],
            color: theme.options.colors.text[400],
        },
        sheetTextInputContainer: {
            width: "100%",
            height: 100,
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            flexWrap: "nowrap",
            backgroundColor: theme.options.colors.background[400],
            borderWidth: 1,
            borderRadius: 25,
            shadowRadius: 15,
            shadowOpacity: 0.03,
            shadowOffset: { width: 0, height: 10 },
        },
        sheetTextInputTagContainer: {
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 5,
            paddingLeft: 10,
            marginRight: 5,
            paddingVertical: 5,
            flexDirection: "row",
            flexWrap: "nowrap",
            borderRadius: 20,
        },
        sheetTextInputTagText: {
            color: theme.options.colors.text[500],
            marginRight: 5,
        },
        sheetTextInput: {
            width: "99%",
            height: 20,
            color: theme.options.colors.text[400],
        },

        /*SHEET SEARCH*/
        sheetSearchCTAContainer: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            paddingTop: 150,
        },
        sheetSearchCTA: {
            marginTop: 15,
            textAlign: "center",
        },
        sheetSearchImageContainer: {
            position: "relative",
            width: 60,
            height: 0,
            borderRadius: 45,
            justifyContent: "center",
            alignItems: "center",
        },
        sheetSearchImage: {
            position: "absolute",
            top: 60,
            width: 60,
            height: 75,
        },
    });
}
