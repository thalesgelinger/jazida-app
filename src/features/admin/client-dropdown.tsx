import { Button } from "@/src/shared/ui/button";
import { ItemType } from "@/src/types/item";
import { ChevronDown, ChevronUp, Trash } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Text, useTheme, View, XStack } from "tamagui";
import { usePlates } from "../new-load/use-plates";

type ClientDropdownProps = {
    client: ItemType<number>
}

export const ClientDropdown = ({ client }: ClientDropdownProps) => {
    const theme = useTheme()
    const [showPlates, setShowPlates] = useState(false);
    const { data: plates } = usePlates()

    return (
        <View
            backgroundColor={theme.grey?.val}
            borderRadius={12}
        >
            <Button
                label={client.label}
                Icon={() => {
                    return showPlates
                        ? <ChevronUp color={theme.strongGrey?.val} />
                        : <ChevronDown color={theme.strongGrey?.val} />
                }}
                color={theme.main?.val}
                onPress={() => { setShowPlates(!showPlates) }}
            />
            {showPlates && <FlatList
                data={plates?.filter(plate => plate.value.clientId === client.value)}
                style={{ padding: 20 }}
                renderItem={({ item }) => (
                    <Button label={item.label.toString()} color={theme.main?.val} Icon={Trash} />
                )}
                keyExtractor={item => item.value.id.toString()}
                ItemSeparatorComponent={() => <View height={8} />}
                ListFooterComponent={() => (
                    <XStack justifyContent="space-around" alignItems="center" paddingTop={10}>
                        <Button
                            label={"Adicionar Placa"}
                            color={theme.main?.val} Icon={Trash}
                            variant="small"
                        />
                        <Pressable onPress={() => { }}>
                            <Text textAlign="center" padding={20} fontWeight="bold" color="red">LIMPAR</Text>
                        </Pressable>
                    </XStack>
                )}
            />}
        </View>
    )
}
