import { useState } from "react";
import Navbar from "../components/Navbar";

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Profile updated:', { username, displayName, email, password, confirmPassword, profilePicture, darkMode });
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    return (
        <>
            <Navbar /* this isnt necessary since we currently have navbar wrapping all pages in App.jsx *//> 
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 pt-[100px]">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Edit Profile
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input 
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                                Display Name
                            </label>
                            <input 
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your display name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input 
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input 
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                                Profile Picture
                            </label>
                            <input 
                                type="file"
                                id="profilePicture"
                                onChange={handleProfilePictureChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="darkMode">
                                Dark Mode
                            </label>
                            <input 
                                type="checkbox"
                                id="darkMode"
                                checked={darkMode}
                                onChange={(e) => setDarkMode(e.target.checked)}
                                className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700 text-sm">Enable dark mode</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProfile;