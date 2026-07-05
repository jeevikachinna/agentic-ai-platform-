function ChatBox({ messages }) {
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.role === 'user' ? 'You' : 'Agent'}:</strong> {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
