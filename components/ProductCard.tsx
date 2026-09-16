import Link from "next/link";
import { ProductLivePrice, formatSSP } from "@/lib/types";

export default function ProductCard({ product }: { product: ProductLivePrice }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white border-2 border-black/10 rounded-2xl p-3 tap-target"
    >
      <div className="text-3xl mb-1">{product.photo_icon}</div>
      <p className="font-extrabold text-sm leading-tight">{product.name}</p>
      {product.name_ar && (
        <p className="text-black/50 text-xs" dir="rtl">
          {product.name_ar}
        </p>
      )}
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-extrabold text-kbkBlack">
          {formatSSP(product.calculated_ssp)}
        </span>
      </div>
      <p className="text-[11px] text-black/40 mt-0.5">
        ${product.base_price_usd.toFixed(2)} fixed · same in all shops
      </p>
    </Link>
  );
}