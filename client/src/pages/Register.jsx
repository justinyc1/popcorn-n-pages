const Register = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center">Sign up</h1>
                <form className="mt-4 space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <input type="text" id="name" name="name" className="w-full h-9 border border-gray-300 rounded-md px-3" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" className="w-full h-9 border border-gray-300 rounded-md px-3" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" className="w-full h-9 border border-gray-300 rounded-md px-3" />
                    </div>
                    <button type="submit" className="w-full h-9 bg-blue-500 text-white font-medium rounded-md">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Register;