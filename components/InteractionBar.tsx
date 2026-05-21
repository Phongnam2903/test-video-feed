"use client";

import { useState } from "react";

interface InteractionBarProps {
  initialLikesCount: number;
}

export default function InteractionBar({ initialLikesCount }: InteractionBarProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center gap-5 text-white">
      {/* Like button */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleLike}
          aria-label={liked ? "Unlike" : "Like"}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-white/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 transition-all duration-300"
            fill={liked ? "#ff2d55" : "none"}
            stroke={liked ? "#ff2d55" : "white"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <span className="text-xs font-semibold drop-shadow">
          {likesCount >= 1000
            ? `${(likesCount / 1000).toFixed(1)}K`
            : likesCount}
        </span>
      </div>

      {/* Comment button */}
      <div className="flex flex-col items-center gap-1">
        <button
          aria-label="Comment"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-white/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        <span className="text-xs font-semibold drop-shadow">Bình luận</span>
      </div>

      {/* Share button */}
      <div className="flex flex-col items-center gap-1">
        <button
          aria-label="Share"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-white/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <span className="text-xs font-semibold drop-shadow">Chia sẻ</span>
      </div>
    </div>
  );
}
