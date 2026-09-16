import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Kam Bi Kam? — Juba Fixed Price",
  description:
    "Kam Bi Kam? Juba Fixed Price System — one fair price for every shop in Juba, updated daily with the dollar rate.",
  manifest: "/manifest.json",
  applicationName: "Kam Bi Kam",
};

export const viewport: Viewport = {
  themeColor: "#FFD60A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <div className="container-mobile">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}