"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/post", label: "Add Shop", icon: "➕" },
  { href: "/my-shop", label: "My Shop", icon: "🏪" },
  { href: "/how", label: "How", icon: "❓" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[420px] bg-white border-t-2 border-kbkBlack flex">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-2 tap-target ${
              active ? "text-kbkBlack" : "text-black/40"
            }`}
          >
            <span
              className={`text-2xl ${
                active ? "" : "opacity-60"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-[11px] font-bold mt-0.5 ${
                active ? "text-kbkBlack" : "text-black/50"
              }`}
            >
              {item.label}
            </span>
            {active && (
              <span className="block w-8 h-1 bg-kbkYellow rounded-full mt-1" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}