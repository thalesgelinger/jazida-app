import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text, View } from "tamagui";

export default function Debug() {
    return <SafeAreaView>
        <Stack.Screen options={{ animation: "slide_from_bottom", presentation: "fullScreenModal" }} />
        <View padding={20}>
            <Text fontSize={24}>Debug Screen</Text>
        </View>
    </SafeAreaView>
}
