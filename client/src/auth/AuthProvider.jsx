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
                await axios.get(
                    `${apiUrl}/auth/auth`,
                    {
                        withCredentials: true
                    }
                );
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
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