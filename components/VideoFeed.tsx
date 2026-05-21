"use client";

import { videos } from "@/data/video";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}