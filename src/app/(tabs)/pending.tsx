import { Text, useTheme, View, YStack } from "tamagui";
import { FileCheck, Loader } from "lucide-react-native"
import React, { useEffect, useState } from 'react'
import { FlatList } from "react-native";
import { LoadTile } from "@/src/shared/ui/load-tile";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/src/shared/services/db";
import * as schema from "../../shared/services/db/schema"
import { useNetwork } from "@/src/shared/hooks/useNetwork";
import { useLoads } from "@/src/features/new-load/use-loads";
import { eq } from "drizzle-orm";
import { Loading } from "@/src/shared/ui/loading";

export default function Pending() {

    const theme = useTheme()

    const { data: loads } = useLiveQuery(db.select().from(schema.loads).orderBy(schema.loads.insertedAt));

    const isConnected = useNetwork()

    const { saveLoad } = useLoads()

    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (isConnected && !!loads.length) {
            sendPendingLoad()
        }
    }, [isConnected, loads.length]);

    const sendPendingLoad = async () => {
        const load = loads[0]
        setSending(true)
        await saveLoad({
            clientId: load.client.id,
            plateId: load.plate.id,
            materialId: load.material.id,
            quantity: load.quantity,
            signaturePath: load.signaturePath,
            insertedAt: load.insertedAt,
            paymentMethod: load.paymentMethod
        })
        await db.delete(schema.loads).where(eq(schema.loads.insertedAt, load.insertedAt))
        setSending(false)
    }



    return (
        <View padding={20} backgroundColor={theme.background?.val} flex={1}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={loads}
                renderItem={({ item, index }) => <View position="relative" >
                    {sending && index === 0 &&
                        <View
                            position="absolute"
                            top={0}
                            right={0}
                            left={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            zIndex={10}
                            backgroundColor="white"
                            opacity={0.5}
                        >
                            <Loading />
                        </View>
                    }
                    <LoadTile
                        client={item.client.name}
                        plate={item.plate.name}
                        quantity={item.quantity}
                        material={item.material.name}
                        signatureUrl={item.signaturePath}
                        date={item.insertedAt}
                        paymentMethod={item.paymentMethod}
                    />
                </View>}
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

