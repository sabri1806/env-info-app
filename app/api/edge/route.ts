import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: Request) {
  const country = req.headers.get('x-vercel-ip-country') ?? 'unknown';
  const region = req.headers.get('x-vercel-ip-country-region') ?? 'unknown';
  const city = req.headers.get('x-vercel-ip-city') ?? 'unknown';

  return NextResponse.json({
    runtime: 'edge',
    env: process.env.NEXT_PUBLIC_ENV_NAME ?? 'unknown',
    location: { country, region, city },
    timestamp: new Date().toISOString(),
  });
}