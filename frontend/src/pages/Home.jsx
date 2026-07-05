function Home() {
  return (
    <section className="hero">
      <div className="card">
        <h1>Build smarter workdays with an agentic AI platform.</h1>
        <p>Automate chats, summarize PDFs, draft emails, plan tasks, and translate content in one elegant workspace.</p>
        <div className="grid">
          <div className="panel">
            <h3>🤖 AI Chat</h3>
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
        <h2>Today’s focus</h2>
        <ul>
          <li>Review project brief</li>
          <li>Draft weekly plan</li>
          <li>Respond to customer follow-up</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
