export const createChatInterface = () => {
  // Create main
  const main = document.createElement('main')
  main.className = 'container-md'

  // Create section for chat window
  const section = document.createElement('section')
  section.id = 'chat-window'
  section.className = 'border border-bottom-0'
  main.appendChild(section)

  // Create form
  const form = document.createElement('form')
  form.id = 'user-response-form'

  // Create form div
  const formDiv = document.createElement('div')
  formDiv.className = 'border border-top-0'

  // Create label
  const label = document.createElement('label')
  label.setAttribute('for', 'user-text-input')
  label.className = 'form-label'
  label.hidden = true
  label.textContent = 'What say you?'
  formDiv.appendChild(label)

  // Create textarea
  const textarea = document.createElement('textarea')
  textarea.id = 'user-text-input'
  textarea.name = 'user-text-input'
  textarea.className = 'form-control mb-4'
  textarea.rows = 4
  textarea.placeholder = 'What say you?'
  formDiv.appendChild(textarea)

  // Create submit button
  const button = document.createElement('button')
  button.id = 'submit-user-input'
  button.className = 'btn btn-primary'
  button.type = 'button'
  button.textContent = 'Send'
  formDiv.appendChild(button)

  // Append form div to form
  form.appendChild(formDiv)

  // Append form to main
  main.appendChild(form)

  // Append main to body or another container
  document.body.appendChild(main)
}

export const toggleStartButton = (btn) => {
  if (btn) {
    if (btn.disabled === false && btn.style.display !== 'none') {
        btn.disabled = true
        btn.style.display = 'none'
    } else {
        btn.disabled = false
        btn.style.display = 'block'
    }
  }
}

export const appendChatReponse = (chatWindow, response, type) => {
    const row = document.createElement('div')
    const col = document.createElement('div')
    const p = document.createElement('p')

    row.className = 'row'

    if (type === 'user') {
        col.className = 'col-12 d-flex justify-content-end'
        p.classList.add('bg-primary', 'text-white', 'p-2', 'rounded', 'response')
    } else {
        col.className = 'col-12 d-flex justify-content-start'
        p.classList.add('bg-light', 'text-dark', 'p-2', 'rounded', 'response')
    }

    p.innerHTML = response

    col.appendChild(p)
    row.appendChild(col)
    chatWindow.appendChild(row)
}

export const displayImage = () => {
  const body = document.getElementsByTagName('body')[0]
  body.className = 'img-bg'
}

export const appendChat = (chat, role, response) => {
  if (!chat || typeof chat !== 'object') {
      chat = { system: [], user: [] }
  }

  role === 'user' ? chat.user.push(response) : chat.system.push(response)

  return chat
}