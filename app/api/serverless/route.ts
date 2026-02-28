import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    runtime: 'serverless (Node.js)',
    env: process.env.NEXT_PUBLIC_ENV_NAME ?? 'unknown',
    region: process.env.AWS_REGION ?? process.env.VERCEL_REGION ?? 'local',
    timestamp: new Date().toISOString(),
  });
}
