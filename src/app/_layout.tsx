import { Slot } from "expo-router";
import { TamaguiProvider, Theme } from '@tamagui/core'

import { config } from '../../tamagui.config'

export default function RootLayout() {
    return <TamaguiProvider config={config}>
        <Theme name="light">
            <Slot />
        </Theme>
    </TamaguiProvider>
}
