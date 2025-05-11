// import React, { useState, useRef } from "react";
import { useState, useRef } from "react";
import { Helmet } from 'react-helmet';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";
// import { apiUrl } from "../config";

// const Card = React.lazy(() => import("../components/Card"));
import Card from "../components/Card";

const Home = () => {
    const apiKey = import.meta.env.VITE_API_TASTEDIVE_KEY;
    // const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // const geminiAI = new GoogleGenerativeAI(geminiKey);
    
    // const getRecommendations = async (mediaName, mediaType) => {
    //     const model = geminiAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    //     const prompt = `return me a json object, delimited by backticks, of 10 ${mediaType}s similar to ${mediaName}, with the lead director, main actors, genre, rating, age rating, and summary`;
    //     const result = await model.generateContent(prompt);
    //     const jsonResponse = (response) => {
    //             const start = response.indexOf("[")-1;
    //             const end = response.lastIndexOf("]")+1;
    //             if (start !== -1 && end !== -1 && end > start) {
    //                 return response.substring(start, end + 1);
    //             }
    //             return response;
    //         }

    //     console.log(jsonResponse(result.response.text()));
    //     return jsonResponse(result.response.text());
    // }
    
    // getRecommendations("Harry Potter","Books");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMedias, setSelectedMedias] = useState({
        book: false,
        movie: true,
        show: false,
    });
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef();
    // const [inputMedia, setInputMedia] = useState(null);

    // when fetchSearch() when Enter key is pressed
    const handleKeyDown = (e) => {
        if (inputRef.current.value.trim().length !== 0) return;
        if (e.key === "Enter") {
            fetchSearch(inputRef.current.value, selectedMedias);
        }
        
    }

    // for "Start Exploring" button
    const handleExplore = () => {
        if (inputRef.current.value.trim().length !== 0) {
            fetchSearch(inputRef.current.value, selectedMedias);
        }
    };

    const handleMediaChange = (e) => {
        const changedMedia = e.target.value;

        setSelectedMedias((prevData) => ({
            ...prevData,
            [changedMedia]: !prevData[changedMedia],
        }));
    };

    // const newFetch = (selectedMedias, searchInput) => {
    //     axios.get(
    //         `${apiUrl}/media/recommend`,
    //         {
    //             params: { // .query
    //                 selectedMedias: selectedMedias,
    //                 searchInput: searchInput
    //             }
    //         },
    //         {
    //             withCredentials: true
    //         }
    //     );
    // }

    const fetchSearch = async (searchInput, selectedMedias) => {
        setIsSubmitting(true);
        // CHECK IF SAME QUERY AS PREVIOUS
        console.log(`Fetching data for search query: ${searchInput}`); // DEBUG
        const medias = Object.keys(selectedMedias).filter((key) => {
            return selectedMedias[key];
        });

        try {
            const allResults = await Promise.all(
                medias.map(async (mediaType) => {
                    console.log("fetching for " + mediaType);
                    const tasteDiveResponse = await fetch(`https://tastedive.com/similar?q=${searchInput}&type=${mediaType}&info=1&k=${apiKey}`);
                    const tasteDiveData = await tasteDiveResponse.json();
                    tasteDiveData.similar.results.forEach((result) => {
                        result.mediaType = mediaType;
                    });
                    return tasteDiveData.similar.results;
                })
            );

            const jsonResults = allResults.flat();

            //Fetch images for each result
            const enrichedResults = await Promise.all(jsonResults.map(async (result) => {
                let imageUrl = null;
                let id = null;
                if (result.mediaType === 'book') {
                    try {
                        const booksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${result.name}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`);
                        const booksData = await booksResponse.json();
                        console.log(result.name, booksData);
                        id = booksData.items[0]?.id;
                        // imageUrl = booksData.items[0]?.volumeInfo?.imageLinks?.thumbnail || "none";
                        imageUrl = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2`;

                        // const booksResponse = await fetch(`https://openlibrary.org/search.json?q=${result.name}`);
                        // const booksData = await booksResponse.json();
                        // console.log(result.name, booksData);
                        // // id = booksData.docs.;
                        // imageUrl = booksData.items[0]?.volumeInfo?.imageLinks?.thumbnail || "none";
                        // imageUrl = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2`;
                    } catch (e) {
                        console.log(`Failed to fetch image for book ${result.name}:` + e);
                    }
                } else if (result.mediaType === 'movie') {
                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${result.name}`);
                    const tmdbData = await tmdbResponse.json();
                    console.log(tmdbData);
                    id = tmdbData.results[0]?.id;
                    imageUrl = tmdbData.results[0]?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`
                        : null;
                } else if (result.mediaType === 'show') {
                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${result.name}`);
                    const tmdbData = await tmdbResponse.json();
                    console.log(tmdbData);
                    id = tmdbData.results[0]?.id;
                    imageUrl = tmdbData.results[0]?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`
                        : null;
                }
    
                return { ...result, imageUrl };
            }));
        
            setSearchResults(enrichedResults);
            console.log(enrichedResults); // DEBUG
            window.scrollTo({
                top: 800,
                behavior: 'smooth'
            });
            console.log("Success, displaying results");
        } catch (error) {
            console.error("Error occurred while fetching search results: ", error);
        }
        setIsSubmitting(false);
    }

    // const testFunc = () => {
    //     console.log(inputRef.current.value);
    // }

    return (
        <>
            <Helmet>
                <title>Popcorn & Pages</title>
                <meta name="description" content="Get recommendations for movies, TV shows, and books tailored for you." />
            </Helmet>
            <div className="flex flex-col text-deepblack min-h-[calc(100vh-60px)]">
                <div>
                    {/* Title */}
                    <div className="flex-1 flex flex-col my-[clamp(4rem,4rem+5vw,10rem)] items-center justify-center text-center">
                        <span className="text-[clamp(2rem,1.75rem+1vw,3rem)] font-semibold text-deepblack">
                            <h1>Your next favorite, tailored for you.</h1>
                            {/* <span className="inline sm:hidden">Your next favorite,<br/>tailored for you.</span> */}
                        </span>
                        {/* <button onClick={testFunc}>TEST</button> */}
                    </div>
                    {/* Search Container */}
                    <div className="flex-1 flex flex-col pb-32 items-center justify-center">
                        {/* Search Bar */}
                        <div className="w-[95%] xs:max-w-[calc(360px+20%)] text-center p-px rounded-full bg-gradient-to-r from-lightorange-lightest via-lightgreen-lightest to-lightblue-lightest focus-within:bg-gradient-to-r">
                            <input
                                id="search-input"
                                type="text"
                                ref={inputRef}
                                placeholder="Enter movies, TV shows, or books for recommendations..."
                                className="w-full py-3 px-4 text-[clamp(0.8rem,0.5rem+1vw,1rem)] justify-center rounded-full focus:outline-none"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        
                        {/* Buttons */}
                        <div className="my-[1rem] text-[clamp(0.75rem,0.5rem+1vw,1rem)] flex align-center gap-[clamp(0.5rem,0.5rem+1vw,1rem)]">
                            <label className="">Media types:</label>

                            <form className="flex gap-[1rem]">
                                <label className="flex align-center gap-[clamp(0.1rem,0.25rem+1vw,0.25rem)] accent-lightblue-lightest">
                                <input 
                                    type="checkbox" 
                                    value="book" 
                                    checked={selectedMedias.book}
                                    onChange={handleMediaChange}
                                />
                                Books
                                </label>
                                <label className="flex align-center gap-[clamp(0.1rem,0.1rem+1vw,0.25rem)] accent-lightblue-lightest">
                                <input 
                                    type="checkbox" 
                                    value="movie" 
                                    checked={selectedMedias.movie}
                                    onChange={handleMediaChange}
                                />
                                Movies
                                </label>
                                <label className="flex align-center gap-[clamp(0.1rem,0.1rem+1vw,0.25rem)] accent-lightblue-lightest">
                                <input 
                                    type="checkbox" 
                                    value="show" 
                                    checked={selectedMedias.show}
                                    onChange={handleMediaChange}
                                />
                                TV Shows
                                </label>
                            </form>
                        </div>

                        {/* below buttons */}
                        <div className="default-content text-center">
                            <button onClick={handleExplore} disabled={isSubmitting} className="my-[3rem] px-[1.5rem] py-[0.75rem] text-[clamp(0.75rem,0.5rem+1vw,1.2rem)] font-semibold 
                                    bg-gradient-to-r from-lightorange-lighter/90 via-lightgreen-lighter/90 to-lightblue-lighter/90 text-white rounded-lg shadow-lg 
                                    hover:bg-gradient-to-r hover:from-lightorange hover:via-lightgreen hover:to-lightblue transition-all duration-300 ease-in-out will-change-transform hover:scale-105">
                                {isSubmitting === true ? "Loading Results..." : "Start Exploring"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && ( // only show if there is a query
                    <div className="p-6 flex-grow">
                        <h2 className="text-4xl font-semibold text-center mt-4 mb-8">Search Results</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 mx-auto md:max-w-[calc(384px+50%)] gap-[2rem]">
                            {searchResults && searchResults.map((result, index) => (
                                <Card
                                    key={index}
                                    // id={result.id}
                                    name={result.name}
                                    type={result.mediaType}
                                    imageUrl={result.imageUrl}  // Passing imageUrl here
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;