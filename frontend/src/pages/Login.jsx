import { useState } from 'react';

function LoginPage({ onSubmit, onSwitchToSignup, onSwitchToForgot, error, message }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-form card">
      <h2>Welcome back</h2>
      <p>Sign in to continue your AI workspace.</p>
      {message ? <div className="auth-success">{message}</div> : null}
      {error ? <div className="auth-error">{error}</div> : null}
      <form onSubmit={handleSubmit}>
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
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="Enter your password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <button type="button" onClick={onSwitchToSignup}>Create account</button>
        <button type="button" onClick={onSwitchToForgot}>Forgot password?</button>
      </div>
    </div>
  );
}

export default LoginPage;
