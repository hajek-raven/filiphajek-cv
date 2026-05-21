import {
  CHAT_LIMITS,
  chatLimitErrorResponse,
  countUserMessages,
  getLastUserMessageText,
  trimMessagesForContext,
} from "@/lib/chat-limits";
import { fetchUrlTool } from "@/lib/tools/fetch-url";
import { buildCvSystemPrompt } from "@/lib/cv-context";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (countUserMessages(messages) > CHAT_LIMITS.maxUserMessages) {
    return chatLimitErrorResponse("CONVERSATION_LIMIT");
  }

  const lastUserText = getLastUserMessageText(messages);
  if (lastUserText.length > CHAT_LIMITS.maxMessageChars) {
    return chatLimitErrorResponse("MESSAGE_TOO_LONG");
  }

  const contextMessages = trimMessagesForContext(messages);

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    system: buildCvSystemPrompt(),
    messages: await convertToModelMessages(contextMessages),
    tools: {
      fetchUrl: fetchUrlTool,
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
