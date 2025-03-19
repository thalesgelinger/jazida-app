

import React, { useState } from 'react'
import { Button, useTheme, View, XStack } from 'tamagui'
import { Input } from './input'
import { SquarePlus } from 'lucide-react-native'

type InputAddProps = {
    onAdd: (value: string) => void
}

export const InputAdd = ({ onAdd }: InputAddProps) => {
    const theme = useTheme()
    const [newAdd, setNewAdd] = useState("");

    return (
        <XStack gap="$2">
            <View flex={1}>
                <Input onChangeText={setNewAdd} />
            </View>
            <Button
                backgroundColor={theme.strongGrey?.val}
                onPress={() => onAdd(newAdd)}
            >
                <SquarePlus color={theme.grey?.val} size={24} />
            </Button>
        </XStack>
    )
}
