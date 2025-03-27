import { useNetwork } from "@/src/shared/hooks/useNetwork";
import { Tabs } from "expo-router";
import { Truck, ClockArrowUp, FileSliders, WifiOff } from "lucide-react-native";
import { useTheme, View } from "tamagui";
import { migrations } from "../../shared/services/db/migrations"
import { db } from "../../shared/services/db";
import { useEffect } from "react";
import { Alert } from "react-native";


export default function TabsLayout() {

    const theme = useTheme()

    const isConnected = useNetwork()

    useEffect(() => {
        try {
            for (let migration of migrations) {
                db.run(migration)
            }
        } catch (error) {
            Alert.alert(
                "Confirmar",
                "Error setting up local DB",
                [{ text: "Ok", style: "default" }]
            )
            console.log({ error })
        }
    }, []);


    return <Tabs
        screenOptions={{
            tabBarStyle: {
                height: 80,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "#fff",
            },
            headerRight: () => !isConnected && <View marginRight={20}>
                <WifiOff color={"red"} />
            </View>
        }}
    >
        <Tabs.Screen name="index" options={{
            tabBarIcon: ({ focused }) => <Truck size={36} color={focused ? theme.main?.val : theme.grey?.val} />,
            tabBarShowLabel: false,
            headerTitle: "Adicionar Carregamento",
        }} />

        <Tabs.Screen name="pending" options={{
            tabBarIcon: ({ focused }) => <ClockArrowUp size={36} color={focused ? theme.main?.val : theme.grey?.val} />,
            tabBarShowLabel: false,
            headerTitle: "Carregamentos não enviados"
        }} />

        <Tabs.Screen name="admin" options={{
            tabBarIcon: ({ focused }) => <FileSliders size={36} color={focused ? theme.main?.val : theme.grey?.val} />,
            tabBarShowLabel: false,
            headerTitle: "Carregamentos"
        }} />
    </Tabs>
}
