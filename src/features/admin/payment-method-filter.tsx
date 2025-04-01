
import { User, X } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, useTheme, View, YStack } from 'tamagui'
import { SectionList } from 'react-native'
import { Button } from '@/src/shared/ui/button'
import { ItemType } from '@/src/types/item'
import { LoadType } from "@/src/types/load";

type PaymentMethodsFilterProps = {
    onSelect: (client: ItemType<LoadType["paymentMethod"]>) => void
}

export const PaymentMethodsFilterSheet = ({ onSelect }: PaymentMethodsFilterProps) => {

    const theme = useTheme()

    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<Array<ItemType<LoadType["paymentMethod"]>>>([]);

    const items: Array<ItemType<LoadType["paymentMethod"]>> = [
        { label: "A vista", value: "cash" },
        { label: "A prazo", value: "installment" },
    ]

    const select = (client: ItemType<LoadType["paymentMethod"]>) => {
        onSelect?.(client)
        if (selectedPaymentMethods.some(c => client.value === c.value)) {
            setSelectedPaymentMethods(selectedPaymentMethods.filter(c => c.value !== client.value))
        } else {
            setSelectedPaymentMethods([...selectedPaymentMethods, client])
        }
    }

    const filterSections = [
        {
            title: "Filtros",
            data: selectedPaymentMethods
        },
        {
            title: "Todos",
            data: items.filter(c => !selectedPaymentMethods.some(s => s.value === c.value))
        },
    ]

    return (
        <YStack gap="$5">
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
    )
}


