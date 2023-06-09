import { SplashScreen, Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { useTheme } from "../theme";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [fontsLoaded] = useFonts({
        ProductSans: require("../assets/fonts/Product-Sans-Bold.ttf"),
        ProspectusProXLBlack: require("../assets/fonts/ProspectusProXLDEMO-Black.otf"),
        ProspectusProXLBlackItalic: require("../assets/fonts/ProspectusProXLDEMO-BlackItalic.otf"),
        ProspectusProXLRegular: require("../assets/fonts/ProspectusProXLDEMO-Regular.otf"),
        ProspectusProXLItalic: require("../assets/fonts/ProspectusProXLDEMO-Italic.otf"),
        ProspectusProXLBold: require("../assets/fonts/ProspectusProXLDEMO-Bold.otf"),
        ProspectusProXLBoldItalic: require("../assets/fonts/ProspectusProXLDEMO-BoldItalic.otf"),

        ProspectusProLBlack: require("../assets/fonts/ProspectusProLDEMO-Black.otf"),
        ProspectusProLBlackItalic: require("../assets/fonts/ProspectusProLDEMO-BlackItalic.otf"),
        ProspectusProLRegular: require("../assets/fonts/ProspectusProLDEMO-Regular.otf"),
        ProspectusProLItalic: require("../assets/fonts/ProspectusProLDEMO-Italic.otf"),
        ProspectusProLBold: require("../assets/fonts/ProspectusProLDEMO-Bold.otf"),
        ProspectusProLBoldItalic: require("../assets/fonts/ProspectusProLDEMO-BoldItalic.otf"),

        ProspectusProMBlack: require("../assets/fonts/ProspectusProMDEMO-Black.otf"),
        ProspectusProMBlackItalic: require("../assets/fonts/ProspectusProMDEMO-BlackItalic.otf"),
        ProspectusProMRegular: require("../assets/fonts/ProspectusProMDEMO-Regular.otf"),
        ProspectusProMItalic: require("../assets/fonts/ProspectusProMDEMO-Italic.otf"),
        ProspectusProMBold: require("../assets/fonts/ProspectusProMDEMO-Bold.otf"),
        ProspectusProMBoldItalic: require("../assets/fonts/ProspectusProMDEMO-BoldItalic.otf"),
        ProspectusProMLight: require("../assets/fonts/ProspectusProMDEMO-Light.otf"),
        ProspectusProMLightItalic: require("../assets/fonts/ProspectusProMDEMO-LightItalic.otf"),

        ProspectusProSRegular: require("../assets/fonts/ProspectusProSDEMO-Regular.otf"),
        ProspectusProSItalic: require("../assets/fonts/ProspectusProSDEMO-Italic.otf"),
    });

    if (!fontsLoaded) return <SplashScreen />;

    const theme = useTheme("light");

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                orientation: "portrait",
                contentStyle: {
                    backgroundColor: theme.options.colors.neutralLight[500],
                },
            }}
        />
    );
}
