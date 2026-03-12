# ⚡ Next.js Runtime Comparison

A hands-on Next.js app that compares **Serverless (Node.js)** and **Edge** runtimes side by side, built as a portfolio project to explore Vercel's infrastructure and Next.js advanced features.

## 🔍 What it does

Fetches two API endpoints in parallel and displays their response data and latency in a live UI:

| Endpoint | Runtime | Highlights |
|---|---|---|
| `/api/serverless` | Node.js | Deployment region, environment |
| `/api/edge` | Edge | Geo location (country, region, city) |
| `/image-optimization` | — | Next.js Image component comparison |

## ✨ Next.js Features Showcased

| Feature | Where |
|---|---|
| **App Router** | `app/` directory with layouts and pages |
| **Route Handlers** | `app/api/serverless/route.ts`, `app/api/edge/route.ts` |
| **Edge Runtime** | `export const runtime = 'edge'` in the edge route |
| **Serverless (Node.js) Runtime** | Default runtime in the serverless route |
| **Client Components** | `'use client'` in `RuntimeComparison.tsx` |
| **Server Components** | `app/page.tsx` (default, no directive) |
| **Parallel data fetching** | `Promise.all` fetching both runtimes simultaneously |
| **Environment Variables** | `NEXT_PUBLIC_ENV_NAME`, `AWS_REGION`, `VERCEL_REGION` |
| **Image Optimization** | `next/image` in `/image-optimization` |
| **Font Optimization** | `next/font/google` (Geist Sans & Mono) |
| **Vercel Analytics** | `@vercel/analytics/react` in layout |
| **TypeScript** | Fully typed components, API responses, and utilities |
| **Tailwind CSS v4** | Utility-first styling with dark mode support |

## 🛠 Stack

- **Next.js 15** · App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Vercel** · Edge network + Analytics

## 📊 Analytics

Vercel Analytics is integrated via [`Analytics`](app/layout.tsx) component in the root layout.
> Requires a Vercel Pro plan to be activated.

## 🚀 Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> **Note:** Geo headers (`country`, `region`, `city`) are only populated on Vercel deployments. Locally they will show `unknown`.

## 🔁 CI

GitHub Actions runs lint + build on every push to `main` and on pull requests.

The workflow file must live at `.github/workflows/ci.yml` because GitHub won't recognize it elsewhere and is configured with: 
- Node 20
- `npm ci` with dependency caching
- Lint and build steps

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 Notes

This project intentionally avoids additional complexity (Docker, external analytics, heavy backend logic) to stay focused on deployment concepts and infrastructure learning.

## 🔗 Author

Built as a learning and portfolio project to explore modern frontend deployment practices.