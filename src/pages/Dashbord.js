import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Userprofile from './Userprofile';
import Jobshowing from './Jobshowing';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('profileSection'); // Default to profile section

  function showProfile() {
    setActiveSection('profileSection');
  }
  function removeUser(){
    localStorage.removeItem("loggedInUser")
    window.location='/'
  }

  function showJobView() {
    setActiveSection('jobViewSection');
  }

  function sample() {
    window.location = "/sample";
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar2">
        <ul>
          <li onClick={showProfile}>Your Profile</li>
          <li onClick={showJobView}>Find Works</li>
          <li>Pending Works</li>
          <li onClick={sample}>Completed</li>
          <li style={{ backgroundColor: 'red' }} onClick={removeUser}>Logout</li>
        </ul>
      </div>
      <div className="mainbar2">
        {activeSection === 'profileSection' && <Userprofile />}
        {activeSection === 'jobViewSection' && <Jobshowing />}
      </div>
    </div>
  );
}

export default Dashboard;
