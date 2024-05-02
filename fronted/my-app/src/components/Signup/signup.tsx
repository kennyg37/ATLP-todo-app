import React from "react";
import './signup.css';

const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      <h1>Sign up</h1>
        <form id="signup-form">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" />
            <button type="submit">Sign up</button>
        </form>
    </div>
  );
};

export default Signup; 