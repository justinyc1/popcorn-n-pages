const Home = () => {
    return (
        <div className="flex h-screen pt-[70px]">
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <input type="text" placeholder="Search..." className="border p-2 rounded mb-4 w-1/2" />
                <div className="default-content">
                    <p>Default content goes here...</p>
                    {/* Add more default content here */}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-64 bg-gray-100 p-4">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Featured</h2>
                    {/* Add featured content here */}
                </div>
                <div>
                    <h2 className="text-xl font-bold">Upcoming</h2>
                    {/* Add upcoming content here */}
                </div>
            </div>
        </div>
    )
}

export default Home;