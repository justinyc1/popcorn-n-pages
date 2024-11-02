import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    return (
        <div className="h-[70px] fixed inset-x-0 top-0 w-full z-[49] bg-white border-b shadow-md">
            <div className="p-4 gap-x-4 h-full flex items-center justify-between">
                <div className="gap-x-2 flex hover:opacity-75 transition-opacity cursor-pointer">
                    <img src="/assets/react.svg" alt="Popcorn and pages Logo" className="h-8 w-8" />
                    <div className="text-center m-2">
                        <p>Popcorn & Pages</p>
                    </div>
                </div>

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
    )
}

export default Navbar;