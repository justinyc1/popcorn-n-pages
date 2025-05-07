// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../auth/UseAuth";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        logout();
    }

    return (
        <div className="h-[60px] fixed top-0 w-full bg-white text-deepblack shadow-md">
            {/* Navbar Container */}
            <nav className="flex items-center justify-evenly h-full">
                
                {/* Hamburger Menu */}
                <button
                    className="text-2xl mr-[2.5rem] md:hidden"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                </button>

                {/* Website Logo */}
                <Link to="/" className="justify-center md:justify-start flex items-center gap-[0.4rem] md:gap-[0.5rem] cursor-pointer">
                    <img src="../images/popcorn.svg" alt="icon" className="w-[1.5rem] md:w-[2rem] drop-shadow" />
                    <h1 className="text-[1rem] md:text-[1.2rem] font-semibold">
                        Popcorn & Pages
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-6 text-[1rem]">
                    <Link to="/" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-t-4 border-b-2 border-transparent hover:border-b-lightorange">
                        Home
                    </Link>
                    <Link to="/movies" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-t-4 border-b-2 border-transparent hover:border-b-lightorange">
                        Movies
                    </Link>
                    <Link to="/tv-shows" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-t-4 border-b-2 border-transparent hover:border-b-lightorange">
                        TV Shows
                    </Link>
                    <Link to="/books" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-t-4 border-b-2 border-transparent hover:border-b-lightorange">
                        Books
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="md:flex gap-2 text-[1rem]">
                    {isAuthenticated === null &&
                        <span className="inline-flex font-semibold transition-opacity cursor-pointer border-t-4 border-b-2 border-transparent">Loading...</span>
                    }
                    {isAuthenticated &&
                        <>
                            <Link to="/profile" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-t-4 border-b-2 border-transparent hover:border-b-lightorange">
                                My Profile
                            </Link>
                            <Link to="/">
                                <button onClick={handleLogout} className="border border-white px-4 py-1 rounded font-semibold hover:bg-lightorange-lightest hover:text-lightblue-darker transition ease-in-out duration-200">
                                    Logout
                                </button>
                            </Link>
                        </>
                    }
                    {isAuthenticated === false && 
                        <>
                            <Link to="/login">
                                <button className="text-[0.8rem] md:text-[1rem] px-[0.75rem] py-[0.5rem] rounded-lg font-semibold hover:text-lightblue-darkest transition ease-in-out duration-100">
                                    Sign in
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="text-[0.8rem] md:text-[1rem] bg-lightorange-darker text-white px-[0.75rem] py-[0.5rem] rounded-lg font-semibold hover:bg-lightorange-darkest transition ease-in-out duration-100">
                                    Sign up
                                </button>
                            </Link>
                        </>
                    }
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute inset-x-0 top-[60px] pl-[0.5rem] bg-gray-100 shadow-md">
                    <nav className="flex flex-col text-[0.8rem] gap-3 px-4 py-4">
                        <Link to="/" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-transparent hover:border-b-lightorange">
                            Home
                        </Link>
                        <Link to="/movies" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-transparent hover:border-b-lightorange">
                            Movies
                        </Link>
                        <Link to="/tv-shows" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-transparent hover:border-b-lightorange">
                            TV Shows
                        </Link>
                        <Link to="/books" className="inline-flex font-semibold hover:text-lightorange transition-opacity cursor-pointer border-transparent hover:border-b-lightorange">
                            Books
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
