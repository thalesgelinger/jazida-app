import { Button } from "@/src/shared/ui/button";
import { ItemType } from "@/src/types/item";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react-native";
import { useState } from "react";
import { Alert, FlatList, Pressable } from "react-native";
import { Text, useTheme, View, XStack } from "tamagui";
import { usePlates } from "../new-load/use-plates";
import { InputAdd } from "@/src/shared/ui/input-add";
import { useClients } from "../new-load/use-clients";
import { MotiView } from "moti"
import Animated from "react-native-reanimated";

type ClientDropdownProps = {
    client: ItemType<number>
}

export const ClientDropdown = ({ client }: ClientDropdownProps) => {
    const theme = useTheme()
    const [showPlates, setShowPlates] = useState(false);
    const [showAddPlate, setShowAddPlate] = useState(false);

    const { query: { data: plates }, createPlate, deletePlate } = usePlates()

    const { deleteClient } = useClients()

    const filteredPlates = plates?.filter(plate => plate.value.clientId === client.value)

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
                data={filteredPlates}
                style={{ padding: 20 }}
                renderItem={({ item }) => (
                    <Button
                        label={item.label.toString()}
                        color={theme.main?.val}
                        Icon={Trash}
                        onPress={() => {
                            Alert.alert(
                                "Confirmar",
                                `Tem certeza que quer deletar a placa ${item.label}?`,
                                [
                                    { text: "Cancelar", style: "cancel" },
                                    {
                                        text: "Deletar", onPress: async () => {
                                            await deletePlate(item.value.id)
                                        }
                                    },
                                ]
                            );
                        }}
                    />
                )}
                keyExtractor={item => item.value.id.toString()}
                ItemSeparatorComponent={() => <View height={8} />}
                ListFooterComponent={() => (
                    <>
                        {showAddPlate &&
                            <View borderColor="white" borderWidth={2} borderRadius={12} marginVertical={8}>
                                <InputAdd onAdd={async (plate) => {
                                    await createPlate({
                                        clientId: client.value,
                                        plate
                                    })
                                    setShowAddPlate(false)
                                }} />
                            </View>
                        }
                        <XStack justifyContent="space-around" alignItems="center" paddingTop={10}>
                            <Button
                                label={"Adicionar Placa"}
                                color={theme.main?.val}
                                Icon={Plus}
                                variant="small"
                                onPress={() => setShowAddPlate(true)}
                            />
                            <Pressable onPress={() => {
                                if (!filteredPlates?.length) {
                                    Alert.alert(
                                        "Confirmar",
                                        `Tem certeza que quer dele deletar o ${client.label}?`,
                                        [
                                            { text: "Cancelar", style: "cancel" },
                                            {
                                                text: "Deletar", onPress: async () => {
                                                    deleteClient(client.value)
                                                }
                                            },
                                        ]
                                    );
                                    return
                                }

                                Alert.alert(
                                    "Erro",
                                    `${client.label} possui placas, para deletar é necessário deletar as placas deste cliente`,
                                    [
                                        {
                                            text: "OK", onPress: () => { }
                                        },
                                    ]
                                );
                            }}>
                                <Text textAlign="center" padding={20} fontWeight="bold" color="red">DELETAR CLIENTE</Text>
                            </Pressable>
                        </XStack>
                    </>
                )}
            />
            }
        </View>
    )
}

