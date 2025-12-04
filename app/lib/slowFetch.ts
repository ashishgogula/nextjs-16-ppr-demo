export async function slowFetch() {
  const res = await fetch("/api/slow", {
    cache: "no-store",
  });

  const json = await res.json();
  return json;
}
