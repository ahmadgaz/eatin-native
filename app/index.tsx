import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>test</Text>
            </View>
        </SafeAreaView>
    );
}
