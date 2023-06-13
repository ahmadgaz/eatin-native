export default function ceilToNearestIncrement(num, increment) {
    "worklet";
    return Math.ceil(num / increment) * increment;
}
