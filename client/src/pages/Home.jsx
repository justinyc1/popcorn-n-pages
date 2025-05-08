import { useState, useEffect } from "react";
import Card from "../components/Card"
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
    const apiKey = import.meta.env.VITE_API_TASTEDIVE_KEY;
    const [results, setResults] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState('movie');

    // eslint-disable-next-line no-unused-vars
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
                        fetchSearch(searchInput.value, selectedMedia);    
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
                    fetchSearch(searchInput.value, selectedMedia);    
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
                fetchSearch(searchInput.value, selectedMedia);    
            // }
            // prevSearchQuery = searchInput;
        } else {
            console.log("Please enter a search term.");
        }
    };
    //dotenv.config();
    // const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    // async function run() {
    //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    //   const prompt = "give me similar content";
    //   const result = await model.generateContent(prompt);
    //   const response = await result.response;
    //   const text = response.text();
    //   console.log(text);
    // }
    // run();

    async function fetchSearch(input, type) {
        if (input.length == 0) return;
        // if (input == prevSearchQuery) {
        //     console.log("Same search input, will not query the input again");
        //     return;
        // }
        console.log(`Fetching data for search query: ${input}`);
        prevSearchQuery = input;
        if (input.length === 0) return;
        try {
            console.log("selected media in fetchSearch(): " + selectedMedia);
            console.log("type in fetchSearch(): " + type);
            const tasteDiveResponse = await fetch(`/api/similar?q=${input}&type=${type}&info=1&k=${apiKey}`);
            const tasteDiveData = await tasteDiveResponse.json();
            const results = tasteDiveData.similar.results;
    
            //Fetch images for each result
            const enrichedResults = await Promise.all(results.map(async (result) => {
                let imageUrl = null;
    
                if (result.type === 'movie') {
                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${result.name}`);
                    const tmdbData = await tmdbResponse.json();
                    imageUrl = tmdbData.results[0]?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`
                        : null;
                } else if (result.type === 'book') {
                    try {
                        const booksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${result.name}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`);
                        const booksData = await booksResponse.json();
                        imageUrl = booksData.items[0]?.volumeInfo?.imageLinks?.thumbnail || null;
                    } catch (e) {
                        console.log(`Failed to fetch image for book ${result.name}:` + e);
                    }
                }
    
                return { ...result, imageUrl };
            }));
    
            setResults(enrichedResults);
            window.scrollTo({
                top: 350,
                behavior: 'smooth'
              });
            console.log("Success, displaying results");
        } catch (error) {
            console.error("Error while fetching search results:", error);
        }
    }

    const handleMediaChange = (event) => {
        setSelectedMedia(event.target.value);
        console.log("selected media in handleMediaChange(): " + event.target.value);
        console.log(selectedMedia);

    };

    return (
        <div className="bg-gradient-to-r text-deepblack flex flex-col">
            
            {/* Search and Main Section */}
            <div className="bg-white bg-opacity-50">
                <div className="flex-1 flex flex-col my-40 items-center justify-center">
                    <p className="text-5xl font-semibold text-deepblack">All your favorites, in one search.</p>
                </div>
                {/* <div className="flex-1 flex flex-col pb-16 items-center justify-center bg-white bg-opacity-50 shadow-2xl shadow-white/70"> */}
                <div className="flex-1 flex flex-col pb-32 items-center justify-center ">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search recommendation for movies, shows, or books..."
                        className="w-full lg:w-1/2 py-3 px-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-lightblue-lightest transition"
                        // onChange={(event) => handleInput(event)}
                    />
                    
                    {/* buttons */}
                    
                    <div className="my-2">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                            <h2 style={{ margin: 0, whiteSpace: 'nowrap'}}>Select A Media Type:</h2>

                            <form id="media-form" style={{ display: 'flex', gap: '15px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input 
                                    type="radio" 
                                    name="media" 
                                    value="movie" 
                                    checked={selectedMedia === 'movie'}
                                    onChange={handleMediaChange}
                                />
                                Movies
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input 
                                    type="radio" 
                                    name="media" 
                                    value="book" 
                                    checked={selectedMedia === 'book'}
                                    onChange={handleMediaChange}
                                />
                                Books
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input 
                                    type="radio" 
                                    name="media" 
                                    value="show" 
                                    checked={selectedMedia === 'show'}
                                    onChange={handleMediaChange}
                                />
                                TV Shows
                                </label>
                            </form>
                        </div>
                    </div>

                    {/* below buttons */}
                    <div className="default-content mt-16 text-center">
                        <p className="text-gray-700 text-lg mt-2 mb-2">
                            Explore top recommendations, reviews, and more!
                        </p>
                        <button onClick={handleExplore} className="mt-6 px-6 py-3 text-xl font-semibold bg-gradient-to-r from-lightorange-lightest/80 via-lightgreen-lightest/80 to-lightblue-lightest/80 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-lightorange hover:via-lightgreen hover:to-lightblue transition-all duration-300 ease-in-out transform hover:scale-105">
                            Start Exploring
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Results */}
            {results.length > 0 && ( // only show if there is a query
                <div className="p-6 flex-grow">
                    <h2 className="text-4xl font-semibold text-gray-700 text-center mt-4 mb-8">Search Results</h2>
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

        </div>
    );
};

export default Home;