import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './auth/AuthProvider';

// Lazy loaded components
const Home = React.lazy(() => import('./pages/Home'));
const Movies = React.lazy(() => import('./pages/Movies'));
const TVShows = React.lazy(() => import('./pages/TVShows'));
const Books = React.lazy(() => import('./pages/Books'));
const About = React.lazy(() => import('./pages/About'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        {/* Main content container with dark theme */}
        <div className="main-content mt-[60px] min-h-[calc(100vh-60px)] bg-black text-white">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/books" element={<Books />} />
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
