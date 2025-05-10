// import { Route, Routes } from 'react-router-dom';
// import './App.css'
// import Navbar from './components/Navbar';
// import { AuthProvider } from './auth/AuthProvider';

// import Home from './pages/Home';
// import Search from './pages/Search';
// import About from './pages/About';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
//     <div className="App">
//       <AuthProvider>
//         <Navbar />
//         <div className="main-content mt-[60px] min-h-[calc(100vh-60px)] bg-gray-50">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </div>
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;


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