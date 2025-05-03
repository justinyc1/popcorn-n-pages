const About = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 pt-[100px]">
                <header>
                    <h1 className="text-3xl font-bold">About Us</h1>
                </header>
                <main className="flex-1 w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-700">
                            Our mission is to create a community-driven platform that fosters connections between users who share interests in movies, TV shows, and books. By integrating recommendations across these mediums, Popcorn & Pages seeks to enhance discovery, promote diverse tastes, and encourage insightful discussions within a unified app experience.


                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
                        <p className="text-gray-700">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </section>
                </main>
            </div>
        </>
    )
}

export default About;