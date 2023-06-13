import "expo-dev-client";
import { useRouter } from "expo-router";
import { useRef, useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/common/loading";
import Carousel from "../components/home/carousel";
import useLoadVideos from "../hooks/useLoadVideos";
import { useTheme } from "../theme";
import homeStyles from "../components/home/styles";
import hexToRgb from "../utils/hexToRgb.js";
import { Video } from "expo-av";
import { ResizeMode } from "expo-av/build/Video.types";
import useLoadImages from "../hooks/useLoadImages";
import { StatusBar } from "expo-status-bar";

const screen = Dimensions.get("screen");

// Home page
export default function Home() {
    const router = useRouter();
    const theme = useTheme("light");
    const styles = homeStyles("light");

    const [videosLoaded, videos] = useLoadVideos([
        {
            src: require("../assets/videos/herovideo.mp4"),
            style: {
                width: screen.width,
                height: screen.height,
            },
            props: {
                useNativeControls: false,
                isLooping: true,
                isMuted: true,
                shouldPlay: true,
                resizeMode: ResizeMode.COVER,
            },
        },
    ]);
    // const [imagesLoaded, images] = useLoadImages([
    //     {
    //         src: require("../assets/images/trace.png"),
    //         style: {
    //             width: screen.width,
    //             height: screen.height,
    //         },
    //     },
    // ]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Loading isPageLoaded={videosLoaded} />
            <Text style={[theme.typography().logo, styles.logo]}>eatin.</Text>
            <Carousel />
            <View style={styles.backdrop} />
            <View style={styles.heroVideoContainer}>{videos[0]}</View>
        </View>
    );
}
