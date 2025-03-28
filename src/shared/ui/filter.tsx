
import { ChevronDown } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, useTheme, XStack } from 'tamagui'

type FilterProps = {
    name: string
    onPress: () => void
}

export const Filter = ({ name, onPress }: FilterProps) => {
    const theme = useTheme()

    return (
        <TouchableOpacity onPress={onPress}>
            <XStack
                alignItems="center"
                backgroundColor={theme.grey?.val}
                paddingHorizontal={8}
                paddingVertical={8}
                borderRadius={12}
            >
                <Text>{name}</Text>
                <ChevronDown color="black" size={16} />
            </XStack>
        </TouchableOpacity>
    )
}
