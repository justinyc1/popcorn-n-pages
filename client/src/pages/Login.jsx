import { useState } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
        <>
            <Helmet>
                <title>Sign in - Popcorn & Pages</title>
                <meta name="description" content="Sign in to get back to your personalized recommendations." />
            </Helmet>
            <div className="flex items-center justify-center transform min-h-[calc(100vh-60px)] -translate-y-[10%]"> {/* position of box in page */}
                <div className="min-w-[83%] xs:min-w-[24rem] max-w-[90%] min-h-[25rem] p-[2rem] bg-white rounded-lg shadow-lg"> {/* properties of box */}
                    <h1 className="text-2xl font-semibold text-center my-[0.75rem]">Sign in</h1>
                    <form onSubmit={handleSubmit}>
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
                            <div className="min-h-[1.5rem]">
                                {errors.username && <span className="text-[0.75rem] text-red-500">{errors.username}</span>}
                            </div>
                        </div>
                        <div className="min-h-[1rem] pb-2"> {/* password */}
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
                            <div className="min-h-[1.5rem]">
                                {errors.password && <span className="text-[0.75rem] text-red-500">{errors.password}</span>}
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="w-full h-9 bg-lightblue-darker text-white font-medium rounded-md"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}    
                        </button>
                        <div className="min-h-[1.5rem]">
                            {errors.server && <span className="text-[0.75rem] text-red-500">{errors.server}</span>}
                        </div>
                        <div className="text-[0.8rem] font-normal">
                            Don&#39;t have an account? {<Link to="/register" className="text-lightblue-darkest underline font-semibold">Sign up</Link>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;