import type { Locale } from "./config";

export type UiCopy = {
  nav: {
    pdf: string;
    cv: string;
    aiChat: string;
    language: string;
    tryMe: string;
  };
  chat: {
    pageTitle: string;
    pageDescription: string;
    title: string;
    subtitle: string;
    emptyState: string;
    suggestions: readonly [string, string];
    placeholder: string;
    placeholderLimit: string;
    remainingMessages: (count: number) => string;
    fetchUrl: {
      loading: string;
      loaded: string;
      failed: string;
      truncated: string;
    };
  };
  chatLimits: {
    messageTooLong: (maxChars: number) => string;
    conversationLimit: (maxMessages: number) => string;
  };
};

const uiCopyCs: UiCopy = {
  nav: {
    pdf: "PDF",
    cv: "CV",
    aiChat: "AI chat",
    language: "Jazyk",
    tryMe: "Vyzkoušej",
  },
  chat: {
    pageTitle: "AI chat — Filip Hájek",
    pageDescription:
      "Zeptejte se AI asistenta na cokoli o zkušenostech, projektech a tech stacku Filipa Hájka.",
    title: "AI asistent Filipa",
    subtitle:
      "Odpovídám z obsahu CV. Umím načíst i JavaScriptové stránky (např. inzeráty).",
    emptyState: "Dobrý den, zeptejte se mě na cokoli",
    suggestions: [
      "Shrň mi jaké má Filip technologické zkušenosti.",
      "Hodí se Filip k nám do firmy? Přiložím odkaz",
    ],
    placeholder: "Napište otázku…",
    placeholderLimit: "Limit zpráv dosažen",
    remainingMessages: (count) => {
      const word =
        count === 1 ? "zpráva" : count >= 2 && count <= 4 ? "zprávy" : "zpráv";
      return `Zbývá ${count} ${word}.`;
    },
    fetchUrl: {
      loading: "Načítám stránku v prohlížeči…",
      loaded: "Stránka načtena v prohlížeči",
      failed: "Načtení stránky selhalo",
      truncated: "Obsah byl zkrácen kvůli délce.",
    },
  },
  chatLimits: {
    messageTooLong: (maxChars) =>
      `Zpráva je příliš dlouhá (max. ${maxChars} znaků).`,
    conversationLimit: (maxMessages) =>
      `Dosáhli jste limitu ${maxMessages} zpráv v této konverzaci. Obnovte stránku pro nový chat.`,
  },
};

const uiCopyEn: UiCopy = {
  nav: {
    pdf: "PDF",
    cv: "CV",
    aiChat: "AI chat",
    language: "Language",
    tryMe: "Try me",
  },
  chat: {
    pageTitle: "AI chat — Filip Hájek",
    pageDescription:
      "Ask the AI assistant anything about Filip Hájek's experience, projects, and tech stack.",
    title: "Filip's AI assistant",
    subtitle:
      "I answer from the CV content. I can also load JavaScript pages (e.g. job listings).",
    emptyState: "Hello, ask me anything",
    suggestions: [
      "Summarize Filip's technical experience.",
      "Would Filip be a good fit for our company? I'll share a link",
    ],
    placeholder: "Type a question…",
    placeholderLimit: "Message limit reached",
    remainingMessages: (count) =>
      count === 1
        ? `${count} message remaining.`
        : `${count} messages remaining.`,
    fetchUrl: {
      loading: "Loading page in browser…",
      loaded: "Page loaded in browser",
      failed: "Failed to load page",
      truncated: "Content was truncated due to length.",
    },
  },
  chatLimits: {
    messageTooLong: (maxChars) =>
      `Message is too long (max. ${maxChars} characters).`,
    conversationLimit: (maxMessages) =>
      `You've reached the limit of ${maxMessages} messages in this conversation. Refresh the page to start a new chat.`,
  },
};

const uiCopyByLocale: Record<Locale, UiCopy> = {
  cs: uiCopyCs,
  en: uiCopyEn,
};

export function getUiCopy(locale: Locale): UiCopy {
  return uiCopyByLocale[locale];
}
