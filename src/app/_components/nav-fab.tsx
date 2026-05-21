"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navFabClass =
  "inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 font-[family-name:var(--mono)] text-[0.6875rem] font-medium tracking-[0.06em] text-[var(--paper)] uppercase no-underline shadow-[0_1px_2px_rgba(9,41,81,0.18),0_8px_24px_rgba(9,41,81,0.16)] transition-[background,border-color,color,transform] duration-150 ease-in-out hover:-translate-y-px hover:border-[var(--accent-muted)] hover:bg-[var(--accent-muted)] hover:text-[var(--paper)]";

export function NavFab() {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/chat");

  return (
    <div className="fixed top-10 right-4 z-50 flex items-center gap-2 max-md:top-4 max-md:right-4 print:hidden">
      {!isChat ? (
        <Link className={navFabClass} href="/cv.pdf" download prefetch={false}>
          PDF
        </Link>
      ) : null}
      <Link
        className={cn(
          navFabClass,
          !isChat &&
            "motion-safe:animate-nav-fab-attention hover:animate-none motion-reduce:animate-none",
        )}
        href={isChat ? "/" : "/chat"}
        prefetch
      >
        {isChat ? "CV" : "AI chat"}
      </Link>
    </div>
  );
}
