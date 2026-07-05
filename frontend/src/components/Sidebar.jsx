function Sidebar({ activePage, onSelect }) {
  const menuItems = ['Home', 'Chat', 'PDF Assistant', 'Email Writer', 'Planner', 'Translator', 'Settings'];

  return (
    <aside className="sidebar">
      <h3 style={{ marginTop: 0 }}>Workspace</h3>
      {menuItems.map((item) => (
        <button
          key={item}
          className={activePage === item ? 'active' : ''}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
