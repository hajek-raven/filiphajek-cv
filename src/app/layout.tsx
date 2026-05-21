import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavFab } from "@/app/_components/nav-fab";
import { getCvData } from "@/lib/i18n/cv-data";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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

const { meta } = getCvData("cs");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={cn(inter.variable, ibmPlexMono.variable, geist.variable)}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip py-4 md:px-4 max-md:pt-0">
        <TooltipProvider>
          <div className="site mx-auto flex w-full max-w-[940px] flex-1 flex-col gap-3 overflow-visible max-md:max-w-none max-md:gap-0">
            <NavFab />
            {children}
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
