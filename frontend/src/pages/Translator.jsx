import { useState } from 'react';

function Translator() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('French');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/translator/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage }),
      });

      const result = await response.text();

      if (!response.ok) {
        setTranslated(`Error: ${result}`);
      } else {
        setTranslated(result);
      }
    } catch (error) {
      setTranslated(`Unable to translate right now. ${error?.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Translator</h2>
      <p>Translate text into any language instantly using AI.</p>

      <div className="chat-input" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <textarea
          rows="5"
          style={{ width: '100%', fontSize: '1rem', padding: '0.75rem' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate..."
        />

        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="German">German</option>
          <option value="Japanese">Japanese</option>
        </select>

        <button onClick={handleTranslate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>

      <h3 style={{ marginTop: '1rem' }}>Translation</h3>
      <textarea
        rows="10"
        style={{ width: '100%', fontSize: '1rem', padding: '0.75rem', lineHeight: '1.5' }}
        value={translated}
        onChange={(e) => setTranslated(e.target.value)}
        placeholder="Your translation will appear here..."
      />
    </div>
  );
}

export default Translator;
