import React, { useState } from 'react';
import man from '../components/assets/man_146035.png';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/signup.css';
function Signup() {
  // Create state variables for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const data = { name, email, phoneNumber, password, confirmPassword };

  function clked() {
    console.log({ name, email, phoneNumber, password, confirmPassword });
    window.location = `/login`;
    localStorage.setItem(name, JSON.stringify(data));
  }

  function login() {
    window.location = `/login`;
  }

  return (
    <div>
      <div className="main">
        <div className="hero">
          <div className="hero-image">
            <img src={man} alt="" />
            <h1>Let's get you set up</h1>
            
            <button onClick={() => window.history.back()}   style={{
              background: "linear-gradient(135deg, #239393, #18787b)",
              color: "black",
              border: "none",
              padding: "10px 20px",
              marginTop:'50px',
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              gap: "10px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
  }}> <FaArrowLeft size={20} /> <span style={{paddingLeft:'10px'}}>Go back</span></button>
          </div>
          <div className="hero-content">
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="Phone Number" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button onClick={clked}>Submit</button>
          </div>
        </div>
        <div className="login-section">
          <span>Already have an account?</span>
          <button onClick={login}>Login</button>
        </div>


      </div>
    </div>
  );
}

export default Signup;
