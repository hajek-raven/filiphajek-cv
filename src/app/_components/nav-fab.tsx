"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import {
  getLocaleFromPathname,
  localeLabels,
  localePath,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import { getUiCopy } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

const navFabClass =
  "inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 font-[family-name:var(--mono)] text-[0.6875rem] font-medium tracking-[0.06em] text-[var(--paper)] uppercase no-underline shadow-[0_1px_2px_rgba(9,41,81,0.18),0_8px_24px_rgba(9,41,81,0.16)] transition-[background,border-color,color,transform] duration-150 ease-in-out hover:-translate-y-px hover:border-[var(--accent-muted)] hover:bg-[var(--accent-muted)] hover:text-[var(--paper)]";

const langButtonClass =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border font-[family-name:var(--mono)] text-[0.625rem] font-medium tracking-[0.04em] uppercase no-underline transition-[background,border-color,color,transform] duration-150 ease-in-out hover:-translate-y-px";

function TryMeCallout({ label }: { label: string }) {
  const markerId = `try-me-${useId().replace(/:/g, "")}`;

  return (
    <div aria-hidden className="nav-try-me hidden md:block">
      <svg
        className="nav-try-me__arrow"
        fill="none"
        viewBox="200 240 230 290"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id={markerId}
            markerHeight="7"
            markerWidth="7"
            orient="auto"
            refX="3.5"
            refY="3.5"
            viewBox="0 0 7 7"
          >
            <polyline
              fill="none"
              points="0,3.5 3.5,1.75 0,0"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.1666666666666667"
              transform="matrix(1,0,0,1,1.1666666666666667,1.75)"
            />
          </marker>
        </defs>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
          transform="matrix(-0.7880107536067222,-0.6156614753256578,0.6156614753256578,-0.7880107536067222,448.93971131242574,961.4688915729521)"
        >
          <path
            d="M310 323.3520908355713Q475 222.3520908355713 490 503.3520908355713"
            markerEnd={`url(#${markerId})`}
          />
        </g>
      </svg>
      <span className="nav-try-me__text">{label}</span>
    </div>
  );
}

export function NavFab() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = getUiCopy(locale).nav;
  const isChat = pathname.endsWith("/chat");

  return (
    <nav
      className={cn(
        "site-nav print:hidden",
        "md:relative md:flex md:items-center md:justify-end md:gap-2 md:overflow-visible",
        "max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-50 max-md:flex max-md:justify-center max-md:px-4 max-md:pt-2 max-md:pb-[max(0.75rem,env(safe-area-inset-bottom))]",
      )}
    >
      <div
        className={cn(
          "flex max-w-full items-center gap-1.5 md:gap-2 md:overflow-visible max-md:overflow-x-auto",
          "max-md:rounded-full max-md:border max-md:border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] max-md:bg-[color-mix(in_srgb,var(--paper)_90%,var(--background))] max-md:p-1 max-md:shadow-[0_8px_32px_rgba(9,41,81,0.2),0_2px_8px_rgba(9,41,81,0.1)] max-md:backdrop-blur-md max-md:supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--paper)_78%,transparent)]",
        )}
      >
        <div
          aria-label={ui.language}
          className="flex items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[color-mix(in_srgb,var(--paper)_92%,var(--background))] p-1 shadow-[0_1px_2px_rgba(9,41,81,0.08)] max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:shadow-none"
          role="group"
        >
          {locales.map((targetLocale) => {
            const isActive = locale === targetLocale;

            return (
              <Link
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  langButtonClass,
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)] shadow-[0_1px_2px_rgba(9,41,81,0.12)]"
                    : "border-transparent bg-transparent text-[var(--accent)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:bg-[color-mix(in_srgb,var(--accent-soft)_70%,transparent)]",
                )}
                href={switchLocalePath(pathname, targetLocale as Locale)}
                key={targetLocale}
                prefetch
              >
                {localeLabels[targetLocale as Locale]}
              </Link>
            );
          })}
        </div>

        {!isChat ? (
          <Link className={navFabClass} href="/cv.pdf" download prefetch={false}>
            {ui.pdf}
          </Link>
        ) : null}

        <div className="relative flex items-center overflow-visible">
          <Link
            className={cn(
              navFabClass,
              !isChat &&
                "motion-safe:animate-nav-fab-attention hover:animate-none motion-reduce:animate-none",
            )}
            href={isChat ? localePath(locale) : localePath(locale, "chat")}
            prefetch
          >
            {isChat ? ui.cv : ui.aiChat}
          </Link>
          {!isChat ? <TryMeCallout label={ui.tryMe} /> : null}
        </div>
      </div>
    </nav>
  );
}
