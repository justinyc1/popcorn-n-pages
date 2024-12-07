const Home = () => {
    return (
        <div 
            className="flex flex-col lg:flex-row h-screen pt-[70px] bg-cover bg-center"
            style={{
                backgroundImage: "url('https://media01.stockfood.com/largepreviews/NDQzNTk3NDc2/14309596-Scattered-popcorn-kernels-on-a-red-background.jpg')",
            }}
        >
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white bg-opacity-80">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="border p-2 rounded mb-4 w-full lg:w-1/2" 
                />
                <div className="default-content">
                    <p>Default content goes here...</p>
                    {/* Add more default content here */}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-64 bg-gray-100 p-4 bg-opacity-90">
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
