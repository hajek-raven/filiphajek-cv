import { fetchUrlTool } from "@/lib/tools/fetch-url";
import { buildCvSystemPrompt } from "@/lib/cv-context";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    system: buildCvSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: {
      fetchUrl: fetchUrlTool,
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
