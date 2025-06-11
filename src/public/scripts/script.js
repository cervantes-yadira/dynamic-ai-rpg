import { toggleStartButton, createChatInterface, appendChatReponse, displayImage, appendChat } from "./helpers.js"

const startBtn = document.getElementById('start-button')
const isPlaying = sessionStorage.getItem('isPlaying')

// Check if the user still has a game session
if (isPlaying === "true") {
    toggleStartButton(startBtn)
    createChatInterface()
    setupSubmitHandler()
}

startBtn.addEventListener('click', () => {
    sessionStorage.setItem('isPlaying', "true")
    toggleStartButton(startBtn)
    sessionStorage.setItem('chatLog', JSON.stringify({ system: [], user: [] }))
    createChatInterface()
    setupSubmitHandler()
})

function setupSubmitHandler() {
    const submitBtn = document.getElementById('submit-user-input')
    const textInputElement = document.getElementById('user-text-input')
    const url = `http://localhost:4509/api`

    // Check if submitBtn already has an event listener
    if (submitBtn.dataset.bound !== "true") {
        submitBtn.dataset.bound = "true"
        submitBtn.addEventListener('click', (e) => {
            const userInput = textInputElement.value

            if (userInput) {
                sendUserRequest(e, userInput, url)
                textInputElement.value = ''
            } else {
                alert('Please submit your answer')
            }
        })
    }
}

const sendUserRequest = async (event, userInput, url) => {
    const chatWindow = document.getElementById('chat-window')
    appendChatReponse(chatWindow, userInput, 'user')

    try {
        let rawChatLog = sessionStorage.getItem('chatLog')
        let chatLog = rawChatLog ? JSON.parse(rawChatLog) : { system: [], user: [] }
        chatLog = appendChat(chatLog, 'user', userInput)

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userInput,
                chatLog
            })
        })

        response = await response.json()
        const systemResponse = response.result

        chatLog = appendChat(chatLog, 'system', systemResponse)
        sessionStorage.setItem('chatLog', JSON.stringify(chatLog))

        appendChatReponse(chatWindow, systemResponse, 'system')
        displayImage()
    } catch (error) {
        console.error("Failed to send user request:", error)
    }

    event.preventDefault()
}

// TODO reimplement for page refresh

// const refreshChat = (chatLog) => {
//     const chatWindow = document.getElementById('chat-window')
//     const { system = [], user = [] } = chatLog
//     const maxLength = Math.max(system.length, user.length)

//     for (let i = 0; i < maxLength; i++) {
//         if (i < user.length) {
//             appendChatReponse(chatWindow, user[i], 'user-response')
//         }
//         if (i < system.length) {
//             appendChatReponse(chatWindow, system[i], 'system-response')
//         }
//     }
// }