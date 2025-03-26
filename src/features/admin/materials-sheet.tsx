
import { Button } from '@/src/shared/ui/button'
import { InputAdd } from '@/src/shared/ui/input-add'
import { Trash } from 'lucide-react-native'
import React from 'react'
import { Alert, FlatList } from 'react-native'
import { Sheet, useTheme, View, YStack } from 'tamagui'
import { useMaterials } from '../new-load/use-materials'
import { api } from '@/src/shared/services/api'
import { useQueryClient } from '@tanstack/react-query'

type MaterialsSheetProps = {
    open: boolean
    onOpenChange: (value: boolean) => void
}

export const MaterialsSheet = ({ open, onOpenChange }: MaterialsSheetProps) => {
    const theme = useTheme()

    const { query: { data: materials }, createMaterial, deleteMaterial } = useMaterials()

    return (
        <Sheet
            modal
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={[70]}
            dismissOnSnapToBottom
        >
            <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
            <Sheet.Frame padding="20" >
                <YStack gap="$5" flex={1}>
                    <FlatList
                        data={materials}
                        ListHeaderComponent={
                            <>
                                <InputAdd onAdd={(name) => { createMaterial(name) }} />
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
                                label={item.label.toString()}
                                Icon={Trash}
                                color={theme.main?.val}
                                onPress={() => {
                                    Alert.alert(
                                        "Confirmar",
                                        `Tem certeza que quer dele deletar o material: ${item.label}?`,
                                        [
                                            { text: "Cancelar", style: "cancel" },
                                            {
                                                text: "Deletar", onPress: async () => {
                                                    deleteMaterial(item.value)
                                                }
                                            },
                                        ]
                                    );
                                }

                                }
                            />
                        )}
                        ItemSeparatorComponent={() => <View height={8} />}
                        keyExtractor={item => item.value.toString()}
                    />
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}
