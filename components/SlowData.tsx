import { slowFetch } from "@/app/lib/slowFetch";

export default async function SlowData() {
  const data = await slowFetch();

  return (
    <div className="rounded-xl border-purple-300 border-4 bg-white p-5 shadow-purple-300 shadow-md">
      <p className="text-neutral-900 font-medium">{data.message}</p>
      <p className="text-neutral-500 text-sm mt-1">{data.time}</p>
    </div>
  );
}
