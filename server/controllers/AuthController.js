import { createNewUser, findUserByUsername } from '../services/userService.js';
import { getAccessToken, comparePassword, hashPassword } from '../services/authService.js';

export const registerUser = async (req, res) => {
    try {
        const {username, displayName, password } = req.body;

        const user = await findUserByUsername(username);
        if (user) return res.status(409).json({ error: "Username already taken." });

        const hash = await hashPassword(password);

        await createNewUser(username, displayName, hash);

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await findUserByUsername(username); 
        if (!user) return res.status(404).json({ error: "Username doesn't exist."});
        
        const match = await comparePassword(password, user.passwordHash);
        if (!match) return res.status(401).json({ error: "Password is incorrect."});
    
        // login successful
        const accessToken = getAccessToken(user.username, user.id);
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 28 // 28 days
        });

        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while trying to log in." });
    }
};

export const logoutUser = async (req, res) => {
    res.cookie("accessToken", "", {
        httpOnly: true,
        secure: true, 
        sameSite: "Strict", 
        path: "/",
        maxAge: 0 // delete instantly
    });

    res.status(200).json({ message: "Logout successful." });
}
