import { useState, useEffect, useRef } from "react";
import { Video } from "expo-av";
import { VideoProps } from "expo-av/src/Video.types";

// Custom hook to load images
export default function useLoadImages(
    videoList: { src: number; style: Object; props?: VideoProps }[]
): [boolean, JSX.Element[]] {
    const [videosLoaded, setVideosLoaded] = useState<boolean>(false);
    const [loadCount, setLoadCount] = useState<number>(videoList.length);

    useEffect(() => {
        if (loadCount >= videoList.length) {
            console.log(loadCount, videoList.length, "loaded");
            setVideosLoaded(true);
        } else {
            console.log(loadCount, videoList.length, "not loaded");
            setVideosLoaded(false);
        }
    }, [loadCount, videoList.length]);

    return [
        videosLoaded,
        videoList.map((video, index) => (
            <Video
                key={index}
                source={video.src}
                onLoadStart={() => {
                    setLoadCount((count) => count - 1);
                }}
                onLoad={() => {
                    setTimeout(() => {
                        setLoadCount((count) => count + 1);
                    }, 2000);
                }}
                style={video.style} // Images are hidden
                {...video.props}
            />
        )),
    ];
}
