import { useState } from 'react';

function SignUpPage({ onSubmit, onSwitchToLogin, error, message }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-form card">
      <h2>Create your account</h2>
      <p>Join the Agentic AI Studio and organize your work.</p>
      {message ? <div className="auth-success">{message}</div> : null}
      {error ? <div className="auth-error">{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength="6"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="At least 6 characters"
          />
        </label>
        <button type="submit">Create account</button>
      </form>
      <div className="auth-links">
        <button type="button" onClick={onSwitchToLogin}>Back to login</button>
      </div>
    </div>
  );
}

export default SignUpPage;
