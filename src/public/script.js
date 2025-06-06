import { toggleStartButton, createChatInterface, appendChatReponse } from "./helpers.js"

sessionStorage.setItem('isPlaying', false)

const startBtn = document.getElementById('start-button')

startBtn.addEventListener('click', (e) => {
    sessionStorage.setItem('isPlaying', true)
    toggleStartButton(startBtn)
    createChatInterface()

    const submitBtn = document.getElementById('submit-user-input')
    const textInputElement = document.getElementById('user-text-input')
    const url = `http://localhost:4509/api`

    submitBtn.addEventListener('click', (e) => {
        const userInput = textInputElement.value

        if(userInput) {
            sendUserRequest(e, userInput, url)
            textInputElement.value = ''
        } else {
            alert('Please submit your answer')
        }
    })
})

const sendUserRequest = async (event, userInput, url) => {
    const chatWindow = document.getElementById('chat-window')
    appendChatReponse(chatWindow, userInput, 'user')
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput })
        })

        response = await response.json()
        appendChatReponse(chatWindow, response.result, 'system')
    } catch (error) {
        console.log(error)
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