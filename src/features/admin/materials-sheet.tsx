
import { Button } from '@/src/shared/ui/button'
import { InputAdd } from '@/src/shared/ui/input-add'
import { Trash } from 'lucide-react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Sheet, useTheme, View, YStack } from 'tamagui'

type MaterialsSheetProps = {
    open: boolean
    onOpenChange: (value: boolean) => void
}

export const MaterialsSheet = ({ open, onOpenChange }: MaterialsSheetProps) => {
    const theme = useTheme()

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
    )
}
