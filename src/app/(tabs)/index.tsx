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
import { ClientSelector } from "@/src/features/new-load/client-selector";
import { PlateSelector } from "@/src/features/new-load/plate-selector";
import { MaterialSelector } from "@/src/features/new-load/material-selector";
import { useLoads } from "@/src/features/new-load/use-loads";
import { LoadType } from "@/src/types/load";
import { PaymentMethodSelector } from "@/src/features/new-load/payment-method-selector";
import { useNetwork } from "@/src/shared/hooks/useNetwork";

type SendStatus = "SENDING" | "PENDING" | "SENT" | ""

export default function Index() {

    const theme = useTheme()

    const [showSignature, setShowSignature] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<SendStatus>("");

    const [client, setClient] = useState<ItemType<number> | null>(null)
    const [plate, setPlate] = useState<ItemType<{ id: number, clientId: number }> | null>(null)
    const [material, setMaterial] = useState<ItemType<number> | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<ItemType<LoadType["paymentMethod"]> | null>(null)
    const [quantity, setQuantity] = useState("");
    const [signaturePath, setSignaturePath] = useState("")

    const { saveLoad, saveLoadOffline } = useLoads()

    const isConnected = useNetwork()

    const signed = (signaturePath: string) => {
        setSignaturePath(signaturePath)
        setShowSignature(false)
    }

    const submitLoad = async () => {
        setShowSendModal(true)
        setCurrentStatus("SENDING")
        if (!client) return;
        if (!plate) return;
        if (!material) return;
        if (!paymentMethod) return;

        const payload = {
            clientId: client.value,
            plateId: plate.value.id,
            materialId: material.value,
            quantity: parseFloat(quantity),
            signaturePath,
            insertedAt: new Date(),
            paymentMethod: paymentMethod.value,
        }

        if (isConnected) {
            await saveLoad(payload)
            setCurrentStatus("SENT")
        } else {
            await saveLoadOffline(payload)
            setCurrentStatus("PENDING")
        }

        clean()

        await new Promise<void>((res) => {
            setTimeout(res, 3000)
        })

        setShowSendModal(false)
    }

    const clean = () => {
        setClient(null)
        setPlate(null)
        setMaterial(null)
        setPaymentMethod(null)
        setQuantity("")
        setSignaturePath("")
    }

    return (
        <>
            <ScrollView paddingVertical={16} paddingHorizontal={20}>
                <YStack gap={8}>
                    <ClientSelector client={client} onSelectClient={setClient} />

                    <PlateSelector client={client} plate={plate} onSelectPlate={setPlate} />

                    <MaterialSelector material={material} onSelectMaterial={setMaterial} />

                    <PaymentMethodSelector paymentMethod={paymentMethod} onSelectPaymentMethod={setPaymentMethod} />

                    <Input
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="Digite a quantidade em metros"
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
                            onPress={submitLoad}
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
                    {currentStatus === "PENDING" &&
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
