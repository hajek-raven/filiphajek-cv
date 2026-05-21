export const locales = ["cs", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "cs";

export const localeLabels: Record<Locale, string> = {
  cs: "CS",
  en: "EN",
};

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "cs";
}

export function localePath(
  locale: Locale,
  segment: "" | "chat" = "",
): string {
  const suffix = segment ? `/${segment}` : "";
  return locale === "cs" ? suffix || "/" : `/en${suffix}`;
}

export function switchLocalePath(
  pathname: string,
  targetLocale: Locale,
): string {
  const isChat = pathname.endsWith("/chat");
  return localePath(targetLocale, isChat ? "chat" : "");
}
