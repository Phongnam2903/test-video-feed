import { useCallback, useEffect, useRef } from "react";
/**
 * useVideoAutoPlay
 *
 * Attaches an IntersectionObserver to the given video element.
 * - When the video enters the viewport (≥ 60% visible) and the user has NOT
 *   manually paused it, the video auto-plays.
 * - When the video leaves the viewport, it pauses and resets to the beginning.
 *
 * Returns `setUserPaused` so the caller can signal that the user intentionally
 * paused the video (preventing the observer from immediately re-playing it).
 */
export function useVideoAutoPlay(
    videoRef: React.RefObject<HTMLVideoElement | null>
) {
    // Stable ref — won't trigger re-renders
    const userPausedRef = useRef(false);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Only auto-play if the user hasn't manually paused
                    if (!userPausedRef.current) {
                        video.play().catch(() => {
                            // Silently ignore browser autoplay policy blocks.
                            // The video is muted so this should rarely fire.
                        });
                    }
                } else {
                    // Scrolled out of view — always pause, reset, and clear the manual flag
                    video.pause();
                    video.currentTime = 0;
                    userPausedRef.current = false;
                }
            },
            {
                // Fire when at least 60% of the video card is visible
                threshold: 0.6,
            }
        );
        observer.observe(video);
        return () => {
            observer.unobserve(video);
            observer.disconnect();
        };
    }, [videoRef]);
    // Stable callback — won't cause re-renders
    const setUserPaused = useCallback((paused: boolean) => {
        userPausedRef.current = paused;
    }, []);
    return { setUserPaused };
}
