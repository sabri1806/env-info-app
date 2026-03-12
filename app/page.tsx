import RuntimeComparison from './components/RuntimeComparison';
import Link from "next/link";



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl px-6 py-16 sm:px-16">

         {/* Header */}
        <header className="mb-12 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Next.js Runtime Comparison
          </h1>

          <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
            Current environment:{" "}
            <strong className="text-zinc-700 dark:text-zinc-200">
              {process.env.NEXT_PUBLIC_ENV_NAME}
            </strong>
          </p>
        </header>

        {/* Comparison */}
        <section className="mb-16">
          <RuntimeComparison />
        </section>

        {/* Related links */}
        <section className="space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Related Comparisons
          </h2>

          <Link
            href="/image-optimization"
            className="inline-block text-blue-500 hover:underline"
          >
            Image Optimization Comparison →
          </Link>
        </section>

      </main>
    </div>
  );
}
