"use client";

import { useEffect, useRef, useState } from "react";
import { Video } from "@/types/video";
import InteractionBar from "./InteractionBar";
import { useVideoAutoPlay } from "@/hooks/useVideoAutoPlay";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { setUserPaused } = useVideoAutoPlay(videoRef);

  // React does NOT support updating the `muted` attribute dynamically via JSX props.
  // We must set it directly on the DOM element through a useEffect instead.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync local playing state with the video element events
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      setUserPaused(false);
      videoRef.current.play();
    } else {
      setUserPaused(true);
      videoRef.current.pause();
      // Flash the pause icon briefly
      setShowPauseIcon(true);
      setTimeout(() => setShowPauseIcon(false), 800);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);

    // KEY FIX: Browser autoplay policy locks audio for videos started
    // programmatically (e.g. via IntersectionObserver). Re-calling play()
    // *inside* a click handler (a user gesture) re-establishes the audio
    // context and unblocks sound.
    if (!next && !videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    /*
     * Each card occupies the full viewport height (h-screen) on mobile.
     * On PC (md+) we constrain to a 9:16 aspect-ratio frame (max-w-[390px])
     * centred horizontally inside the scrollable container.
     * The snap-start ensures the scroll-snap lands exactly on this card.
     */
    <div className="snap-start h-screen flex items-center justify-center bg-black">
      {/* ── 9:16 Frame ── */}
      <div
        className="
          relative w-full h-full
          md:h-full md:w-auto md:aspect-[9/16] md:max-h-screen
          overflow-hidden bg-zinc-900
        "
      >
        {/* Video element */}
        {/* NOTE: `muted` is intentionally omitted from JSX — React cannot update it
             dynamically. It is controlled via useEffect + videoRef.current.muted. */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover cursor-pointer"
          loop
          playsInline
          preload="metadata"
          onClick={handleTogglePlay}
          onPlay={handlePlay}
          onPause={handlePause}
          aria-label={`Video by ${video.authorName}: ${video.description}`}
        />

        {/* Mute / Unmute button — top right */}
        <button
          onClick={handleToggleMute}
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-black/60"
        >
          {isMuted ? (
            /* Speaker with X (muted) */
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Speaker with waves (unmuted) */
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* Gradient overlay — bottom to transparent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
          }}
        />

        {/* Play / Pause flash icon */}
        {showPauseIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-black/40 flex items-center justify-center animate-ping-once">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-white"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            </div>
          </div>
        )}

        {/* Play hint when video is paused and icon not flashing */}
        {!isPlaying && !showPauseIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white translate-x-0.5"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}

        {/* Author info — bottom left */}
        <div className="absolute bottom-20 left-4 right-20 md:bottom-14 pointer-events-none">
          <h3 className="font-bold text-white text-base drop-shadow-lg">
            @{video.authorName}
          </h3>
          <p className="text-white/90 text-sm mt-1 leading-snug drop-shadow">
            {video.description}
          </p>
        </div>

        {/* Interaction bar — right side */}
        <div className="absolute right-3 bottom-24 md:bottom-16">
          <InteractionBar initialLikesCount={video.likesCount} />
        </div>
      </div>
    </div>
  );
}