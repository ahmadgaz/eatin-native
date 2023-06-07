import { useState, useEffect, useRef } from "react";
import { Image } from "react-native";

// Custom hook to load images and other assets
export default function useLoadAssets(
    assetList: { src: number; style: Object }[]
): [boolean, JSX.Element[]] {
    const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);
    const [loadCount, setLoadCount] = useState<number>(assetList.length);

    useEffect(() => {
        if (loadCount === assetList.length) {
            console.log(loadCount, "true");
            setAssetsLoaded(true);
        } else {
            console.log(loadCount, "false");
            setAssetsLoaded(false);
        }
    }, [loadCount, assetList.length]);

    return [
        assetsLoaded,
        assetList.map((asset, index) => (
            <Image
                key={index}
                source={asset.src}
                onLoadStart={() => {
                    setLoadCount((count) => count - 1);
                }}
                onLoadEnd={() => {
                    setLoadCount((count) => count + 1);
                }}
                style={asset.style} // Images are hidden
            />
        )),
    ];
}
