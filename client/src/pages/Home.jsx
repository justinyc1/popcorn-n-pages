import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Card from "../components/Card";

const Home = () => {
  const apiKey = import.meta.env.VITE_API_TASTEDIVE_KEY;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMedias, setSelectedMedias] = useState({
    book: false,
    movie: true,
    show: false,
  });
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();

  const handleKeyDown = (e) => {
    if (inputRef.current.value.trim().length === 0) return;
    if (e.key === "Enter") {
      fetchSearch(inputRef.current.value, selectedMedias);
    }
  };

  const handleExplore = () => {
    if (inputRef.current.value.trim().length !== 0) {
      fetchSearch(inputRef.current.value, selectedMedias);
    }
  };

  const handleMediaChange = (e) => {
    const changedMedia = e.target.value;
    setSelectedMedias((prev) => ({
      ...prev,
      [changedMedia]: !prev[changedMedia],
    }));
  };

  const fetchSearch = async (searchInput, selectedMedias) => {
    setIsSubmitting(true);
    const medias = Object.keys(selectedMedias).filter((key) => selectedMedias[key]);

    try {
      const allResults = await Promise.all(
        medias.map(async (mediaType) => {
          const response = await fetch(
            `/api/similar?q=${searchInput}&type=${mediaType}&info=1&k=${apiKey}`
          );
          const data = await response.json();
          data.similar.results.forEach((result) => (result.mediaType = mediaType));
          return data.similar.results;
        })
      );

      const flatResults = allResults.flat();

      const enrichedResults = await Promise.all(
        flatResults.map(async (result) => {
          let imageUrl = null,
            id = null;

          try {
            if (result.mediaType === "book") {
              const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=intitle:${result.name}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
              );
              const data = await res.json();
              id = data.items?.[0]?.id;
              imageUrl = id
                ? `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2`
                : null;
            } else if (result.mediaType === "movie") {
              const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${result.name}`
              );
              const data = await res.json();
              id = data.results?.[0]?.id;
              imageUrl = data.results?.[0]?.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
                : null;
            } else if (result.mediaType === "show") {
              const res = await fetch(
                `https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${result.name}`
              );
              const data = await res.json();
              id = data.results?.[0]?.id;
              imageUrl = data.results?.[0]?.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
                : null;
            }
          } catch (e) {
            console.error(`Failed to fetch image for ${result.name}:`, e);
          }

          return { ...result, imageUrl };
        })
      );

      setSearchResults(enrichedResults);
      window.scrollTo({ top: 700, behavior: "smooth" });
    } catch (error) {
      console.error("Error while fetching:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Popcorn & Pages</title>
        <meta
          name="description"
          content="Get smart recommendations for movies, shows, and books tailoyellow to your taste."
        />
      </Helmet>

      <div className="bg-gradient-to-b from-black via-zinc-900 to-black text-white min-h-screen pb-32">
        <div className="text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-600 mb-4 drop-shadow">
            Popcorn & Pages
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-2xl mx-auto">
            Discover your next favorite movie, show, or book.
          </p>

          <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search a title..."
              onKeyDown={handleKeyDown}
              className="flex-1 px-5 py-3 rounded-md bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <button
              onClick={handleExplore}
              disabled={isSubmitting}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition"
            >
              {isSubmitting ? "Loading..." : "Explore"}
            </button>
          </div>

          <div className="flex justify-center gap-6 mt-6 text-sm text-zinc-300">
            {["book", "movie", "show"].map((media) => (
              <label key={media} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={media}
                  checked={selectedMedias[media]}
                  onChange={handleMediaChange}
                  className="accent-yellow-600"
                />
                {media.charAt(0).toUpperCase() + media.slice(1)}s
              </label>
            ))}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="px-6">
            <h2 className="text-2xl font-bold mb-4">Recommended Titles</h2>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
              {searchResults.map((result, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-56">
                  <Card
                    name={result.name}
                    type={result.mediaType}
                    imageUrl={result.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
