
import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

// The function handles AI service logic for bakery recommendations.
export const getBakeryRecommendation = async (userQuery: string): Promise<string> => {
  // Create a new instance right before the call to ensure it always uses the latest API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const menuContext = MOCK_PRODUCTS.map(p => `${p.name} (${p.category}): ${p.description} - ${p.price}₽`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: `
          Ты - опытный кондитер-консультант в пекарне "Эмани".
          У нас есть следующее меню:
          ${menuContext}

          Посоветуй что-нибудь из нашего меню на основе запроса пользователя. 
          Ответ должен быть кратким (до 50 слов), дружелюбным и аппетитным.
          Если запрос не связан с выпечкой, вежливо переведи тему на наши вкусные десерты.
        `,
      }
    });
    
    // Access the text property directly as per modern @google/genai guidelines.
    return response.text || "Извините, сейчас я не могу придумать совет. Попробуйте наш Медовик!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "В данный момент наш виртуальный помощник отдыхает. Попробуйте обновить страницу.";
  }
};
