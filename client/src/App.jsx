import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {  
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.authToken;

  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
