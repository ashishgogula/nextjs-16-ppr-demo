import { Suspense } from "react";
import SlowData from "@/components/SlowData";

export default function Page() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Without PPR (Blocking SSR)</h1>

      <p>This route waits for server data before rendering anything.</p>

      {/* Blocking SSR */}
      <Suspense fallback={null}>
        <SlowData />
      </Suspense>
    </main>
  );
}
