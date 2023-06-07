import AnimatedLottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import { useTheme } from "../../theme";
import { LoadingProps } from "./types";

// Loading screen component
export default function Loading({ isPageLoaded }: LoadingProps) {
    const theme = useTheme("light");
    const isModalVisible = !isPageLoaded;
    const [isInitialLayerVisible, setIsInitialLayerVisible] =
        useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLayerVisible(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const loadingLayers = [
        <Modal
            key={1}
            transparent
            visible={isModalVisible}
            animationType="fade"
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.options.colors.neutralLight[500],
                }}
            >
                <AnimatedLottieView
                    source={require("../../assets/animations/Light-loading-icon.json")}
                    loop={true}
                    autoPlay
                    style={{ width: 100, height: 100 }}
                />
            </View>
        </Modal>,
        isInitialLayerVisible ? (
            <View
                key={0}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    flex: 1,
                    zIndex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.options.colors.neutralLight[500],
                }}
            ></View>
        ) : null,
    ];

    return <>{loadingLayers}</>;
}
