# Video Feed

A TikTok-style vertical scroll video feed built with **Next.js 16 (App Router)** and **TypeScript**.

## Tech Stack

- **Framework**: Next.js 16 — App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **React**: v19

## Features

-  Full-screen vertical scroll with CSS Scroll Snap
-  Click-to-Play / Pause with animated overlay
-  Auto-play / auto-pause on scroll via Intersection Observer
-  Like button with live counter and red toggle state
-  Responsive navigation — left sidebar on desktop, bottom bar on mobile
-  Glassmorphism UI with gradient overlays

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## How Play/Pause on Scroll Works

### Manual Click (Click-to-Play/Pause)

Each `VideoCard` holds a `ref` pointing to the `<video>` DOM element.
When the user clicks the video:

```ts
const handleTogglePlay = () => {
  if (videoRef.current.paused) {
    videoRef.current.play();
  } else {
    videoRef.current.pause();
  }
};
```

A brief pause/play icon flashes on screen as visual feedback.

### Auto-play on Scroll (Intersection Observer)

The core logic lives in `hooks/useVideoAutoPlay.ts`.

```
┌────────────────────────────────────────────────┐
│           IntersectionObserver                 │
│                                                │
│  threshold: 0.6  (≥ 60% of card is visible)    │
│                                                │
│  isIntersecting = true  →  video.play()        │
│  isIntersecting = false →  video.pause()       │
│                          video.currentTime = 0 │
└────────────────────────────────────────────────┘
```

**How it works step by step:**

1. `useVideoAutoPlay(videoRef)` is called inside each `VideoCard`.
2. On mount, an `IntersectionObserver` is attached to the `<video>` element.
3. The observer fires whenever the intersection ratio crosses `0.6` (60%).
4. **Entering viewport**: `video.play()` is called. The browser auto-plays since the video is `muted`.
5. **Leaving viewport**: `video.pause()` is called and `currentTime` is reset to `0` so the next view starts fresh.
6. On unmount (component removed), the observer is disconnected to prevent memory leaks.

The `setUserPaused` flag prevents the observer from re-playing a video the user explicitly paused with a click, giving them manual override control.

### Why `muted` is required for autoplay

Browsers block autoplay on videos with sound to prevent jarring user experiences. Adding `muted` to the `<video>` element allows the Autoplay Policy to be satisfied in all major browsers (Chrome, Firefox, Safari).

## Project Structure

```
video-feed/
├── app/
│   ├── layout.tsx        # Root layout — includes Navigation
│   ├── globals.css       # Global styles, scrollbar-hide, animations
│   └── page.tsx          # Entry page — renders VideoFeed
├── components/
│   ├── VideoFeed.tsx     # Scroll-snap container, maps over video data
│   ├── VideoCard.tsx     # Individual video card with play/pause logic
│   ├── InteractionBar.tsx# Like / Comment / Share buttons
│   └── Navigation.tsx    # Sidebar (desktop) / Bottom bar (mobile)
├── hooks/
│   └── useVideoAutoPlay.ts # Intersection Observer auto-play hook
├── data/
│   └── video.ts          # Mock video data array
└── types/
    └── video.ts          # Video TypeScript interface
```
