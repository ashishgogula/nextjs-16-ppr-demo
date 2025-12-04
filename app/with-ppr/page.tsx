import { Suspense } from "react";
import SlowData from "@/components/SlowData";
import Skeleton from "@/components/Skeleton";

export default function Page() {
  return (
    <main className="p-8 space-y-6 text-white">
      <h1 className="text-2xl font-bold">With Partial Prerendering (PPR)</h1>

      <p>The static shell loads instantly. Dynamic content streams in once ready.</p>

      {/* Static, prerendered instantly */}
      <div className="p-4 border rounded bg-gray-900">
        <p className="font-semibold">This content is prerendered.</p>
      </div>

      {/* Streamed dynamic region */}
      <Suspense fallback={<Skeleton />}>
        <SlowData />
      </Suspense>
    </main>
  );
}
