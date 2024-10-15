import React, { useState } from 'react';
import man from '../components/assets/man_146035.png';
import '../styles/signup.css';

function Signup() {
  // Create state variables for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const data={
    name,
    email,
    phoneNumber,
    password,
    confirmPassword
  }
  

  function clked() {
    // You can access the input values here
    console.log({ name, email, phoneNumber, password, confirmPassword });
    window.location = `/login`;
    localStorage.setItem(name,JSON.stringify(data))
  }

  function login(){
    window.location = `/login`;
  }
  return (
    <div>
      <div className="main">
        <div className="hero">
          <div className="hero-image">
            <img src={man} alt="" />
            <h1>Let's get you set up</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
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
          <div className="login" style={{display:"flex",justifyContent:"center",paddingTop:"120px",flexDirection:"column",gap:"10px", alignItems:"center"}}>
            <span>Already have a account ?</span>
            <button className="login" onClick={login}>Login</button>
            </div>
      </div>
        </div>
       
      
    </div>
  );
}

export default Signup;
