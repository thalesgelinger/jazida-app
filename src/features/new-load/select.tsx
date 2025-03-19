import { Button } from "@/src/shared/ui/button"
import { Input } from "@/src/shared/ui/input"
import { useState } from "react"
import { FlatList } from "react-native"
import { ItemType } from "@/src/types/item"
import { Sheet, useTheme, View, YStack } from "tamagui"
import { Search } from "lucide-react-native"

type SelectProps<T> = {
    label: string
    Icon: JSX.ElementType
    items: Array<ItemType<T>>
    onSelect: (value: T) => void
}

export const Select = <T extends any>({ label, Icon, items, onSelect }: SelectProps<T>) => {
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const [searchTerm, setSeachTerm] = useState("")

    const filteredItems = items.filter(item => item.label.includes(searchTerm.toLowerCase()))

    return <>
        <Button label={label} Icon={Icon} onPress={() => { setIsOpen(true); }} />

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
                    <Input onChangeText={setSeachTerm} Icon={Search} />
                    <FlatList
                        data={filteredItems}
                        renderItem={({ item }) => <Button
                            label={item.label}
                            Icon={Icon}
                            color={theme.main?.val}
                            onPress={() => {
                                onSelect?.(item.value)
                                setIsOpen(false)
                            }}
                        />}
                        ItemSeparatorComponent={() => <View height={8} />}
                    />

                </YStack>
            </Sheet.Frame>
        </Sheet>
    </>
}
