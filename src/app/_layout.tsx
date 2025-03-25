import { Slot } from "expo-router";
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
                    <Slot />
                </QueryClientProvider>
            </PortalProvider>
        </Theme>
    </TamaguiProvider>
}
