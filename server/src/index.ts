import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://culinary-api-frontend.onrender.com'
  ]
}));

app.use(express.json());

const ai = new GoogleGenAI({});

app.post('/api/baking-assistant', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required.' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Updated to the production standard Flash model
      contents: prompt,
      config: {
        systemInstruction: `You are a world-class, Michelin-starred executive chef. 
        Your mission is to help users cook five-star meals using clear, step-by-step instructions optimized for smartphones and PCs. 
        Break down elite culinary techniques into simple, highly precise actions.`,
        
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipeName: { type: Type.STRING },
            difficulty: { 
              type: Type.STRING, 
              enum: ["Easy", "Medium", "Advanced"] 
            },
            prepTime: { type: Type.STRING },
            cookTime: { type: Type.STRING },
            chefTip: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["recipeName", "difficulty", "prepTime", "cookTime", "chefTip", "ingredients", "instructions"]
        }
      }
    });

    const jsonText = response.text;

    if (!jsonText) {
      throw new Error('No content returned from Gemini.');
    }

    res.json({ result: jsonText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process baking prompt.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));