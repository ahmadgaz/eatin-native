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

    return (
        <View style={styles.container}>
            <Loading isPageLoaded={videosLoaded} />
            <Carousel />
            <View style={styles.heroVideoContainer}>{videos[0]}</View>
        </View>
    );
}
