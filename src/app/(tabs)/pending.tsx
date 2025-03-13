import { Image, Text, useTheme, View, XStack, YStack } from "tamagui";
import { Check } from "lucide-react-native"

import React from 'react'
import { FlatList } from "react-native";
import { LoadTile } from "@/src/shared/ui/load-tile";
import { LoadType } from "@/src/types/load";

export default function Pending() {

    const theme = useTheme()

    const loads: Array<LoadType> = [
        {
            client: "Fulano 1",
            plate: "ABC-1234",
            quantity: 40,
            material: "areia",
            signatureUrl: "https://scontent.fpoa2-1.fna.fbcdn.net/v/t39.30808-6/296375877_343371377999777_4026508833316169967_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=FaHf1tp7TgEQ7kNvgHbG2U1&_nc_oc=AdjjJtEp7Rfy4iBlwXrjd9TSdsfztD8b76GJUCpMo7ymva8RznLjI52SUGRJMRSiTm0&_nc_zt=23&_nc_ht=scontent.fpoa2-1.fna&_nc_gid=APnnDuuEtVGd-VwCXS-KIXk&oh=00_AYE7caeWN6asnSslNmUirUyHSvU_VB_ZLRzhqP0jhmuBTg&oe=67D91151",
            date: new Date()
        },

        {
            client: "Fulano 1",
            plate: "ABC-1234",
            quantity: 40,
            material: "areia",
            signatureUrl: "https://scontent.fpoa2-1.fna.fbcdn.net/v/t39.30808-6/296375877_343371377999777_4026508833316169967_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=FaHf1tp7TgEQ7kNvgHbG2U1&_nc_oc=AdjjJtEp7Rfy4iBlwXrjd9TSdsfztD8b76GJUCpMo7ymva8RznLjI52SUGRJMRSiTm0&_nc_zt=23&_nc_ht=scontent.fpoa2-1.fna&_nc_gid=APnnDuuEtVGd-VwCXS-KIXk&oh=00_AYE7caeWN6asnSslNmUirUyHSvU_VB_ZLRzhqP0jhmuBTg&oe=67D91151",
            date: new Date()
        }
    ]

    return (
        <View padding={20} backgroundColor={theme.background?.val} flex={1}>
            <FlatList
                data={loads}
                renderItem={({ item }) => <LoadTile
                    client={item.client}
                    plate={item.plate}
                    quantity={item.quantity}
                    material={item.material}
                    signatureUrl={item.signatureUrl}
                    date={item.date}
                />}
                ItemSeparatorComponent={() => <View height={12} />}
                keyExtractor={(_, i) => i.toString()}
            />

        </View>
    );
}

