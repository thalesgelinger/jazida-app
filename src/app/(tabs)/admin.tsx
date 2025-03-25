import { Button as TButton, Sheet, Text, useTheme, View, YStack } from "tamagui";
import { Edit, FileCheck, Truck, User } from "lucide-react-native"
import React, { useState } from 'react'
import { FlatList, RefreshControl } from "react-native";
import { LoadTile } from "@/src/shared/ui/load-tile";
import { Button } from "@/src/shared/ui/button";
import { useLoads } from "@/src/features/new-load/use-loads";
import { ClientsSheet } from "@/src/features/admin/clients-sheet";
import { MaterialsSheet } from "@/src/features/admin/materials-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/src/shared/ui/input";

const ADMIN_PASS = "admin"

export default function Admin() {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenClients, setIsOpenClients] = useState(false)
    const [isOpenMaterials, setIsOpenMaterials] = useState(false)
    const [auth, setAuth] = useState(false);
    const [adminPass, setAdminPass] = useState("");

    const theme = useTheme()

    const { query: { data: loads, isLoading } } = useLoads()

    const queryClient = useQueryClient()

    const onRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ['loads'] })
    }

    const authorize = () => {
        setAuth(adminPass === ADMIN_PASS)
    }

    if (!auth) {
        return <YStack padding={20} justifyContent="center" flex={1} gap={20} >
            <Text fontSize={24}>Para acessar a rea de admin você precisa da senha do admin</Text>
            <Input
                onChangeText={setAdminPass}
                value={adminPass}
                secureTextEntry
            />
            <Button label="Entrar" color={theme.main?.val} onPress={authorize} />
        </YStack>
    }

    return (
        <>
            <View padding={20} backgroundColor={theme.background?.val} flex={1} position="relative">
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={loads}
                    renderItem={({ item }) => <LoadTile
                        client={item.client}
                        plate={item.plate}
                        quantity={item.quantity}
                        material={item.material}
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
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={["yellow"]} />
                    }
                />

                <TButton
                    backgroundColor={theme.main?.val}
                    height={48}
                    width={48}
                    position="absolute"
                    bottom={10}
                    right={10}
                    onPress={() => setIsOpen(true)}
                >
                    <Edit color={theme.strongGrey?.val} size={24} />
                </TButton>
            </View>

            <Sheet
                modal
                open={isOpen}
                onOpenChange={setIsOpen}
                snapPoints={[70]}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
                <Sheet.Frame padding="20" >
                    <YStack gap="$5">
                        <Button
                            label="Clientes"
                            Icon={User}
                            color={theme.main?.val}
                            onPress={() => { setIsOpenClients(true) }}
                        />

                        <Button
                            label="Materiais"
                            Icon={Truck}
                            color={theme.main?.val}
                            onPress={() => { setIsOpenMaterials(true) }}
                        />
                    </YStack>
                </Sheet.Frame>
            </Sheet>

            <ClientsSheet open={isOpenClients} onOpenChange={setIsOpenClients} />

            <MaterialsSheet open={isOpenMaterials} onOpenChange={setIsOpenMaterials} />
        </>
    );
}

