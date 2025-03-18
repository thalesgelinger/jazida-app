import { ScrollView, Sheet, Text, useTheme, View, YStack } from "tamagui";
import { Select } from "../../features/new-load"
import { Car, Truck, User } from "lucide-react-native";
import { useState } from "react";
import { ItemType } from "@/src/types/item";
import { Button } from "@/src/shared/ui/button";
import { Signature } from "@/src/features/new-load/signature";

export default function Index() {

    const theme = useTheme()

    const [showSignature, setShowSignature] = useState(false);

    const clients: Array<ItemType<number>> = [
        { value: 1, label: "Fulano 1" },
        { value: 2, label: "Fulano 2" },
        { value: 3, label: "Fulano 3" },
    ]

    const plates: Array<ItemType<number>> = [
        { value: 1, label: "Placa 1" },
        { value: 2, label: "Placa 2" },
        { value: 3, label: "Placa 3" },
    ]

    const materials: Array<ItemType<number>> = [
        { value: 1, label: "Material 1" },
        { value: 2, label: "Material 2" },
        { value: 3, label: "Material 3" },
    ]

    const [client, setClient] = useState<ItemType<number>>()
    const [plate, setPlate] = useState<ItemType<number>>()
    const [material, setMaterial] = useState<ItemType<number>>()

    const selectClient = (val: number) => {
        const client = clients.find(c => c.value === val)
        setClient(client);
    }

    const selectPlate = (val: number) => {
        const plate = plates.find(c => c.value === val)
        setPlate(plate);
    }

    const selectMaterial = (val: number) => {
        const material = materials.find(c => c.value === val)
        setMaterial(material);
    }

    return (
        <>
            <ScrollView paddingVertical={16} paddingHorizontal={20}>
                <YStack gap={8}>
                    <Select
                        label={client?.label ?? "Selecionar Client"}
                        Icon={User}
                        items={clients}
                        onSelect={selectClient}
                    />

                    <Select
                        label={plate?.label ?? "Selecionar Placa"}
                        Icon={Car}
                        items={plates}
                        onSelect={selectPlate}
                    />

                    <Select
                        label={material?.label ?? "Selecionar Material"}
                        Icon={Truck}
                        items={materials}
                        onSelect={selectMaterial}
                    />
                    <View height={20} />
                    <Button
                        label="Assinar"
                        color={theme.main?.val}
                        onPress={() => setShowSignature(true)}
                    />
                </YStack>
            </ScrollView>
            <Sheet
                modal
                open={showSignature}
                onOpenChange={setShowSignature}
                snapPoints={[95]}
                dismissOnSnapToBottom
                disableDrag
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
                <Sheet.Frame padding="20" position="relative" >
                    <Signature />
                    <YStack gap="$5" flex={1} justifyContent="center">
                        <View height={2} width={"100%"} backgroundColor={"black"} />
                        <Button label="Assinar" color={theme.main?.val} onPress={() => setShowSignature(false)} />
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>

    );
}
