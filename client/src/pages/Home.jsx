import React, { useState, useRef } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import { apiUrl } from "../config";

const Card = React.lazy(() => import("../components/Card"));

const Home = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMedias, setSelectedMedias] = useState({
        book: false,
        movie: true,
        show: false,
    });
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef();
    // const [prevQuery, setPrevQuery] = useState("");

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

    const fetchSearch = async (searchInput, selectedMedias) => {
        console.log("DEBUG1");
        setIsSubmitting(true);
        // if (searchInput !== prevQuery) {
            console.log("DEBUG2");
            console.log(`Fetching data for search query: ${searchInput}`); // DEBUG

            try {
                console.log("DEBUG3");
                const response = await axios.get(
                    `${apiUrl}/media/tastedive`,
                    {
                        params: { // .query
                            searchInput: searchInput,
                            selectedMedias: JSON.stringify(selectedMedias),
                        }
                    },
                    {
                        withCredentials: true
                    }
                );
                console.log("DEBUG4");
            
                const enrichedResults = response.data;
                console.log("DEBUG5");

                console.log(enrichedResults); // DEBUG
                setSearchResults(enrichedResults);
                console.log("DEBUG6");
                window.scrollTo({
                    top: 560,
                    behavior: 'smooth'
                });
                console.log("Success, displaying results");
            } catch (error) {
                console.log(error);
                // console.error("Error occurred while fetching search results: ", error);
            }
            // setPrevQuery(searchInput);
        // }
        setIsSubmitting(false);
        console.log("DEBUG7");
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
            <div className="flex flex-col text-white min-h-[calc(100vh-60px)]">
                <div>
                    {/* Title */}
                    <div className="flex-1 flex flex-col my-[clamp(4rem,4rem+5vw,8rem)] items-center justify-center text-center">
                        <span className="text-[clamp(2rem,1.75rem+1vw,3rem)] font-semibold text-white">
                            <span className="hidden sm:inline">Your next favorite, tailored for you.</span>
                            <span className="inline sm:hidden">Your next favorite,<br/>tailored for you.</span>
                        </span>
                        {/* <button onClick={testFunc}>TEST</button> */}
                    </div>
                    {/* Search Container */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        {/* Search Bar */}
                        <div className="w-[95%] xs:max-w-[calc(360px+20%)] text-center p-[0.1rem] rounded-full bg-gradient-to-r from-lightorange-lightest via-lightgreen-lightest to-lightblue-lightest focus-within:bg-gradient-to-r">
                            <input
                                id="search-input"
                                type="text"
                                ref={inputRef}
                                placeholder="Enter movies, TV shows, or books for recommendations..."
                                className="w-full py-3 px-4 text-[clamp(0.8rem,0.5rem+1vw,1rem)] justify-center rounded-full text-black bg-gray-100 focus:outline-none"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        
                        {/* Buttons */}
                        <div className="my-[1rem] text-[clamp(0.75rem,0.5rem+1vw,1rem)] flex align-center gap-[clamp(0.5rem,0.5rem+1vw,1rem)]">
                            <label className="">Media types:</label>

                            <form className="flex gap-[1rem]">
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
                                <label className="flex align-center gap-[clamp(0.1rem,0.25rem+1vw,0.25rem)] accent-lightblue-lightest">
                                <input 
                                    type="checkbox" 
                                    value="book" 
                                    checked={selectedMedias.book}
                                    onChange={handleMediaChange}
                                />
                                Books
                                </label>
                            </form>
                        </div>

                        {/* below buttons */}
                        <div className="default-content text-center">
                            <button onClick={handleExplore} disabled={isSubmitting} className="my-[3rem] px-[1.5rem] py-[0.75rem] text-[clamp(0.75rem,0.5rem+1vw,1.2rem)] font-semibold 
                                    bg-gradient-to-r from-lightorange-lighter/90 via-lightgreen-lighter/90 to-lightblue-lighter/90 text-white rounded-lg shadow-lg 
                                    hover:bg-gradient-to-r hover:from-lightorange-darker hover:via-lightgreen-darker hover:to-lightblue-darker transition-all duration-300 ease-in-out will-change-transform hover:scale-105">
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