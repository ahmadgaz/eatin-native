import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme";

// Home page
// TODO: Create a loading screen (will be used as a splash screen as well) with the logo ear flutter animation above a grainy gaussian blurred timewarped bg
// Loading screen must load after all assets/ data is loaded
export default function Home() {
    const router = useRouter();
    const theme = useTheme("light");

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
            <Image
                source={require("../assets/images/Logo-02.png")}
                style={{ width: 150, height: 46.25, margin: 10 }}
            />
            <Image
                source={require("../assets/images/Hero.gif")}
                style={{ width: 300, height: 300, margin: 15 }}
            />
            <Text
                style={{
                    textAlign: "center",
                    ...theme.typography("bold", "italic").h2,
                }}
            >
                Schedule life with ease!
            </Text>
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
