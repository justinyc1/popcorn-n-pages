import process from "node:process";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const fetchTasteDive = async (searchQuery, mediaType) => {
    const TASTEDIVE_API_KEY = process.env.TASTEDIVE_API_KEY;

    const tasteDiveResponse = await fetch(
        `https://tastedive.com/api/similar?q=${searchQuery}&type=${mediaType}&info=1&k=${TASTEDIVE_API_KEY}`
    );
    
    const data = await tasteDiveResponse.json();
    return data;
}

export const fetchImages = async (jsonResults) => {
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