Next.js 16 – Partial Prerendering (PPR) Demo

This project is a minimal, production-ready demonstration of Partial Prerendering (PPR) in Next.js 16 using the new Cache Components architecture.

It showcases the difference between:

Blocking SSR (no streaming)

Partial Prerendering (static shell + streamed dynamic content)

Both implementations use the same Server Component (SlowData), but behave differently depending on where the Suspense boundary is placed and how the page is structured.

🔍 What This Demo Shows
1. /with-ppr — Partial Prerendering

The page shell is prerendered at build time.

Static content appears instantly.

Dynamic content (SlowData) streams in after a delay.

Suspense fallback is visible immediately.

Demonstrates how PPR improves perceived performance.

2. /no-ppr — Blocking SSR

The entire page waits for dynamic data to resolve.

No content appears until the slow fetch completes.

Shows the traditional SSR bottleneck.

Useful for comparing PPR vs non-PPR behavior.

3. /api/slow — Dynamic API Route

Introduces a deliberate server delay (5 seconds).

Forces request-time behavior.

Ensures a visibly different experience between the routes.

Works consistently in both local and production environments.

🧠 How Partial Prerendering Works (Conceptual Overview)

Next.js 16 introduces Cache Components, a system that evaluates which parts of a route can be:

Cached at build time (static shell)

Streamed dynamically (async regions)

Revalidated independently

A route becomes “Partially Prerendered” when:

The layout + page can be prerendered statically

A Suspense boundary wraps dynamic Server Components

Dynamic data is truly request-time (non-cacheable)

In this demo:

The shell (h1, static copy, layout) is static.

SlowData fetches from an internal API with a 5-second delay.

Suspense splits the dynamic region and enables streaming.

This pattern mirrors what production apps do for product detail pages, dashboards, feeds, settings pages, and more.

📁 Project Structure
app/
  api/
    slow/
      route.ts        ← dynamic API route (5s delay)
  no-ppr/
    page.tsx          ← blocking SSR example
  with-ppr/
    page.tsx          ← PPR streaming example
  layout.tsx          ← static layout (streaming enabled)
components/
  SlowData.tsx        ← dynamic server component (async)
  Skeleton.tsx        ← Suspense fallback
lib/
  slowFetch.ts        ← internal fetch helper

🚀 Running Locally
Install dependencies
npm install

Start in development mode
npm run dev


Note: PPR streaming does not activate in next dev.
Use production mode to validate streaming.

Build production output
npm run build

Run the production server
npm start


Now visit:

http://localhost:3000/with-ppr

http://localhost:3000/no-ppr

You’ll see the difference between:

Instant shell + streaming (with-ppr)

Full blocking SSR (no-ppr)

🌐 Deploying to Vercel

PPR is fully supported on Vercel’s production infrastructure.

Just push to GitHub and import the project in Vercel — no extra configuration needed.

Streaming becomes instantly visible in production.

🧩 Common Pitfalls (And How This Repo Avoids Them)

This demo avoids all known blockers of streaming in Next.js 16:

❌ no async layouts

❌ no dynamic route config (dynamic, revalidate, experimental_ppr)

❌ no headers() or cookies() calls

❌ no font functions in the layout (which make layouts dynamic)

❌ no client components wrapping server Suspense boundaries

❌ no cached fetches

And ensures streaming by:

✔ using an internal API route with a forced delay

✔ wrapping dynamic Server Components in <Suspense>

✔ preserving a fully static layout

✔ using cache: "no-store" inside the fetch

✔ ensuring dynamic work only happens inside the Suspense boundary

This matches how the Next.js team recommends structuring partially prerendered routes.

📜 License

MIT — feel free to fork, modify, or use this as the basis for your own experiments.