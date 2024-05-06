import React from "react";
import './signup.css';

const Signup: React.FC = () => {
  const sendSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const requestBody = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    try {
      const response = await fetch('https://atlp-todo-app.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful');
        HTMLFormElement.prototype.reset.call(event.currentTarget);
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
    }
  };
  return (
    <div className="signup-container">
      <h1>Sign up</h1>
        <form id="signup-form" onSubmit={sendSignup}>
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