import React, { useState, useEffect } from 'react';
import Login from './components/login/login';
import Signup from './components/Signup/signup';
import Todo from './components/todo/todo';
import Nav from './components/nav/nav';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  return (
    <div className="App">
      <Nav />
      <div className="button-container">
        {!token && (
          <div className='button-container-buttons'>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign up</button>
          </div>
        )}
        {token ? <Todo /> : (
          <>
            {showLogin && <Login />}
            {showSignup && <Signup />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
