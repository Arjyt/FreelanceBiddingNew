import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashbord';
import Client_dashbord from './pages/clientjsx/Client_dashbord';
import Admin from './Admin';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/client-dashbord'element={<Client_dashbord/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
