import { NextResponse } from 'next/server';

//TODO:replace with nodejs serverless function when nextjs support it
export async function GET() {
  return NextResponse.json({
    runtime: 'serverless',
    env: process.env.NEXT_PUBLIC_ENV_NAME,
    timestamp: new Date().toISOString(),
  });
}
