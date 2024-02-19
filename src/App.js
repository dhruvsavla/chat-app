import './App.css';
import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router,Outlet,  Routes, Route } from "react-router-dom";
import { useStateValue } from './StateProvider';

function App() {
  
  const messages = "hello";
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className='app_body'>
        <Router>
        <Sidebar />
        <Routes>
          <Route path="/rooms/:roomId" element={<Chat />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
      
        </div>
      )} 
    </div>
    
  );
}

export default App;
