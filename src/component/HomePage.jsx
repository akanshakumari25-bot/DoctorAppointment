function HomePage({ onFindDoctors }) {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">YOUR HEALTH, OUR PRIORITY</span>

          <h1>
            Better Health.
            <br />
            <span>Better Life.</span>
          </h1>

          <p>
            Find trusted doctors, explore healthcare services, and book
            your appointment with ease. Your journey to better health
            starts here.
          </p>

          <button className="hero-button" onClick={onFindDoctors}>
            Find a Doctor <span>→</span>
          </button>

          <div className="hero-points">
            <span>✓ Easy appointment booking</span>
            <span>✓ Explore different specialists</span>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85"
            alt="Healthcare professionals caring for a patient"
          />

          <div className="image-info-card">
            <span className="info-icon">✚</span>
            <div>
              <strong>Your health matters</strong>
              <p>Care made simpler for you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Healthcare made easier</h2>
          <p>Simple tools to help you take care of your health.</p>
        </div>

        <div className="service-grid">
          <article className="service-card">
            <div className="service-icon">⚕</div>
            <h3>Find Doctors</h3>
            <p>
              Explore doctors from different specialties and learn about
              their experience and consultation fees.
            </p>
            <button onClick={onFindDoctors}>Explore Doctors →</button>
          </article>

          <article className="service-card">
            <div className="service-icon">▦</div>
            <h3>Book Appointments</h3>
            <p>
              Choose a suitable date and time and keep your appointment
              details in one place.
            </p>
            <button onClick={onFindDoctors}>Book a Visit →</button>
          </article>

          <article className="service-card">
            <div className="service-icon">♡</div>
            <h3>Care for Yourself</h3>
            <p>
              Make time for regular checkups and speak with a healthcare
              professional when you need support.
            </p>
            <button onClick={onFindDoctors}>Get Started →</button>
          </article>
        </div>
      </section>

      <section className="health-banner">
        <div>
          <span>TAKE THE FIRST STEP</span>
          <h2>Your well-being deserves attention.</h2>
          <p>
            Explore our doctor directory and find a healthcare professional
            who suits your needs.
          </p>
        </div>

        <button onClick={onFindDoctors}>Explore Doctors →</button>
      </section>
    </main>
  );
}

export default HomePage;