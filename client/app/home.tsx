import "expo-dev-client";
import { useRouter } from "expo-router";
import { useRef, useEffect, useState } from "react";
import { View, Text, Image, Dimensions, Modal } from "react-native";
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
import ActionSheet from "../components/home/actionSheet";

const screen = Dimensions.get("screen");

// Home page
export default function Home() {
    const router = useRouter();
    const theme = useTheme("light");
    const styles = homeStyles("light");

    const [fullScreen, setFullScreen] = useState<boolean>(false); // Whether the action sheet is fullscreen or not. Used to change status bar color. Changes based on whether input is focused or not

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
                shouldPlay: !fullScreen,
                resizeMode: ResizeMode.COVER,
            },
        },
    ]);

    return (
        <>
            <Loading isPageLoaded={videosLoaded} />
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" />
                <ActionSheet
                    screen={screen}
                    fullScreen={fullScreen}
                    setFullScreen={setFullScreen}
                />
                <Text style={[theme.typography().logo, styles.logo]}>
                    eatin.
                </Text>
                <Carousel fullScreen={fullScreen} />
                <View
                    style={[
                        {
                            width: screen.width,
                            height: screen.height + 50,
                            bottom: -screen.height + 390,
                        },
                        styles.sheetShadow,
                    ]}
                ></View>
                <View style={styles.backdrop} />
                <View style={styles.heroVideoContainer}>{videos[0]}</View>
            </SafeAreaView>
        </>
    );
}
