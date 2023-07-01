import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { useTheme } from "../../theme";
import { carouselData } from "./carouselData";
import Slide from "./slide";
import { carouselDataType } from "./types";
import Pagination from "./pagination";
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { NativeScrollEvent } from "react-native/Libraries/Components/ScrollView/ScrollView";
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import ceilToNearestIncrement from "../../utils/ceilToNearestIncrement";
import homeStyles from "./styles";

const screen = Dimensions.get("screen");

export default function Carousel({ fullScreen }: { fullScreen: boolean }) {
    const theme = useTheme("light");
    const styles = homeStyles("light");
    const scrollX = useSharedValue(0);
    const [slide, setSlide] = useState<number>(0);
    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onBeginDrag(event) {
            runOnJS(setSlide)(
                Math.min(
                    Math.max(event.contentOffset.x, 0),
                    screen.width * (carouselData.length - 1)
                )
            );
        },
        onEndDrag(event) {
            runOnJS(setSlide)(event.contentOffset.x);
        },
    });

    const carouselRef = useRef<any>(null);
    useEffect(() => {
        if (fullScreen) return;
        const intervalId = setInterval(() => {
            setSlide((prevSlide) => {
                const newSlide =
                    prevSlide >= screen.width * (carouselData.length - 1)
                        ? 0
                        : prevSlide + screen.width;
                carouselRef.current?.scrollToOffset({
                    offset: ceilToNearestIncrement(newSlide, screen.width),
                    animated: true,
                });
                return newSlide;
            });
        }, 7000);
        return () => clearInterval(intervalId);
    }, [fullScreen]);

    return (
        <View
            style={{
                width: screen.width,
                height: screen.height - 600,
            }}
        >
            <Animated.FlatList
                ref={carouselRef}
                data={carouselData}
                renderItem={({ item }: { item: carouselDataType }) => (
                    <Slide item={item} />
                )}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                overScrollMode="never"
            />
            <Pagination data={carouselData} scrollX={scrollX} />
        </View>
    );
}
