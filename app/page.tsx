import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      <main className="w-full max-w-xl bg-white shadow-sm rounded-2xl p-10 border border-neutral-200">
        
        <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
          Next.js 16 – Partial Prerendering
        </h1>

        <p className="mt-4 text-neutral-600 leading-relaxed">
          A clean demo showcasing how Next.js 16 streams dynamic content while  
          prerendering the static shell instantly using Partial Prerendering (PPR).
        </p>

        <div className="mt-8">
          <Link
            href="/ppr"
            className="inline-block px-5 py-3 rounded-xl bg-black text-white 
              hover:bg-neutral-800 transition font-medium text-sm shadow-sm"
          >
            View PPR Demo →
          </Link>
        </div>

      </main>
    </div>
  );
}
