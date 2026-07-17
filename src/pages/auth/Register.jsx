import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const update = field => event => setForm(current => ({ ...current, [field]: event.target.value }));

  const handleSubmit = event => {
    event.preventDefault();
    const nextErrors = {};
    if (form.username.trim().length < 2) nextErrors.username = "Use at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 6) nextErrors.password = "Use at least 6 characters.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase"><div className="auth-brand"><span>S</span> Storix</div><div><p className="auth-kicker">START YOUR WORKSPACE</p><h1>A calmer home for every file.</h1><p>Create folders, upload files, and keep everything neatly in one place.</p></div><div className="auth-benefits"><span>✓ Simple file management</span><span>✓ Clear folder structure</span><span>✓ Your workspace, your way</span></div></section>
      <section className="auth-panel"><form className="auth-card" onSubmit={handleSubmit} noValidate><div className="auth-card-heading"><div className="auth-mobile-brand">S</div><h2>Create your account</h2><p>Start organising your files today.</p></div><Input id="register-name" label="Name" autoComplete="name" placeholder="Your name" value={form.username} onChange={update("username")} error={errors.username} /><Input id="register-email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={update("email")} error={errors.email} /><Input id="register-password" label="Password" type="password" autoComplete="new-password" placeholder="At least 6 characters" value={form.password} onChange={update("password")} error={errors.password} /><Input id="register-confirm-password" label="Confirm password" type="password" autoComplete="new-password" placeholder="Repeat your password" value={form.confirmPassword} onChange={update("confirmPassword")} error={errors.confirmPassword} /><label className="auth-terms"><input type="checkbox" required /> I agree to the terms and privacy policy.</label><Button type="submit">Create account <span aria-hidden="true">→</span></Button><p className="auth-switch">Already have an account? <Link to="/">Sign in</Link></p></form></section>
    </main>
  );
};

export default Register;
