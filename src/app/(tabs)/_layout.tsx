import { useNetwork } from "@/src/shared/hooks/useNetwork";
import { Tabs } from "expo-router";
import { Truck, ClockArrowUp, FileSliders } from "lucide-react-native";
import { Text, useTheme } from "tamagui";


export default function TabsLayout() {

    const theme = useTheme()


    const isConnected = useNetwork()

    return <Tabs
        screenOptions={{
            tabBarStyle: {
                height: 80,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "#fff",
            },
            headerRight: () => !isConnected && <Text color={"red"}>desconectado</Text>
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
