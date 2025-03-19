import { Text, Button, XStack, YStack } from 'tamagui'
import { AlertCircle } from 'lucide-react-native'

type ErrorMessageProps = {
    message?: string
    onRetry?: () => void
}

export default function ErrorMessage({ message = "Something went wrong.", onRetry }: ErrorMessageProps) {
    return (
        <YStack
            alignItems="center"
            justifyContent="center"
            padding="$4"
            backgroundColor="$red4"
            borderRadius="$4"
            shadowColor="$red10"
            shadowRadius={5}
            margin="$4"
        >
            <XStack alignItems="center" gap="$3">
                <AlertCircle size={24} color="red" />
                <Text fontSize="$6" color="red" fontWeight="bold">
                    Error
                </Text>
            </XStack>

            <Text fontSize="$4" color="$red11" textAlign="center" marginTop="$2">
                {message}
            </Text>

            {onRetry && (
                <Button
                    size="$3"
                    backgroundColor="$red9"
                    color="white"
                    marginTop="$3"
                    borderRadius="$2"
                    onPress={onRetry}
                >
                    Retry
                </Button>
            )}
        </YStack>
    )
}
