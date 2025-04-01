import { Button as TButton, Sheet, Text, useTheme, View, YStack, XStack, ScrollView } from "tamagui";
import { Truck, User, Settings, File } from "lucide-react-native"
import React, { useState } from 'react'
import { FlatList, RefreshControl } from "react-native";
import { LoadTile } from "@/src/shared/ui/load-tile";
import { Button } from "@/src/shared/ui/button";
import { useLoads } from "@/src/features/new-load/use-loads";
import { ClientsSheet } from "@/src/features/admin/clients-sheet";
import { MaterialsSheet } from "@/src/features/admin/materials-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/src/shared/ui/input";
import { documentDirectory, EncodingType, writeAsStringAsync } from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing"
import { formatSignatureUrl } from "@/src/shared/utils/format-signature";
import { ClientsFilterSheet } from "@/src/features/admin/clients-filter";
import { Filter, useFilterContext } from "@/src/shared/ui/filter-sheet";
import { PlatesFilterSheet } from "@/src/features/admin/plates-filter";
import { ItemType } from "@/src/types/item";
import { DateFilter } from "@/src/features/admin/date-filter";
import { LoadType } from "@/src/types/load";
import { PaymentMethodsFilterSheet } from "@/src/features/admin/payment-method-filter";

const ADMIN_PASS = "admin"

export default function Admin() {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenClients, setIsOpenClients] = useState(false)
    const [isOpenMaterials, setIsOpenMaterials] = useState(false)
    const [auth, setAuth] = useState(false);
    const [adminPass, setAdminPass] = useState("");

    const [clientsFilter, setClientFilter] = useState<Array<ItemType<number>>>([]);
    const [plateFilter, setPlateFilter] = useState<Array<string>>([]);
    const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
    const [paymentMethodsFilter, setPaymentMethodsFilter] = useState<Array<ItemType<LoadType["paymentMethod"]>>>([]);

    const theme = useTheme()
    const setSheetId = useFilterContext(state => state.setSheetId)

    const { query: { data: allLoads = [], isLoading } } = useLoads()

    const removeTime = (date: Date | null) => date?.toISOString().split("T")[0] ?? ""

    const loads = allLoads.filter(load => {
        const byClient = clientsFilter.length ? clientsFilter.some(c => c.label === load.client) : true
        const byPlate = plateFilter.length ? plateFilter.some(c => c === load.plate) : true
        const { start: startDate, end: endDate } = dateRange

        const start = removeTime(startDate)
        const end = removeTime(endDate)
        const loadDate = removeTime(load.insertedAt)
        const byDate = start && end ? loadDate >= start && loadDate <= end : true
        const byPaymentMethod = paymentMethodsFilter.length ? paymentMethodsFilter.some(p => p.value === load.paymentMethod) : true

        return byClient && byPlate && byDate && byPaymentMethod
    })

    const queryClient = useQueryClient()

    const toggleOnClientFilter = (client: ItemType<number>) => {
        setSheetId(null)
        if (clientsFilter.some(c => c.value === client.value)) {
            setClientFilter(clientsFilter.filter(c => c.value !== client.value))
        } else {
            setClientFilter([...clientsFilter, client])
        }
    }

    const toggleOnPlateToFilter = (plate: string) => {
        setSheetId(null)
        if (plateFilter.includes(plate)) {
            setPlateFilter(plateFilter.filter(p => p !== plate))
        } else {
            setPlateFilter([...plateFilter, plate])
        }
    }

    const onRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ['loads'] })
    }

    const authorize = () => {
        setAuth(adminPass === ADMIN_PASS)
    }

    const exportToCsv = async () => {
        try {
            const keys = Object.keys(loads[0]);
            const mappedHeader: Record<keyof typeof loads[0], string> = {
                id: "ID",
                client: "Cliente",
                quantity: "Quantidade",
                plate: "Placa",
                material: "Material",
                signaturePath: "Assinatura",
                insertedAt: "Data/Hora",
                paymentMethod: "Pagamento"
            }
            const header = keys.map(key => mappedHeader[key as keyof typeof mappedHeader])
            const content = loads.map(load => {
                const values = keys.map((key) => {
                    switch (key) {
                        case "insertedAt":
                            return formatBRTDate(load[key])
                        case "signaturePath":
                            return formatSignatureUrl(load[key])
                        case "paymentMethod":
                            return load[key] === "cash" ? "A vista" : "A prazo"
                        case "quantity":
                            return `${load[key]}m`
                        default:
                            return `"${load[key as keyof typeof load]}"`
                    }
                });
                return values.join(",");
            });

            const csvString = [header, ...content].join("\n");
            const fileUri = documentDirectory + "Carregamentos.csv";

            await writeAsStringAsync(fileUri, csvString, {
                encoding: EncodingType.UTF8,
            });

            if (await isAvailableAsync()) {
                await shareAsync(fileUri);
            } else {
                console.log("Sharing is not available on this device");
            }
        } catch (error) {
            console.error("Error exporting CSV:", error);
        }
    }

    const formatBRTDate = (date: Date): string => {
        const brtDate = new Date(date).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        return brtDate.replace(",", " ");
    }

    const filterByDate = (start: Date | null, end: Date | null) => {
        setDateRange({ start, end })
        setSheetId(null)
    }

    const selectPaymentFilter = (item: ItemType<LoadType["paymentMethod"]>) => {
        setSheetId(null)
        if (paymentMethodsFilter.some(p => p.value === item.value)) {
            setPaymentMethodsFilter(paymentMethodsFilter.filter(p => p.value !== item.value))
        } else {
            setPaymentMethodsFilter([...paymentMethodsFilter, item])
        }
    }

    if (!auth) {
        return <YStack padding={20} justifyContent="center" flex={1} gap={20} >
            <Text fontSize={24}>Para acessar a area de admin você precisa da senha do admin</Text>
            <Input
                onChangeText={setAdminPass}
                value={adminPass}
                secureTextEntry
            />
            <Button label="Entrar" color={theme.main?.val} onPress={authorize} />
        </YStack>
    }

    const filterLabel = (() => {
        const { start, end } = dateRange
        const hasFilterApplied = !clientsFilter.length && !plateFilter.length && !start && !end && !paymentMethodsFilter.length
        if (hasFilterApplied) return ""

        const labels = []
        if (clientsFilter.length) {
            const clientsLabel = clientsFilter.map(c => c.label).join(", ")
            labels.push(clientsLabel)
        }

        if (plateFilter.length) {
            const platesLabel = plateFilter.join(", ")
            labels.push(platesLabel)
        }

        if (paymentMethodsFilter.length) {
            const paymentMethodsLabel = paymentMethodsFilter.map(p => p.label).join(", ")
            labels.push(paymentMethodsLabel)
        }

        if (start && end) {
            const formattedStart = start.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
            const formattedEnd = end.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
            start && end && labels.push(`${formattedStart}-${formattedEnd}`)
        }

        return `Filtros: ${labels.join(", ")}`
    })()


    return (
        <>
            <View backgroundColor={theme.background?.val} flex={1} position="relative">
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={loads}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <View paddingHorizontal={20}>
                        <LoadTile
                            client={item.client}
                            plate={item.plate}
                            quantity={item.quantity}
                            material={item.material}
                            signatureUrl={item.signaturePath}
                            date={item.insertedAt}
                            paymentMethod={item.paymentMethod}
                        />
                    </View>}
                    ItemSeparatorComponent={() => <View height={12} />}
                    keyExtractor={(_, i) => i.toString()}
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={() => (
                        <YStack>
                            <ScrollView
                                width="100%"
                                backgroundColor="white"
                                paddingTop={20}
                                paddingHorizontal={8}
                                paddingBottom={8}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: "center",
                                    gap: 20
                                }}
                            >
                                <Filter.Trigger id="clients" label="Clientes" />
                                <Filter.Trigger id="plates" label="Placas" />
                                <Filter.Trigger id="dates" label="Data" />
                                <Filter.Trigger id="payments" label="Método de Pagamento" />
                            </ScrollView>
                            {filterLabel &&
                                <XStack width="100%" backgroundColor="white" marginBottom={20} gap={20} paddingBottom={8}>
                                    <Text color="black">
                                        {filterLabel}
                                    </Text>
                                </XStack>
                            }
                        </YStack>
                    )}
                    ListEmptyComponent={() => (
                        <YStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            gap={12}
                        >
                            <Truck color={theme.main?.val} size={72} />
                        </YStack>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={["yellow"]} />
                    }
                />

                <TButton
                    backgroundColor={theme.main?.val}
                    height={48}
                    width={48}
                    position="absolute"
                    bottom={10}
                    right={10}
                    onPress={() => setIsOpen(true)}
                >
                    <Settings color={theme.strongGrey?.val} size={24} />
                </TButton>
            </View>

            <Sheet
                modal
                open={isOpen}
                onOpenChange={setIsOpen}
                snapPoints={[70]}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay backgroundColor="'rgba(0, 0, 0, 0.3)'" />
                <Sheet.Frame padding="20" >
                    <YStack gap="$5">
                        <Button
                            label="Clientes"
                            Icon={User}
                            color={theme.main?.val}
                            onPress={() => { setIsOpenClients(true) }}
                        />

                        <Button
                            label="Materiais"
                            Icon={Truck}
                            color={theme.main?.val}
                            onPress={() => { setIsOpenMaterials(true) }}
                        />

                        <Button
                            label="Exportar para csv"
                            Icon={File}
                            color={theme.main?.val}
                            onPress={exportToCsv}
                        />
                    </YStack>
                </Sheet.Frame>
            </Sheet>

            <ClientsSheet open={isOpenClients} onOpenChange={setIsOpenClients} />

            <MaterialsSheet open={isOpenMaterials} onOpenChange={setIsOpenMaterials} />

            <Filter.Sheet id="clients">
                <ClientsFilterSheet onSelect={toggleOnClientFilter} />
            </Filter.Sheet>

            <Filter.Sheet id="plates">
                <PlatesFilterSheet clients={clientsFilter} onSelect={toggleOnPlateToFilter} />
            </Filter.Sheet>

            <Filter.Sheet id="dates">
                <DateFilter onSelect={filterByDate} />
            </Filter.Sheet>

            <Filter.Sheet id="payments">
                <PaymentMethodsFilterSheet onSelect={selectPaymentFilter} />
            </Filter.Sheet>
        </>
    );
}

