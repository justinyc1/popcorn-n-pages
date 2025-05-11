import process from "node:process";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const fetchTasteDive = async (searchQuery, mediaType) => {
    const TASTEDIVE_API_KEY = process.env.TASTEDIVE_API_KEY;

    console.log("TESTa");
    const tasteDiveResponse = await fetch(
        `https://tastedive.com/api/similar?q=${searchQuery}&type=${mediaType}&info=1&k=${TASTEDIVE_API_KEY}`
    );
    console.log("TESTb");

    console.log(tasteDiveResponse);
    
    console.log("TESTc");
    const data = await tasteDiveResponse.json();
    console.log("TESTd");
    console.log(data);
    console.log("TESTe");
    return data;
}

export const fetchMovieData = async (mediaName) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const tmdbResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${mediaName}`
    );

    const data = await tmdbResponse.json();
    return data;
}

export const fetchTVShowData = async (mediaName) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const tmdbResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${mediaName}`
    );

    const data = await tmdbResponse.json();
    return data;
}

export const fetchBookData = async (mediaName) => {
    const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

    const bookResponse = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${mediaName}&key=${GOOGLE_BOOKS_API_KEY}`
    );

    const data = await bookResponse.json();
    return data;
}