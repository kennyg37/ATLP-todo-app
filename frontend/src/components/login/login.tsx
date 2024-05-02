// components/Login.tsx
import React from 'react';
import './login.css';
import Signup from '../Signup/signup';

const Login: React.FC = () => {
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form id='login-form'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
