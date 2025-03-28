
import { Search, User, X } from 'lucide-react-native'
import React, { useState } from 'react'
import { Sheet, Text, useTheme, View, YStack } from 'tamagui'
import { useClients } from '../new-load/use-clients'
import { Input } from '@/src/shared/ui/input'
import { SectionList } from 'react-native'
import { Button } from '@/src/shared/ui/button'
import { ItemType } from '@/src/types/item'

type ClientsFilterProps = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onSelect: (client: ItemType<number>) => void
}

export const ClientsFilterSheet = ({ isOpen, setIsOpen, onSelect }: ClientsFilterProps) => {

    const theme = useTheme()

    const { query: { data: clients = [] } } = useClients()

    const [selectedClients, setSelectedClients] = useState<Array<ItemType<number>>>([]);
    const [searchTerm, setSeachTerm] = useState("")

    const filteredItems = clients.filter(item => {
        if (searchTerm === "") {
            return clients
        }

        return item.label.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const select = (client: ItemType<number>) => {
        onSelect?.(client)
        setIsOpen(false)
        if (selectedClients.some(c => client.value === c.value)) {
            setSelectedClients(selectedClients.filter(c => c.value !== client.value))
        } else {
            setSelectedClients([...selectedClients, client])
        }
    }

    const filterSections = [
        {
            title: "Filtros",
            data: selectedClients
        },
        {
            title: "Todos",
            data: filteredItems.filter(c => !selectedClients.some(s => s.value === c.value))
        },
    ]

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
                        <SectionList
                            sections={filterSections}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text>{title}</Text>
                            )}
                            renderItem={({ item, section }) => {
                                return (
                                    section.title === "Filtros"
                                        ? <Button
                                            label={item.label}
                                            Icon={X}
                                            color={theme.main?.val}
                                            onPress={() => {
                                                select(item)
                                            }}
                                        />
                                        : <Button
                                            label={item.label}
                                            Icon={User}
                                            onPress={() => {
                                                select(item)
                                            }}
                                        />
                                )
                            }}
                            ItemSeparatorComponent={() => <View height={8} />}
                        />

                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}
