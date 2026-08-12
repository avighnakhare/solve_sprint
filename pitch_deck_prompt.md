I want you to build a premium, highly immersive homepage landing page for "SolveSprint"—a platform where high-school student teams solve real-world challenges posted by organizations.

**VISION & INSPIRATION:**
- Cinematic space theme for the cover page that smoothly transitions into a bright, optimistic, and premium cream/peach website below.
- Dark space aesthetic (#030712) for the top hero cover with a high-resolution spiral galaxy background.
- Clean typography and premium layout cards floating over the galaxy background.

**TECHNICAL REQUIREMENTS:**
- React frontend with Next.js App Router and Tailwind CSS
- Framer Motion for scroll-linked animations and page entry triggers
- Local image file asset `/assets/galaxy/hero-galaxy.webp` as the dominant background
- No heavy WebGL Canvas or 3D models—rely on performant CSS, SVG, and image layers
- Responsive design for all mobile, tablet, and desktop viewports

**KEY SECTIONS & FEATURES:**
1. Sticky Hero Background:
   - Full-screen cover displaying the high-resolution galaxy image asset.
   - Smooth scroll-linked scaling (from 1.05 to 1.35) and translation for cinematic parallax depth.
   - Delicate, sparse CSS star particles floating in foreground and midground layers.
   - Dark radial gradient masks to ensure text remains readable and the galactic core is not overexposed.

2. Vertical Scroll-Story Overlay:
   - A natural vertical scrolling container overlaying the sticky background.
   - 0% scroll: Headline (“Real-world challenges for high-school teams.”), Subheadline (“SolveSprint helps students form teams, solve scoped challenges from companies and colleges, and turn their work into portfolio proof.”), CTA links (Browse Challenges -> /challenges, Join as Student -> /student/signup, Post a Challenge -> /organization/signup), and a floating glassy lifecycle card showing "Challenge Sprint", "Team Submission", "Portfolio Proof".
   - 30% scroll: Display a process card deck with three items: "Organizations post", "Students team up", "Judges review".
   - 65% scroll: Display a "Concept UI Preview" brief card containing: "Engineering Outreach Sprint", "Team size: 2-4 members", and "Rubric: originality, usefulness, clarity" (no fake statistics or filler data).
   - 100% scroll: A transition text panel (“Start small. Build proof. Compete again.”) fading smoothly from the dark galaxy background into the light cream/peach page sections below.

**DESIGN SYSTEM:**
- Color Palette: Warm Cream (#fff7ed), Peach (#fed7aa), Orange (#fdba74), Sky Blue (#38bdf8), and Space Dark (#030712) for the galaxy cover.
- Typography: Outfit or Orbitron for headers, Inter for clean body copy.
- Cards style: Premium glassmorphism with light borders (`border-white/10`), dark semi-transparent backdrops (`bg-slate-950/75`), and sharp shadows.

**INTERACTION PATTERNS:**
- Scroll-triggered background image zoom (scale up and slight shift)
- Multi-layered star translation for a 3D parallax effect
- Staggered, scroll-triggered card reveal entries using Framer Motion
- Gradual fade of the background from black to light cream between 85% and 100% of the scroll journey

**TECHNICAL SPECIFICATIONS:**
- Hot-reload ready component architecture
- Performance optimized CSS animations
- Strict separation between the background container and the scrolling cards layout
