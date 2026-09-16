import { supabase } from "@/lib/supabase";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hrs = Math.floor(diffMs / 3600000);
  if (hrs < 1) return "just now";
  if (hrs === 1) return "1 hour ago";
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}

export default async function DollarBar() {
  const { data } = await supabase
    .from("settings")
    .select("dollar_rate_ssp, last_updated, updated_by")
    .eq("id", 1)
    .single();

  const rate = data?.dollar_rate_ssp ?? 0;
  const updated = data?.last_updated ? timeAgo(data.last_updated) : "";

  return (
    <div className="bg-kbkBlack text-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-kbkYellow font-extrabold text-base leading-tight">
            💵 Dollar al youm: {rate.toLocaleString("en-US")} SSP
          </p>
          <p className="text-white/70 text-xs mt-0.5">
            Updated {updated} by Kam Bi Kam Admin
          </p>
        </div>
      </div>
      <p className="text-white/60 text-xs mt-1">
        All prices auto updated based on this rate
      </p>
    </div>
  );
}