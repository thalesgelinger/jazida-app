import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { useEffect, useState } from "react"
import { GestureResponderEvent, StyleSheet } from "react-native"

export const Signature = () => {
    const [path, setPath] = useState(() => Skia.Path.Make());

    useEffect(() => {
        setPath(() => Skia.Path.Make())
    }, [])

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

    return (
        <Canvas
            style={styles.canvas}
            onTouchStart={onSignatureStart}
            onTouchMove={onSignatureMove}
        >
            <Path path={path} strokeWidth={1} style="stroke" />
        </Canvas>
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

