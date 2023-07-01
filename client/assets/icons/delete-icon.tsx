import Animated, {
    Extrapolate,
    interpolate,
    SharedValue,
    useAnimatedProps,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Svg, Path } from "react-native-svg";
import { useTheme } from "../../theme";
import hexToRgb from "../../utils/hexToRgb";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const DeleteIcon = ({
    changeColorAnimation,
}: {
    changeColorAnimation?: SharedValue<number>;
}) => {
    const theme = useTheme("light");
    const inputRange = [0, 100, 0];

    const r = hexToRgb(theme.options.colors.accent[500]).r;
    const g = hexToRgb(theme.options.colors.accent[500]).g;
    const b = hexToRgb(theme.options.colors.accent[500]).b;

    const inputTagIconGreenOpacity = useAnimatedStyle(() => {
        if (changeColorAnimation) {
            const inputColorOpacity = interpolate(
                changeColorAnimation.value,
                inputRange,
                [0, 1, 0],
                Extrapolate.CLAMP
            );

            return {
                opacity: inputColorOpacity,
            };
        }
        return {};
    });

    return (
        <Svg width={20} height={20}>
            <Path
                fill="gray"
                x={0}
                y={0}
                d="m10,0C4.48,0,0,4.48,0,10s4.48,10,10,10,10-4.48,10-10S15.53,0,10,0Zm4.09,12.23c.52.52.52,1.35,0,1.86-.26.25-.59.38-.93.38s-.67-.13-.93-.38l-2.23-2.23-2.23,2.23c-.26.25-.59.38-.93.38s-.67-.13-.93-.38c-.52-.52-.52-1.35,0-1.86l2.23-2.23-2.23-2.23c-.52-.52-.52-1.35,0-1.86.51-.52,1.34-.52,1.86,0l2.23,2.23,2.23-2.23c.51-.52,1.34-.52,1.86,0,.52.52.52,1.35,0,1.86l-2.23,2.23,2.23,2.23Z"
            />
            <AnimatedPath
                style={inputTagIconGreenOpacity}
                fill={`rgb(${r},${g},${b})`}
                x={0}
                y={0}
                d="m10,0C4.48,0,0,4.48,0,10s4.48,10,10,10,10-4.48,10-10S15.53,0,10,0Zm4.09,12.23c.52.52.52,1.35,0,1.86-.26.25-.59.38-.93.38s-.67-.13-.93-.38l-2.23-2.23-2.23,2.23c-.26.25-.59.38-.93.38s-.67-.13-.93-.38c-.52-.52-.52-1.35,0-1.86l2.23-2.23-2.23-2.23c-.52-.52-.52-1.35,0-1.86.51-.52,1.34-.52,1.86,0l2.23,2.23,2.23-2.23c.51-.52,1.34-.52,1.86,0,.52.52.52,1.35,0,1.86l-2.23,2.23,2.23,2.23Z"
            />
        </Svg>
    );
};
