import { Pressable, TouchableOpacity } from "react-native"
import { Text, useTheme, XStack } from "tamagui"



type SelectProps = {
    label: string
    Icon?: JSX.ElementType
    color?: string
    onPress?: () => void
    variant?: "small" | "large"
}

export const Button = ({ label, Icon, color, onPress, variant = "large" }: SelectProps) => {

    const theme = useTheme()

    return <TouchableOpacity onPress={onPress}>
        <XStack
            backgroundColor={color ?? theme.grey?.val}
            borderRadius={12}
            paddingHorizontal={16}
            paddingVertical={variant == "large" ? 20 : 10}
            justifyContent={Icon ? "space-between" : "center"}
            alignItems="center"
        >
            <Text>{label}</Text>
            {Icon && <Icon size={24} color={theme.strongGrey?.val} />}
        </XStack>
    </TouchableOpacity>
}
