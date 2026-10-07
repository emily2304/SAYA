// src/services/chat.service.ts
import OpenAI from "openai";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// Cliente OpenAI (ChatGPT)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



/**
 * Llama a OpenAI ChatGPT
 */
export async function callOpenAI(prompt: string): Promise<string|null> {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return res.choices[0].message.content;
}

/**
 * Llama a DeepSeek–R1 vía OpenRouter (gratis e ilimitado)
 */
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"; // Cliente DeepSeek-R1 vía OpenRouter
   const routerKey = process.env.OPENROUTER_API_KEY!;

   export async function callDeepSeek(prompt: string): Promise<string> {
     const resp = await fetch(OPENROUTER_URL, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${routerKey}`,
       },
       body: JSON.stringify({
         model: "deepseek/deepseek-r1:free",
         messages: [{ role: "user", content: prompt }],
       }),
     });
     if (!resp.ok) {
       const err = await resp.json();
       throw new Error(`OpenRouter error ${resp.status}: ${err.error?.message}`);
     }
     const data = await resp.json();
     return data.choices[0].message.content;
   }

