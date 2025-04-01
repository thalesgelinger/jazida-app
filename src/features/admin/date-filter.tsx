import { useTheme, YStack } from "tamagui"
import { Calendar, DateData } from "react-native-calendars"
import { useState } from "react"
import { Button } from "@/src/shared/ui/button"
import { useFilterContext } from "@/src/shared/ui/filter-sheet"

type DateFilterProps = {
    onSelect: (start: Date | null, end: Date | null) => void
}

export const DateFilter = ({ onSelect }: DateFilterProps) => {

    const theme = useTheme()

    const [start, setStart] = useState<string | null>(null);
    const [end, setEnd] = useState<string | null>(null);

    const { setSheetId } = useFilterContext()

    const onDayPress = (day: DateData) => {
        const { dateString } = day;

        if (!start || (start && end)) {
            setStart(dateString);
            setEnd(null);
        }
        else if (start && !end) {
            const startDate = new Date(start);
            const selectedDate = new Date(dateString);

            if (selectedDate < startDate) {
                setStart(dateString);
            } else {
                setEnd(dateString);
            }
        }
    }

    const getMarkedDates = () => {
        let markedDates: Record<string, any> = {};

        if (start) {
            markedDates[start] = { startingDay: true, color: theme.main?.val, textColor: "white" };
        }

        if (end) {
            markedDates[end] = { endingDay: true, color: theme.main?.val, textColor: "white" };

            let currentDate = new Date(start!);
            let endDate = new Date(end!);

            while (currentDate < endDate) {
                currentDate.setDate(currentDate.getDate() + 1);
                const dateString = currentDate.toISOString().split("T")[0];

                if (dateString !== end) {
                    markedDates[dateString] = { color: theme.main?.val, textColor: "black" };
                }
            }
        }

        return markedDates;
    }

    const select = () => {
        if (!start) return
        if (!end) return
        onSelect(new Date(start), new Date(end))
        setSheetId(null)
    }

    return (
        <YStack gap="$5">
            <Calendar
                markingType="period"
                markedDates={getMarkedDates()}
                onDayPress={onDayPress}
            />
            <Button label="Filtrar" color={theme.main?.val} onPress={select} />
            <Button label="Limpar" onPress={() => {
                setStart(null)
                setEnd(null)
                onSelect(null, null)
                setSheetId(null)
            }} />
        </YStack>
    )
}
