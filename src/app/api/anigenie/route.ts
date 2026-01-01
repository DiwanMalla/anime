import { NextRequest, NextResponse } from "next/server";
import { askAniGenie } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, history } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await askAniGenie(prompt, history || []);
    return NextResponse.json(response);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
