import { LucideIcon } from "lucide-react-native"
import { useTheme, XStack, Input as TInput } from "tamagui"

type InputProps = {
    onChange: (value: string) => void
    Icon?: LucideIcon,
} & Parameters<typeof TInput>[0]

export const Input = ({ onChange, Icon, ...rest }: InputProps) => {
    const theme = useTheme()

    return <XStack
        backgroundColor={theme.grey?.val}
        borderRadius={12}
        paddingRight={16}
        alignItems="center"
    >
        <TInput
            flex={1}
            backgroundColor={theme.grey?.val}
            borderWidth={0}
            onChangeText={onChange}
            {...rest}
        />
        {Icon && <Icon size={24} color={theme.strongGrey?.val} />}
    </XStack>
}
