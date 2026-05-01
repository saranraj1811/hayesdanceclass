## Hayes Dance Class Enquiry Website

Production-ready Next.js App Router landing page for a new dance class launch in Hayes & Harlington, including:

- Public animated homepage with enquiry capture
- Prisma + PostgreSQL persistence
- Password-protected admin dashboard with enquiry status updates

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Neon/Vercel compatible)

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set values:

```env
DATABASE_URL=
ADMIN_PASSWORD=
```

## Local Development

Install and run:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Production Deployment (Vercel)

1. Create a PostgreSQL database (Neon recommended).
2. Add `DATABASE_URL` and `ADMIN_PASSWORD` to Vercel project environment variables.
3. Add a build step that runs Prisma generate before build:

```bash
npx prisma generate && next build
```

4. Run migrations against production database:

```bash
npx prisma migrate deploy
```

5. Deploy.

## Main Routes

- `/` public landing page + enquiry form
- `/admin/login` admin login
- `/admin` protected admin dashboard
