import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    // to redirect user when sign up is successful
    const navigate = useNavigate();

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
                "http://localhost:8080/auth/register", 
                formData,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (response.status >= 200 && response.status < 300) { // success
                console.log("Account created: " + response.data);
                setShowSuccess(true);
                setTimeout(() => navigate("/login"), 5000); // redirect user to home page
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
        <div className="flex items-center justify-center h-screen">{/* position of box in page */}
            <div className="w-1/4 p-6 mb-40 bg-white rounded-lg shadow-lg"> {/* properties of box */}
                {!showSuccess ? 
                <>
                    <h1 className="text-2xl font-semibold text-center">Sign up</h1>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div> {/* username */}
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
                        <div> {/* displayName */}
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
                            {errors.displayName && <span className="text-sm text-red-500">{errors.displayName}</span>}
                        </div>
                        <div> {/* password */}
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
                            {isSubmitting ? "Creating Account..." : "Sign Up"}    
                        </button>
                        {errors.server && <span className="text-sm text-red-500">{errors.server}</span>}
                    </form>
                </> : <>
                    <h1 className="text-2xl py-6 font-semibold text-center">Account created successfully!</h1>
                    <h3 className="text-xl py-6 font-semibold text-center">You will be automatically redirected to the Login page in 5 seconds...</h3>
                    <button 
                        onClick={() => navigate("/login")}
                        className="w-full h-9 bg-blue-500 text-white font-medium rounded-md"
                    >
                        Continue to Login    
                    </button>
                </>
                }
            </div>
        </div>
    )
}

export default Register;