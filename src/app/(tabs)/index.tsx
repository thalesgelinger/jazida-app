import { ScrollView, Sheet, Text, useTheme, View, YStack } from "tamagui";
import { Select } from "../../features/new-load"
import { Car, Check, CheckCheck, Loader, SquareX, Truck, User } from "lucide-react-native";
import { useState } from "react";
import { ItemType } from "@/src/types/item";
import { Button } from "@/src/shared/ui/button";
import { Signature } from "@/src/features/new-load/signature";
import { Image } from "expo-image"
import { Animated, Pressable } from "react-native";
import { Loading } from "@/src/shared/ui/loading";
import { Input } from "@/src/shared/ui/input";

type SendStatus = "SENDING" | "NOT_SENT" | "SENT" | ""

export default function Index() {

    const theme = useTheme()

    const [showSignature, setShowSignature] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<SendStatus>("");

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
    const [signaturePath, setSignaturePath] = useState("")

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

    const signed = (signaturePath: string) => {
        setSignaturePath(signaturePath)
        setShowSignature(false)
    }

    const sendLoad = async () => {
        setShowSendModal(true)
        setCurrentStatus("SENDING")

        await new Promise<void>((res) => {
            setTimeout(res, 1000)
        })

        setCurrentStatus("NOT_SENT")

        await new Promise<void>((res) => {
            setTimeout(res, 1000)
        })

        setShowSendModal(false)
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
                    <Input
                        onChange={() => { }}
                        height={20 * 2 + 16}
                        Icon={Truck}
                        keyboardType="number-pad"
                    />


                    <View height={20} />
                    {
                        signaturePath &&
                        <View alignItems="center" >
                            <View
                                backgroundColor={theme.grey?.val}
                                borderRadius={12}
                                height={200}
                                padding={20}
                                width="100%"
                            >
                                <Image
                                    source={signaturePath}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                    contentFit="contain"
                                />
                            </View>
                        </View>
                    }
                </YStack>
            </ScrollView>
            <YStack position="fixed" bottom={0} padding={20}>

                {signaturePath
                    ? <>
                        <Button
                            label="Enviar"
                            color={theme.main?.val}
                            onPress={sendLoad}
                        />
                        <Pressable onPress={() => setSignaturePath("")}>
                            <Text textAlign="center" padding={20} fontWeight="bold" color="red">LIMPAR</Text>
                        </Pressable>
                    </>
                    : <Button
                        label="Assinar"
                        color={theme.main?.val}
                        onPress={() => setShowSignature(true)}
                    />
                }
            </YStack>
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
                    <Signature
                        isOpen={showSignature}
                        onSigned={signed}
                        onClose={() => setShowSignature(false)}
                    />
                </Sheet.Frame>
            </Sheet>
            <Sheet
                modal
                open={showSendModal}
                onOpenChange={setShowSendModal}
                snapPoints={[95]}
                dismissOnSnapToBottom
                disableDrag
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
                <Sheet.Frame padding="20" position="relative" >
                    <Pressable onPress={() => setShowSendModal(false)} style={{ position: "absolute", top: 20, right: 20 }}>
                        <SquareX color={"red"} />
                    </Pressable>
                    {currentStatus === "SENDING" &&
                        <YStack flex={1} gap={12} alignItems="center" justifyContent="center">
                            <Text fontSize={24}>Enviando o carregamento</Text>
                            <Loading />
                        </YStack>
                    }
                    {currentStatus === "NOT_SENT" &&
                        <YStack flex={1} gap={12} alignItems="center" justifyContent="center">
                            <Text fontSize={24}>Sem internet, carregamento será enviado quando houver conecção</Text>
                            <Check size={60} color="black" />
                        </YStack>
                    }
                    {currentStatus === "SENT" &&
                        <YStack flex={1} gap={12} alignItems="center" justifyContent="center">
                            <Text fontSize={24}>Carregamento enviado com sucesso</Text>
                            <CheckCheck size={60} color="green" />
                        </YStack>
                    }
                </Sheet.Frame>
            </Sheet>
        </>

    );
}
