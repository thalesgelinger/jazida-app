
import { Search, User, X } from 'lucide-react-native'
import React, { useState } from 'react'
import { Sheet, Text, useTheme, View, YStack } from 'tamagui'
import { usePlates } from '../new-load/use-plates'
import { Input } from '@/src/shared/ui/input'
import { FlatList, SectionList } from 'react-native'
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
    const [selectedPlates, setSelectedPlates] = useState<string[]>([]);

    const [searchTerm, setSeachTerm] = useState("")

    const filteredItems = plates
        .filter(plate => clients.some(client => client.value === plate.value.clientId))
        .filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))

    const select = (value: string) => {
        onSelect?.(value)
        setIsOpen(false)

        if (selectedPlates.includes(value)) {
            setSelectedPlates(selectedPlates.filter(c => c !== value))
        } else {
            setSelectedPlates([...selectedPlates, value])
        }
    }

    const filterSections = [
        {
            title: "Filtros",
            data: selectedPlates
        },
        {
            title: "Todos",
            data: filteredItems.filter(p => !selectedPlates.includes(p.label)).map(p => p.label)
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
                            renderItem={({ item, section }) => section.title === "Filtros" ? <Button
                                label={item}
                                Icon={X}
                                color={theme.main?.val}
                                onPress={() => {
                                    select(item)
                                }}
                            /> : <Button
                                label={item}
                                Icon={User}
                                onPress={() => {
                                    select(item)
                                }}
                            />}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text>{title}</Text>
                            )}
                            ItemSeparatorComponent={() => <View height={8} />}
                        />

                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}

