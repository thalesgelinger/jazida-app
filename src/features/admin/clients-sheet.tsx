import { InputAdd } from "@/src/shared/ui/input-add"
import { Sheet, useTheme, View, YStack } from "tamagui"
import { ClientDropdown } from "./client-dropdown"
import { FlatList } from "react-native"
import { useClients } from "../new-load/use-clients"
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query"

type ClientsSheetProps = {
    open: boolean
    onOpenChange: (value: boolean) => void
}

export const ClientsSheet = ({ open, onOpenChange }: ClientsSheetProps) => {
    const theme = useTheme()

    const { query: { data: clients }, createClient } = useClients()
    const queryClient = useQueryClient()

    return (
        <Sheet
            modal
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={[70]}
            dismissOnSnapToBottom
            moveOnKeyboardChange
        >
            <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
            <Sheet.Frame padding="20" >
                <QueryClientProvider client={queryClient}>
                    <YStack gap="$5" flex={1}>
                        <FlatList
                            data={clients}
                            ListHeaderComponent={
                                <>
                                    <InputAdd onAdd={createClient} />
                                    <View
                                        marginVertical={12}
                                        backgroundColor={theme.grey?.val}
                                        height={2}
                                        width={"100%"}
                                    />
                                </>
                            }
                            renderItem={({ item: client }) => (
                                <ClientDropdown client={client} />
                            )}
                            ItemSeparatorComponent={() => <View height={8} />}
                            keyExtractor={item => item.value.toString()}
                        />
                    </YStack>
                </QueryClientProvider>
            </Sheet.Frame>
        </Sheet>
    )
}
