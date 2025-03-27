import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Slot, Stack } from "expo-router";
import { TamaguiProvider, Theme } from '@tamagui/core'

import { config } from '../../tamagui.config'
import { PortalProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {

    return <TamaguiProvider config={config}>
        <Theme name="light">
            <PortalProvider>
                <QueryClientProvider client={queryClient}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="image/[imageUri]" />
                    </Stack>
                </QueryClientProvider>
            </PortalProvider>
        </Theme>
    </TamaguiProvider>
}
