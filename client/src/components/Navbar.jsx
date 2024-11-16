import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-[70px] fixed inset-x-0 top-0 w-full z-[49] bg-white border-b shadow-md">
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="p-4">
                    <button onClick={toggleSidebar} className="text-white">Close</button>
                    <nav className="mt-4">
                        <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link>
                        <Link to="/about" className="block py-2 px-4 hover:bg-gray-700">About</Link>
                        {isSignedIn && <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700">My Profile</Link>}
                    </nav>
                </div>
            </div>

            <div className="p-4 gap-x-4 h-full flex items-center justify-between">
                <button onClick={toggleSidebar} className="text-gray-800">
                    ☰
                </button>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                    <div className="gap-x-2 flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer">
                        <img src="/assets/react.svg" alt="Popcorn and pages Logo" className="h-8 w-8" />
                        <div className="text-center m-2">
                            <p>Popcorn & Pages</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex justify-end items-center">
                    <div className="hidden lg:flex items-center">
                        <div className="flex items-center gap-x-10 ml-4">
                            {isSignedIn ? (
                                <>  
                                    <Link to="/">Home</Link>
                                    <Link to="/about">About</Link>
                                    <Link to="/profile/">My Profile</Link>
                                </>
                            ) : (
                                <>
                                    <Link className="inline-flex hover:opacity-75 transition-opacity cursor-pointer" to="/">Home</Link>
                                    <Link className="inline-flex hover:opacity-75 transition-opacity cursor-pointer" to="/about">About</Link>
                                    <Link to="/login">
                                        <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-background h-9 rounded-md px-3">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-background h-9 rounded-md px-3">
                                            Sign up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default Navbar;