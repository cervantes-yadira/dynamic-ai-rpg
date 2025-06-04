window.onload = () => {
    const submitBtn = document.getElementById('submit-user-input')
    const textInputElement = document.getElementById('user-text-input')
    const url = `http://localhost:4509`

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
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput })
        })

        response = await response.json()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    event.preventDefault()
}