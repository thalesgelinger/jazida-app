import { Button } from "@/src/shared/ui/button";
import { assert } from "@/src/shared/utils/assert";
import { Canvas, ImageFormat, Path, Skia, useCanvasRef } from "@shopify/react-native-skia"
import { useState } from "react"
import { GestureResponderEvent, StyleSheet } from "react-native"
import { useTheme, View, YStack } from "tamagui";
import { documentDirectory, writeAsStringAsync, EncodingType } from "expo-file-system"
import { encode } from "base64-arraybuffer"

type SignatureProps = {
    onSigned: (signaturePath: string) => void
}

export const Signature = ({ onSigned }: SignatureProps) => {
    const theme = useTheme()
    const [path, setPath] = useState(() => Skia.Path.Make());
    const canvas = useCanvasRef()

    const onSignatureStart = (e: GestureResponderEvent) => {
        const { locationX, locationY } = e.nativeEvent;
        setPath((prevPath) => {
            const newPath = Skia.Path.Make();
            newPath.addPath(prevPath);
            newPath.moveTo(locationX, locationY);
            return newPath;
        });
    };

    const onSignatureMove = (e: GestureResponderEvent) => {
        const { locationX, locationY } = e.nativeEvent;
        setPath((prevPath) => {
            const newPath = Skia.Path.Make();
            newPath.addPath(prevPath);
            newPath.lineTo(locationX, locationY);
            return newPath;
        });
    };

    const save = async () => {

        const points = Array.from({ length: path.countPoints() }).map((_, i) => path.getPoint(i))
        const pointsHorizontal = points.map(p => p.x)
        const pointsVertical = points.map(p => p.y)
        const x = Math.min(...pointsHorizontal)
        const y = Math.min(...pointsVertical)
        const width = Math.max(...pointsHorizontal) - x
        const height = Math.max(...pointsVertical) - y

        const image = canvas.current?.makeImageSnapshot({ x, y, width, height });
        assert(!!image, "Not able to make image snapshot")

        const pngData = image!.encodeToBytes();

        const signaturePath = `${documentDirectory}signature_${Date.now()}.png`;

        try {
            await writeAsStringAsync(signaturePath, encode(pngData.slice().buffer), {
                encoding: EncodingType.Base64
            });

            onSigned(signaturePath)
        } catch (error) {
            console.error("Failed to save signature:", error)
        }

    }

    return (
        <>
            <Canvas
                ref={canvas}
                style={styles.canvas}
                onTouchStart={onSignatureStart}
                onTouchMove={onSignatureMove}
            >
                <Path path={path} strokeWidth={1} style="stroke" />
            </Canvas>

            <YStack gap="$5" flex={1} justifyContent="center">
                <View height={2} width={"100%"} backgroundColor={"black"} />
                <Button label="Assinar" color={theme.main?.val} onPress={save} />
            </YStack>
        </>
    )
}

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
});

