import React, { FormEvent, useState } from 'react';
import './login.css';

const Login: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const sendLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://atlp-todo-app.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
        console.log('Login successful');
        formRef.current?.reset();
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
    }
  };

  return (
    <div className='login-container'>
      <div className='preloader'>
        <div className='loader'></div>
      </div>
      <h1>Login</h1>
      <form id='login-form' onSubmit={sendLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
