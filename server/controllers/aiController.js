import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are a productivity dashboard assistant. Be precise and helpful."
});

// --- OpenAI Handler ---
export const handleAI = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ 
      reply: completion.choices[0].message.content,
      source: "openai" 
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "OpenAI failed to respond" });
  }
};

// --- Gemini Handler ---
export const handleGemini = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    res.json({ 
      success: true,
      reply,
      source: "gemini-flash" 
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Gemini failed to respond" });
  }
};