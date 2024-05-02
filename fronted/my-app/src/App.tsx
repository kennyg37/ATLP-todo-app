import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Signup from './components/Signup/signup';
import Nav from './components/nav/nav';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
      <div className='button-container-buttons'>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Sign up</button>
        </div>
        {showLogin && <Login />}
        {showSignup && <Signup />}
      </div>
    </div>
  );
}

export default App;
