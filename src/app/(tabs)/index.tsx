import { Text, View, XStack } from "tamagui";
import { Check } from "lucide-react-native"

export default function Index() {
    return (
        <View
            flex={1}
            justifyContent="center"
            alignItems="center"
        >
            <XStack alignItems="center">
                <Text>New Load Screen</Text>
            </XStack>
        </View>
    );
}
