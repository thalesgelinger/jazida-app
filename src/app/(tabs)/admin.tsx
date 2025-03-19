import { Button as TButton, Sheet, Text, useTheme, View, YStack } from "tamagui";
import { ChevronDown, Edit, FileCheck, Trash, Truck, User } from "lucide-react-native"
import React, { useState } from 'react'
import { FlatList } from "react-native";
import { LoadTile } from "@/src/shared/ui/load-tile";
import { LoadType } from "@/src/types/load";
import { Button } from "@/src/shared/ui/button";
import { InputAdd } from "@/src/shared/ui/input-add";
import { ClientDropdown } from "@/src/features/admin/client-dropdown";
import { useLoads } from "@/src/features/new-load/use-loads";

export default function Admin() {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenClients, setIsOpenClients] = useState(false)
    const [isOpenMaterials, setIsOpenMaterials] = useState(false)

    const theme = useTheme()

    const { query: { data: loads } } = useLoads()

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

            <Sheet
                modal
                open={isOpenClients}
                onOpenChange={setIsOpenClients}
                snapPoints={[70]}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
                <Sheet.Frame padding="20" >
                    <YStack gap="$5" flex={1}>
                        <FlatList
                            data={[1, 2, 3, 4]}
                            ListHeaderComponent={
                                <>
                                    <InputAdd onAdd={() => { }} />
                                    <View
                                        marginVertical={12}
                                        backgroundColor={theme.grey?.val}
                                        height={2}
                                        width={"100%"}
                                    />
                                </>
                            }
                            renderItem={({ item }) => (
                                <ClientDropdown />
                            )}
                            ItemSeparatorComponent={() => <View height={8} />}
                            keyExtractor={item => item.toString()}
                        />
                    </YStack>
                </Sheet.Frame>
            </Sheet>

            <Sheet
                modal
                open={isOpenMaterials}
                onOpenChange={setIsOpenMaterials}
                snapPoints={[70]}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
                <Sheet.Frame padding="20" >
                    <YStack gap="$5" flex={1}>
                        <FlatList
                            data={[1, 2, 3, 4]}
                            ListHeaderComponent={
                                <>
                                    <InputAdd onAdd={() => { }} />
                                    <View
                                        marginVertical={12}
                                        backgroundColor={theme.grey?.val}
                                        height={2}
                                        width={"100%"}
                                    />
                                </>
                            }
                            renderItem={({ item }) => (
                                <Button
                                    label={item.toString()}
                                    Icon={Trash}
                                    color={theme.main?.val}
                                />
                            )}
                            ItemSeparatorComponent={() => <View height={8} />}
                            keyExtractor={item => item.toString()}
                        />
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    );
}

