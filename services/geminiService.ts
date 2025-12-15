import { GoogleGenAI } from "@google/genai";

// Helper to safely get env var in browser or node environment
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env.API_KEY || '';
    }
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY || '';
    }
    return '';
  } catch (e) {
    return '';
  }
};

const API_KEY = getApiKey();

export const generateBrainrotDescription = async (itemName: string, condition: string): Promise<string> => {
  if (!API_KEY) {
    return "🔥 Description générée par IA non disponible (Clé API manquante sur le serveur). Mais t'inquiète, c'est du lourd.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Tu es un expert en marketing "Brainrot" et Gen Z pour une marketplace style Vinted.
      Génère une description de vente courte (max 3 phrases), drôle, chaotique et utilisant de l'argot internet actuel (skibidi, rizz, gyatt, aura, fanum tax, etc.) en Français.
      L'objet est : "${itemName}".
      L'état est : "${condition}".
      La description doit donner envie d'acheter mais être très drôle.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Description super hype indisponible pour le moment.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Wsh l'IA a crashé mais l'article est incroyable.";
  }
};