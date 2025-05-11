import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../auth/UseAuth"; // Assuming you have a custom auth hook for authentication

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        logout();
    };

    return (
        <div className="h-[60px] fixed top-0 w-full bg-black text-white shadow-md z-20">
            <nav className="flex items-center justify-between md:justify-evenly h-full px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-[0.5rem] hover:text-yellow-600">
                    <img src="/popcorn.svg" alt="logo" className="w-[1.5rem] h-[1.5rem] drop-shadow" />
                    <h1 className="text-[1rem] font-semibold">Popcorn & Pages</h1>
                </Link>

                {/* Hamburger Icon for Mobile */}
                <button
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    className="text-2xl mr-[1rem] md:hidden"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6 text-[1rem] font-semibold">
                    <Link to="/" className="hover:text-yellow-600 transition-opacity">Home</Link>
                    <Link to="/movies" className="hover:text-yellow-600 transition-opacity">Movies</Link>
                    <Link to="/tv-shows" className="hover:text-yellow-600 transition-opacity">TV Shows</Link>
                    <Link to="/books" className="hover:text-yellow-600 transition-opacity">Books</Link>
                    <Link to="/about" className="hover:text-yellow-600 transition-opacity">About</Link>
                </div>

                {/* Authentication links */}
                <div className="hidden md:flex text-[1rem] font-semibold">
                    {isAuthenticated === null && (
                        <span className="inline-flex mx-[1rem]">Loading...</span>
                    )}
                    {isAuthenticated && (
                        <div className="flex gap-4">
                            <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                                My Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                    {isAuthenticated === false && (
                        <div className="flex gap-5">
                            <Link to="/login">
                                <button className="px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`md:hidden absolute inset-x-0 top-[60px] bg-black shadow-md transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <nav className="flex flex-col gap-4 px-6 py-4 font-semibold text-sm">
                    <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                    <Link to="/movies" onClick={toggleMobileMenu}>Movies</Link>
                    <Link to="/tv-shows" onClick={toggleMobileMenu}>TV Shows</Link>
                    <Link to="/books" onClick={toggleMobileMenu}>Books</Link>
                    <Link to="/about" onClick={toggleMobileMenu}>About</Link>
                    <hr className="border-t border-gray-600 my-2" />
                    {isAuthenticated && (
                        <>
                            <Link to="/profile" onClick={toggleMobileMenu}>My Profile</Link>
                            <button onClick={() => { handleLogout(); toggleMobileMenu(); }}>Logout</button>
                        </>
                    )}
                    {isAuthenticated === false && (
                        <>
                            <Link to="/login" onClick={toggleMobileMenu}>Sign In</Link>
                            <Link to="/register" onClick={toggleMobileMenu}>Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
