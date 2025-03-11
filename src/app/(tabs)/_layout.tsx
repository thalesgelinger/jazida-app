import { Tabs } from "expo-router";
import { Truck, ClockArrowUp, FileSliders } from "lucide-react-native";
import { useTheme } from "tamagui";


export default function TabsLayout() {

    const theme = useTheme()


    return <Tabs
        screenOptions={{
            tabBarStyle: {
                height: 80,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "#fff",
            },
        }}
    >
        <Tabs.Screen name="index" options={{
            tabBarIcon: ({ focused }) => <Truck size={36} color={focused ? theme.main?.val : theme.grey?.val} />,
            headerShown: false,
            tabBarShowLabel: false
        }} />

        <Tabs.Screen name="pending" options={{
            tabBarIcon: ({ focused }) => <ClockArrowUp size={36} color={focused ? theme.main?.val : theme.grey?.val} />,
            headerShown: false,
            tabBarShowLabel: false
        }} />

        <Tabs.Screen name="admin" options={{
            tabBarIcon: ({ focused }) => <FileSliders size={36} color={focused ? theme.main?.val : theme.grey?.val} />,
            headerShown: false,
            tabBarShowLabel: false
        }} />
    </Tabs>
}
