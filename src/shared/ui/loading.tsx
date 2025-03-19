import React, { useEffect } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { Loader } from 'lucide-react-native'
import { useTheme, View } from 'tamagui'

export const Loading = () => {
    const theme = useTheme()
    const rotate = useSharedValue(0)

    useEffect(() => {
        rotate.value = withRepeat(
            withTiming(360, { duration: 2000, easing: Easing.linear }),
            -1,
            false
        )
    }, [])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }]
    }))

    return (
        <Animated.View style={animatedStyles}>
            <View alignItems="center" justifyContent="center">
                <Loader size={60} color={theme.main?.val} />
            </View>
        </Animated.View>
    )
}
