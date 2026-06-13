import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Audio cache to optimize speed and API quota
const audioCache: Record<string, string> = {};

// Server-side Gemini API client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client initialized successfully.");
  } else {
    console.warn("No valid GEMINI_API_KEY found. Falling back to browser SpeechSynthesis.");
  }
} catch (error) {
  console.error("Error initializing Gemini API:", error);
}

// Text-to-Speech API
app.get("/api/tts", async (req, res) => {
  const { text } = req.query;
  if (!text || typeof text !== "string") {
    return res.status(400).send("Text is required");
  }

  const cleanText = text.trim();
  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    const googleRes = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
      }
    });
    if (!googleRes.ok) {
      throw new Error(`Google Translate TTS status error: ${googleRes.status}`);
    }
    const buffer = await googleRes.arrayBuffer();
    res.set({
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    return res.send(Buffer.from(buffer));
  } catch (err: any) {
    console.warn("GET tts stream error via Google, trying Youdao Dict fallback:", err.message);
    try {
      const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`;
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) {
        throw new Error(`Youdao Dict TTS status error: ${fallbackRes.status}`);
      }
      const buffer = await fallbackRes.arrayBuffer();
      res.set({
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      return res.send(Buffer.from(buffer));
    } catch (fallbackErr: any) {
      console.error("All server-side TTS engines failed:", fallbackErr.message);
      return res.status(500).send("Error generating audio stream");
    }
  }
});

app.post("/api/tts", async (req, res) => {
  const { text, voice = "Kore" } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid text provided" });
  }

  const cleanText = text.trim();
  const cacheKey = `${voice}:${cleanText}`;

  // Serve from cache if available
  if (audioCache[cacheKey]) {
    return res.json({ audio: audioCache[cacheKey] });
  }

  // Define a stable, zero-dependency server-side helper to fetch Google Translate/Youdao TTS
  const fetchTranslateTTS = async (phrase: string): Promise<string> => {
    try {
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(phrase)}`;
      const googleRes = await fetch(ttsUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
        }
      });
      if (!googleRes.ok) throw new Error(`Google status error: ${googleRes.status}`);
      const buffer = await googleRes.arrayBuffer();
      return Buffer.from(buffer).toString("base64");
    } catch (e: any) {
      console.warn("Google Translate TTS block inside fetchTranslateTTS, falling back to Youdao:", e.message || e);
      try {
        const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(phrase)}&type=2`;
        const fallbackRes = await fetch(fallbackUrl);
        if (!fallbackRes.ok) {
          throw new Error(`Youdao status error: ${fallbackRes.status}`);
        }
        const buffer = await fallbackRes.arrayBuffer();
        return Buffer.from(buffer).toString("base64");
      } catch (err: any) {
        console.error("All server-side fetch helpers failed:", err.message || err);
        throw err;
      }
    }
  };

  if (!ai) {
    // If Gemini client isn't available, automatically fallback to Google Translate TTS which is 100% reliable and doesn't require keys
    try {
      const base64Audio = await fetchTranslateTTS(cleanText);
      audioCache[cacheKey] = base64Audio;
      return res.json({ audio: base64Audio });
    } catch (e: any) {
      console.error("Translate TTS direct generation error:", e.message || e);
    }
    return res.json({ fallback: true, message: "Gemini API key not configured. Using Web Speech API." });
  }

  try {
    const prompt = `Say clearly, slowly, and in a friendly voice suitable for primary school children learning English: ${cleanText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice as any },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      audioCache[cacheKey] = base64Audio;
      return res.json({ audio: base64Audio });
    } else {
      throw new Error("No audio content returned from Gemini Live TTS");
    }
  } catch (error: any) {
    console.error("Gemini TTS Error, switching back to elegant translate TTS:", error.message || error);
    try {
      const base64Audio = await fetchTranslateTTS(cleanText);
      audioCache[cacheKey] = base64Audio;
      return res.json({ audio: base64Audio });
    } catch (e: any) {
      console.error("Translate TTS secondary generation error:", e.message || e);
    }
    return res.json({ fallback: true, error: error.message || "Failed to generate audio via Gemini" });
  }
});

// AI Chatbot endpoint for interactive English partner roleplay
app.post("/api/chat", async (req, res) => {
  const { message, character = "Ahmed", history = [] } = req.body;

  if (!ai) {
    // Simulated simple responses if Gemini key is missing
    const promptLower = (message || "").toLowerCase();
    let reply = "Hello! Let's practice English together!";
    if (promptLower.includes("hello") || promptLower.includes("hi")) {
      reply = `Hello! I am ${character}. Welcome to SMILE English, Lesson 1! What is your name?`;
    } else if (promptLower.includes("name")) {
      reply = "That is a beautiful name! Nice to meet you! Happy studying!";
    } else if (promptLower.includes("how are you")) {
      reply = "I'm fine, thank you! How are you?";
    } else if (promptLower.includes("bye") || promptLower.includes("goodbye")) {
      reply = "Goodbye! See you soon!";
    }
    return res.json({ text: reply });
  }

  try {
    const chatHistory = history.map((h: any) => ({
      role: h.role, // "user" or "model"
      parts: [{ text: h.text }],
    }));

    const systemInstruction = `You are ${character}, a friendly Sudanese Grade 3 student from the SMILE English Pupil's Book (Sudan Modern Integrated Learning of English).
You only speak very simple, correct English suited for primary school children (8-9 years old).
Encourage the kid to practice, use simple sentences, correct their spelling/grommar gently, and keep answers under 2 sentences. Include friendly cheerful sounds like "Wow!", "Excellent!", or "Great job!"`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message });
    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return res.status(500).json({ error: error.message || "Failed to respond." });
  }
});

// Configure Vite middleware or production build output
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pupil SMILE English Grade 3 Server running on http://localhost:${PORT}`);
  });
};

startServer();
