import type { Metadata } from "next";
import { AiChatPanel } from "../_components/ai-chat-panel";

export const metadata: Metadata = {
  title: "AI chat — Filip Hájek",
  description:
    "Zeptejte se AI asistenta na cokoli o zkušenostech, projektech a tech stacku Filipa Hájka.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-[940px] print:hidden max-md:max-w-none">
      <div className="page ai-mode flex min-h-[min(calc(100dvh-5rem),840px)] flex-col max-md:min-h-[calc(100dvh-1rem)] max-md:border-none max-md:rounded-none max-md:shadow-none">
        <div className="page-deco" aria-hidden="true">
          <div className="page-deco__dots" />
          <div className="page-deco__glow page-deco__glow--1" />
          <div className="page-deco__glow page-deco__glow--2" />
        </div>
        <AiChatPanel />
      </div>
    </div>
  );
}
