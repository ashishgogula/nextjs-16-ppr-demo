export const dynamic = "force-dynamic";

import { slowFetch } from "@/app/lib/slowFetch";

export default async function SlowData() {
  const data = await slowFetch();

  return (
    <div className="p-4 border rounded bg-gray-50 text-black">
      <p>{data.message}</p>
      <p className="text-sm text-gray-500">{data.time}</p>
    </div>
  );
}
