import { useState, useEffect, useRef } from "react";
import { Image } from "react-native";

// Custom hook to load images
export default function useLoadImages(
    imageList: { src: number; style: Object }[]
): [boolean, JSX.Element[]] {
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    const [loadCount, setLoadCount] = useState<number>(imageList.length);

    useEffect(() => {
        if (loadCount >= imageList.length) {
            console.log(loadCount, imageList.length, "loaded");
            setImagesLoaded(true);
        } else {
            console.log(loadCount, imageList.length, "not loaded");
            setImagesLoaded(false);
        }
    }, [loadCount, imageList.length]);

    return [
        imagesLoaded,
        imageList.map((image, index) => (
            <Image
                key={index}
                source={image.src}
                onLoadStart={() => {
                    setLoadCount((count) => count - 1);
                }}
                onLoadEnd={() => {
                    setLoadCount((count) => count + 1);
                }}
                style={image.style} // Images are hidden
            />
        )),
    ];
}
