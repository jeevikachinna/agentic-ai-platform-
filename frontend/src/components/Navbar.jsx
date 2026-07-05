function Navbar({ user, onLogout, onProfile }) {
  return (
    <header className="navbar">
      <div>
        <strong>Agentic AI Studio</strong>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Everyday productivity, reimagined</div>
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <button className="ghost-btn" onClick={onProfile}>Profile</button>
            <button className="ghost-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <span style={{ color: '#cbd5e1' }}>✨ 24/7 AI Copilot</span>
        )}
      </div>
    </header>
  );
}

export default Navbar;
