import React, { useState } from 'react';
import '../styles/login.css';
import { FaArrowLeft } from 'react-icons/fa';
import man from '../components/assets/man_146035.png';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function clked() {

    if(name=='admin' && password=='admin123' && confirmPassword=='admin123'){
      window.location = `/admin`;
    }else{
    const userData = localStorage.getItem(name);
    if (userData) {
      const user = JSON.parse(userData);
      
      if (user.password === password && user.confirmPassword === confirmPassword) {
        alert("Login successful");
        // Store login status separately if needed
        localStorage.setItem("loggedInUser", name);
        window.location = `/`;
      } 
      else {
        alert("Invalid credentials");
      }
    } else {
      alert("User not found");
    }
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
            <button onClick={() => window.history.back()}   style={{
              background: "linear-gradient(135deg, #239393, #18787b)",
              color: "white",
              border: "none",
              padding: "10px 20px",
              marginTop:'60px',
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
  }}><FaArrowLeft size={20} /> <span style={{paddingLeft:'10px'}}>Go back</span></button>
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
