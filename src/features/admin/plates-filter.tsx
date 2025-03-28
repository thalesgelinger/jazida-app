
import { Search, User } from 'lucide-react-native'
import React, { useState } from 'react'
import { Sheet, useTheme, View, YStack } from 'tamagui'
import { usePlates } from '../new-load/use-plates'
import { Input } from '@/src/shared/ui/input'
import { FlatList } from 'react-native'
import { Button } from '@/src/shared/ui/button'
import { ItemType } from '@/src/types/item'

type PlatesFilterProps = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onSelect: (plate: string) => void
    clients: Array<ItemType<number>>
}

export const PlatesFilterSheet = ({ clients, isOpen, setIsOpen, onSelect }: PlatesFilterProps) => {

    const { query: { data: plates = [] } } = usePlates()

    const theme = useTheme()

    const [searchTerm, setSeachTerm] = useState("")

    const filteredItems = plates
        .filter(plate => clients.some(client => client.value === plate.value.clientId))
        .filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <>
            <Sheet
                modal
                open={isOpen}
                onOpenChange={setIsOpen}
                snapPoints={[70]}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.6)'" />
                <Sheet.Frame padding="20" >
                    <YStack gap="$5">
                        <Input onChangeText={setSeachTerm} Icon={Search} />
                        <FlatList
                            data={filteredItems}
                            renderItem={({ item }) => <Button
                                label={item.label}
                                Icon={User}
                                color={theme.main?.val}
                                onPress={() => {
                                    onSelect?.(item.label)
                                    setIsOpen(false)
                                }}
                            />}
                            ItemSeparatorComponent={() => <View height={8} />}
                        />

                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}

