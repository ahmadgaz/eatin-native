import { View, Text } from "react-native";
import React, {
    ForwardedRef,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import {
    ScrollViewProps,
    ScrollViewPropsAndroid,
    ScrollViewPropsIOS,
} from "react-native/Libraries/Components/ScrollView/ScrollView";
import Animated, {
    useAnimatedProps,
    useSharedValue,
} from "react-native-reanimated";

interface ScrollViewWithFadedEndsProps
    extends ScrollViewProps,
        ScrollViewPropsAndroid,
        ScrollViewPropsIOS {
    fadeRightEnd: boolean;
    fadeLeftEnd: boolean;
    vert?: boolean;
}

export const ScrollViewWithFadedEnds = forwardRef(
    (
        {
            fadeLeftEnd,
            fadeRightEnd,
            vert,
            children,
            ...props
        }: React.PropsWithChildren<ScrollViewWithFadedEndsProps>,
        ref: ForwardedRef<ScrollView>
    ) => {
        const [leftEndFade, setLeftEndFade] = useState(0);
        const [rightEndFade, setRightEndFade] = useState(0);
        const intervals = useRef<{
            leftEndInc: NodeJS.Timer | null;
            leftEndDec: NodeJS.Timer | null;
            RightEndInc: NodeJS.Timer | null;
            RightEndDec: NodeJS.Timer | null;
        }>({
            leftEndInc: null,
            leftEndDec: null,
            RightEndInc: null,
            RightEndDec: null,
        });

        useEffect(() => {
            // Clear all animation intervals
            if (intervals.current.leftEndInc)
                clearInterval(intervals.current.leftEndInc);
            if (intervals.current.leftEndDec)
                clearInterval(intervals.current.leftEndDec);
            if (intervals.current.RightEndInc)
                clearInterval(intervals.current.RightEndInc);
            if (intervals.current.RightEndDec)
                clearInterval(intervals.current.RightEndDec);

            // Fade in/out left end animation
            if (fadeLeftEnd) {
                intervals.current.leftEndInc = setInterval(() => {
                    setLeftEndFade((prev) => {
                        if (prev >= 0.05) {
                            if (intervals.current.leftEndInc)
                                clearInterval(intervals.current.leftEndInc);
                            return prev;
                        }
                        return Math.min(
                            Math.floor((prev + 0.01) * 1000) / 1000,
                            0.05
                        );
                    });
                }, 10);
            } else {
                intervals.current.leftEndDec = setInterval(() => {
                    setLeftEndFade((prev) => {
                        if (prev <= 0) {
                            if (intervals.current.leftEndDec)
                                clearInterval(intervals.current.leftEndDec);
                            return prev;
                        }
                        return Math.max(
                            Math.floor((prev - 0.01) * 1000) / 1000,
                            0
                        );
                    });
                }, 10);
            }

            // Fade in/out right end animation
            if (fadeRightEnd) {
                intervals.current.RightEndInc = setInterval(() => {
                    setRightEndFade((prev) => {
                        if (prev >= 0.05) {
                            if (intervals.current.RightEndInc)
                                clearInterval(intervals.current.RightEndInc);
                            return prev;
                        }
                        return Math.min(
                            Math.floor((prev + 0.01) * 1000) / 1000,
                            0.05
                        );
                    });
                }, 10);
            } else {
                intervals.current.RightEndDec = setInterval(() => {
                    setRightEndFade((prev) => {
                        if (prev <= 0) {
                            if (intervals.current.RightEndDec)
                                clearInterval(intervals.current.RightEndDec);
                            return prev;
                        }
                        return Math.max(
                            Math.floor((prev - 0.01) * 1000) / 1000,
                            0
                        );
                    });
                }, 10);
            }
        }, [fadeLeftEnd, fadeRightEnd]);

        return (
            <MaskedView
                maskElement={
                    <LinearGradient
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            height: "100%",
                        }}
                        colors={[
                            "transparent",
                            "#192f6a",
                            "#192f6a",
                            "transparent",
                        ]}
                        locations={[
                            0,
                            vert ? 0 + leftEndFade / 3 : 0 + leftEndFade,
                            vert ? 1 - rightEndFade / 3 : 1 - rightEndFade,
                            1,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: vert ? 0 : 1, y: vert ? 1 : 0 }}
                    />
                }
            >
                <ScrollView ref={ref} {...props}>
                    {children}
                </ScrollView>
            </MaskedView>
        );
    }
);
