import { useState } from 'react';

function ForgotPasswordPage({ onSubmit, onSwitchToLogin, error, message }) {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-form card">
      <h2>Reset your password</h2>
      <p>Enter your email and choose a new password.</p>
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
          New password
          <input
            type="password"
            required
            minLength="6"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="New password"
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            required
            minLength="6"
            value={form.confirmPassword}
            onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
            placeholder="Confirm password"
          />
        </label>
        <button type="submit">Update password</button>
      </form>
      <div className="auth-links">
        <button type="button" onClick={onSwitchToLogin}>Back to login</button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
