'use client';

import { useState } from 'react';

type ServerlessResult = {
  runtime: string;
  env: string;
  region: string;
  timestamp: string;
};

type EdgeResult = {
  runtime: string;
  env: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  timestamp: string;
};

type FetchResult<T> = {
  data: T | null;
  latencyMs: number | null;
  error: string | null;
};

async function fetchWithTiming<T>(url: string): Promise<FetchResult<T>> {
  const start = performance.now();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const latencyMs = Math.round(performance.now() - start);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: T = await res.json();
    return { data, latencyMs, error: null };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - start);
    return { data: null, latencyMs, error: (err as Error).message };
  }
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">{label}</span>
      <span className="font-mono text-sm text-zinc-800 dark:text-zinc-200 break-all">{value}</span>
    </div>
  );
}

function Card({
  title,
  badge,
  badgeColor,
  latencyMs,
  loading,
  children,
}: {
  title: string;
  badge: string;
  badgeColor: string;
  latencyMs: number | null;
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-700 p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
        <Badge label={badge} color={badgeColor} />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <span className="animate-spin inline-block w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full" />
          Fetching...
        </div>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}

      {latencyMs !== null && !loading && (
        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Response time</span>
          <span
            className={`font-mono text-sm font-semibold ${
              latencyMs < 100
                ? 'text-emerald-500'
                : latencyMs < 300
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}
          >
            {latencyMs} ms
          </span>
        </div>
      )}
    </div>
  );
}

export default function RuntimeComparison() {
  const [serverless, setServerless] = useState<FetchResult<ServerlessResult>>({
    data: null,
    latencyMs: null,
    error: null,
  });
  const [edge, setEdge] = useState<FetchResult<EdgeResult>>({
    data: null,
    latencyMs: null,
    error: null,
  });
  const [loading, setLoading] = useState(false);

  async function runComparison() {
    setLoading(true);
    setServerless({ data: null, latencyMs: null, error: null });
    setEdge({ data: null, latencyMs: null, error: null });

    const [serverlessResult, edgeResult] = await Promise.all([
      fetchWithTiming<ServerlessResult>('/api/serverless'),
      fetchWithTiming<EdgeResult>('/api/edge'),
    ]);

    setServerless(serverlessResult);
    setEdge(edgeResult);
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Serverless vs Edge
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Compare response data and latency between Next.js runtimes.
        </p>
      </div>

      <button
        onClick={runComparison}
        disabled={loading}
        className="self-start rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 
            py-2 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Running...' : 'Run Comparison'}
      </button>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Serverless card */}
        <Card
          title="Serverless"
          badge="Node.js"
          badgeColor="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          latencyMs={serverless.latencyMs}
          loading={loading}
        >
          {serverless.error ? (
            <p className="text-sm text-red-500">{serverless.error}</p>
          ) : serverless.data ? (
            <>
              <Row label="Runtime" value={serverless.data.runtime} />
              <Row label="Region" value={serverless.data.region} />
              <Row label="Env" value={serverless.data.env} />
              <Row label="Timestamp" value={serverless.data.timestamp} />
            </>
          ) : (
            <p className="text-sm text-zinc-400">Hit &quot;Run Comparison&quot; to fetch.</p>
          )}
        </Card>

        {/* Edge card */}
        <Card
          title="Edge"
          badge="Edge Runtime"
          badgeColor="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
          latencyMs={edge.latencyMs}
          loading={loading}
        >
          {edge.error ? (
            <p className="text-sm text-red-500">{edge.error}</p>
          ) : edge.data ? (
            <>
              <Row label="Runtime" value={edge.data.runtime} />
              <Row label="Country" value={edge.data.location.country} />
              <Row label="Region" value={edge.data.location.region} />
              <Row label="City" value={edge.data.location.city} />
              <Row label="Env" value={edge.data.env} />
              <Row label="Timestamp" value={edge.data.timestamp} />
            </>
          ) : (
            <p className="text-sm text-zinc-400">Hit &quot;Run Comparison&quot; to fetch.</p>
          )}
        </Card>
      </div>

      {/* Latency diff summary */}
      {serverless.latencyMs !== null && edge.latencyMs !== null && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Edge was{' '}
          <strong className="text-zinc-800 dark:text-zinc-200">
            {Math.abs(serverless.latencyMs - edge.latencyMs)} ms
          </strong>{' '}
          {edge.latencyMs < serverless.latencyMs ? 'faster' : 'slower'} than Serverless on this
          request.
        </p>
      )}
    </div>
  );
}
