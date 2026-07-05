function ProfilePage({ user }) {
  return (
    <div className="profile-page">
      <div className="card">
        <h2>Profile</h2>
        <p>Manage your account details and session state.</p>
        <div className="profile-info">
          <div><strong>Name</strong><span>{user?.name || 'Guest'}</span></div>
          <div><strong>Email</strong><span>{user?.email || 'Not available'}</span></div>
          <div><strong>Role</strong><span>Premium workspace user</span></div>
          <div><strong>Auth</strong><span>JWT session active</span></div>
        </div>
      </div>
      <div className="card">
        <h3>Security overview</h3>
        <ul>
          <li>Secure sign-in experience</li>
          <li>Client-side JWT token storage</li>
          <li>Persistent session across reloads</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
