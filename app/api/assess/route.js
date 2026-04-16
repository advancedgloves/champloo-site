import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a lead qualification AI for champloo.ai, an AI consulting company that builds custom AI systems mixed into existing business operations. We deploy on local hardware, train on client data, and optimize for how each business already works — we never force them to adopt new software or change their workflows.

Given the lead data, provide a brief, direct, 3-4 sentence assessment of how AI could optimize their specific workflow and make their team more efficient. Be specific to their industry and pain point. Frame everything as making their existing operations faster and more efficient — empowering their team, not replacing anyone. End with one concrete next step.

Use direct, confident language — no buzzwords like "leverage", "paradigm", "ecosystem", or "cutting-edge". Respond in plain text, no markdown.`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, industry, size, pain } = body;

    // ─── Validate required fields ────────────────────────────
    if (!name || !email || !industry || !pain) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ─── Save lead to Supabase ───────────────────────────────
    const supabase = createServiceClient();
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "MISSING");
    console.log("Service key:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "MISSING");
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      industry,
      company_size: size,
      pain_point: pain,
      source: "ai_assessment",
      status: "new",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Don't block the assessment if DB fails — log it and continue
    }

    // ─── Call Claude for assessment ──────────────────────────
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Lead data:
Name: ${name}
Industry: ${industry}
Company size: ${size}
Biggest bottleneck: ${pain}

Give a short, specific assessment of how AI can optimize this workflow.`,
        },
      ],
    });

    const assessment =
      message.content
        ?.map((block) => (block.type === "text" ? block.text : ""))
        .join("") ||
      "Thanks for sharing that. We'll follow up within 24 hours with a detailed assessment.";

    return Response.json({ assessment });
  } catch (error) {
    console.error("Assessment API error:", error);
    return Response.json(
      {
        assessment:
          "Thanks for sharing that. We'll review your answers and follow up within 24 hours with a detailed assessment.",
      },
      { status: 200 } // Still return 200 with fallback message so UI doesn't break
    );
  }
}
