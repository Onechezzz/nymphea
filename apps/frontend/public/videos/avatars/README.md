# Avatar Video Assets

Place video files here. The Avatar component auto-detects if videos exist
and falls back to the static PNG with CSS animations if they don't.

## Required file structure

```
videos/avatars/
├── female/
│   ├── idle.mp4       ← seamlessly looping idle animation
│   ├── idle.webm      ← WebM fallback for older browsers
│   ├── talking.mp4    ← plays ONCE then returns to idle
│   └── talking.webm
└── male/
    ├── idle.mp4
    ├── idle.webm
    ├── talking.mp4
    └── talking.webm
```

## Video Specifications

| Property        | Value                              |
|-----------------|------------------------------------|
| Format          | MP4 (H.264) + WebM (VP9)           |
| Resolution      | 512 × 1024 px (portrait, 1:2)      |
| Frame rate      | 30 fps                             |
| Background      | Dark — cropped with CSS radial mask |
| Idle duration   | 4–6 s, MUST loop seamlessly        |
| Talking duration| 2–4 s, plays ONCE then idles       |
| File size       | < 5 MB per file                    |

## How cropping works

The Avatar component applies a CSS mask that fades out the bottom edge:
```css
mask-image: radial-gradient(ellipse 100% 90% at 50% 10%, black 60%, transparent 100%);
```
This means you don't need a transparent background —
just use a dark background matching the site theme (`#0d0a1a`).

## Behavior

1. `idle.mp4` — loops continuously while the avatar is in the idle state.
2. `talking.mp4` — triggered when an avatar comment appears.
   - Plays ONCE (`onEnded` callback fires).
   - Avatar returns to `idle.mp4` automatically.
   - If the comment lasts longer than the video, it loops until dismissed.

## Integration in Avatar.tsx (already done)

```tsx
// Idle (loops):
<video autoPlay loop muted playsInline src="/videos/avatars/female/idle.mp4" />

// Talking (plays once):
<video autoPlay muted playsInline src="/videos/avatars/female/talking.mp4"
  onEnded={() => setState('idle')} />
```

No code changes needed — just drop the files above and they are used automatically.
