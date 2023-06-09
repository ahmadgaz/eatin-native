import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/common/loading";
import useLoadAssets from "../hooks/useLoadAssets";
import { useTheme } from "../theme";

const images = [
    {
        src: require("../assets/images/Logo-02.png"),
        style: { width: 150, height: 46.25, margin: 25 },
    },
    {
        src: require("../assets/animations/Hero.gif"),
        style: { width: 300, height: 300, marginBottom: 15, marginTop: 5 },
    },
];

// Home page
// TODO: Add grainy gaussian blurred timewarped bg
export default function Home() {
    const router = useRouter();
    const theme = useTheme("light");

    const [assetsLoaded, assets] = useLoadAssets(images);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 30,
                alignItems: "center",
                backgroundColor: theme.options.colors.neutralLight[500],
            }}
        >
            <Loading isPageLoaded={assetsLoaded} />
            <View>{assets[0]}</View>
            <Text
                style={{
                    textAlign: "center",
                    ...theme.typography("bold", "italic").h2,
                }}
            >
                Schedule life with ease!
            </Text>
            <View>{assets[1]}</View>
            <Text
                style={{
                    textAlign: "center",
                    ...theme.typography("bold").subtitle1,
                }}
            >
                No more double-bookings, missed appointments, or conflicting
                schedules.
            </Text>
        </SafeAreaView>
    );
}
