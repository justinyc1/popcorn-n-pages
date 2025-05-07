import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";
import { apiUrl } from "../config";

const Login = () => {
    // keep track of user input
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // keep track of errors (i.e. invalid login creditials)
    const [errors, setErrors] = useState({});

    // to disable submit button when submitting
    const [isSubmitting, setIsSubmitting] = useState(false);

    // to redirect user when login is successful
    const navigate = useNavigate();

    // set authentication state (to rerender) when login is successful
    const { setIsAuthenticated } = useAuth();

    // update user input form as user enters information
    const handleChange = (e) => {
        const { name, value } = e.target;

        // update form data from user input
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
        // clear username error messages if exists, if username field was modified
        if (name === "username") { 
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: "",
            }));
        }

        // clear password error messages if exists, if password field was modified
        if (name === "password") { 
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "",
            }));
        }
    };

    // make sure username, and password are valid
    const validate = () => {
        let tempErrors = {};

        if (!formData.username) {
            tempErrors.username = "Username is required.";
        } else if (formData.username.indexOf(" ") >= 0) {
            tempErrors.username = "Username cannot contain any spaces.";
        } else if (formData.username.length < 4 || formData.username.length > 16) {
            tempErrors.username = "Username must be between 4 and 16 characters.";
        } else if (!/^[A-Za-z0-9]+$/.test(formData.username)) {
            tempErrors.username = "Username can only contain English letters and numbers.";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required.";
        } else if (formData.password.indexOf(" ") >= 0) {
            tempErrors.password = "Password cannot contain any spaces.";
        }  else if (formData.password.length < 8 || formData.password.length > 24) {
            tempErrors.password = "Password must be between 8 and 24 characters.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // return true only if valid
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${apiUrl}/auth/login`, 
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            if (response.status >= 200 && response.status < 300) { // success
                console.log("Login success: " + response.data.message);

                setIsAuthenticated(true);
                // localStorage.setItem("accessToken", response.data.token);

                navigate("/"); // redirect user to home page
            }

        } catch (error) {
            const serverError = error.response?.data?.error;
            const status = error.response?.status;

            console.log("Status " + status + ", Server error: " + serverError);
            console.log("error status: " + status);

            if (status === 404) {
                setErrors(prev => ({ ...prev, username: "Username doesn't exist." }));
            } else if (status === 401) {
                setErrors(prev => ({ ...prev, password: "Password is incorrect." }));
            } else {
                setErrors(prev => ({ ...prev, server: "Login failed. Please try again later." }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen"> {/* position of box in page */}
            <div className="w-1/4 px-[1.5rem] py-[1.5rem] mb-40 min-w-[25rem] max-w-[95%] min-h-[20rem] bg-white rounded-lg shadow-lg"> {/* properties of box */}
                <h1 className="text-2xl font-semibold text-center">Login</h1>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="min-h-[1rem]"> {/* username */}
                        <label htmlFor="username" className="text-sm font-medium">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="w-full h-9 border border-gray-300 rounded-md px-2" 
                            autoComplete="off"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span className="text-sm text-red-500">{errors.username}</span>}
                    </div>
                    <div className="min-h-[1rem]"> {/* password */}
                        <label htmlFor="password" className="text-sm font-medium">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full h-9 border border-gray-300 rounded-md px-2" 
                            autoComplete="off"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full h-9 bg-blue-500 text-white font-medium rounded-md"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}    
                    </button>
                    {errors.server && <span className="text-sm text-red-500">{errors.server}</span>}
                </form>
            </div>
        </div>
    )
}

export default Login;