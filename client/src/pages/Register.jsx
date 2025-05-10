import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config";

const Register = () => {
    // keep track of user input
    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        password: "",
    });

    // keep track of errors (i.e. invalid username or password format)
    const [errors, setErrors] = useState({});

    // to disable submit button when submitting
    const [isSubmitting, setIsSubmitting] = useState(false);

    // to for when account is created successfully
    const [showSuccess, setShowSuccess] = useState(false);

    const [countdown, setCountdown] = useState(5);

    // to redirect user when sign up is successful
    const navigate = useNavigate();

    useEffect(() => {
        if (showSuccess && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        if (showSuccess && countdown === 0) {
            navigate("/login");
        }
    }, [showSuccess, countdown, navigate]);

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

        // clear displayName error messages if exists, if displayName field was modified
        if (name === "displayName") { 
            setErrors((prevErrors) => ({
                ...prevErrors,
                displayName: "",
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

    // make sure username, display name, and password are valid
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

        if (!formData.displayName) {
            tempErrors.displayName = "Display name is required.";
        } else if (formData.displayName.indexOf(" ") >= 0) {
            tempErrors.displayName = "Display name cannot contain any spaces.";
        } else if (formData.displayName.length < 1 || formData.displayName.length > 16) {
            tempErrors.displayName = "Display name must be between 1 and 16 characters.";
        } else if (!/^[A-Za-z]+$/.test(formData.displayName)) {
            tempErrors.displayName = "Display name can only contain English letters.";
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
                `${apiUrl}/auth/register`, 
                formData,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (response.status >= 200 && response.status < 300) { // success
                console.log("Account created: " + response.data.message);
                setShowSuccess(true);
                // setTimeout(() => navigate("/login"), 5000); // redirect user to home page
                setCountdown(5);
                
            }

        } catch (error) {
            const serverError = error.response?.data?.error;
            const status = error.response?.status;

            console.log("Status " + status + ", Server error: " + serverError);
            // console.log(status);

            if (status === 409) {
                setErrors(prev => ({ ...prev, username: "Username already taken." }));
            } else {
                setErrors(prev => ({ ...prev, server: "Registration failed. Please try again later." }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign up - Popcorn & Pages</title>
                <meta name="description" content="Create your free account today to get personalized recommendations." />
            </Helmet>
            <div className="flex items-center justify-center transform min-h-[calc(100vh-60px)] -translate-y-[10%]">{/* position of box in page */}
                {!showSuccess ? 
                    <div className="min-w-[83%] xs:min-w-[24rem] max-w-[90%] min-h-[30rem] p-[2rem] bg-white rounded-lg shadow-lg"> {/* properties of box */}
                        <h1 className="text-2xl font-semibold text-center my-[0.75rem]">Sign up</h1>
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
                                    {errors.username && <span className="text-sm text-red-500">{errors.username}</span>}
                                </div>
                            </div>
                            <div className="min-h-[1rem]"> {/* displayName */}
                                <label htmlFor="displayName" className="text-sm font-medium">Display Name:</label>
                                <input 
                                    type="text" 
                                    id="displayName" 
                                    name="displayName" 
                                    className="w-full h-9 border border-gray-300 rounded-md px-2" 
                                    autoComplete="off"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                />
                                <div className="min-h-[1.5rem]">
                                    {errors.displayName && <span className="text-sm text-red-500">{errors.displayName}</span>}
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
                                    {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full h-9 bg-lightblue-darker text-white font-medium rounded-md"
                            >
                                {isSubmitting ? "Signing up..." : "Sign Up"}    
                            </button>
                            <div className="min-h-[1.5rem]">
                                {errors.server && <span className="text-sm text-red-500">{errors.server}</span>}
                            </div>
                            <div className="text-[0.8rem] font-normal">
                                Already have an account? {<Link to="/login" className="text-lightblue-darkest underline font-semibold">Sign in</Link>}
                            </div>
                        </form>
                    </div> : 
                    <div className="max-w-[80%] xs:max-w-[calc(384px)] min-h-[10rem] p-[2rem] bg-white rounded-lg shadow-lg"> {/* properties of box */}
                        <h1 className="text-2xl my-[0.75rem] font-semibold text-center">Account created successfully!</h1>
                        <div className="my-[2.5rem]"></div>   
                        <h3 className="text-lg my-[1rem] font-semibold text-center">You will be automatically redirected to the Login page in {countdown} second{countdown !== 1 ? "s" : ""}...</h3>
                        <div className="py-[1rem]">
                            <button 
                                onClick={() => navigate("/login")}
                                className="w-full h-9 bg-lightblue-darker text-white font-medium rounded-md"
                            >
                                Continue to Login    
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Register;