import { useState } from "react";
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
        <div className="h-[60px] fixed top-0 w-full bg-darkblack text-white shadow-lg shadow-darkblack z-20">
            {/* Container */}
            <nav className="flex items-center md:justify-evenly h-full">
                
                {/* Logo */}
                <Link to="/" className="flex ml-[5%] md:ml-0 items-center gap-[0.5rem] hover:text-lightorange-darker">
                    <img src="/popcorn.svg" alt="logo" className="w-[1.5rem] h-[1.5rem] drop-shadow" />
                    <h1 className="text-[1rem] font-semibold">
                        Popcorn & Pages
                    </h1>
                </Link>

                {/* Hamburger */}
                <button
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    className="text-2xl mr-[2.5rem] ml-auto md:hidden"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                </button>


                {/* Nav */}
                <div className="hidden md:flex gap-6 text-[1rem] font-semibold">
                    <Link to="/" className="hover:text-lightorange-darker transition-opacity border-t-4 border-b-2 border-transparent hover:border-b-lightorange-darker">
                        Home
                    </Link>
                    <Link to="/movies" className="hover:text-lightorange-darker transition-opacity border-t-4 border-b-2 border-transparent hover:border-b-lightorange-darker">
                        Movies
                    </Link>
                    <Link to="/tv-shows" className="hover:text-lightorange-darker transition-opacity border-t-4 border-b-2 border-transparent hover:border-b-lightorange-darker">
                        TV Shows
                    </Link>
                    <Link to="/books" className="hover:text-lightorange-darker transition-opacity border-t-4 border-b-2 border-transparent hover:border-b-lightorange-darker">
                        Books
                    </Link>
                    <Link to="/about" className="hover:text-lightorange-darker transition-opacity border-t-4 border-b-2 border-transparent hover:border-b-lightorange-darker">
                        About
                    </Link>
                </div>

                {/* Auth */}
                <div className="hidden md:flex text-[1rem] font-semibold">
                    {isAuthenticated === null &&
                        <span className="inline-flex mx-[3.25rem]">Loading...</span>
                    }
                    {isAuthenticated && 
                        <div>
                            <Link to="/profile" className="px-[0.75rem] py-[0.5rem] rounded-lg hover:text-lightblue-darkest transition ease-in-out duration-100">
                                <button className="px-[0.75rem] py-[0.5rem] rounded-lg hover:text-lightblue-darkest transition ease-in-out duration-100">
                                    My Profile
                                </button>
                            </Link>
                            <button onClick={handleLogout} className="px-[0.75rem] py-[0.5rem] rounded-lg hover:text-lightblue-darkest transition ease-in-out duration-100">
                                Logout
                            </button>
                        </div> 
                    }
                    {isAuthenticated === false && 
                        <div className="flex gap-5">
                            <Link to="/login">
                                <button className="px-[0.75rem] py-[0.5rem] rounded-lg hover:text-ligh hover:bg-white/10 hover:text-lightorange-darkest transition ease-in-out duration-200">
                                    Sign in
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-[0.75rem] py-[0.5rem] bg-lightblue text-white rounded-lg hover:bg-lightorange-darkest transition ease-in-out duration-250">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </nav>

            {/* Mobile */}
            <div className={`md:hidden absolute inset-x-0 top-[60px] pl-[0.5rem] bg-darkblack shadow-md shadow-darkblack transition-opacity duration-50
                ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}>
                <nav className="flex flex-col items-end text-[0.8rem] gap-3 px-[2.25rem] py-4 font-semibold">
                    <Link to="/" onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                        Home
                    </Link>
                    <Link to="/movies" onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                        Movies
                    </Link>
                    <Link to="/tv-shows" onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                        TV Shows
                    </Link>
                    <Link to="/books" onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                        Books
                    </Link>
                    <Link to="/about" onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                        About
                    </Link>
                    <hr/>
                    {/* Auth */}
                    {isAuthenticated && <>
                        <Link to="/profile" onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                            My Profile
                        </Link>
                        <Link to="/">
                            <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="hover:text-lightorange-darker">
                                Logout
                            </button>
                        </Link>
                    </> }
                    {isAuthenticated === false && <>
                        <Link to="/login">
                            <button onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                                Sign in
                            </button>
                        </Link>
                        <Link to="/register">
                            <button onClick={toggleMobileMenu} className="hover:text-lightorange-darker">
                                Sign up
                            </button>
                        </Link>
                    </> }
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
