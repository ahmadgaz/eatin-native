import { View, Text, StyleProp } from "react-native";
import React, { Component, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
import Animated from "react-native-reanimated";
import { useTheme } from "../../theme";
import commonStyles from "./styles";
import AnimatedLottieView from "lottie-react-native";

interface GHTouchableOpacityProps {
    useNativeAnimations?: boolean;
}

interface ButtonProps extends TouchableOpacityProps, GHTouchableOpacityProps {
    loading?: boolean;
    disabled?: boolean;
    onPress: () => any;
    style?: Object;
    buttonStyle?: Object;
}

export default function Button({
    loading,
    disabled,
    onPress,
    style,
    buttonStyle,
    children,
    ...props
}: React.PropsWithChildren<ButtonProps>) {
    const theme = useTheme("light");
    const styles = commonStyles("light");

    return (
        <Animated.View style={[style]}>
            <TouchableOpacity
                style={[
                    styles.button,
                    buttonStyle,
                    disabled ? styles.buttonDisabled : null,
                ]}
                onPress={onPress}
                {...props}
                activeOpacity={0.75}
            >
                {loading ? (
                    <AnimatedLottieView
                        source={require("../../assets/animations/icons8-loading.json")}
                        loop={true}
                        autoPlay
                        style={{ width: 30, height: 30 }}
                    />
                ) : (
                    children
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}
/*
loading state
disabled state  
children (if text, render as text, else render as children)
onPress
accessibliityLabel
*/
