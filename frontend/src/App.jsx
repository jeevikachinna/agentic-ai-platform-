import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import PdfAssistant from './pages/PdfAssistant';
import EmailWriter from './pages/EmailWriter';
import Planner from './pages/Planner';
import Translator from './pages/Translator';
import Settings from './pages/Settings';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ForgotPasswordPage from './pages/ForgotPassword';
import ProfilePage from './pages/Profile';

const pageComponents = {
  Home,
  Chat,
  'PDF Assistant': PdfAssistant,
  'Email Writer': EmailWriter,
  Planner,
  Translator,
  Settings,
  Profile: ProfilePage,
};

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [authView, setAuthView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem('agent-token'));
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    if (token) {
      const savedUser = sessionStorage.getItem('agent-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [token]);

  const persistAuth = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    sessionStorage.setItem('agent-user', JSON.stringify(nextUser));
    sessionStorage.setItem('agent-token', nextToken);
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('agent-user');
    sessionStorage.removeItem('agent-token');
    setAuthView('login');
    setAuthError('');
    setAuthMessage('');
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setAuthError('Please enter your credentials.');
      return;
    }

    const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(`${email}:${password}`)}.signature`;
    const nextUser = { name: email.split('@')[0], email };
    persistAuth(nextUser, fakeJwt);
    setAuthMessage('Signed in successfully.');
    setAuthError('');
    setActivePage('Home');
  };

  const handleSignup = ({ name, email, password }) => {
    if (!name || !email || !password) {
      setAuthError('Please complete the sign-up form.');
      return;
    }

    const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(`${email}:${password}`)}.signature`;
    const nextUser = { name, email };
    persistAuth(nextUser, fakeJwt);
    setAuthMessage('Account created successfully.');
    setAuthError('');
    setActivePage('Home');
  };

  const handleForgotPassword = ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(`${email}:${password}`)}.signature`;
    const nextUser = { name: email.split('@')[0], email };
    persistAuth(nextUser, fakeJwt);
    setAuthMessage('Password updated successfully.');
    setAuthError('');
    setActivePage('Home');
  };

  const renderAuthView = () => {
    if (authView === 'signup') {
      return <SignUpPage onSubmit={handleSignup} onSwitchToLogin={() => setAuthView('login')} error={authError} message={authMessage} />;
    }

    if (authView === 'forgot') {
      return <ForgotPasswordPage onSubmit={handleForgotPassword} onSwitchToLogin={() => setAuthView('login')} error={authError} message={authMessage} />;
    }

    return (
      <LoginPage
        onSubmit={handleLogin}
        onSwitchToSignup={() => setAuthView('signup')}
        onSwitchToForgot={() => setAuthView('forgot')}
        error={authError}
        message={authMessage}
      />
    );
  };

  const renderPage = () => {
    if (!token) {
      return renderAuthView();
    }

    const PageComponent = pageComponents[activePage];
    return PageComponent ? <PageComponent user={user} /> : <Home user={user} />;
  };

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={clearAuth} onProfile={() => setActivePage('Profile')} />
      <div className="app-body">
        {token ? <Sidebar activePage={activePage} onSelect={setActivePage} /> : null}
        <main className="content-area">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
