import { Pressable } from "react-native"
import { Text, useTheme, XStack } from "tamagui"



type SelectProps = {
    label: string
    Icon?: JSX.ElementType
    color?: string
    onPress?: () => void
}

export const Button = ({ label, Icon, color, onPress }: SelectProps) => {

    const theme = useTheme()

    return <Pressable onPress={onPress}>
        <XStack
            backgroundColor={color ?? theme.grey?.val}
            borderRadius={12}
            paddingHorizontal={16}
            paddingVertical={20}
            justifyContent={Icon ? "space-between" : "center"}
            alignItems="center"
        >
            <Text>{label}</Text>
            {Icon && <Icon size={24} color={theme.strongGrey?.val} />}
        </XStack>
    </Pressable>
}
