function Footer({ onHome, onDoctors, onAppointments, onLogin }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <button className="footer-brand" onClick={onHome}>
            <span>✚</span> CURE HEALTH
          </button>

          <p>
            Making healthcare easier to explore. Find doctors, learn about
            their specialties, and manage your appointments in one place.
          </p>

          <div className="footer-tagline">
            Your health. Your care. Your choice.
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <button onClick={onHome}>Home</button>
          <button onClick={onDoctors}>Find Doctors</button>
          <button onClick={onAppointments}>My Appointments</button>
          <button onClick={onLogin}>Login</button>
        </div>

        <div className="footer-contact">
          <h3>Contact & Support</h3>
          <p>✉ support@curehealth.example</p>
          <p>✚ Healthcare appointment portal</p>
          <p>⌚ Browse doctors and available services online</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CURE HEALTH. All rights reserved.</p>
        <p>Designed to make healthcare easier.</p>
      </div>
    </footer>
  );
}

export default Footer;