"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

function checkPassword(password: string) {
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Wrong admin password");
  }
}

export async function adminLogin(password: string) {
  checkPassword(password);
  return { ok: true };
}

// --- Dollar rate ---------------------------------------------------
export async function updateDollarRate(password: string, newRate: number) {
  checkPassword(password);
  const { error } = await supabaseAdmin.rpc("set_dollar_rate", {
    new_rate: newRate,
    admin_name: "Kam Bi Kam Admin",
  });
  if (error) throw new Error(error.message);

  const { count } = await supabaseAdmin
    .from("products")
    .select("*", { count: "exact", head: true });

  return { ok: true, updatedCount: count ?? 0, newRate };
}

export async function getSettings() {
  const { data } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();
  return data;
}

// --- Products --------------------------------------------------------
export async function addProduct(
  password: string,
  payload: {
    name: string;
    name_ar?: string;
    category_id: string;
    unit: string;
    base_price_usd: number;
    photo_icon?: string;
  }
) {
  checkPassword(password);
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name: payload.name,
      name_ar: payload.name_ar || null,
      category_id: payload.category_id,
      unit: payload.unit,
      base_price_usd: payload.base_price_usd,
      photo_icon: payload.photo_icon || "📦",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  const { data: settings } = await supabaseAdmin
    .from("settings")
    .select("dollar_rate_ssp")
    .eq("id", 1)
    .single();
  if (settings) {
    await supabaseAdmin.from("prices_history").insert({
      product_id: data.id,
      dollar_rate: settings.dollar_rate_ssp,
      calculated_ssp: Math.round(payload.base_price_usd * settings.dollar_rate_ssp),
    });
  }
  return { ok: true, product: data };
}

export async function updateProductPrice(
  password: string,
  productId: string,
  newUsdPrice: number
) {
  checkPassword(password);
  const { error } = await supabaseAdmin
    .from("products")
    .update({ base_price_usd: newUsdPrice })
    .eq("id", productId);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function listProducts() {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*, categories(name_en)")
    .order("name");
  return data || [];
}

// --- Shops & payments --------------------------------------------------
export async function listPendingPayments() {
  const { data } = await supabaseAdmin
    .from("payments_pending")
    .select("*, shops(shop_name, phone)")
    .eq("status", "pending")
    .order("submitted_at", { ascending: false });
  return data || [];
}

export async function approvePayment(password: string, paymentId: string) {
  checkPassword(password);
  const { data: payment, error: findErr } = await supabaseAdmin
    .from("payments_pending")
    .select("*")
    .eq("id", paymentId)
    .single();
  if (findErr || !payment) throw new Error("Payment not found");

  const days = payment.plan === "week" ? 7 : 30;
  const expires = new Date(Date.now() + days * 86400000).toISOString();

  await supabaseAdmin
    .from("shops")
    .update({ is_top: true, top_expires_at: expires })
    .eq("id", payment.shop_id);

  await supabaseAdmin
    .from("payments_pending")
    .update({ status: "approved" })
    .eq("id", paymentId);

  return { ok: true };
}

export async function rejectPayment(password: string, paymentId: string) {
  checkPassword(password);
  await supabaseAdmin
    .from("payments_pending")
    .update({ status: "rejected" })
    .eq("id", paymentId);
  return { ok: true };
}

export async function listShops() {
  const { data } = await supabaseAdmin
    .from("shops")
    .select("*")
    .order("shop_name");
  return data || [];
}

export async function verifyShop(password: string, shopId: string, verified: boolean) {
  checkPassword(password);
  await supabaseAdmin.from("shops").update({ is_verified: verified }).eq("id", shopId);
  return { ok: true };
}

export async function listCategories() {
  const { data } = await supabaseAdmin.from("categories").select("*").order("name_en");
  return data || [];
}