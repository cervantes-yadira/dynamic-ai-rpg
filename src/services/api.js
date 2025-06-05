import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import { SYSTEM_INSTRUCTION, MAX_TOKENS } from '../config/constants.js'

dotenv.config()

const API_KEY = process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: API_KEY })
const chat = {
  system: [],
  user: []
}

async function handleDungeonPrompt(playerInput) {
  let result

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${playerInput}` }],
        },
      ],
      config: {
        maxOutputTokens: MAX_TOKENS,
      },
    })

    result = response?.candidates?.[0]?.content?.parts?.[0]?.text
  } catch (error) {
    console.error(error)
    return 'An error occurred while generating a response.'
  }

  appendChat('user', playerInput)
  appendChat('system', result)
  return result
}

const appendChat = (role, response) => {
  role === 'user' ? chat.user.push(response) : chat.system.push(response)
}

export default handleDungeonPrompt