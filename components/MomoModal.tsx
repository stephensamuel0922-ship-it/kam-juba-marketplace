"use client";

import { useState } from "react";

const MOMO_NUMBER = process.env.NEXT_PUBLIC_MOMO_NUMBER || "0926058145";
const MOMO_NAME = process.env.NEXT_PUBLIC_MOMO_NAME || "Steven";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "211926058145";

export default function MomoModal({
  open,
  onClose,
  amountLabel,
  onSubmitTxId,
}: {
  open: boolean;
  onClose: () => void;
  amountLabel: string;
  onSubmitTxId: (txid: string) => void;
}) {
  const [txid, setTxid] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
      <div className="w-full max-w-[420px] bg-white rounded-t-2xl p-5 border-t-4 border-kbkYellow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-extrabold">Pay with MoMo</h3>
          <button onClick={onClose} className="text-2xl leading-none px-2 tap-target">
            ×
          </button>
        </div>

        <div className="bg-kbkYellow/20 border-2 border-kbkYellow rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-black/70">Amount</p>
          <p className="text-xl font-extrabold">{amountLabel}</p>
          <div className="h-px bg-black/10 my-3" />
          <p className="text-sm font-bold text-black/70">Send MoMo to</p>
          <p className="text-2xl font-extrabold tracking-wide">{MOMO_NUMBER}</p>
          <p className="text-sm text-black/60">MTN — {MOMO_NAME}</p>
        </div>

        <label className="text-sm font-bold block mb-1">
          Transaction ID (TxID) from your MoMo receipt
        </label>
        <input
          value={txid}
          onChange={(e) => setTxid(e.target.value)}
          placeholder="e.g. MP240915.1022.A12345"
          className="w-full border-2 border-black/20 rounded-xl px-4 py-3 mb-3 text-base tap-target"
        />

        <button
          disabled={!txid.trim()}
          onClick={() => onSubmitTxId(txid.trim())}
          className="w-full bg-kbkBlack text-white font-extrabold rounded-xl py-3 tap-target disabled:opacity-40"
        >
          Submit for approval
        </button>

        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
            `Kam Bi Kam payment - TxID: ${txid || "___"} - Amount: ${amountLabel}`
          )}`}
          target="_blank"
          className="block text-center mt-3 text-sm font-bold text-kbkGreen underline tap-target"
        >
          Also send receipt on WhatsApp →
        </a>

        <p className="text-xs text-black/50 mt-3 text-center">
          Admin will approve your payment and activate TOP within a few hours.
        </p>
      </div>
    </div>
  );
}