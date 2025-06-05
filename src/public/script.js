window.onload = () => {
    const submitBtn = document.getElementById('submit-user-input')
    const textInputElement = document.getElementById('user-text-input')
    const url = `http://localhost:4509/api`

    submitBtn.addEventListener('click', (e) => {
        const userInput = textInputElement.value

        if(userInput) {
            sendUserRequest(e, userInput, url)
        } else {
            alert('Please submit your answer')
        }
    })
}

const sendUserRequest = async (event, userInput, url) => {
    const chatWindow = document.getElementById('chat-window')
    appendChatReponse(chatWindow, userInput, 'user-response')
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput })
        })

        response = await response.json()
        appendChatReponse(chatWindow, response.result, 'system-response')
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

const appendChatReponse = (chatWindow, response, className) => {
    const p = document.createElement('p')
    p.className = className
    p.innerHTML = response
    chatWindow.appendChild(p)
}