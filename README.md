# Next.js 16 – Partial Prerendering (PPR) Demo

This project is a minimal, production-ready demonstration of **Partial Prerendering (PPR)** in **Next.js 16**, using the new **Cache Components** architecture.

It shows the practical difference between:

* **Static Shell Rendering** – UI loads instantly.
* **Dynamic Streaming** – slow data streams in once ready.

The demo uses an async Server Component (`SlowData`) and a simulated slow endpoint to clearly show how PPR behaves.

---

## Routes

### `/ppr` – Partial Prerendering

* The static shell is prerendered at build time.
* Header and static sections appear instantly.
* Dynamic content is wrapped in `<Suspense>` with a visible fallback.
* When the slow server work finishes, the streamed result replaces the fallback.

### `/api/slow` – Dynamic API Route

* Simple endpoint with an intentional delay (5 seconds).
* Always runs at request time.
* Makes dynamic behavior predictable and easy to observe.
* Uses an internal API call (`/api/slow`) to avoid external dependency issues.

---

## How PPR Fits Into Next.js 16

Next.js 16 introduces **Cache Components**, which define:

* What can be cached and served statically.
* What must run dynamically on each request.
* How to split static and dynamic rendering using `<Suspense>`.

A route becomes a good PPR candidate when:

* The layout and outer UI can be rendered as a static shell.
* Dynamic regions are isolated inside `<Suspense>` boundaries.
* Dynamic data is fetched inside async Server Components.
* Data is marked non-cacheable (`cache: "no-store"`) so the behavior is clear in demos.

The result:

* Fast initial render of the static UI.
* Dynamic content streams in separately when ready.

This pattern maps directly to real-world dashboard pages, feeds, product pages, and AI-driven apps.

---

## Project Structure

```txt
app/
  api/
    slow/
      route.ts        # Dynamic API route with intentional delay
  ppr/
    page.tsx          # PPR streaming example
  layout.tsx          # Static layout (no async)
components/
  SlowData.tsx        # Async Server Component calling the slow API
  Skeleton.tsx        # Suspense fallback component
lib/
  slowFetch.ts        # Helper that calls /api/slow with cache: "no-store"
```

Key points:

* `layout.tsx` is static to avoid disabling PPR.
* `SlowData.tsx` is an async Server Component that performs the slow fetch.
* `Skeleton.tsx` renders immediately as a Suspense fallback.
* `slowFetch.ts` builds the correct absolute URL for local + production.

---

## Running Locally

Install dependencies:

```bash
npm install
```

Development mode:

```bash
npm run dev
```

> Note: Streaming and PPR are not fully accurate in `next dev`.
> Use a production build to validate real PPR behavior.

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

Then open:

* `http://localhost:3000/ppr`

Expected behavior:

* Static UI appears instantly.
* A skeleton loads immediately.
* The dynamic streamed content appears after the delay.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Deploy with default settings.

On Vercel’s production infrastructure:

* `/ppr` shows true streaming behavior.
* `/api/slow` runs dynamically on the server.

---

## Design Choices and Pitfalls Avoided

This demo is structured to avoid common issues that disable PPR in Next.js 16:

* No `async` layouts.
* No `cookies()` or `headers()` in layout.
* No route config flags (`dynamic`, `revalidate`, etc.) that break PPR.
* No font loaders (`next/font`), which force dynamic rendering.
* No client components wrapping Suspense boundaries.

Instead, it uses:

* A static layout.
* Async Server Component (`SlowData`) to perform dynamic work.
* Suspense to split static and dynamic rendering.
* An internal API route with a controlled delay.
* `cache: "no-store"` to force request-time evaluation.

This ensures the behavior of Partial Prerendering is easy to understand and reliably reproducible.

---

## License

feel free to fork, modify, or use this as the basis for your own experiments.
