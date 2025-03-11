import { Text, View, XStack } from "tamagui";
import { Check } from "lucide-react-native"

export default function Admin() {
    return (
        <View
            flex={1}
            justifyContent="center"
            alignItems="center"
        >
            <XStack alignItems="center">
                <Check color="red" size={48} />
                <Text>Admin Screen</Text>
            </XStack>
        </View>
    );
}

