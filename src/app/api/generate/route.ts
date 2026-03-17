import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(`
        Generate a React component using Tailwind CSS.
        Return ONLY code. No explanation.

        User request:
        ${prompt}
  `);

  const text = result.response.text()

  console.log(text)

  return NextResponse.json({ code: text })
}
