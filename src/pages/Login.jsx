import React, { useState } from 'react';
import '../styles/login.css';
import man from '../components/assets/man_146035.png';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function clked() {
    const userData = localStorage.getItem(name);
    if (userData) {
      const user = JSON.parse(userData);
      
      if (user.password === password && user.confirmPassword === confirmPassword) {
        alert("Login successful");
        // Store login status separately if needed
        localStorage.setItem("loggedInUser", name);
        window.location = `/`;
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("User not found");
    }
  }

  return (
    <div>
      <div className="main">
        <div className="hero2">
          <div className="hero-image2">
            <img src={man} alt="" />
            <h1>Let's get you set up</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="hero-content2">
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button onClick={clked}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
