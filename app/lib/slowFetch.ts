import { headers } from "next/headers";

export async function slowFetch() {
  const h = await headers(); // ✅ headers() is async in Next 16
  const host = h.get("host");

  if (!host) {
    throw new Error("Unable to determine host");
  }

  // Use x-forwarded-proto when available (Vercel), fallback to http (local)
  const proto = h.get("x-forwarded-proto") ?? "http";

  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/slow`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch /api/slow (${res.status})`);
  }

  return res.json();
}
