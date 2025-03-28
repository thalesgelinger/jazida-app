
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable } from 'react-native'
import { Image } from "expo-image"
import { View } from 'tamagui';
import { SquareX } from 'lucide-react-native';

export default function ImageView() {

    const { imageUri } = useLocalSearchParams();

    const router = useRouter()

    return (
        <Pressable
            onPress={router.back}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
            <View position="absolute" top={80} left={20}>
                <SquareX color="red" size={30} />
            </View>
            <Image
                source={imageUri}
                style={{
                    height: "100%",
                    width: "100%",
                }}
                contentFit="contain"
            />
        </Pressable>
    )
}

