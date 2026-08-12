# OpenAI Codex Master Prompt: SolveSprint Cinematic Scroll-Driven Video Hero

Copy and paste the prompt below directly into OpenAI Codex to execute the complete, full-bleed scroll-controlled video sequence for the SolveSprint landing page.

---

### PROMPT BEGINS HERE

```text
TASK INSTRUCTION FOR CODEX:
Build a full-bleed, scroll-controlled cinematic video sequence for the SolveSprint landing page using the existing 10-second mountain drone video asset.

BACKGROUND & GOAL:
The entire top of the SolveSprint homepage (above the "Built by students who wanted real work before college" founding team section) must BE the full-viewport cinematic mountain drone background video. As the visitor scrolls down, the video scrubs smoothly in 60fps across 5 chapters, pausing at specific keyframe holds to reveal process text, before holding on the golden trophy on the mountain summit and releasing into the founding team section.

ASSET REQUIREMENTS:
- Source video path: /public/videos/solvesprint-summit-flight.mp4 (accessible as /videos/solvesprint-summit-flight.mp4).
- Do not attempt to parse or convert the MP4. Use the HTML5 video element and Canvas 2D context to render frames.
- Fallback poster: /public/images/video/solvesprint-summit-poster.webp
- Final trophy poster: /public/images/video/solvesprint-summit-final.webp

CORE TECHNICAL ARCHITECTURE:

1. NON-BLOCKING CANVAS SCRUBBING ENGINE:
   - Browsers lock and freeze when assigning `video.currentTime` continuously inside a requestAnimationFrame loop while `video.seeking` is true.
   - Implement a Canvas 2D scrubber (`<canvas>`) fed by an off-screen `<video>` element.
   - Maintain a non-blocking seek queue (`requestVideoSeek`):
     - Only set `video.currentTime = targetTime` if `!isSeeking`.
     - Queue pending timestamps and process them in a `seeked` event listener.
     - Paint the current video frame to the Canvas context (`ctx.drawImage(video, 0, 0, width, height)`) upon each `seeked` event or animation frame when ready.

2. FULL-VIEWPORT 100VW EDGE-TO-EDGE LAYOUT:
   - Outer container: `height: 700vh; position: relative; width: 100vw; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; background: #0b0f19;`
   - Sticky viewport: `position: sticky; top: 0; width: 100vw; height: 100vh; height: 100svh; overflow: hidden;`
   - Canvas & overlay: `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;`
   - Header integration: Ensure the top navbar floats transparently over the mountain video (`position: absolute` or transparent sticky backdrop) so the video extends edge-to-edge under the brand logo and navigation.

3. SCROLL TIMELINE & PIECEWISE TIME MAPPING:
   Map normalized scroll progress (0.00 to 1.00) relative to the 700vh container to video timestamps:
   - 0.00 – 0.08: Video at 0.0s. Opening Hero Overlay:
     - Badge: "HIGH SCHOOL INNOVATION LEAGUE"
     - Title: "Real challenges from real organizations. Built by student teams."
     - Subtitle: "Students build work worth showing. Organizations discover how young people approach real problems."
     - Buttons: "Explore Challenges →" and "Host a Challenge →"
     - Cue: "SCROLL TO ASCEND"
   - 0.08 – 0.14: Flight 1 (0s to 2s)
   - 0.14 – 0.26: Hold 1 at 2.0s → "01 • THE BRIEF" | "Choose a problem worth solving." | "Start with a real challenge from a real organization." (Left aligned)
   - 0.26 – 0.30: Flight 2 (2s to 4s)
   - 0.30 – 0.42: Hold 2 at 4.0s → "02 • THE TEAM" | "Build with people who show up." | "Form a team, divide the work, and move together." (Right aligned)
   - 0.42 – 0.46: Flight 3 (4s to 6s)
   - 0.46 – 0.58: Hold 3 at 6.0s → "03 • THE BUILD" | "Turn the idea into something real." | "Research it, shape it, test it, and finish it." (Left aligned)
   - 0.58 – 0.62: Flight 4 (6s to 8s)
   - 0.62 – 0.74: Hold 4 at 8.0s → "04 • THE REVIEW" | "Let the work speak for itself." | "Submit it against clear requirements and a real rubric." (Right aligned)
   - 0.74 – 0.82: Final Flight to Summit (8s to ~9.9s)
   - 0.82 – 1.00: Final Summit Hold at ~9.9s → Golden Trophy on peak with wordmark:
     - Large bold "SolveSprint" ("Solve" in rich orange #F97316, "Sprint" in golden yellow #F4B942)
     - Tagline: "Build work worth showing."
     - Subline: "Real challenges. Real student teams. Real recognition."

4. OVERLAY & SCRIM DESIGN:
   - Dynamic scrim overlay:
     - Left holds: `linear-gradient(to right, rgba(11,15,25,0.85) 0%, rgba(11,15,25,0.4) 45%, transparent 80%)`
     - Right holds: `linear-gradient(to left, rgba(11,15,25,0.85) 0%, rgba(11,15,25,0.4) 45%, transparent 80%)`
     - Final hold: `linear-gradient(to top, rgba(11,15,25,0.9) 0%, rgba(11,15,25,0.45) 45%, transparent 80%)`
   - Text entrances: Fade in + 24px slide up during initial 20% of hold zone; hold static for 60%; fade out + 16px slide up during final 20%.

5. ACCESSIBILITY & REDUCED MOTION:
   - Support `prefers-reduced-motion: reduce`: Render a static fallback with /images/video/solvesprint-summit-final.webp, the SolveSprint wordmark, and an accessible grid list of the 4 process steps.
   - Include semantic screen reader content (`sr-only` heading and list).

6. PAGE INTEGRATION & CLEANUP:
   - Replace the top hero in `app/page.tsx` with `<SummitScrollStory />`.
   - Ensure the sequence releases seamlessly into `<section className="home-founders">`.
   - Verify `npx tsc --noEmit` and `npm run dev` compile with 0 errors.
```
