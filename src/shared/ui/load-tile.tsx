import { LoadType } from "@/src/types/load";
import { Text, useTheme, View, XStack, YStack } from "tamagui";
import { api } from "../services/api";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image"
import { Link } from "expo-router";
import Animated from "react-native-reanimated";
import { formatSignatureUrl } from "../utils/format-signature";


type LoadTileProps = LoadType

export const LoadTile = ({
    client,
    plate,
    quantity,
    material,
    signatureUrl,
    date,
    paymentMethod
}: LoadTileProps) => {
    const theme = useTheme()
    const formatedDate = date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })

    const formattedSignature = formatSignatureUrl(signatureUrl)

    return (
        <Link href={`/image/${encodeURIComponent(formattedSignature)}`} asChild>
            <TouchableOpacity>
                <YStack
                    backgroundColor={theme.main?.val} padding={12}
                    borderRadius={12}
                >
                    <XStack justifyContent="space-between" marginBottom={8} alignItems="center">
                        <YStack>
                            <Text fontSize={24}>{client}</Text>
                            <Text>{plate}</Text>
                        </YStack>
                        <View
                            backgroundColor={"white"}
                            borderRadius={12}
                            padding={20}
                            height={75}
                            width={129}
                        >
                            <Image
                                source={formattedSignature}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                }}
                                contentFit="contain"
                            />
                        </View>
                    </XStack>
                    <XStack justifyContent="space-between">
                        <Text>{quantity}m de {material} - {paymentMethod === "cash" ? "A vista" : "A prazo"}</Text>
                        <Text>{formatedDate}</Text>
                    </XStack>
                </YStack>
            </TouchableOpacity>
        </Link>

    )
}
