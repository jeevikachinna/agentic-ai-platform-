import { useState } from 'react';
import { Calendar } from "lucide-react";

function Planner() {
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState('this week');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, timeframe }),
      });

      const text = await response.text();

      if (!response.ok) {
        setPlan(`Error: ${text}`);
      } else {
        setPlan(text);
      }
    } catch (error) {
      setPlan(`Unable to generate a plan right now. ${error?.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Planner</h2>
      <p>Turn your goals into action items with smart daily and weekly planning support.</p>

      <div className="chat-input" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <textarea
          rows="3"
          style={{ width: '100%', fontSize: '1rem', padding: '0.75rem' }}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What is your goal? (e.g., Prepare for final exams)"
        />

        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
          <option value="today">Today</option>
          <option value="this week">This Week</option>
          <option value="this month">This Month</option>
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>

      <h3>
  <Calendar size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
  Planner
</h3>
      <textarea
        rows="14"
        style={{ width: '100%', fontSize: '1rem', padding: '0.75rem', lineHeight: '1.5' }}
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        placeholder="Your plan will appear here..."
      />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>You can copy the text from this box.</p>
    </div>
  );
}

export default Planner;