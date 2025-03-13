import { LoadType } from "@/src/types/load";
import { Image, Text, useTheme, View, XStack, YStack } from "tamagui";

type LoadTileProps = LoadType

export const LoadTile = ({
    client,
    plate,
    quantity,
    material,
    signatureUrl,
    date,
}: LoadTileProps) => {
    const theme = useTheme()

    return (
        <YStack
            backgroundColor={theme.main?.val} padding={12}
            borderRadius={12}
        >
            <XStack justifyContent="space-between" marginBottom={8} alignItems="center">
                <YStack>
                    <Text fontSize={24}>{client}</Text>
                    <Text>{plate}</Text>
                </YStack>
                <Image
                    src={signatureUrl}
                    height={75}
                    width={129}
                    borderRadius={12}
                />
            </XStack>
            <XStack justifyContent="space-between">
                <Text>{quantity}m de {material}</Text>
                <Text>{date.toString()}</Text>
            </XStack>
        </YStack>
    )
}
