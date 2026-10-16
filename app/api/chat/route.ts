import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_META_PROMPT, SITUATION_PROMPTS } from "@/lib/counselor-data";

export async function POST(req: NextRequest) {
  try {
    const { messages, situationId } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "메시지가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Build chat history for Gemini API
    // Format contents as user / model turns
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (!apiKey) {
      // Graceful fallback if API key is temporarily unavailable
      if (situationId) {
        const found = SITUATION_PROMPTS.find((s) => s.id === situationId);
        if (found) {
          return NextResponse.json({
            text: found.sampleResponse,
            source: "preset",
          });
        }
      }
      return NextResponse.json({
        text: "남의 마음을 하루 종일 담아내는 일이잖아요.\n지치는 게 당연해요.\n오히려 지치지 않는다면 그게 더 이상한 거예요.\n\n잠깐 내려놓아도 괜찮아요. 여기서만큼은요.",
        source: "preset",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_META_PROMPT,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const replyText = response.text || "그 무게를 다 알지는 못하지만, 지금 여기서 듣고 있을게요.";

    return NextResponse.json({
      text: replyText,
      source: "gemini",
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    // Graceful empathetic response in case of error
    return NextResponse.json(
      {
        text: "남의 마음을 종일 담아내는 일이잖아요. 지치는 게 당연해요. 그 무게, 혼자 다 안고 계셨군요. 잠깐 내려놓아도 괜찮아요. 여기서만큼은요.",
        source: "fallback",
      },
      { status: 200 }
    );
  }
}
