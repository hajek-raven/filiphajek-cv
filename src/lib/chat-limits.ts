import type { UIMessage } from "ai";

export const CHAT_LIMITS = {
  /** Max user turns per conversation (portfolio demo / abuse protection). */
  maxUserMessages: 20,
  /** Max characters in a single user message. */
  maxMessageChars: 2000,
  /** Messages sent to the model (user + assistant + tools). */
  maxContextMessages: 40,
} as const;

export const CHAT_LIMIT_COPY = {
  messageTooLong: `Zpráva je příliš dlouhá (max. ${CHAT_LIMITS.maxMessageChars} znaků).`,
  conversationLimit: `Dosáhli jste limitu ${CHAT_LIMITS.maxUserMessages} zpráv v této konverzaci. Obnovte stránku pro nový chat.`,
} as const;

export function countUserMessages(messages: UIMessage[]): number {
  return messages.filter((message) => message.role === "user").length;
}

export function getLastUserMessageText(messages: UIMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role !== "user") {
      continue;
    }

    return message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  return "";
}

export function trimMessagesForContext(messages: UIMessage[]): UIMessage[] {
  const { maxContextMessages } = CHAT_LIMITS;
  if (messages.length <= maxContextMessages) {
    return messages;
  }

  return messages.slice(-maxContextMessages);
}

export type ChatLimitErrorCode = "MESSAGE_TOO_LONG" | "CONVERSATION_LIMIT";

export function chatLimitErrorResponse(code: ChatLimitErrorCode): Response {
  const message =
    code === "MESSAGE_TOO_LONG"
      ? CHAT_LIMIT_COPY.messageTooLong
      : CHAT_LIMIT_COPY.conversationLimit;

  return Response.json({ error: code, message }, { status: 429 });
}
