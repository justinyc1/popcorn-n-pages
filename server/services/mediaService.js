import process from "node:process";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TASTEDIVE_API_KEY = process.env.TASTEDIVE_API_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const geminiAi = new GoogleGenerativeAI(GEMINI_API_KEY);

export const fetchTasteDive = async (searchQuery, mediaType) => {
    const tasteDiveResponse = await fetch(`
            https://tastedive.com/api/similar
            ?q=${searchQuery}
            &type=${mediaType}
            &info=1
            &k=${TASTEDIVE_API_KEY}
    `);
    
    const jsonData = await tasteDiveResponse.json();
    return jsonData;
}

export const fetchGeminiAi = async (count, mediaName, mediaType) => {
    const model = geminiAi.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const prompt = `return me a json object, delimited by backticks, of ${count} 
            existing ${mediaType}s similar to ${mediaName}, with the 
            ${mediaType === "book" ? "authors" : "directors, main actors"}, 
            genre, rating (on a scale from 1.0 to 10.0), age rating, and description. 
            all this information should be returned as a json object`;
    const result = await model.generateContent(prompt);

    const trimResponseDelimiters = (response) => {
        const start = response.indexOf("[")-1;
        const end = response.lastIndexOf("]")+1;
        if (start !== -1 && end !== -1 && end > start) {
            return response.substring(start, end + 1);
        }
        return response;
    }
    const jsonString = trimResponseDelimiters(result.response.text());
    const jsonData = JSON.parse(jsonString);
    return jsonData;
}

export const fetchImages = async (jsonResults) => {
    try {
        const enrichedResults = await Promise.all(jsonResults.map(async (result) => {
            let imageUrl = null;
            if (result.mediaType === 'movie') {
                const tmdbData = await fetchMovieData(result.name);
                imageUrl = tmdbData.results[0]?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}` : null;
            } else if (result.mediaType === 'show') {
                const tmdbData = await fetchTVShowData(result.name);
                imageUrl = tmdbData.results[0]?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}` : null;
            } else if (result.mediaType === 'book') {
                const booksData = await fetchBookData(result.name);
                const id = booksData.items[0]?.id;
                // imageUrl = booksData.items[0]?.volumeInfo?.imageLinks?.thumbnail || "none";
                imageUrl = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2`;
            }
            return { ...result, imageUrl };
        }));
        return enrichedResults;
    } catch (error) {
        console.log(error);
    }
}

export const fetchMovieData = async (mediaName) => {
    const tmdbResponse = await fetch(`
            https://api.themoviedb.org/3/search/movie
            ?api_key=${TMDB_API_KEY}
            &query=${mediaName}
    `);
    const jsonData = await tmdbResponse.json();
    return jsonData;
}

export const fetchTVShowData = async (mediaName) => {
    const tmdbResponse = await fetch(`
            https://api.themoviedb.org/3/search/tv
            ?api_key=${TMDB_API_KEY}
            &query=${mediaName}
    `);
    const jsonData = await tmdbResponse.json();
    return jsonData;
}

export const fetchBookData = async (mediaName) => {
    const bookResponse = await fetch(`
            https://www.googleapis.com/books/v1/volumes
            ?q=intitle:${mediaName}
            &key=${GOOGLE_BOOKS_API_KEY}
    `);
    const jsonData = await bookResponse.json();
    return jsonData;
}