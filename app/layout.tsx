import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const momumentExtended = localFont({
  src: [
    {
      path: "../fonts/monument-extended/MonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/monument-extended/MonumentExtended-Ultrabold.otf",
      weight: "800",
      style: "bold",
    },
  ],
});

// For this font, we want to add a variable so we will be able to use it into a css file
const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
});

// === SEO === //
export const metadata: Metadata = {
  title: "P-MWA",
  description: "Application pour gérer ses remboursements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${momumentExtended.className} ${redHatDisplay.variable}`}>
      <body
        className="bg-main-img bg-cover min-h-screen flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
