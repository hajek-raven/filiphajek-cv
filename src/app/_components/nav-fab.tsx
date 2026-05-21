"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavFab() {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/chat");

  return (
    <div className="nav-actions">
      {!isChat ? (
        <button
          className="nav-fab"
          onClick={() => window.print()}
          type="button"
        >
          Tisk
        </button>
      ) : null}
      <Link
        className={cn("nav-fab", !isChat && "nav-fab--promo")}
        href={isChat ? "/" : "/chat"}
        prefetch
      >
        {isChat ? "CV" : "AI chat"}
      </Link>
    </div>
  );
}
