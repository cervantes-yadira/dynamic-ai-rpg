import { Groq } from 'groq-sdk'
import { GoogleGenAI, Modality } from "@google/genai"
import dotenv from 'dotenv'
import { marked } from 'marked'
import fs from 'fs/promises'
import { SYSTEM_INSTRUCTION, MAX_TOKENS, IMAGE_PROMPT_OUTLINE, IMAGE_PATH } from '../config/constants.js'

dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

async function handleDungeonPrompt(playerInput, chat) {
  let result
  const context = retrieveWindow(chat)

  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: SYSTEM_INSTRUCTION,
        },
        ...context,
        {
          role: 'user',
          content: playerInput + `\n Turn #${chat.user.length}`,
        },
      ],
      max_tokens: MAX_TOKENS,
      temperature: 0.7
    })

    if(response.choices?.[0]?.message?.content) {
      result = response.choices?.[0]?.message?.content
      await generateImage(result)
    } else {
      result = 'No response generated.'
    }
  } catch (error) {
    console.error(error)
    return 'An error occurred while generating a response.'
  }

  return marked(result)
}

async function generateImage(prompt) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    const contents = IMAGE_PROMPT_OUTLINE + prompt

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    })

    for (const part of response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text)
      } else if (part.inlineData) {
        const imageData = part.inlineData.data
        const buffer = Buffer.from(imageData, "base64")
        await fs.writeFile(IMAGE_PATH, buffer)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const retrieveWindow = chat => {
  const userChat = chat.user
  const systemChat = chat.system
  const userSlice = userChat.slice(-2)
  const systemSlice = systemChat.slice(-2)

  const messages = []

  for (let i = 0; i < Math.max(systemSlice.length, userSlice.length); i++) {
    if (systemSlice[i]) {
      messages.push({ role: 'system', content: systemSlice[i] })
    }
    if (userSlice[i]) {
      messages.push({ role: 'user', content: userSlice[i] })
    }
  }

  return messages
}

export default handleDungeonPrompt