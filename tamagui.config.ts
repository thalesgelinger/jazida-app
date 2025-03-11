import { createTamagui } from '@tamagui/core'
import { defaultConfig } from "@tamagui/config/v4"

export const config = createTamagui({
    ...defaultConfig,
    themes: {
        ...defaultConfig.themes,
        light: {
            ...defaultConfig.themes.light,
            main: "#F4C03E",
            grey: "#B9C6DF"
        }
    }
})
