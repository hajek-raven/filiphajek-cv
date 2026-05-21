import { cn } from "@/lib/utils";
import { GlobeIcon, Loader2Icon } from "lucide-react";

type FetchUrlToolPart = {
  type: "tool-fetchUrl";
  state: string;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

const toolBaseClassName =
  "flex items-start gap-3 rounded-[10px] border px-4 py-3 bg-[color-mix(in_srgb,var(--background)_90%,var(--muted))]";

const iconClassName =
  "mt-0.5 size-4 shrink-0 text-muted-foreground";

const labelClassName =
  "mb-0.5 text-[0.625rem] font-medium tracking-[0.08em] text-muted-foreground uppercase [font-family:var(--mono)]";

function getFetchUrl(part: FetchUrlToolPart): string | undefined {
  if (
    part.state === "input-available" ||
    part.state === "output-available" ||
    part.state === "output-error"
  ) {
    const input = part.input as { url?: string } | undefined;
    return input?.url;
  }

  return undefined;
}

export function FetchUrlToolStatus({ part }: { part: FetchUrlToolPart }) {
  const url = getFetchUrl(part);

  if (part.state === "output-error") {
    return (
      <div
        className={cn(
          toolBaseClassName,
          "border-[color-mix(in_srgb,var(--destructive)_35%,var(--border))]"
        )}
      >
        <GlobeIcon aria-hidden className={iconClassName} />
        <div className="min-w-0">
          <p className={labelClassName}>Načtení stránky selhalo</p>
          {url ? (
            <p className="text-[0.8125rem] leading-snug break-words text-foreground">
              {url}
            </p>
          ) : null}
          <p className="mt-1 text-[0.6875rem] leading-snug text-muted-foreground">
            {part.errorText}
          </p>
        </div>
      </div>
    );
  }

  if (part.state === "output-available") {
    const output = part.output as {
      title?: string | null;
      url?: string;
      truncated?: boolean;
      method?: "fetch" | "browser";
    };

    return (
      <div
        className={cn(
          toolBaseClassName,
          "border-[color-mix(in_srgb,var(--ring)_35%,var(--border))]"
        )}
      >
        <GlobeIcon aria-hidden className={iconClassName} />
        <div className="min-w-0">
          <p className={labelClassName}>Stránka načtena v prohlížeči</p>
          <p className="text-[0.8125rem] leading-snug break-words text-foreground">
            {output.title ?? output.url ?? url}
          </p>
          {output.truncated ? (
            <p className="mt-1 text-[0.6875rem] leading-snug text-muted-foreground">
              Obsah byl zkrácen kvůli délce.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(toolBaseClassName, "text-muted-foreground")}>
      <Loader2Icon
        aria-hidden
        className={cn(iconClassName, "animate-spin")}
      />
      <div className="min-w-0">
        <p className={labelClassName}>Načítám stránku v prohlížeči…</p>
        {url ? (
          <p className="text-[0.8125rem] leading-snug break-words text-foreground">
            {url}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function isFetchUrlToolPart(part: {
  type: string;
}): part is FetchUrlToolPart {
  return part.type === "tool-fetchUrl";
}
