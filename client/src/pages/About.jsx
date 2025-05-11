import { Helmet } from "react-helmet";

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Popcorn & Pages</title>
                <meta name="description" content="Get recommendations for movies, TV shows, and books tailored for you." />
            </Helmet>
            <div className="flex flex-col items-center justify-center text-deepblack min-h-[calc(100vh-60px)]">
                <main className="max-w-[90%] xs:max-w-[calc(240px+40%)] bg-yellow-600 shadow-md rounded-lg px-[3rem] py-[4rem]">
                    <h1 className="text-[clamp(1rem,1.5rem+1vw,2rem)] text-center font-semibold text-white">About Us</h1>
                    <section>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem] text-white">Popcorn & Pages</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-white">
                            Popcorn & Pages is a personal project that was built to learn and explore full-stack development.
                        </p>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem] text-white">Motivation</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-white">
                            The motivation behind Popcorn & Pages is to bridge the gap between different media forms, such as books 
                            and movies, by having a cross-media search feature that would allow people to explore different mediums 
                            through common themes. As opposed to using search engines to looking up similar media, Popcorn & Pages 
                            streamlines the process by tailoring recommendations by taking in consideration of each user’s 
                            preferences and media history to ensure each recommendation is worthy of becoming their next favorite.
                        </p>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem] text-white">Technology Used</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-white">
                        Vite, React, Tailwind CSS, Node.js, Express, Sequelize, Supabase, Axios, Insomnia, Google Gemini, and open APIs such as TMDB.
                        </p>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem] text-white">Other</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-white">
                            For more details, feel free to check out the GitHub repository 
                            <a href="https://github.com/justinyc1/popcorn-n-pages" className="text-blue-500 underline">here</a>.
                        </p>
                    </section>
                </main>
            </div>
        </>
    )
}

export default About;
