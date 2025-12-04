import { Suspense } from "react";
import SlowData from "@/components/SlowData";
import Skeleton from "@/components/Skeleton";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6 bg-white rounded-2xl p-10 shadow-sm border border-neutral-200">

        <header className="space-y-3 pb-6 border-b border-neutral-200">
          <h1 className="text-3xl font-semibold text-neutral-900">
            Partial Prerendering (PPR)
          </h1>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-800">
            Live Server Data (Streamed)
          </h2>

          <p className="text-neutral-600 text-sm">
            The content below comes from a server action that intentionally waits 5 seconds.
            Thanks to PPR and streaming, the rest of the page is already interactive.
          </p>

          <Suspense fallback={<Skeleton />}>
            <SlowData />
          </Suspense>
        </section>

        <div className="border-t border-neutral-200" />

        <section className=" bg-white">
          <h2 className="text-lg font-semibold text-neutral-800 mb-2">
            Overview (Static)
          </h2>
          <p className="text-neutral-600 rounded-xl border border-neutral-200 p-6 shadow-sm">
            This block is generated at build time and served instantly when you load the page.
            Even if dynamic data takes time, this content appears immediately.
          </p>
        </section>

        <footer className="pt-6 border-t border-neutral-200 text-neutral-500 text-sm">
          Rendered with Next.js 16 Partial Prerendering & Streaming.
        </footer>
      </div>
    </main>
  );
}
