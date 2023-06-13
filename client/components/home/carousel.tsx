import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";
import { Text, View, FlatList } from "react-native";
import { useTheme } from "../../theme";
import { carouselData } from "./carousel-data";
import Slide from "./slide";
import { carouselDataType } from "./types";
import Pagination from "./pagination";
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { NativeScrollEvent } from "react-native/Libraries/Components/ScrollView/ScrollView";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

export default function Carousel() {
    const theme = useTheme("light");
    const scrollX = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    return (
        <SafeAreaView>
            <Animated.FlatList
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
            />
            <Pagination data={carouselData} scrollX={scrollX} />
        </SafeAreaView>
    );
}
