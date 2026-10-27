import { useState } from "react";

function Login({ onBack, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Demo login successful!");
    onLoginSuccess();
  }

  return (
    <main className="login-page">
      <section className="login-image-side">
        <img
          src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=85"
          alt="Healthcare professional"
        />

        <div className="login-image-overlay">
          <span>WELCOME TO CURE HEALTH</span>
          <h1>Your health journey starts here.</h1>
          <p>
            Discover doctors and make managing your appointments simpler.
          </p>
        </div>
      </section>

      <section className="login-form-side">
        <div className="login-card">
          <button className="login-back-button" onClick={onBack}>
            ← Back to Home
          </button>

          <div className="login-heading-icon">✚</div>

          <span className="login-small-title">YOUR HEALTHCARE PORTAL</span>
          <h1>Welcome back!</h1>

          <p className="login-description">
            Enter your details to continue.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email Address</label>

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>

            <div className="password-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="login-submit-button">
              Continue →
            </button>
          </form>

          <p className="login-note">
            Demo login: this form does not verify a real account.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;