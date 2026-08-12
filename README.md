# SolveSprint

SolveSprint is a local MVP for a high-school innovation league. Organizations can create real-world challenges, admins review and approve them, students form teams, invite teammates, submit solution links, and admins add real awards for the public leaderboard.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite for local development
- Email/password auth with bcryptjs
- Signed httpOnly auth cookies with jose
- Zod validation
- Resend email when `RESEND_API_KEY` is configured

## Why SQLite

The MVP is intended to run locally without PostgreSQL. Prisma uses `DATABASE_URL="file:./dev.db"` so setup is a standard local SQLite file.

## Environment variables

Copy `.env.example` to `.env` or edit the included local `.env`.

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="replace-with-long-random-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY=""
EMAIL_FROM="SolveSprint <noreply@example.com>"
```

## Install and run

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npx prisma validate
npm run build
```

## Provision an admin account

Public registration never grants administrative access. Create the user through the
normal flow, then have an authorized operator set its stored `User.role` to `ADMIN`
through a controlled database operation. Do not derive admin access from an email
allowlist.

## Local invite email testing

If `RESEND_API_KEY` is empty, invite emails are not sent. The app logs the recipient, subject, accept link, and decline link to the terminal running `npm run dev`. The UI shows:

`Invite created. Email delivery is not configured locally, so the invite link was logged in the terminal.`

## Main flow test

1. Start with a fresh SQLite database and visit `/challenges`; it should show no fake challenges.
2. Create a student account and confirm `/student/my-challenges` shows an empty state.
3. Create an organization account, submit a challenge from `/org/challenges/new`, and confirm it is hidden publicly.
4. Log in with a provisioned admin account, visit `/admin`, and approve the challenge.
5. Confirm the approved challenge appears in `/challenges`.
6. Register a student team, invite teammates, and check that only accepted members count as participants.
7. Use the logged invite links to accept or decline invitations.
8. Submit a solution as the registered team lead.
9. Add awards from the admin challenge page and confirm `/leaderboard` shows only awarded teams.

## Included routes

- Public: `/`, `/challenges`, `/challenges/[slug]`, `/leaderboard`, `/rules`, `/privacy`, `/terms`
- Auth: `/login`, `/student/signup`, `/organization/signup`, `/logout`
- Student: `/student/my-challenges`, `/student/profile`
- Organization: `/org/dashboard`, `/org/challenges/new`, `/org/challenges/[id]`, `/org/challenges/[id]/edit`
- Admin: `/admin`, `/admin/challenges/[id]`
- Invites: `/invite/[token]`
- Submissions and registration: `/challenges/[slug]/submit`, `/challenges/[slug]/register`

## Intentional MVP limits

- No judge scoring workflow beyond admin-entered awards/results.
- No file uploads; submissions use links and optional file URLs.
- No seeded fake challenges, teams, organizations, sponsors, testimonials, or leaderboard entries.
- Email delivery is optional locally and falls back to terminal logging.
