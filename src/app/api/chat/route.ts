import {
  CHAT_LIMITS,
  chatLimitErrorResponse,
  countUserMessages,
  getLastUserMessageText,
  trimMessagesForContext,
} from "@/lib/chat-limits";
import { buildCvSystemPrompt } from "@/lib/cv-context";
import { locales, type Locale } from "@/lib/i18n/config";
import { fetchUrlTool } from "@/lib/tools/fetch-url";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 60;

function parseLocale(value: unknown): Locale {
  if (typeof value === "string" && locales.includes(value as Locale)) {
    return value as Locale;
  }

  return "cs";
}

export async function POST(req: Request) {
  const {
    messages,
    locale: rawLocale,
  }: { messages: UIMessage[]; locale?: unknown } = await req.json();
  const locale = parseLocale(rawLocale);

  if (countUserMessages(messages) > CHAT_LIMITS.maxUserMessages) {
    return chatLimitErrorResponse("CONVERSATION_LIMIT", locale);
  }

  const lastUserText = getLastUserMessageText(messages);
  if (lastUserText.length > CHAT_LIMITS.maxMessageChars) {
    return chatLimitErrorResponse("MESSAGE_TOO_LONG", locale);
  }

  const contextMessages = trimMessagesForContext(messages);

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    system: buildCvSystemPrompt(locale),
    messages: await convertToModelMessages(contextMessages),
    tools: {
      fetchUrl: fetchUrlTool,
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
