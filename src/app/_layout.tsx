import { Slot } from "expo-router";
import { TamaguiProvider, Theme } from '@tamagui/core'

import { config } from '../../tamagui.config'
import { PortalProvider } from "tamagui";

export default function RootLayout() {
    return <TamaguiProvider config={config}>
        <Theme name="light">
            <PortalProvider>
                <Slot />
            </PortalProvider>
        </Theme>
    </TamaguiProvider>
}
