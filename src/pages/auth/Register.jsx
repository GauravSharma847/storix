import React from 'react'
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { Link } from "react-router-dom";
import "./Register.css"

function Register() {
  return (
    <div className='register-page'>
      <div className='register-card'>
        <h1>Storix</h1>
        <h2>Create Account</h2>
        <h4>Join Storix</h4>
        <Input
          label="Username"
          placeholder="Enter Username"
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
        />

        <Input
          label=" Confirm Password"
          type="password"
          placeholder="Confirm Password"
        />

        <Button>
          Register
        </Button>

        <p>
          Already Have An Account
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;