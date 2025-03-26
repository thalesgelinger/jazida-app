import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Link, Slot, usePathname } from "expo-router";
import { TamaguiProvider, Theme } from '@tamagui/core'

import { config } from '../../tamagui.config'
import { Button, PortalProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
    const pathname = usePathname();

    return <TamaguiProvider config={config}>
        <Theme name="light">
            <PortalProvider>
                <QueryClientProvider client={queryClient}>
                    <Slot />
                    <Link href={pathname === "/debug" ? ".." : "/debug"} asChild>
                        <Button
                            position="absolute"
                            top={60}
                            right={20}
                            backgroundColor="blue"
                            color="white"
                            height={30}
                            width={60}
                            padding={2}
                            fontSize={12}
                        >Debug</Button>
                    </Link>
                </QueryClientProvider>
            </PortalProvider>
        </Theme>
    </TamaguiProvider>
}
