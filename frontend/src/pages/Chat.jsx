import { useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your AI project assistant. Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmedInput }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://agentic-ai-platform-1-wh0u.onrender.com/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await response.json();
      const reply = data?.reply || 'Sorry, no response was returned.';
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Unable to reach the backend right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>AI Chat Assistant</h2>
      <ChatBox messages={messages} />
      <ChatInput value={input} onChange={setInput} onSubmit={handleSend} />
      {loading ? <p>Thinking...</p> : null}
    </div>
  );
}

export default Chat;
