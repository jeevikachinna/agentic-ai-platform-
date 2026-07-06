import { useState, useEffect } from 'react';
import { Bot, Mail, Calendar, FileText, Languages } from "lucide-react";

function Home() {
  const [stats, setStats] = useState({ chat: 0, email: 0, pdf: 0, planner: 0, translator: 0 });

  useEffect(() => {
    fetch('https://agentic-ai-platform-1-wh0u.onrender.com/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ chat: 0, email: 0, pdf: 0, planner: 0, translator: 0 }));
  }, []);

  return (
    <section className="hero">
      <div className="card">
        <h1>Build smarter workdays with an agentic AI platform.</h1>
        <p>Automate chats, summarize PDFs, draft emails, plan tasks, and translate content in one elegant workspace.</p>
        <div className="grid">
          <div className="panel">
            <h3>
  <Bot size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
  AI Chat
</h3>
            <p>Get instant assistance for brainstorming and decision support.</p>
          </div>
          <div className="panel">
            <h3>📄 PDF Assistant</h3>
            <p>Turn documents into actionable insights quickly.</p>
          </div>
          <div className="panel">
            <h3>✉️ Email Writer</h3>
            <p>Compose polished emails in seconds.</p>
          </div>
        </div>
      </div>
      <div className="card">
        <h2>📊 Your Activity</h2>
        <ul>
          <li>💬 Chat conversations: <strong>{stats.chat}</strong></li>
          <li>✉️ Emails generated: <strong>{stats.email}</strong></li>
          <li>📄 PDFs summarized: <strong>{stats.pdf}</strong></li>
          <li>📅 Plans created: <strong>{stats.planner}</strong></li>
          <li>🌐 Translations done: <strong>{stats.translator}</strong></li>
        </ul>
      </div>
    </section>
  );
}

export default Home;