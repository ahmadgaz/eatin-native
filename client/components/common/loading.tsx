import AnimatedLottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import { useTheme } from "../../theme";
import { LoadingProps } from "./types";
import commonStyles from "./styles";
import { StatusBar } from "expo-status-bar";

// Loading screen component
export default function Loading({ isPageLoaded }: LoadingProps) {
    const theme = useTheme("light");
    const styles = commonStyles("light");
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
            <StatusBar style="dark" />
            <View style={styles.loadingModal}>
                <AnimatedLottieView
                    source={require("../../assets/animations/eatin-loading-icon.json")}
                    loop={true}
                    autoPlay
                    style={styles.loadingIcon}
                />
            </View>
        </Modal>,
        isInitialLayerVisible ? (
            <View key={0} style={styles.loadingInitialLayer}></View>
        ) : null,
    ];

    return <>{loadingLayers}</>;
}
