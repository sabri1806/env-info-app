import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    runtime: 'edge',
    env: process.env.NEXT_PUBLIC_ENV_NAME,
    timestamp: new Date().toISOString(),
  });
}