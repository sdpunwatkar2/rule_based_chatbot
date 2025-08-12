export function getBotResponse(message) {
  const userMessage = message.toLowerCase();

  if (userMessage.includes("hello")) {
    return "Hi there! How can I help you today?";
  }
  if (userMessage.includes("how are you")) {
    return "I'm doing great, thanks for asking!";
  }
  if (userMessage.includes("bye")) {
    return "Goodbye! Have a nice day.";
  }

  return "I'm not sure how to respond to that.";
}
