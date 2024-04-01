let chatMessages = [];

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  
  if (message !== '') {
    const newMessage = {
      user: 'User',
      message: message,
      timestamp: new Date().toLocaleString()
    };

    chatMessages.push(newMessage);
    displayMessages();
    messageInput.value = '';
  }
}

function displayMessages() {
  const chatArea = document.getElementById('chatArea');
  chatArea.innerHTML = '';

  chatMessages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${message.user}:</strong> ${message.message} <em>(${message.timestamp})</em>`;
    chatArea.appendChild(messageElement);
  });
}