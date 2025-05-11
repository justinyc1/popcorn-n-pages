import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './auth/AuthProvider';

import Home from './pages/Home';
const Search = React.lazy(() => import('./pages/Search'));
const About = React.lazy(() => import('./pages/About'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <div className="main-content mt-[60px] min-h-[calc(100vh-60px)] bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;