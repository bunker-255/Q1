import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const createHackerChat = (): Chat | null => {
  if (!ai) return null;
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Ты — "Zero", элитный ИИ-наставник по кибербезопасности и этичному хакингу для платформы ZeroDay Academy.
      Твой тон: технический, киберпанковый, слегка таинственный, но дружелюбный к новичкам. Используй сленг (эксплойт, пейлоад, бэкдор), но объясняй сложные вещи просто.
      
      Правила:
      1. ВСЕГДА напоминай об этике. Мы обучаем только "White Hat" (белых) хакеров.
      2. Не давай код для реального взлома или вредоносное ПО.
      3. Отвечай кратко, используя списки или код-блоки, если нужно.
      4. Если спрашивают о курсах, рекламируй курсы ZeroDay Academy (Web Pentesting, Network Security, Python for Hackers).
      `,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "Ошибка соединения с нейросетью. Попробуйте позже.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Сбой в матрице. Соединение разорвано.";
  }
};