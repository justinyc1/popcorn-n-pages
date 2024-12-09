/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

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
      {/* Main Content Wrapper */}
      <div className="main-content bg-gradient-to-r from-teal-500 to-indigo-600 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-profile/:id" element={<EditProfile />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App