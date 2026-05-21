import { Video } from "@/types/video";

export const videos: Video[] = [
    {
        id: 1,
        videoUrl:
            "https://www.w3schools.com/html/mov_bbb.mp4",
        authorName: "Dũng Nguyễn",
        description: "Nature Video",
        likesCount: 120,
    },
    {
        id: 2,
        videoUrl:
            "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
        authorName: "Phước Quang",
        description: "Friday Video",
        likesCount: 500,
    },
    {
        id: 3,
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        authorName: "Hùng Nguyễn",
        description: "Sintel Trailer",
        likesCount: 300,
    }
];