import { QueryClientProvider, useQueryClient } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react-native"
import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import { Sheet, Text, useTheme, XStack } from "tamagui"
import { create } from "zustand"

type Id = null
    | "clients"
    | "plates"
    | "dates"
    | "payments"

type FilterContext = {
    sheetId: Id,
    setSheetId: (value: Id) => void
}

export const useFilterContext = create<FilterContext>((set) => ({
    sheetId: null,
    setSheetId: (sheetId: Id) => set({ sheetId })
}))

type FilterProps = {
    label: string
    id: Id
}

const FilterTrigger = ({ label, id }: FilterProps) => {
    const theme = useTheme()
    const { setSheetId } = useFilterContext()

    return (
        <TouchableOpacity onPress={() => setSheetId(id)}>
            <XStack
                alignItems="center"
                backgroundColor={theme.grey?.val}
                paddingHorizontal={8}
                paddingVertical={8}
                borderRadius={12}
            >
                <Text>{label}</Text>
                <ChevronDown color="black" size={16} />
            </XStack>
        </TouchableOpacity>
    )
}

type SheetProps = {
    id: Id
    children: ReactNode
}


const FilterSheet = ({ id, children }: SheetProps) => {
    const { sheetId, setSheetId } = useFilterContext()

    const queryClient = useQueryClient()

    return <Sheet
        modal
        open={sheetId === id}
        onOpenChange={(change: boolean) => {
            if (change) {
                setSheetId(sheetId)
            } else {
                setSheetId(null)
            }

        }}
        snapPoints={[70]}
        dismissOnSnapToBottom
    >
        <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.6)'" />
        <Sheet.Frame padding="20" >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Sheet.Frame>
    </Sheet>
}


export const Filter = {
    Trigger: FilterTrigger,
    Sheet: FilterSheet
}
