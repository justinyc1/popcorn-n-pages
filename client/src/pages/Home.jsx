import { useState, useEffect } from "react";

const Home = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    // const [search, setSearch] = useState('');

    // const handleInput = (event) => {
    //     setSearch(event.target.value);
    //     console.log(search);
    // }

    useEffect(() => {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            const handleKeyPress = function (e) {
                if (searchInput.value.length !== 0 && e.key === 'Enter') { 
                    console.log("Search input: " + searchInput.value);
                    fetchSearch(searchInput.value);
                }
            };
            searchInput.addEventListener("keypress", handleKeyPress);

            // Clean up the event listener when the component unmounts
            return () => {
                searchInput.removeEventListener("keypress", handleKeyPress);
                fetchSearch(searchInput.value);
            };
        }
    }, []); // Empty dependency array to run only once on mount

    const handleExplore = () => {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            console.log(searchInput.value);
        }
    }

    async function fetchSearch(input) {
        if (input.length === 0) return;
        try {
            const response = await fetch(
                // `https://ctp-zip-code-api.onrender.com/zip/10038`
                `/api/similar?q=${input}&type=movie&k=${apiKey}`
            );
            const data = await response.json();
            // console.log(data);
            console.log(data.similar.results);
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log("Error while fetching search results:" + error);
        }
    }

    return (
        <div className="h-screen bg-gradient-to-b from-gray-200 to-gray-100 text-gray-800 flex flex-col">
            {/* Header */}
            <div className="text-center py-8 mt-[46px] bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg">
                <h1 className="text-4xl font-bold mb-2">Popcorn & Pages</h1>
                <p className="text-md text-gray-100">Discover movies, shows, and books you’ll love.</p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row flex-grow gap-6 px-6 py-8">
                {/* Search and Main Section */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search for movies, shows, or books..."
                        className="w-full lg:w-2/3 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        // onChange={(event) => handleInput(event)}
                    />

                    <div className="default-content mt-6 text-center">
                        <p className="text-gray-700 text-lg mb-4">
                            Explore top recommendations, reviews, and more!
                        </p>
                        <button onClick={handleExplore} className="mt-4 px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                            Start Exploring
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-1/4 bg-gray-100 p-6 shadow-lg rounded-lg">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">Featured</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li className="hover:text-indigo-500 cursor-pointer">Featured Movie 1</li>
                            <li className="hover:text-indigo-500 cursor-pointer">Featured Show 2</li>
                            <li className="hover:text-indigo-500 cursor-pointer">Featured Book 3</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">Upcoming</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li className="hover:text-indigo-500 cursor-pointer">Upcoming Movie 1</li>
                            <li className="hover:text-indigo-500 cursor-pointer">Upcoming Show 2</li>
                            <li className="hover:text-indigo-500 cursor-pointer">Upcoming Book 3</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 text-center p-4 mt-auto">
                <p className="text-sm">© 2024 Popcorn & Pages. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
