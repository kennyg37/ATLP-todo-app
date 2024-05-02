import React from "react";
import './nav.css';

const Nav: React.FC = () => {
  return (
    <div className="nav-container">
      <h1>Todo</h1>
      <nav>
        <ul>
           <li>Home</li>
           <li>Todo</li>
           <li>Login</li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;