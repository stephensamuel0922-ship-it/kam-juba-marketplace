export type Category = {
  id: string;
  name_en: string;
  name_ar: string;
  icon: string;
};

export type Settings = {
  id: number;
  dollar_rate_ssp: number;
  last_updated: string;
  updated_by: string | null;
};

export type Product = {
  id: string;
  name: string;
  name_ar: string | null;
  category_id: string;
  unit: string;
  base_price_usd: number;
  photo_icon: string;
  description: string | null;
};

export type ProductLivePrice = Product & {
  dollar_rate_ssp: number;
  calculated_ssp: number;
};

export type Shop = {
  id: string;
  shop_name: string;
  category_id: string;
  market: string;
  phone: string;
  whatsapp: string | null;
  location_text: string | null;
  is_verified: boolean;
  is_top: boolean;
  top_expires_at: string | null;
  call_count: number;
};

export type ShopProduct = {
  id: string;
  shop_id: string;
  product_id: string;
  in_stock: boolean;
  added_at: string;
};

export function formatSSP(n: number): string {
  return n.toLocaleString("en-US") + " SSP";
}