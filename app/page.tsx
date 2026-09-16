import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DollarBar from "@/components/DollarBar";
import ProductCard from "@/components/ProductCard";
import { Category, ProductLivePrice } from "@/lib/types";

export const revalidate = 0;

export default async function HomePage() {
  const [{ data: categories }, { data: products }, { data: banners }] =
    await Promise.all([
      supabase.from("categories").select("*").order("name_en"),
      supabase
        .from("products_live_price")
        .select("*")
        .order("base_price_usd", { ascending: true })
        .limit(6),
      supabase.from("banners").select("*").eq("active", true).order("sort_order"),
    ]);

  return (
    <div>
      <DollarBar />

      <div className="p-4">
        <h1 className="text-xl font-extrabold mb-1">Kam Bi Kam?</h1>
        <p className="text-black/50 text-sm mb-4">
          One fixed price, every shop in Juba
        </p>

        <Link
          href="/search"
          className="block w-full bg-white border-2 border-black/15 rounded-2xl px-4 py-3 text-black/40 font-semibold tap-target"
        >
          🔍 Fattish shinu? Cement, Sokar, iPhone...
        </Link>
      </div>

      {banners && banners.length > 0 && (
        <div className="px-4 mb-4">
          <div className="bg-kbkYellow rounded-2xl px-4 py-3 font-bold text-sm">
            {banners[0].image_text}
          </div>
        </div>
      )}

      <div className="px-4 mb-5">
        <h2 className="font-extrabold mb-2">Categories</h2>
        <div className="grid grid-cols-3 gap-2">
          {(categories as Category[] | null)?.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className="bg-white border-2 border-black/10 rounded-2xl py-3 flex flex-col items-center gap-1 tap-target"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-bold text-center leading-tight">
                {c.name_en}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-extrabold">Cheapest Today</h2>
        </div>
        <p className="text-xs text-black/50 mb-3">
          Same price in all shops · dollar rate fixed
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(products as ProductLivePrice[] | null)?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}