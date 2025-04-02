import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from "expo-constants";

export const Notifications = {
    setup() {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(Constants.expoConfig!.extra!.oneSignalAppId);
    },
    async requestPermission(value: boolean) {
        const hasPermission = await OneSignal.Notifications.requestPermission(value);
        console.log({ hasPermission })
    },
}


