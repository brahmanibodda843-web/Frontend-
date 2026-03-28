function Navbar({ setUser }) {
  return (
    <div className="navbar">
      <h3>🎓 Student Management System</h3>

      <button
        className="logout-btn"
        onClick={() => setUser(null)}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;