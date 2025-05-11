import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

// Simulating a database with 50 users
const mockDatabase = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    avatar: '/default-avatar.png', // Default avatar for every user
}));

const Profile = () => {
    // Use the first user for demonstration, but you can change this logic to load a specific user.
    const [userData, setUserData] = useState(mockDatabase[0]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
    });

    useEffect(() => {
        // Initialize formData with user data
        setFormData({
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
        });
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: URL.createObjectURL(file) });
        }
    };

    const handleSaveChanges = () => {
        // Save changes to the mock database (in this case, just to state)
        setUserData(formData);
        setIsEditing(false);
        // Update the mock database (for this example, we'll just update the state)
        mockDatabase[userData.id - 1] = formData;  // Update the user in the database
    };

    return (
        <>
            <Helmet>
                <title>My Profile - Popcorn & Pages</title>
                <meta
                    name="description"
                    content="View and update your profile information, manage account settings, and personalize your experience."
                />
            </Helmet>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-8 px-4">
                <div className="max-w-md w-full bg-yellow-600 rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-semibold text-center mb-6">My Profile</h1>

                    {/* Avatar Section */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={formData.avatar}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full border-4 border-yellow-700 object-cover mb-4"
                        />
                        {isEditing && (
                            <div className="mt-4">
                                <label
                                    htmlFor="avatar"
                                    className="text-center text-yellow-700 cursor-pointer underline"
                                >
                                    Change Avatar
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        )}
                    </div>

                    {/* Profile Form */}
                    <div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 rounded-md bg-gray-800 text-white"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 rounded-md bg-gray-800 text-white"
                            />
                        </div>

                        {/* Save or Edit Button */}
                        <div className="flex justify-between gap-4">
                            {isEditing ? (
                                <button
                                    onClick={handleSaveChanges}
                                    className="w-full p-3 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold rounded-md transition duration-200"
                                >
                                    Save Changes
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
