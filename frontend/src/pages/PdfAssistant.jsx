import { useState } from 'react';
import { FileText } from "lucide-react";

function PdfAssistant() {
  const [text, setText] = useState('');
  const [summaryType, setSummaryType] = useState('short');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('https://agentic-ai-platform-1-wh0u.onrender.com/api/pdf/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, summaryType }),
      });

      const result = await response.text();

      if (!response.ok) {
        setSummary(`Error: ${result}`);
      } else {
        setSummary(result);
      }
    } catch (error) {
      setSummary(`Unable to summarize right now. ${error?.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>PDF Assistant</h2>
      <p>Paste your document text and let the AI summarize, extract insights, and answer questions from it.</p>

      <div className="chat-input" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <textarea
          rows="8"
          style={{ width: '100%', fontSize: '1rem', padding: '0.75rem' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your document text here..."
        />

        <select value={summaryType} onChange={(e) => setSummaryType(e.target.value)}>
          <option value="short">Short Summary</option>
          <option value="detailed">Detailed Summary</option>
        </select>

        <button onClick={handleSummarize} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>

      <h3>
  <FileText size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
  PDF Assistant
</h3>
      <textarea
        rows="12"
        style={{ width: '100%', fontSize: '1rem', padding: '0.75rem', lineHeight: '1.5' }}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Your summary will appear here..."
      />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>You can copy the text from this box.</p>
    </div>
  );
}

export default PdfAssistant;