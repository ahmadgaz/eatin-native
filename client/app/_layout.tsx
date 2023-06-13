import { SplashScreen, Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { useTheme } from "../theme";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [fontsLoaded] = useFonts({
        LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
        LatoBlackItalic: require("../assets/fonts/Lato-BlackItalic.ttf"),
        LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
        LatoBoldItalic: require("../assets/fonts/Lato-BoldItalic.ttf"),
        LatoItalic: require("../assets/fonts/Lato-Italic.ttf"),
        LatoLight: require("../assets/fonts/Lato-Light.ttf"),
        LatoLightItalic: require("../assets/fonts/Lato-LightItalic.ttf"),
        LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
        LatoThin: require("../assets/fonts/Lato-Thin.ttf"),
        LatoThinItalic: require("../assets/fonts/Lato-ThinItalic.ttf"),
        ProspectusProMBlack: require("../assets/fonts/ProspectusProMDEMO-Black.otf"),
    });

    if (!fontsLoaded) return <SplashScreen />;

    const theme = useTheme("light");

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                orientation: "portrait",
                contentStyle: {
                    backgroundColor: theme.options.colors.background[500],
                },
            }}
        />
    );
}
