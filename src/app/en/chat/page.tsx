import type { Metadata } from "next";
import { AiChatPanel } from "../../_components/ai-chat-panel";
import { getUiCopy } from "@/lib/i18n/ui";

const ui = getUiCopy("en");

export const metadata: Metadata = {
  title: ui.chat.pageTitle,
  description: ui.chat.pageDescription,
};

export default function EnChatPage() {
  return (
    <div className="page ai-mode flex min-h-[min(calc(100dvh-9rem),840px)] flex-1 flex-col print:hidden max-md:min-h-dvh max-md:border-none max-md:rounded-none max-md:shadow-none">
        <div className="page-deco" aria-hidden="true">
          <div className="page-deco__dots" />
          <div className="page-deco__glow page-deco__glow--1" />
          <div className="page-deco__glow page-deco__glow--2" />
        </div>
      <AiChatPanel locale="en" />
    </div>
  );
}
