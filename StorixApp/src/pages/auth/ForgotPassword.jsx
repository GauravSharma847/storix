import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter the email address associated with your account.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase"><div className="auth-brand"><span>S</span> Storix</div><div><p className="auth-kicker">ACCOUNT RECOVERY</p><h1>Get back to the files that matter.</h1><p>We’ll help you securely reset your password and return to your workspace.</p></div><div className="auth-benefits"><span>✓ Secure account recovery</span><span>✓ Simple reset instructions</span><span>✓ Back to your workspace quickly</span></div></section>
      <section className="auth-panel">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card-heading"><div className="auth-mobile-brand">S</div><h2>{sent ? "Check your inbox" : "Forgot password?"}</h2><p>{sent ? `If an account exists for ${email}, we sent instructions to reset your password.` : "Enter your email and we’ll send a reset link."}</p></div>
          {sent ? <><div className="auth-success-icon">✉️</div><Button type="button" onClick={() => setSent(false)}>Try another email</Button></> : <><Input id="reset-email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} error={error} /><Button type="submit">Send reset link <span aria-hidden="true">→</span></Button></>}
          <p className="auth-switch"><Link to="/">← Back to sign in</Link></p>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
