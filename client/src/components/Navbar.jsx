// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    //eslint-disable-next-line no-unused-vars
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="h-[60px] fixed inset-x-0 top-0 w-full z-50 bg-gradient-to-r from-lightorange via-lightgreen to-lightblue-lighter text-white shadow-lg">
            {/* Navbar Container */}
            <div className="container mx-96 flex items-center justify-between px-10 h-full">
                {/* Left Section: Hamburger Menu */}
                <button
                    className="text-2xl lg:hidden"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                </button>

                {/* Center Section: Logo with Emojis */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    {/* <span className="text-[2rem]">🍿📚</span> */}
                    <img src="../images/popcorn.svg" alt="icon" width="44"/>
                    <h1 className="text-[1.8rem] font-bold leading-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] tracking-wide">
                        Popcorn & Pages
                    </h1>
                </Link>

                {/* Right Section: Navigation Links */}
                <div className="hidden lg:flex gap-8 text-[18px]">
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
                    {isSignedIn ? (
                        <Link to="/profile" className="hover:text-teal-300">
                            My Profile
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="border border-white px-4 py-1 rounded font-semibold hover:bg-lightorange-lightest hover:text-lightblue-darker transition ease-in-out duration-200">
                                    Sign in
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="border border-white px-4 py-1 rounded font-semibold hover:bg-lightorange-lightest hover:text-lightblue-darker transition ease-in-out duration-200">
                                    Create an account
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute inset-x-0 top-[70px] bg-teal-700 text-white shadow-md">
                    <nav className="flex flex-col gap-4 p-4">
                        <Link to="/" className="hover:text-teal-300">
                            Home
                        </Link>
                        <Link to="/movies" className="hover:text-teal-300">
                            Movies
                        </Link>
                        <Link to="/tv-shows" className="hover:text-teal-300">
                            TV Shows
                        </Link>
                        <Link to="/books" className="hover:text-teal-300">
                            Books
                        </Link>
                        <Link to="/community" className="hover:text-teal-300">
                            Community
                        </Link>
                        {isSignedIn ? (
                            <Link to="/profile" className="hover:text-teal-300">
                                My Profile
                            </Link>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-teal-700 transition ease-in-out duration-200">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-teal-700 transition ease-in-out duration-200">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
