function ChatInput({ value, onChange, onSubmit }) {
  return (
    <div className="chat-input">
      <textarea
        rows="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask your AI assistant anything..."
      />
      <button onClick={onSubmit}>Send</button>
    </div>
  );
}

export default ChatInput;
