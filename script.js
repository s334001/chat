const socket = io('http://os33.vlab.cs.hioa.no:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Hva er ditt navn?')
appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}