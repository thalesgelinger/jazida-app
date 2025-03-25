import { Text, useTheme, View, YStack } from "tamagui";
import { FileCheck } from "lucide-react-native"
import React from 'react'
import { FlatList } from "react-native";
import { LoadTile } from "@/src/shared/ui/load-tile";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/src/shared/services/db";
import * as schema from "../../shared/services/db/schema"

export default function Pending() {

    const theme = useTheme()

    const { data: loads } = useLiveQuery(db.select().from(schema.loads));

    console.log({ loads })

    return (
        <View padding={20} backgroundColor={theme.background?.val} flex={1}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={loads}
                renderItem={({ item }) => <LoadTile
                    client={item.client.name}
                    plate={item.plate.name}
                    quantity={item.quantity}
                    material={item.material.name}
                    signatureUrl={item.signaturePath}
                    date={item.insertedAt}
                    paymentMethod={item.paymentMethod}
                />}
                ItemSeparatorComponent={() => <View height={12} />}
                keyExtractor={(_, i) => i.toString()}
                ListEmptyComponent={() => (
                    <YStack
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        gap={12}
                    >
                        <Text fontSize={24}>Tudo certo, todos os carregamentos foram enviados</Text>
                        <FileCheck color={theme.main?.val} size={72} />
                    </YStack>
                )}
            />

        </View>
    );
}

