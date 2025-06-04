import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import { SYSTEM_INSTRUCTION } from '../config/constants.js'

dotenv.config()

const API_KEY = process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: API_KEY })

async function handleDungeonPrompt(playerInput) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${playerInput}` }],
        },
      ],
    })

    const result = response?.candidates?.[0]?.content?.parts?.[0]?.text
    return result || 'No response received from the model.'
  } catch (error) {
    console.error(error)
    return 'An error occurred while generating a response.'
  }
}

export default handleDungeonPrompt