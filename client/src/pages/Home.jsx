import { useState, useEffect } from "react";
import Card from "../components/Card"

const Home = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [results, setResults] = useState([]);
    let prevSearchQuery = " ";
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
                    // fetchSearch(searchInput.value);
                    // if (searchInput == prevSearchQuery) {
                    //     console.log("Same search input, will not fetch again.");
                    // } else {
                        fetchSearch(searchInput.value);    
                    // }
                    // prevSearchQuery = searchInput;
                }
            };
            searchInput.addEventListener("keypress", handleKeyPress);

            // Clean up the event listener when the component unmounts
            return () => {
                searchInput.removeEventListener("keypress", handleKeyPress);
                // fetchSearch(searchInput.value);
                // if (searchInput == prevSearchQuery) {
                //     console.log("Same query, will not fetch again.");
                // } else {
                    fetchSearch(searchInput.value);    
                // }
                // prevSearchQuery = searchInput;
            };
        }
    }, []); // Empty dependency array to run only once on mount

    //for Start Exploring button
    const handleExplore = () => {
        const searchInput = document.querySelector('#search-input');
        if (searchInput && searchInput.value.trim().length > 0) {
            // if (searchInput == prevSearchQuery) {
            //     console.log("Same query, will not fetch again.");
            // } else {
                fetchSearch(searchInput.value);    
            // }
            // prevSearchQuery = searchInput;
        } else {
            console.log("Please enter a search term.");
        }
    };

    async function fetchSearch(input) {
        if (input.length == 0) return;
        if (input == prevSearchQuery) {
            console.log("Same search input, will not query the input again");
            return;
        }
        console.log(`Fetching data for search query: ${input}`);
        prevSearchQuery = input;
        if (input.length === 0) return;
        try {
            const tasteDiveResponse = await fetch(`/api/similar?q=${input}&type=movie&info=1&k=${apiKey}`);
            const tasteDiveData = await tasteDiveResponse.json();
            const results = tasteDiveData.similar.results;
    
            // Fetch images for each result
            const enrichedResults = await Promise.all(results.map(async (result) => {
                let imageUrl = null;
    
                if (result.type === 'movie') {
                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${result.name}`);
                    const tmdbData = await tmdbResponse.json();
                    imageUrl = tmdbData.results[0]?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`
                        : null;
                } else if (result.type === 'book') {
                    const booksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${result.name}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`);
                    const booksData = await booksResponse.json();
                    imageUrl = booksData.items[0]?.volumeInfo?.imageLinks?.thumbnail || null;
                }
    
                return { ...result, imageUrl };
            }));
    
            setResults(enrichedResults);
        } catch (error) {
            console.error("Error while fetching search results:", error);
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
                        placeholder="Search recommendation for movies, shows, or books..."
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

            {/* Search Results */}
            {results.length > 0 && ( // only show if there is a query
                <div className="bg-gray-100 p-6 flex-grow">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Results</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {results && results.map((result, index) => (
                            <Card
                                key={index}
                                name={result.name}
                                type={result.type}
                                imageUrl={result.imageUrl}  // Passing imageUrl here
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 text-center p-4 mt-auto">
                <p className="text-sm">© 2024 Popcorn & Pages. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
