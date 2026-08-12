# SolveSprint Demo Video: Screen Recording Plan & Script

This guide outlines a step-by-step layout plan and voice-over script to record a professional demo video of SolveSprint. You can use tools like **OBS Studio**, **Loom**, or **QuickTime** to record your screen and microphone.

---

## 📽️ Screen Recording Setup Guidelines

* **Resolution**: 1920x1080 (1080p) or 1280x720 (720p) at a standard 16:9 aspect ratio.
* **Browser Window**: Run your browser in full-screen or maximized mode. Clear your browser history/tabs to keep the interface clean.
* **Audio Setup**: Use a dedicated USB microphone in a quiet room. Keep your voice tone enthusiastic, clear, and paced.
* **Cursor**: Enable cursor highlight or use smooth mouse movements. Avoid frantic cursor shaking.

---

## 🎬 Storyboard & Voice-Over Script

| Scene & Timing | Screen Visuals (What to do on screen) | Voice-Over Narration (What to say) |
| :--- | :--- | :--- |
| **Scene 1: Intro**<br>*(0:00 - 0:35)* | Start on the homepage (`http://localhost:3000/`). Scroll down slowly to show the feature cards ("Draft structured prompts", "Team workspaces", "Judges review"). | "Hi everyone! Today, I’m excited to show you **SolveSprint**, a modern, web-based platform built specifically for high school innovation leagues. SolveSprint bridges the gap between organizations with real-world problems and students with the creativity to solve them. By allowing organizations to host structured challenges, student teams to build prototypes, and administrators to award points, SolveSprint drives collaborative innovation. Let's look at how it works starting from the host organization's perspective." |
| **Scene 2: Org Signup & Challenge Creation**<br>*(0:35 - 1:20)* | Go to `/organization/signup`. Quickly demo the registration fields. Then log in and go to the Organization Dashboard (`/org/dashboard`). Click "Create Challenge". Walk through the multi-section form (Title, Category, Timeline, Rubrics). | "First, hosts and sponsors can easily register their organizations. Once logged in, sponsors land in their dashboard, where they can build and manage challenges. The creation form is robust, ensuring hosts provide structured problem statements, clear goals, deliverables like slide decks or code repos, registration timelines, and custom rubric weightings that sum up to 100%. Once submitted, the challenge is marked as pending, keeping the league's content high-quality and safe." |
| **Scene 3: Admin Review & Approval**<br>*(1:20 - 2:05)* | Log out and log in with your admin account (`admin@example.com`). Go to the `/admin` portal. Show the review queue. Click on the pending "Green City Hackathon" challenge, write a short review note, and click "Save Review" (Approved). | "To maintain league integrity, SolveSprint features a dedicated Admin dashboard. Any user with an email listed in the system's admin configuration gains secure access. Here, administrators can inspect pending challenges, provide feedback or request edits, and approve them. When I approve this 'Green City Hackathon' challenge, it is immediately launched to the public directory for students to view." |
| **Scene 4: Student View & Team Registration**<br>*(2:05 - 2:55)* | Log out. Navigate to the public `/challenges` page to show the newly approved "Green City Hackathon". Click on the challenge, then click "Register Team". Enter team name "Eco Warriors" and invite teammate email `teammate.test@example.com`. Click "Register". | "Now let's switch to the student experience. Students can browse the public challenges directory to find problems that match their interests. When a student finds a challenge they want to tackle, they can register their team directly. By inputting their team name and inviting classmates, SolveSprint automatically manages invitations. Teammates receive secure invite links via email or terminal log fallbacks, allowing them to accept and join the shared team workspace." |
| **Scene 5: Project Submission**<br>*(2:55 - 3:35)* | Navigate to `/student/my-challenges`. Click on the registered team card, and click "Submit Solution". Fill out the title "Eco Bin", short summary, and GitHub link, and check the original work boxes. Click "Submit". | "Once the team is assembled and they build their solution, submitting is a breeze. From their dashboard, student teams can upload their slides, code repositories, or prototype links. This centralizes all submissions for the judges, ensuring every project is documented with a clear summary and credit representation." |
| **Scene 6: Admin Award & Leaderboard**<br>*(3:35 - 4:15)* | Log back in as admin. Go to the challenge administration page. Find "Eco Warriors" under registered teams, select "1st Place", assign 100 points, write "Excellent prototype!", and click add. Then navigate to `/leaderboard` to show the updated ranking. | "After submissions close, administrators can review projects and distribute awards. In the admin challenge details page, I can select a team, choose an award tier, assign points, and leave a judge's comment. Instantly, the public Leaderboard is updated, showcasing team rankings, total points earned, and recognition for their hard work." |
| **Scene 7: Outro**<br>*(4:15 - 4:45)* | Return to the homepage. Hover over the navigation menu links (`Leaderboard`, `Challenges`). | "And that's the complete SolveSprint workflow! From sponsor challenge design, through admin approval and student team collaboration, all the way to final scoring. It is a powerful, lightweight MVP that makes hosting local innovation events simple, engaging, and structured. Thanks for watching, and let me know if you have any questions!" |

---

## 💡 Pro-Tips for Recording

1. **Preset Accounts**: Create the organization account, admin account, and student accounts beforehand. This avoids typing full credentials during the recording and keeps the video flow fast-paced.
2. **Use Zoom-In Effects**: If editing the video later, zoom in slightly on the forms and cards (like timeline grids or leaderboard positions) to highlight mobile-friendly responsiveness.
3. **Trim Silent Gaps**: Cut out any loading or processing screens during form submissions to keep the presentation snappy.
