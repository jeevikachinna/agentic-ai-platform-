import { useState } from 'react';
import { Mail } from "lucide-react";

function EmailWriter() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('formal');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject.trim() || !topic.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('https://agentic-ai-platform-1-wh0u.onrender.com/api/email/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topic, tone }),
      });

      const text = await response.text();

      if (!response.ok) {
        setGeneratedEmail(`Error: ${text}`);
      } else {
        setGeneratedEmail(text);
      }
    } catch (error) {
      setGeneratedEmail(`Unable to generate an email right now. ${error?.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Email Writer</h2>
      <p>Create polished business emails with tone control, structure, and quick follow-up options.</p>

      <div className="chat-input" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email subject"
        />

        <textarea
          rows="3"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What is this email about?"
        />

        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
          <option value="persuasive">Persuasive</option>
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Email'}
        </button>
      </div>

      <h3>
  <Mail size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
  Email Writer
</h3>
      <textarea
        rows="18"
        style={{ width: '100%', fontSize: '1rem', padding: '0.75rem', lineHeight: '1.5' }}
        value={generatedEmail}
        onChange={(e) => setGeneratedEmail(e.target.value)}
        placeholder="Your draft will appear here..."
        readOnly={false}
      />
      <p style={{ fontSize: '0.9rem', color: '#666' }}></p>
    </div>
  );
}

export default EmailWriter;
