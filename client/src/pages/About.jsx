import { Helmet } from "react-helmet";

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Popcorn & Pages</title>
                <meta name="description" content="Get recommendations for movies, TV shows, and books tailored for you." />
            </Helmet>
            <div className="flex flex-col items-center justify-center text-white min-h-[calc(100vh-60px)]">
                <main className="max-w-[90%] xs:max-w-[calc(240px+40%)] bg-raisinblack shadow-md rounded-lg px-[3rem] py-[4rem]">
                    <h1 className="text-[clamp(1rem,1.5rem+1vw,2rem)] text-center font-semibold">About Us</h1>
                    <section>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem]">Popcorn & Pages</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-gray-200">
                            Popcorn & Pages is a personal project that was built to learn and explore full-stack development.
                        </p>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem]">Motivation</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-gray-200">
                            The motivation behind Popcorn & Pages is to bridge the gap between different media forms, such as books 
                            and movies, by having a cross-media search feature that would allow people to explore different mediums 
                            through common themes. As opposed to using search engines to looking up similar media, Popcorn & Pages 
                            streamlines the process by tailoring recommendations by taking in consideration of each user’s 
                            preferences and media history to ensure each recommendation is worthy of becoming their next favorite.
                        </p>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem]">Technology Used</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-gray-200">
                        Vite, React, Tailwind CSS, Node.js, Express, Sequelize, Supabase, Axios, Insomnia, Google Gemini, and open APIs such as TMDB.
                        </p>
                        <h2 className="text-[clamp(1rem,1rem+1vw,1.5rem)] font-semibold mt-[1.5rem] mb-[1rem]">Other</h2>
                        <p className="text-[clamp(0.75rem,0.5rem+1vw,1rem)] text-gray-200">
                            For more details, feel free to check out the GitHub repository <a href="https://github.com/justinyc1/popcorn-n-pages" className="text-lightblue underline hover:text-lightorange-darkest transition ease-in-out duration-250">here</a>.
                        </p>
                    </section>
                </main>
            </div>
        </>
    )
}

export default About;