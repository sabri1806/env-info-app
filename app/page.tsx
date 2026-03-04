import RuntimeComparison from './components/RuntimeComparison';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl px-6 py-16 sm:px-16">
        <div className='flex flex-col gap-1'>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Next.js Runtime Comparison
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Entorno actual : {''}
            <strong>{process.env.NEXT_PUBLIC_ENV_NAME}</strong>
          </p>
        </div>
        <RuntimeComparison />
      </main>
    </div>
  );
}
