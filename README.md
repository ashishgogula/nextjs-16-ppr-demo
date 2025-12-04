# Next.js 16 – Partial Prerendering (PPR) Demo

This project is a minimal, production-ready demonstration of **Partial Prerendering (PPR)** in **Next.js 16**, using the new **Cache Components** architecture.

It shows the practical difference between:

- **Blocking SSR** – the whole page waits for dynamic data.
- **Partial Prerendering** – a static shell renders instantly, and dynamic content streams in later.

Both routes use the same async Server Component (`SlowData`), but are wired differently to demonstrate how PPR changes the user experience.

---

## Routes

### `/with-ppr` – Partial Prerendering

- Static shell is prerendered at build time.
- The page header and static sections appear immediately.
- Dynamic content is wrapped in `<Suspense>` with a visible fallback.
- Once the slow server work finishes, the dynamic section streams in and replaces the fallback.

### `/no-ppr` – Blocking SSR

- Uses the same `SlowData` Server Component.
- Still wrapped in `<Suspense>`, but with a `null` fallback.
- The browser shows nothing until the slow server work completes.
- The whole page appears at once after the delay.

### `/api/slow` – Dynamic API Route

- Simple API route with an intentional delay (e.g. 5 seconds).
- Always runs at request time.
- Makes dynamic behavior obvious and consistent.
- Avoids external network dependencies by using an internal API.

---

## How PPR Fits Into Next.js 16

Next.js 16 introduces **Cache Components**, which decide:

- What can be cached and prerendered statically.
- What should be evaluated at request time.
- How to split static vs dynamic work using Suspense.

A route becomes a good PPR candidate when:

- The layout and page can be rendered as a static shell.
- Dynamic regions are isolated inside `<Suspense>` boundaries.
- Dynamic data is fetched in async Server Components.
- Data is treated as non-cacheable (for this demo) so request-time behavior is obvious.

The result:

- Fast initial render for the shell.
- Dynamic regions stream in separately when ready.

This pattern maps directly to real-world pages like product detail pages, dashboards, and feeds.

---

## Project Structure

```txt
app/
  api/
    slow/
      route.ts        # Dynamic API route with intentional delay
  no-ppr/
    page.tsx          # Blocking SSR example
  with-ppr/
    page.tsx          # PPR streaming example
  layout.tsx          # Static layout (no async, no fonts)
components/
  SlowData.tsx        # Async Server Component that calls the slow API
  Skeleton.tsx        # Suspense fallback component
lib/
  slowFetch.ts        # Helper that calls /api/slow with cache: "no-store"
````

Key points:

* `layout.tsx` is kept completely static to avoid disabling PPR.
* `SlowData.tsx` is an async Server Component that performs the slow fetch.
* `Skeleton.tsx` is a simple loading placeholder used as the Suspense fallback.
* `slowFetch.ts` uses a relative fetch to `/api/slow` so it works locally and on Vercel.

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

> Note: Partial Prerendering and streaming behavior are not accurately represented in `next dev`.
> Use a production build to validate PPR and streaming.

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

Then open:

* `http://localhost:3000/with-ppr`
* `http://localhost:3000/no-ppr`

You should see:

* `/with-ppr`: shell and fallback appear immediately, dynamic section appears after the delay.
* `/no-ppr`: page stays blank until the delay completes, then the whole page appears at once.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Deploy with default settings.

On Vercel’s production infrastructure:

* `/with-ppr` will show true streaming behavior.
* `/no-ppr` will behave like a fully blocking SSR page.
* `/api/slow` will run as a dynamic route.

---

## Design Choices and Pitfalls Avoided

This demo is intentionally structured to avoid common issues that break PPR and streaming in Next.js 16:

* No `async` layouts.
* No `cookies()` or `headers()` in layout or pages.
* No `dynamic`, `revalidate`, or legacy route config flags that conflict with `cacheComponents`.
* No font loaders (`next/font`) in the layout, which can force dynamic rendering.
* No client components wrapping the Suspense boundary.

Instead, it uses:

* A static layout.
* Async Server Component (`SlowData`) doing the dynamic work.
* Suspense boundaries for splitting static and dynamic content.
* An internal API route with an intentional delay.
* `cache: "no-store"` to ensure request-time fetches.

This makes the behavior of Partial Prerendering clear and reproducible.

---

## License

MIT

```

This is pure GitHub Markdown: no MDX-only syntax, no JSX components outside code fences. You can save it as `README.md` and you’re done.
::contentReference[oaicite:0]{index=0}
```
