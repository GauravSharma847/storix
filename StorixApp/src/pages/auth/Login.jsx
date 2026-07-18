import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase"><div className="auth-brand"><span>S</span> Storix</div><div><p className="auth-kicker">YOUR FILES, ORGANISED</p><h1>Everything important, right where you need it.</h1><p>Store, organise, and access your files from one simple workspace.</p></div><div className="auth-benefits"><span>✓ Organise folders easily</span><span>✓ Access files anywhere</span><span>✓ Keep your work together</span></div></section>
      <section className="auth-panel"><form className="auth-card" onSubmit={handleSubmit} noValidate><div className="auth-card-heading"><div className="auth-mobile-brand">S</div><h2>Welcome back</h2><p>Sign in to continue to Storix.</p></div><Input id="login-email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} error={errors.email} /><Input id="login-password" label="Password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={event => setPassword(event.target.value)} error={errors.password} /><div className="auth-options"><label><input type="checkbox" /> Remember me</label><Link to="/forgot-password">Forgot password?</Link></div><Button type="submit">Sign in <span aria-hidden="true">→</span></Button><p className="auth-switch">New to Storix? <Link to="/register">Create an account</Link></p></form></section>
    </main>
  );
};

export default Login;
