import { InputAdd } from "@/src/shared/ui/input-add"
import { Sheet, useTheme, View, YStack } from "tamagui"
import { ClientDropdown } from "./client-dropdown"
import { FlatList } from "react-native"

type ClientsSheetProps = {
    open: boolean
    onOpenChange: (value: boolean) => void
}

export const ClientsSheet = ({ open, onOpenChange }: ClientsSheetProps) => {
    const theme = useTheme()
    return (
        <Sheet
            modal
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={[70]}
            dismissOnSnapToBottom
        >
            <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
            <Sheet.Frame padding="20" >
                <YStack gap="$5" flex={1}>
                    <FlatList
                        data={[1, 2, 3, 4]}
                        ListHeaderComponent={
                            <>
                                <InputAdd onAdd={() => { }} />
                                <View
                                    marginVertical={12}
                                    backgroundColor={theme.grey?.val}
                                    height={2}
                                    width={"100%"}
                                />
                            </>
                        }
                        renderItem={({ item }) => (
                            <ClientDropdown />
                        )}
                        ItemSeparatorComponent={() => <View height={8} />}
                        keyExtractor={item => item.toString()}
                    />
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}
