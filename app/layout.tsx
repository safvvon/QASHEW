import type { Metadata } from "next";
import "./globals.css";
import "./legacy.css";
import Script from "next/script";
import SmoothScroller from "../components/SmoothScroller";

export const metadata: Metadata = {
  title: "Qashew | The Art of Premium Cashews",
  description: "World-class gourmet cashews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroller>
          {children}
        </SmoothScroller>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
