import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { apiUrl } from "../config";


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, false = not logged in, true = logged in

    // check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // check jwt in the backend, return the user (valid) or 401 (invalid)
                const response = await axios.get(
                    `${apiUrl}/auth/auth`,
                    {
                        withCredentials: true
                    }
                );

                if (response.status == 200) { // success
                    // console.log("Auth success!");
                    setIsAuthenticated(true);
                }
                // setIsAuthenticated(true);
            } catch (error) {
                const serverError = error.response?.data?.error;
                const status = error.response?.status;
    
                console.log("Status " + status + ", Server error: " + serverError);
                console.log("error status: " + status);
    
                if (status === 401) {
                    console.log("No token provided.");
                    setIsAuthenticated(false);
                } else if (status === 501) {
                    console.log("Invalid token.");
                    setIsAuthenticated(false);
                }
                // if (error.response.status === 401)
                // setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const logout = async () => {
        const response = await axios.post(
            `${apiUrl}/auth/logout`,
            {},
            {
                withCredentials: true
            }
        );
        if (response.data.message !== undefined) {
            console.log("Logout success: " + response.data.message);
        }
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};