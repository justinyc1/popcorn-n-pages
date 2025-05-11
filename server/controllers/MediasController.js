import { fetchBookData, fetchMovieData, fetchTasteDive, fetchTVShowData } from "../services/mediaService.js";

export const recommendMedias = async (req, res) => {
  
};

export const tasteDive = async (req, res) => {
    const searchQuery = req.query.searchInput;
    const mediaTypes = JSON.parse(req.query.selectedMedias);

    try {
        const selectedMedias = Object.keys(mediaTypes).filter((key) => {
            return mediaTypes[key];
        });
        // selectedMedias is now an array of selected media types

        console.log("TEST1");
        const allResults = await Promise.all(
            selectedMedias.map(async (mediaType) => {
                const jsonData = await fetchTasteDive(searchQuery, mediaType);
                const similarResults = jsonData.similar.results;
                // assign the media type to each result
                similarResults.forEach((result) => {
                    result.mediaType = mediaType;
                });
                return similarResults;
            })
        );
        console.log("TEST2");

        const jsonResults = allResults.flat();
        console.log("TEST3");

        const enrichedResults = await Promise.all(jsonResults.map(async (result) => {
            let imageUrl = null;
            if (result.mediaType === 'book') {
                const booksData = await fetchBookData(result.name);
                const id = booksData.items[0]?.id;
                // imageUrl = booksData.items[0]?.volumeInfo?.imageLinks?.thumbnail || "none";
                imageUrl = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2`;
            } else if (result.mediaType === 'movie') {
                const tmdbData = await fetchMovieData(result.name);
                imageUrl = tmdbData.results[0]?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}` : null;
            } else if (result.mediaType === 'show') {
                const tmdbData = await fetchTVShowData(result.name);
                imageUrl = tmdbData.results[0]?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}` : null;
            }

            return { ...result, imageUrl };
        }));
        console.log("TEST4");

        return res.status(200).json(enrichedResults);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something unexpected happened when trying to fetch TasteDive results:" });
    }
};