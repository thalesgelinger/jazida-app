import { Button } from "@/src/shared/ui/button";
import { ChevronDown, ChevronUp, Trash } from "lucide-react-native";
import { useState } from "react";
import { FlatList } from "react-native";
import { Text, useTheme, View } from "tamagui";

export const ClientDropdown = (props: {}) => {
    const theme = useTheme()
    const [showPlates, setShowPlates] = useState(false);

    return (
        <View
            backgroundColor={theme.grey?.val}
            borderRadius={12}
        >
            <Button
                label={"Hey"}
                Icon={() => {
                    return showPlates
                        ? <ChevronUp color={theme.strongGrey?.val} />
                        : <ChevronDown color={theme.strongGrey?.val} />
                }}
                color={theme.main?.val}
                onPress={() => { setShowPlates(!showPlates) }}
            />
            {showPlates && <FlatList
                data={[1, 2, 3]}
                style={{ padding: 20 }}
                renderItem={({ item }) => (
                    <Button label={item.toString()} color={theme.main?.val} Icon={Trash} />
                )}
                keyExtractor={item => item.toString()}
                ItemSeparatorComponent={() => <View height={8} />}
            />}
        </View>
    )
}
