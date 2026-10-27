function Navbar({ onHome, onDoctors, onAppointments, onAdmin, onLogin }) {
  return (
    <nav className="navbar">
      <button className="brand-button" onClick={onHome}>
        <span className="brand-icon">✚</span>
        <span>CURE HEALTH</span>
      </button>

      <div className="nav-buttons">
        <button onClick={onHome}>Home</button>
        <button onClick={onDoctors}>Find Doctors</button>
        <button onClick={onAppointments}>My Appointments</button>
        <button onClick={onAdmin}>Admin Panel</button>
        <button className="login-nav-button" onClick={onLogin}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;