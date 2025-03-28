
import { Search, User } from 'lucide-react-native'
import React, { useState } from 'react'
import { Sheet, useTheme, View, YStack } from 'tamagui'
import { useClients } from '../new-load/use-clients'
import { Input } from '@/src/shared/ui/input'
import { FlatList } from 'react-native'
import { Button } from '@/src/shared/ui/button'
import { ItemType } from '@/src/types/item'

type ClientsFilterProps = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onSelect: (client: ItemType<number>) => void
}

export const ClientsFilterSheet = ({ isOpen, setIsOpen, onSelect }: ClientsFilterProps) => {

    const { query: { data: clients = [] } } = useClients()

    const theme = useTheme()

    const [searchTerm, setSeachTerm] = useState("")

    const filteredItems = clients.filter(item => {
        if (searchTerm === "") {
            return clients
        }

        return item.label.toLowerCase().includes(searchTerm.toLowerCase())
    })

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
                                    onSelect?.(item)
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
