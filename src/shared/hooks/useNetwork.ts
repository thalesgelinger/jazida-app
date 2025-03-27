import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo"

export const useNetwork = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(!!state?.isConnected && !!state?.isInternetReachable)
        })
        return () => {
            unsubscribe()
        };
    }, []);

    return false
    return isConnected
}
