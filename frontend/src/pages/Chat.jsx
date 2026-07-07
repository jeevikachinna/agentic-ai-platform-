import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'Agent', text: 'Hello! I am your AI project assistant. Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://agentic-ai-platform-1-wh0u.onrender.com/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const result = await response.text();

      let displayText = result;
      if (response.ok) {
        try {
          const parsed = JSON.parse(result);
          displayText = parsed.reply || parsed.message || result;
        } catch (e) {
          displayText = result; 
        }
      } else {
        displayText = `Error: ${result}`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'Agent', text: displayText },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'Agent', text: `Unable to respond right now. ${error?.message || ''}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="card">
      <h2>AI Chat Assistant</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              background: msg.sender === 'You' ? '#1e3a8a' : '#1e293b',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              color: '#fff',
            }}
          >
            <strong>{msg.sender}:</strong>{' '}
            <span style={{ display: 'inline' }}>
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <span {...props} />,
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ background: '#1e293b', padding: '0.75rem 1rem', borderRadius: '8px', color: '#aaa' }}>
            <em>Agent is typing...</em>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <textarea
          rows="2"
          style={{ flex: 1, fontSize: '1rem', padding: '0.75rem' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask your AI assistant anything..."
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;