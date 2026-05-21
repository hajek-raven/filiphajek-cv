"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  FetchUrlToolStatus,
  isFetchUrlToolPart,
} from "@/app/_components/fetch-url-tool-status";
import {
  CHAT_LIMIT_COPY,
  CHAT_LIMITS,
  countUserMessages,
} from "@/lib/chat-limits";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const suggestions = [
  "Shrň mi jaké má Filip technologické zkušenosti.",
  "Hodí se Filip k nám do firmy? Přiložím odkaz",
];

const chatGutter = "px-8 max-md:px-4";

export function AiChatPanel() {
  const [input, setInput] = useState("");
  const [limitNotice, setLimitNotice] = useState<string | null>(null);
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error) => {
      setLimitNotice(error.message);
    },
  });

  const userMessageCount = useMemo(
    () => countUserMessages(messages),
    [messages]
  );
  const atConversationLimit =
    userMessageCount >= CHAT_LIMITS.maxUserMessages;
  const inputTooLong = input.length > CHAT_LIMITS.maxMessageChars;
  const canSend =
    !atConversationLimit &&
    !inputTooLong &&
    status !== "submitted" &&
    status !== "streaming";

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const text = message.text.trim();
      if (!text || !canSend) {
        if (atConversationLimit) {
          setLimitNotice(CHAT_LIMIT_COPY.conversationLimit);
        } else if (text.length > CHAT_LIMITS.maxMessageChars) {
          setLimitNotice(CHAT_LIMIT_COPY.messageTooLong);
        }
        return;
      }

      setLimitNotice(null);
      sendMessage({ text });
      setInput("");
    },
    [atConversationLimit, canSend, sendMessage]
  );

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      if (!canSend || atConversationLimit) {
        setLimitNotice(CHAT_LIMIT_COPY.conversationLimit);
        return;
      }

      setLimitNotice(null);
      sendMessage({ text: suggestion });
    },
    [atConversationLimit, canSend, sendMessage]
  );

  const hasMessages = messages.length > 0;
  const remainingMessages = CHAT_LIMITS.maxUserMessages - userMessageCount;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header
        className={cn(
          "shrink-0 border-border border-b bg-[color-mix(in_srgb,var(--background)_88%,var(--muted))] pt-8 pb-5 max-md:pt-5 max-md:pb-3",
          chatGutter
        )}
      >
        <div className="flex items-center gap-5 max-md:items-start max-md:gap-3">
          <Image
            alt="Filip Hájek"
            className="size-[52px] shrink-0 rounded-full border border-border object-cover contrast-[1.03] grayscale-[15%] max-md:size-11"
            height={52}
            priority
            src="/photo.jpg"
            width={52}
          />
          <div className="min-w-0">
            <h1 className="mb-2 text-[1.3125rem] leading-tight font-medium tracking-[-0.02em] text-foreground max-md:text-lg">
              AI asistent Filipa
            </h1>
            <p className="max-w-[32em] text-[0.8125rem] leading-[1.55] text-muted-foreground">
              Odpovídám z obsahu CV. Umím načíst i JavaScriptové stránky (např. inzeráty).
            </p>
          </div>
        </div>
      </header>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent
          className={cn(
            "min-h-full flex-col gap-4 pt-5 pb-6 max-md:gap-2.5 max-md:pt-3 max-md:pb-4",
            chatGutter,
            hasMessages ? "justify-end" : "justify-center"
          )}
        >
          {!hasMessages ? (
            <ConversationEmptyState className="px-2 py-6 max-md:py-4">
              <p className="max-w-[22em] text-center text-[0.9375rem] leading-snug font-medium text-foreground">
                Dobrý den, zeptejte se mě na cokoli
              </p>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => (
              <div
                className={cn(
                  "flex w-full items-start gap-2.5",
                  message.role === "user" && "justify-end"
                )}
                key={message.id}
              >
                {message.role === "assistant" ? (
                  <Image
                    alt=""
                    aria-hidden
                    className="mt-0.5 size-9 shrink-0 rounded-full border border-border object-cover contrast-[1.03] grayscale-[15%]"
                    height={36}
                    src="/photo.jpg"
                    width={36}
                  />
                ) : null}
                <Message
                  className={cn(
                    "min-w-0 max-w-[min(100%,680px)]",
                    message.role === "assistant" && "w-full max-w-[min(100%,680px)]",
                    message.role === "user" &&
                      "max-w-[min(88%,560px)] max-md:max-w-[94%]"
                  )}
                  from={message.role}
                >
                  <MessageContent
                    className={
                      message.role === "assistant"
                        ? "w-full min-w-0 !bg-transparent !px-0 !py-0 !pl-0 text-[0.9375rem] leading-[1.65] text-foreground [&>*+*]:mt-3"
                        : "!ml-auto !rounded-[10px] !bg-[var(--accent-soft)] !px-3.5 !py-2.5 !text-[var(--accent)] group-[.is-user]:!bg-[var(--accent-soft)] group-[.is-user]:!text-[var(--accent)] leading-[1.55]"
                    }
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        const isStreaming =
                          (status === "streaming" || status === "submitted") &&
                          message.role === "assistant" &&
                          message.id === messages.at(-1)?.id;

                        return (
                          <MessageResponse
                            className="w-full min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                            isAnimating={isStreaming}
                            key={`${message.id}-${index}`}
                          >
                            {part.text}
                          </MessageResponse>
                        );
                      }

                      if (isFetchUrlToolPart(part)) {
                        return (
                          <FetchUrlToolStatus
                            key={`${message.id}-${index}`}
                            part={part}
                          />
                        );
                      }

                      return null;
                    })}
                  </MessageContent>
                </Message>
              </div>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton className="bottom-3 border-border bg-background shadow-[0_4px_16px_rgba(1,18,25,0.08)]" />
      </Conversation>

      <footer
        className={cn(
          "relative grid shrink-0 gap-3 border-border border-t bg-[color-mix(in_srgb,var(--background)_92%,var(--muted))] pt-5 pb-6 max-md:gap-2.5 max-md:pt-3 max-md:pb-4",
          chatGutter
        )}
      >
        {!atConversationLimit ? (
          <Suggestions className="gap-1.5 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
            {suggestions.map((suggestion) => (
              <Suggestion
                className="h-7 shrink-0 rounded-full border-border/80 bg-background/95 px-3 text-xs leading-none font-normal whitespace-nowrap shadow-[0_2px_10px_rgba(1,18,25,0.08),0_1px_2px_rgba(1,18,25,0.04)] backdrop-blur-sm transition-[box-shadow,background-color,border-color,color] hover:border-[color-mix(in_srgb,var(--ring)_45%,var(--border))] hover:bg-background hover:text-[var(--accent)] hover:shadow-[0_4px_16px_rgba(1,18,25,0.12)]"
                disabled={!canSend}
                key={suggestion}
                onClick={handleSuggestion}
                size="sm"
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
        ) : null}

        {limitNotice || atConversationLimit || inputTooLong ? (
          <p
            className="text-[0.75rem] leading-snug text-muted-foreground"
            role="status"
          >
            {limitNotice ??
              (atConversationLimit
                ? CHAT_LIMIT_COPY.conversationLimit
                : CHAT_LIMIT_COPY.messageTooLong)}
          </p>
        ) : remainingMessages <= 5 ? (
          <p className="text-[0.75rem] leading-snug text-muted-foreground">
            Zbývá {remainingMessages}{" "}
            {remainingMessages === 1
              ? "zpráva"
              : remainingMessages >= 2 && remainingMessages <= 4
                ? "zprávy"
                : "zpráv"}
            .
          </p>
        ) : null}

        <PromptInput
          className="w-full [&_[data-slot=input-group]]:relative [&_[data-slot=input-group]]:overflow-visible [&_[data-slot=input-group]]:rounded-[10px] [&_[data-slot=input-group]]:border-border [&_[data-slot=input-group]]:bg-background [&_[data-slot=input-group]]:shadow-[0_1px_2px_rgba(1,18,25,0.04),inset_0_1px_0_rgba(255,255,255,0.7)] [&_[data-slot=input-group]]:transition-[border-color,box-shadow] [&_[data-slot=input-group]]:duration-150 [&_[data-slot=input-group]:focus-within]:border-[color-mix(in_srgb,var(--ring)_55%,var(--border))] [&_[data-slot=input-group]:focus-within]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ring)_18%,transparent),0_1px_2px_rgba(1,18,25,0.04)]"
          onSubmit={handleSubmit}
        >
          <PromptInputBody>
            <PromptInputTextarea
              className="max-h-36 min-h-[4.25rem] resize-none px-3.5 pt-2.5 pb-11 text-[0.8125rem] leading-[1.55] max-md:min-h-16 max-md:px-3 max-md:pt-2.5 max-md:pr-12 max-md:pb-2.5"
              disabled={atConversationLimit}
              maxLength={CHAT_LIMITS.maxMessageChars}
              onChange={(event) => {
                setInput(event.target.value);
                if (limitNotice && event.target.value.length <= CHAT_LIMITS.maxMessageChars) {
                  setLimitNotice(null);
                }
              }}
              placeholder={
                atConversationLimit
                  ? "Limit zpráv dosažen"
                  : "Napište otázku…"
              }
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter className="absolute right-2.5 bottom-2.5 w-auto border-none p-0 max-md:right-2 max-md:bottom-2 [&_button]:size-8 [&_button]:rounded-[8px]">
            <PromptInputSubmit
              disabled={
                (atConversationLimit || !input.trim() || inputTooLong) &&
                status === "ready"
              }
              onStop={stop}
              status={status}
            />
          </PromptInputFooter>
        </PromptInput>
      </footer>
    </div>
  );
}
