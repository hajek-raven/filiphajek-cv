import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavFab } from "@/app/_components/nav-fab";
import { cvMeta } from "@/lib/cv-data";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: cvMeta.title,
  description: cvMeta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={cn(inter.variable, ibmPlexMono.variable, geist.variable)}>
      <body>
        <TooltipProvider>
          {children}
          <NavFab />
        </TooltipProvider>
      </body>
    </html>
  );
}
