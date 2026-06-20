import React from 'react'
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  return (
    <div className='login-page'>
      <div className='login-card'>
        <h1>Storix</h1>
        <p>Sign In To Your Account</p>
        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
        />
        <Input
          label="Password"
          tyoe="password"
          placeholder="Enter Password"
        />

        <Button>
          Login
        </Button>

        <p>
          Don't Have An Account
          <Link to="/register">Register Now</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;