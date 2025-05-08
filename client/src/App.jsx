/* eslint-disable no-unused-vars */
import { useState } from 'react'
// import { useCookies } from 'react-cookie';
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
import { AuthProvider } from './auth/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        {/* <div className="main-content pt-14 min-h-screen bg-gradient-to-r from-lightorange-lightest/70 via-lightgreen-lightest/70 to-lightblue-lightest/70"> */}
        <div className="main-content mt-[60px] min-h-[calc(100vh-60px)] bg-gray-50">
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
      </AuthProvider>
    </div>
  );
}

export default App