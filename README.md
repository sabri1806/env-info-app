# ⚡ Serverless vs Edge — Runtime Comparison

A hands-on Next.js app that compares **Serverless (Node.js)** and **Edge** runtimes side by side, built as a portfolio project to explore Vercel's infrastructure.

## 🔍 What it does

Fetches two API endpoints in parallel and displays their response data and latency in a live UI:

| Endpoint | Runtime | Highlights |
|---|---|---|
| `/api/serverless` | Node.js | Deployment region |
| `/api/edge` | Edge | Geo location (country, city) |

## 🛠 Stack

- **Next.js 16** · App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Vercel** · edge network + analytics

## 📊 Analytics

Vercel Analytics is integrated in the codebase.
It requires a Pro plan to be activated.


## 🚀 Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> Geo headers (`country`, `region`, `city`) are only populated on Vercel deployments.

## 🔁 CI

GitHub Actions runs lint + build on every push to `main` and on pull requests.

The workflow file must live at `.github/workflows/ci.yml` from the **repo root** — GitHub won't detect it from any subdirectory. It's configured with:
- Node 20
- `npm ci` with dependency caching
- Lint and build steps

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 Notes

This project intentionally avoids additional complexity (Docker, external analytics, heavy backend logic) to stay focused on deployment concepts and infrastructure learning.

## 🔗 Author

Built as a learning and portfolio project to explore modern frontend deployment practices.