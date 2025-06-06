import { Groq } from 'groq-sdk'
import dotenv from 'dotenv'
import { marked } from 'marked'
import { SYSTEM_INSTRUCTION, MAX_TOKENS } from '../config/constants.js'

dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const chat = {
  system: [],
  user: []
}

async function handleDungeonPrompt(playerInput) {
  let result
  const context = retrieveWindow()

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

    result = response.choices?.[0]?.message?.content || 'No response generated.'
  } catch (error) {
    console.error(error)
    return 'An error occurred while generating a response.'
  }

  appendChat('user', playerInput)
  appendChat('system', result)
  return marked(result)
}

const retrieveWindow = () => {
  const userChat = chat.user;
  const systemChat = chat.system;
  const userSlice = userChat.slice(-2);
  const systemSlice = systemChat.slice(-2);

  const messages = [];

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

const appendChat = (role, response) => {
  role === 'user' ? chat.user.push(response) : chat.system.push(response)
}

export default handleDungeonPrompt